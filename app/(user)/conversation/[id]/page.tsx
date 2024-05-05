import Messages from "@/components/user/messages/Messages";

import { PostgrestResponse, PostgrestSingleResponse } from "@supabase/supabase-js";
import { Conversation, Profile } from "@/types/types";
import { createServerClient } from "@/utils/supabase/server";

import { ServerCrash } from "lucide-react";


interface ConversationPageParams {
    params: {
        id: string;
    };
};

const ConversationPage = async ({ params } : ConversationPageParams) => {
    const supabase = createServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    const {
        data, error
    } = await supabase
        .from("conversation")
        .select("*")
        .eq("id", params.id) as PostgrestResponse<Conversation>;
    if (error || !data.length) {
        return (
            <div className="flex w-full items-center justify-center gap-2">
                <ServerCrash size={50} />
                <span>
                    Could not find conversation
                </span>
            </div>
        );
    }
    const convo = data[0];
    const sender = (await supabase
        .from("profile")
        .select("*")
        .eq("id", user!.id)
        .single() as PostgrestSingleResponse<Profile>).data;
    const receiver = (await supabase
        .from("profile")
        .select("*")
        .eq("id", user!.id === convo.one ? convo.another : convo.one)
        .single() as PostgrestSingleResponse<Profile>).data;
    const conversation = { ...convo, other: receiver! };

    return <Messages conversation={conversation} profile={sender!} />;

};

export default ConversationPage;