"use server";

import { createServiceClient } from "@/utils/supabase/service-role";

export const checkIfValueTaken = async(field: string, value: string) => {
    if (field !== "username" && field !== "email") {
        throw new Error("Invalid field");
    }
    const supabase = createServiceClient();
    const {
        data, error
    } = await supabase.from("profile").select(field).eq(field, value).not("email_confirmed_at", "is", null);
    return { exists: data ? !!data.length : undefined, error };
};