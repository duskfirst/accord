import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ExtendedConversation } from "@/types/extended";
import { Profile } from "@/types/types";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";

interface MessagesHeaderProps {
    profile: Profile;
    conversation: ExtendedConversation;
};

const MessagesHeader = ({ profile, conversation }: MessagesHeaderProps) => {
    return (
        <div className="flex items-center justify-center p-2 font-bold gap-4">
            <Link href={"/profile"}>
                <Avatar>
                    <AvatarImage src={conversation.other.avatar_url || "https://github.com/shadcn.png"} />
                    <AvatarFallback>
                        <CircleUserRound />
                    </AvatarFallback>
                </Avatar>
            </Link>
            {conversation.other.display_name || conversation.other.username}
        </div>
    );
};

export default MessagesHeader;