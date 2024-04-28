"use server";

import { createServerClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";


const AuthLayout = async ({ children } : { children: React.ReactNode }) => {
    const supabase = createServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        redirect("/");
    }
    return (
        <div className="flex items-center justify-center h-full w-full">
            { children }
        </div>
    );
};

export default AuthLayout;