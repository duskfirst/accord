"use client";
import { signout } from "@/app/(auth)/signout/signout";
import { LogOut, CircleUserRound } from "lucide-react";
import Link from "next/link";


const Sidenav = () => {

    return (
        <div className="flex flex-col w-8 h-full justify-between items-center p-2">
            <div>Logo</div>
            <div className="flex flex-col gap-3 justify-between items-center">
                <Link href={"/profile"} className="rounded-sm hover:bg-zinc-600">
                    <CircleUserRound />
                </Link>
                <LogOut
                    className="hover:bg-zinc-600 rounded-sm"
                    onClick={signout}
                />
            </div>
        </div>
    );
};

export default Sidenav;
