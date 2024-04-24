"use server";

import { redirect } from 'next/navigation';
import { OTPSchema } from './OTPSchema';
import { createServerClient } from '@/utils/supabase/server';


export const validateOTP = async ({ pin } : OTPSchema, email: string) => {
    const supabase  = createServerClient();
    console.log(pin, email);
    const { 
        data, error 
    } = await supabase.auth.verifyOtp({
        email, token: pin, type: "email",
    });
    console.log(error, data);
    if (!error) {
        redirect("/");
    }
    return error;
};