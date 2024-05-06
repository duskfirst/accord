import ConversationsError from "@/components/user/conversations/ConversationsError";
import ConversationsBody from "@/components/user/conversations/ConversationsBody";
import ConversationsHeader from "@/components/user/conversations/ConversationsHeader";

import { PostgrestResponse, PostgrestSingleResponse } from "@supabase/supabase-js";
import { ExtendedConversation } from "@/types/extended";
import { Conversation, Profile } from "@/types/types";
import { createServerClient } from "@/utils/supabase/server";


interface ConversationsProps {
    profile: Profile;
};

const Conversations = async ({ profile }: ConversationsProps) => {

    const supabase = createServerClient();

    const {
        data, error
    } = await supabase
        .from("conversation")
        .select("*")
        .or(`one.eq.${profile.id},another.eq.${profile.id}`) as PostgrestResponse<Conversation>;

    if (error) {
        return <ConversationsError />;
    }

    const profiles: { [id: string]: Profile } = {};
    const conversations: ExtendedConversation[] = [];
    for (let conversation of data) {
        const { data, error } = await supabase
            .from("profile")
            .select("avatar_url,display_name,id,username,website")
            .eq("id", conversation.one === profile.id ? conversation.another : conversation.one)
            .single() as PostgrestSingleResponse<Profile>;
        if (error) {
            return <ConversationsError />;
        }
        if (data.id) {
            profiles[data.id] = data;
            conversations.push({ ...conversation, other: data });
        }
    }

    return (
        <div className="h-full flex flex-col">
            <ConversationsHeader />
            <ConversationsBody conversations={conversations} />
        </div>
    );

};

export default Conversations;