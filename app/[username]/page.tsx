"use client";
import Chats from "@/components/Chats";
import FriendList from "@/components/FriendList";
import Sidenav from "@/components/Sidenav";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useState } from "react";


const Page = ({ params }: { params: { username: string } }) => {
    const [receiver, setReceiver] = useState("Ethan");

    return (
        <>
            <ResizablePanelGroup
                direction="horizontal"
                className="h-full w-full border hidden"
            >
                <div className="h-full w-full flex md:hidden">
                    <div className="border flex items-center w-full md:w-2/3 justify-center flex-grow h-full" >
                        <Chats receiver={receiver} setReceiver={setReceiver} username={params.username} />
                    </div>
                </ div >
                <ResizablePanel defaultSize={25} minSize={15} className="hidden md:flex">
                    <Sidenav className="border flex items-center  justify-center w-1/12 h-full" />
                    <FriendList receiver={receiver} setReceiver={setReceiver} className="border flex items-center justify-center w-11/12 h-full" />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={75} minSize={40} className=" h-full justify-center hidden md:flex items-center">
                    <Chats receiver={receiver} setReceiver={setReceiver} username={params.username} />

                </ResizablePanel>
            </ResizablePanelGroup>
        </>
    );
};
export default Page;