import { ExtendedConversation } from "@/types/extended";
import { Profile } from "@/types/types";


interface MessagesBodyProps {
    profile: Profile;
    conversation: ExtendedConversation;
};

const MessagesBody = ({ profile, conversation }: MessagesBodyProps) => {
    return (
        <div className="flex items-center justify-center h-full w-full">
            Conversation between { profile.username } and { conversation.other.username }
        </div>
    );
};

export default MessagesBody;