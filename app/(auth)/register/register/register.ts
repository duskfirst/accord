"use server";

import { RegisterSchema } from "./RegisterSchema";
import { createServiceClient } from "@/utils/supabase/service-role";


export const register = async ({ email, password, username }: RegisterSchema) => {

    const supabase = createServiceClient();
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
                .from("profile")
                .update({ username: null })
                .eq("username", username);

            if (error) {
                return error.message;
            }
        }
        const { data, error } = await supabase
            .from("profile")
            .update({ username })
            .eq("email", email);
        return error?.message;
    }

    return error?.message ;

};
