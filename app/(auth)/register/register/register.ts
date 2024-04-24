"use server";

import { createServerClient } from "@/utils/supabase/server";
import { RegisterSchema } from "./RegisterSchema";
import { redirect } from "next/navigation";


export const register = async (values: RegisterSchema) => {

    const supabase = createServerClient();
    const {
        error
    } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
            data: {
                username: values.username,
            },
        },
    });

    if (!error) {
        redirect("/");
    }

    return error.message ;

};
