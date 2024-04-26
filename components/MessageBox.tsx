import { Message } from "@/types/types";
import Image from "next/image";
import FileDisplay from "./FileDisplay";
interface Props {
    msg: Message,
    user: string,
}
const MessageBox = ({ msg, user }: Props) => {

    const date = new Date();
    console.log(msg.file);
    return (
        <div className={msg.sender == user ? "flex flex-col text-background overflow-hidden m-2 rounded-l-lg rounded-bl-none" : "flex flex-col m-2 text-background overflow-hidden rounded-r-lg rounded-br-none"} >

            < div className={msg.sender == user ? "bg-accent flex items-start p-2 ps-3 min-w-12 gap-2 rounded-t-lg rounded-bl-lg" : "bg-accent items-start flex gap-2 p-2 ps-3 min-w-12 rounded-t-lg rounded-br-lg"}>
                <div>
                    <Image src={"https://via.placeholder.com/150"} width={40} height={40} className="rounded-full" alt={""} />
                </div>
                <div className="text-start text-foreground mb-1 flex flex-col  max-w-lg">
                    <span className="font-bold text-start">
                        {msg.sender == user ? "You" : msg.sender}
                    </span>
                    <div className="text-wrap whitespace-pre-line p-1">
                        {msg.file === undefined ? msg.text : <FileDisplay file={msg.file} />}
                    </div>
                    <span className="w-full text-end text-xs mt-2">
                        {date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + "\t" + date.getHours() + ":" + date.getMinutes()}
                    </span>
                </div >
            </div>
            {
                <div className="bg-accent h-5">
                    <div className={msg.sender == user ? "bg-background w-full h-full rounded-tr-full " : "bg-background w-full h-full rounded-tl-full"}>
                    </div>
                </div>
            }
        </ div >
    );
};
export default MessageBox;