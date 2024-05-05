import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Conversation, Message as MessageType, Profile } from "@/types/types";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";

interface MessageProps {
    conversation: Conversation;
    message: MessageType;
    profile: Profile;
    sender: Profile;
};

const Message = ({ sender, conversation, message, profile } : MessageProps) => {

    return (
        <div className="flex px-4 my-2">
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
            <div className="flex flex-col">
                <div className="flex gap-2 text-sm text-gray-300">
                    <span>
                        { sender.display_name || sender.username }
                    </span>
                    <span>
                        { message.sent_at }
                    </span>
                </div>
                <div className="whitespace-pre">
                    { message.content }
                </div>
            </div>
        </div>
    );

};

export default Message;