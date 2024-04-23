"use client";
import { LogOut, CircleUserRound } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const Sidenav = () => {
  return (
    <div className="flex flex-col w-8 h-screen justify-between items-center p-3">
      <div>Logo</div>
      <div className="flex flex-col gap-3 justify-between items-center">
        <Link href={`/profile`} className="rounded-sm hover:bg-zinc-600">
          <CircleUserRound />
        </Link>
        <LogOut
          className="hover:bg-zinc-600 rounded-sm"
          onClick={() => {
            alert("Logged out");
          }}
        />
      </div>
    </div>
  );
};

export default Sidenav;
