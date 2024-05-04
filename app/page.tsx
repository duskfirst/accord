import { createServerClient } from "@/utils/supabase/server";
import Link from "next/link";
import { ProfileProvider } from "@/components/providers/profile-provider";

import UserPage from "./(user)/userpage";
import { Button } from "@/components/ui/button";

const HomePage = () => {
    return (
        <div className="flex w-full items-center justify-center h-full flex-col gap-16">
            <div className="font-extrabold text-3xl">HOME</div>
            <div className="gap-20 flex">
                <Button className="w-32">
                    <Link href={"/login"} >Login</Link>
                </Button>
                <Button className="w-32">
                    <Link href={"/register"} >Register</Link>
                </Button>
            </div>           
        </div>
    );
};

export default async function Home() {
    const supabase = createServerClient();
    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (user) {
        return (
            <ProfileProvider>
                <UserPage />
            </ProfileProvider>
        );
    } else {
        return <HomePage />;
    }
}
