"use client";

import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import Conversation from "@/components/user/conversations/Conversation";

import { ExtendedConversation } from "@/types/extended";


interface ConversationsBodyProps {
    conversations: ExtendedConversation[];
};

const ConversationsBody = ({ conversations } : ConversationsBodyProps) => {
    return (
        <Command className="bg-transparent">
            <CommandInput placeholder="Find a conversation"/>
            <CommandEmpty>
                No results found
            </CommandEmpty>
            <CommandList  className="bg-transparent opacity-100 mt-2 max-h-full">
                {
                    conversations.map(conversation => (
                        <CommandItem key={conversation.id} className="bg-transparent opacity-100 data-[disabled]:opacity-100 aria-selected:bg-transparent data-[disabled]:pointer-events-auto">
                            <Conversation conversation={conversation} />
                        </CommandItem>
                    ))
                }
            </CommandList>
        </Command>
    );
};

export default ConversationsBody;