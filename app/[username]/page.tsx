"use client";
import Chats from "@/components/Chats";
import FriendList from "@/components/FriendList";
import Sidenav from "@/components/Sidenav";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";


const Page = ({ params }: { params: { username: string } }) => {
    console.log(params.username);
    return (
        <>
            <ResizablePanelGroup
                direction="horizontal"
                className="h-full w-full border hidden"
            >
                <div className="h-full w-full flex md:hidden">
                    <div className="border flex items-center w-full md:w-2/3 justify-center flex-grow h-full" >
                        <Chats username={params.username} />
                    </div>
                </ div >
                <ResizablePanel defaultSize={25} className="md:w-1/3 hidden md:flex">
                    <Sidenav className="border flex items-center  justify-center h-full" />
                    <FriendList className="border flex items-center justify-center w-4/12 h-full" />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={75} className=" h-full justify-center hidden md:flex items-center">
                    <Chats username={params.username} />

                </ResizablePanel>
            </ResizablePanelGroup>
        </>
    );
};
export default Page;