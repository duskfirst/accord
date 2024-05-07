import Home from "@/components/home/Home";
import Conversations from "@/components/user/conversations/Conversations";
import Sidenav from "@/components/user/navigation/Sidenav";
import { SocketProvider } from "@/components/providers/socket-provider";

import { Profile } from "@/types/types";
import { createServerClient } from "@/utils/supabase/server";
import { PostgrestSingleResponse } from "@supabase/supabase-js";


const UserLayout = async ({ children }: {
    children: React.ReactNode
}) => {

    const supabase = createServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return <Home />;
    }

    const { data } = await supabase
        .from("profile")
        .select("*")
        .eq("id", user.id)
        .single() as PostgrestSingleResponse<Profile>;

    return (
        <div className="w-screen h-screen flex max-h-full max-w-full">
            <div className="hidden h-full flex-none md:flex bg-zinc-800">
                <Sidenav profile={data!} />
            </div>
            <div className="w-full h-full md:w-auto md:min-w-64">
                <Conversations profile={data!} />
            </div>
            <div className="hidden md:flex flex-1 h-full">
                <SocketProvider>
                    {children}
                </SocketProvider>
            </div>
        </div>
    );

};

export default UserLayout;