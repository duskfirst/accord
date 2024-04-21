"use client"
import Chats from "@/components/Chats";
import FriendList from "@/components/FriendList";
import Sidenav from "@/components/Sidenav";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useState } from "react";

const Client = () => {
  const [sideOpen, setSideOpen] = useState(false);
  const [buttonClassname, setButtonClassname] = useState('self-start');
  const [sideTabsClassName, setSideTabsClassName] = useState('-translate-x-full collapse hidden');

  return (
    <>
      <ResizablePanelGroup
        direction="horizontal"
        className="border h-full w-full hidden md:flex md:visible md:transform-none"
      >
        <ResizablePanel defaultSize={25} className="md:w-1/3 md:visible hidden md:flex">
          <Sidenav className="border flex items-center justify-center h-full" />
          <FriendList className="border flex items-center justify-center w-4/12 h-full" />
        </ResizablePanel>
        <ResizableHandle className=" justify-center w-0.5 hidden h-full border md:flex items-center" />
        <ResizablePanel defaultSize={75}>
          <Chats onClick={() => console.log(1)} buttonClassname={buttonClassname} sideOpen={sideOpen} />

        </ResizablePanel>
      </ResizablePanelGroup>
      <div className="flex h-full w-full md:hidden">
        <div className="border flex items-center w-full md:w-2/3 justify-center flex-grow h-full" >
          <Chats onClick={() => console.log(1)} buttonClassname={buttonClassname} sideOpen={sideOpen} />
        </div>
      </ div >
    </>
  )
};
export default Client;