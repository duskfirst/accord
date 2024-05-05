import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { ExtendedConversation } from "@/types/extended";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";

interface ConversationProps {
    conversation: ExtendedConversation;
}


const Conversation = ({ conversation } : ConversationProps) => {
    return (
        <div className="flex gap-2 items-center w-full mt-1">
            <Link href={`/${conversation.other.username}`} className="cursor-pointer">
                <Avatar>
                    <AvatarImage src={conversation.other.avatar_url || "https://github.com/shadcn.png"} />
                    <AvatarFallback>
                        <CircleUserRound />
                    </AvatarFallback>
                </Avatar>
            </Link>
            <div className="flex gap-1 flex-col cursor-pointer w-full">
                <span className="text-md font-bold hover:underline">
                    { conversation.other.display_name || conversation.other.username }
                </span>
            </div>
        </div>
    );
};

export default Conversation;