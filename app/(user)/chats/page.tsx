"use client";
import Chats from "@/components/chats/Chats";
import Conversations from "@/components/conversations/Conversations";
import Sidenav from "@/components/sidenav/Sidenav";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useState } from "react";

const Page = () => {
    const [receiver, setReceiver] = useState("Ethan");
    const [user, setUser] = useState("Alice");
    return (
        <>
            <ResizablePanelGroup
                direction="horizontal"
                className="h-full w-full"
            >
                <div className="h-full w-full flex md:hidden">
                    <div className="flex items-center w-full md:w-2/3 justify-center flex-grow h-full" >
                        <Chats receiver={receiver} setReceiver={setReceiver} username={user} />
                    </div>
                </ div >
                <ResizablePanel defaultSize={25} minSize={15} className="hidden md:flex">
                    <Sidenav />
                    <Conversations receiver={receiver} setReceiver={setReceiver} className="border flex items-center justify-center w-11/12 h-full" />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={75} minSize={40} className=" h-full justify-center hidden md:flex items-center">
                    <Chats receiver={receiver} setReceiver={setReceiver} username={user} />
                </ResizablePanel>
            </ResizablePanelGroup>
        </>
    );
};
export default Page;
