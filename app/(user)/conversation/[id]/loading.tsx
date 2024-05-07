import { Loader2 } from "lucide-react";

const ConversationLoading = () => {

    return (
        <div className="flex flex-col items-center gap-4 justify-center h-full w-full">
            <Loader2 className="h-10 w-10 text-zinc-500 animate-spin" />
            Conversation loading......
        </div>
    );
};
export default ConversationLoading;