"use server";

import { createServerClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Auth from "./Auth";


const AuthLayout = async ({ children } : { children: React.ReactNode }) => {
    const supabase = createServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        redirect("/");
    }
    return (
        <div className="flex items-center justify-center h-full w-full">
            <Auth>
                { children }
            </Auth>
        </div>
    );
};

export default AuthLayout;