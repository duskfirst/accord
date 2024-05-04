"use client";

import { Profile } from "@/types/types";
import { createBrowserClient } from "@/utils/supabase/client";
import { createContext, useContext, useEffect, useState } from "react";


const ProfileContext = createContext<[Profile, React.Dispatch<React.SetStateAction<Profile>>] | null>(null);

export const useProfile = () => {
    return useContext(ProfileContext);
};

export const ProfileProvider = ({
    children
} : {
    children : React.ReactNode
}) => {

    const [profile, setProfile] = useState<Profile>({
        avatar_url: null,
        display_name: null,
        id: null,
        username: null, 
        website: null,
    });

    useEffect(() => {
        const supabase = createBrowserClient();
        const getUser = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (user) {
                const { data, error } = await supabase
                    .from("profile")
                    .select("*")
                    .eq("id", user.id);
                if (!error && data.length) {
                    setProfile(data[0] as Profile);
                }
            }
        };
        getUser();
    }, []);


    return (
        <ProfileContext.Provider value={[profile, setProfile]} >
            { children }
        </ProfileContext.Provider>
    );
};