"use client";
import { LogOut, CircleUserRound } from "lucide-react";
import Link from "next/link";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const Sidenav = () => {
    return (
        <div className="flex flex-col w-8 h-full justify-between items-center p-2">
            <div>Logo</div>
            <div className="flex flex-col gap-3 justify-between items-center">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Link href={`/profile`} className="rounded-sm hover:bg-zinc-600">
                                <CircleUserRound />
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Profile</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger>
                            <LogOut
                                className="hover:bg-zinc-600 rounded-sm"
                                onClick={() => {
                                    alert("Logged out");
                                }}
                            />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Log out</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    );
};

export default Sidenav;
