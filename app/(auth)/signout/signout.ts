"use server";

import { createServerClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";


export const signout = async () => {

    const supabase = createServerClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        await supabase.auth.signOut();
    }

    redirect("/");

};
