"use server";

import { redirect } from "next/navigation";
import { OTPSchema } from "./OTPSchema";
import { createServerClient } from "@/utils/supabase/server";


export const validateOTP = async ({ pin } : OTPSchema, email: string) => {
    const supabase  = createServerClient();
    const { 
        error 
    } = await supabase.auth.verifyOtp({
        email, token: pin, type: "email",
    });
    if (!error) {
        redirect("/");
    }
    return error.message;
};