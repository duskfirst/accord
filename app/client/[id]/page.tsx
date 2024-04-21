"use client"
import Chats from "@/components/Chats";
import FriendList from "@/components/FriendList";
import Sidenav from "@/components/Sidenav";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useState } from "react";

const Client = () => {

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
        <ResizableHandle className="md:flex  hidden" />
        <ResizablePanel defaultSize={75} className=" h-full justify-center items-center">
          <Chats />

        </ResizablePanel>
      </ResizablePanelGroup>
      <div className="flex h-full w-full md:hidden">
        <div className="border flex items-center w-full md:w-2/3 justify-center flex-grow h-full" >
          <Chats />
        </div>
      </ div >
    </>
  )
};
export default Client;