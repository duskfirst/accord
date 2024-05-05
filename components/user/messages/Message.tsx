import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Conversation, Message as MessageType, Profile } from "@/types/types";
import { CircleUserRound, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

interface MessageProps {
    conversation: Conversation;
    message: MessageType;
    profile: Profile;
    sender: Profile;
};

const Message = ({ sender, conversation, message, profile }: MessageProps) => {

    return (
        <div className="flex px-4 my-2 w-full hover:bg-accent">
            <div className="flex flex-col items-center justify-start p-2">
                <Link href={`/${sender.username}`} className="cursor-pointer">
                    <Avatar>
                        <AvatarImage src={sender.avatar_url || "https://github.com/shadcn.png"} />
                        <AvatarFallback>
                            <CircleUserRound />
                        </AvatarFallback>
                    </Avatar>
                </Link>
            </div>
            <div className="text-start mb-1 flex flex-col p-1 w-full text-gray-100">
                <div className="flex min-w-fit justify-start gap-4 items-baseline w-full">
                    <span className="font-bold text-lg align-middle text-start">
                        {sender.display_name || sender.username}
                    </span>
                    <span className="text-slate-300 min-w-20 text-wrap text-xs mt-2">
                        {message.sent_at}
                    </span>
                    <div className="self-end flex-grow flex justify-end">
                        {<button className="h-fit hover:bg-primary p-1 rounded-md w-fit" ><Pencil className="h-4 md:h-5" /> </button>}
                        <button className="h-fit hover:bg-destructive p-1 rounded-md w-fit" ><Trash2 className="h-4 md:h-5" /></button>
                    </div>
                </div>
                <div className="text-wrap whitespace-pre-line">
                    {message.content}
                </div>
            </div>
        </div>
    );

};

export default Message;