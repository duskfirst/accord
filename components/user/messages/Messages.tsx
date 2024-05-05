import { ExtendedConversation } from "@/types/extended";
import { Profile } from "@/types/types";
import MessagesHeader from "./MessagesHeader";
import MessagesBody from "./MessagesBody";
import MessageFooter from "./MessageFooter";


interface MessagesProps {
    conversation: ExtendedConversation;
    profile: Profile;
};

const Messages = ({ conversation, profile }: MessagesProps) => {
    return (
        <div className="h-full w-full flex flex-col">
            <MessagesHeader conversation={conversation} profile={profile} />
            <MessagesBody conversation={conversation} profile={profile} />
            <MessageFooter conversation={conversation} profile={profile} />
        </div>
    );
};

export default Messages;