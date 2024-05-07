
import { createServerClient } from "@/utils/supabase/server";
import { PostgrestResponse } from "@supabase/supabase-js";
import { Conversation, Profile } from "@/types/types";
import EditProfile from "@/components/profile/EditProfile";
import UserProfile from "./Profile";

const ProfilePage = async ({ params }: { params: { username: string } }) => {
    const supabase = createServerClient();
    const { data, error } = (await supabase
        .from("profile")
        .select("avatar_url,display_name,id,username,website")
        .eq("username", params.username)) as PostgrestResponse<Profile>;

    if (error || !data?.length) {
        return (
            <div className="h-full w-full flex justify-center items-center">
                <p className="text-center text-4xl w-full font-semibold">
                    User does not exist!
                </p>
            </div>
        );
    }

    const profile = data[0];

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user?.id === profile.id) {
        return <EditProfile profile={profile} />;
    }

    let conversation: Conversation | null = null;

    if (user?.id) {
        const { data } = await supabase
            .from("conversation")
            .select("*")
            .or(`and(one.eq.${user!.id},another.eq.${profile.id}),and(one.eq.${profile.id},another.eq.${user!.id})`) as PostgrestResponse<Conversation>;
        if (data?.length)
            conversation = data[0];
    }


    return <UserProfile profile={profile} user={user} conversation={conversation} />;

};

export default ProfilePage;
