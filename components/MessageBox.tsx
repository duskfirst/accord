import { Message } from "@/types/types";
import Image from "next/image";
import FileDisplay from "./FileDisplay";
import { useEffect } from "react";
interface Props {
    msg: Message,
    user: string,
}
const MessageBox = ({ msg, user }: Props) => {

    const date = new Date();

    return (
        <div className={"flex items-start p-2 ps-3 min-w-12 gap-2 hover:bg-accent"}>
            <div>
                <Image src={"https://via.placeholder.com/150"} width={35} height={35} className="rounded-full" alt={""} />
            </div>
            <div className="text-start text-foreground mb-1 flex flex-col w-full">
                <div className="flex min-w-fit w-2/3 justify-start gap-4 items-baseline">
                    <span className="font-bold text-md align-middle text-start">
                        {msg.sender == user ? "You" : msg.sender}
                    </span>
                    <span className="text-slate-300 min-w-20 text-wrap text-xs mt-2">
                        {date.toString().substring(0, date.toString().length - 34)}
                    </span>
                </div>
                <div className="text-wrap whitespace-pre-line">
                    {msg.file ? <FileDisplay file={msg.file} /> : msg.text}
                </div>
            </div >
        </div>
    );
};
export default MessageBox;