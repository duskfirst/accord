"use server";

import { createServerClient } from "@/utils/supabase/server";
import { RegisterSchema } from "./RegisterSchema";


export const register = async ({ email, password, username }: RegisterSchema) => {

    const supabase = createServerClient();
    const {
        data, error
    } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                username,
            },
        },
    });

    if (!error) {
            {
                const { data, error } = await supabase
                    .from("profiles")
                    .update({ username: null })
                    .eq("username", username);

                if (error) {
                    return error.message;
                }
            }
        const { data, error } = await supabase
            .from("profiles")
            .update({ username })
            .eq("email", email);
        return error?.message;
    }

    return error?.message ;

};
