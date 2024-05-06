"use client";
import { useMessagesQuery } from "@/hooks/use-messages-query";
import { ExtendedConversation } from "@/types/extended";
import { Profile } from "@/types/types";
import Message from "@/components/user/messages/Message";
import { Fragment, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useChatScroll } from "@/hooks/use-chats-scroll";


interface MessagesBodyProps {
    profile: Profile;
    conversation: ExtendedConversation;
};

const MessagesBody = ({ profile, conversation }: MessagesBodyProps) => {

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isFetching
    } = useMessagesQuery(conversation.id);

    const chatRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    useChatScroll({
        chatRef,
        bottomRef,
        loadMore: fetchNextPage,
        shouldLoadMore: !fetchNextPage && !!hasNextPage,
    });

    if (!data?.pages.length) {
        return (
            <div className="flex flex-col items-center gap-4 justify-center h-full w-full">
                <Loader2 className="h-7 w-7 text-zinc-500 animate-spin" />
                Conversation between {profile.username} and {conversation.other.username}
            </div>
        );

    }

    return (
        <>
            <div id="div" ref={chatRef} className="flex flex-col overflow-auto items-center h-full border-2" >
                {hasNextPage && (
                    isFetchingNextPage ?
                        <Loader2 className="h-6 w-6 text-zinc-500 animate-spin my-4" />
                        :
                        <button onClick={() => hasNextPage && !isFetchingNextPage && !isFetching && fetchNextPage()} className="text-muted hover:text-foreground text-sm">
                            Load More Messages
                        </button>
                )}
                {
                    data.pages.map((page, index) => (
                        <Fragment key={index}>
                            {
                                page.data.map((message, index) => (
                                    <Message
                                        key={index}
                                        sender={message.sent_by === profile.id ? profile : conversation.other}
                                        profile={profile}
                                        conversation={conversation}
                                        message={message}
                                    />
                                ))
                            }
                        </Fragment>
                    ))
                }
            </div >
        </>

    );

};

export default MessagesBody;