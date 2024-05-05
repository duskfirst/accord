import Home from "@/components/home/Home";
import Sidenav from "@/components/user/navigation/Sidenav";
import { 
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";

import { Profile } from "@/types/types";
import { createServerClient } from "@/utils/supabase/server";
import { PostgrestSingleResponse } from "@supabase/supabase-js";


const UserLayout = async ({ children } : {
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
        <ResizablePanelGroup
            direction="horizontal"
            className="h-full w-full"
        >
            <div className="hidden md:flex bg-zinc-800">
                <Sidenav profile={data!} />
            </div>
            <ResizablePanel className="hidden md:flex">
                { children }     
            </ResizablePanel>
        </ResizablePanelGroup>
    );

};

export default UserLayout;