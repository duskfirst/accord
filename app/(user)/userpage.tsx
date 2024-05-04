"use client";

import { useProfile } from "@/components/providers/profile-provider";


const UserPage = () => {
    
    const [profile] = useProfile()!;
    
    return (
        <div className="flex items-center justify-center flex-col h-full gap-10">
            <span className="text-xl uppercase font-bold text-cyan-300">{ profile.username }</span>
            <div className="grid grid-cols-2 gap-2">
                <span>Email</span>
                <span>{ profile.email }</span>
                <span>Display Name</span>
                <span>{ profile.display_name || "no display name"}</span>
                <span>Id</span>
                <span>{ profile.id }</span>
                <span>website</span>
                <span>{ profile.website || "no website" }</span>
            </div>
            <span className="text-xs">
                Just testing profile provider
            </span>
        </div>
    );
};

export default UserPage;