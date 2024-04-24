"use server";

import { createServerClient } from "@/utils/supabase/server";
import { LoginSchema } from "./LoginSchema";
import { redirect } from "next/navigation";


export const login = async (values: LoginSchema) => {

    const supabase = createServerClient();
    const {
        data, error
    } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
    });

    if (!error) {
        redirect("/");
    }

    // this case has not been handled yet
    if (error.message === "Email not confirmed") {
        redirect("/register");
    }
    return error.message ;

};
