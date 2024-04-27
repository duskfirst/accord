"use server";

import { createServerClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";


export const confirmEmail = async (email: string) => {

    const supabase = createServerClient();
    const {
        error
    } = await supabase.auth.signInWithOtp({
        email,
    });

    if (!error) {
        redirect("/");
    }

    return error.message;

};
