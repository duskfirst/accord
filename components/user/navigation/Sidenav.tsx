"use client";
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { LogOut, CircleUserRound } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

import { Profile } from "@/types/types";
import { signout } from "@/app/(auth)/signout/signout";


interface SidenavProps {
    profile: Profile;
};

const Sidenav = ({ profile } : SidenavProps) => {

    return (
        <div className="flex flex-col h-full justify-between items-center p-2">
            <Link href={"/"}>
                <Image
                    width={840}
                    height={840}
                    src={"/nyan-cat.png"}
                    alt="Accord"
                    className="rounded-full w-10 aspect-square"
                />
            </Link>
            <div className="flex flex-col gap-3 justify-between items-center">
                <TooltipProvider delayDuration={0}>
                    <Tooltip>
                        <TooltipTrigger>
                            <Link href={`/${profile.username}`}>
                                <Avatar>
                                    <AvatarImage src={profile.avatar_url || "https://github.com/shadcn.png"} />
                                    <AvatarFallback>
                                        <CircleUserRound />
                                    </AvatarFallback>
                                </Avatar>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={10} className="bg-white text-black font-bold">
                            <div className="p-1">
                                {profile.username}
                            </div>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider delayDuration={0}>
                    <Tooltip>
                        <TooltipTrigger>
                            <div className="w-10 h-10 flex items-center justify-center">
                                <LogOut onClick={() => signout()} />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent side="right" sideOffset={10} className="bg-white text-black font-bold">
                            <div className="p-1">
                                Logout
                            </div>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    );
};

export default Sidenav;
