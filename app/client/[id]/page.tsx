"use client"
import Chats from "@/components/Chats";
import FriendList from "@/components/FriendList";
import SideButton from "@/components/SideButton";
import Sidenav from "@/components/Sidenav";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

const Client = () => {
  const [sideOpen, setSideOpen] = useState(false);
  const [buttonClassname, setButtonClassname] = useState('self-start');
  const [sideTabsClassName, setSideTabsClassName] = useState('-translate-x-full collapse hidden');

  return (

    <div className="flex h-full w-full">
      {window.screen.availWidth <= 640 &&
        <Sheet key={"left"} >
          <SheetTrigger asChild>
            {window.screen.availWidth <= 640 &&
              <Button variant="outline" className={""}><ChevronRight /></Button>
            }
          </SheetTrigger>
          <SheetContent side={"left"} className="w-screen">
          </SheetContent>
        </Sheet>
      }      <div className="sm:flex border p-1 sm:w-1/3 sm:visible hidden">
        <Sidenav className="border flex items-center justify-center h-full" />
        <FriendList className="border flex items-center justify-center w-4/12 h-full" />
      </div>
      <div className="border flex items-center w-full sm:w-2/3 justify-center flex-grow h-full" >
        <Chats onClick={() => console.log(1)} buttonClassname={buttonClassname} sideOpen={sideOpen} />
      </div>
    </ div >
  )
};
export default Client;