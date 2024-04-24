"use server";

import { createServerClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Common from "./Common";


const RegisterPage = async () => {
    const supabase = createServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        redirect("/");
    }
    return (
        <Common />
    );
};

export default RegisterPage;