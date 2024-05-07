"use client";
import { useMessagesQuery } from "@/hooks/use-messages-query";
import { ExtendedConversation } from "@/types/extended";
import { Profile } from "@/types/types";
import Message from "@/components/user/messages/Message";
import { Fragment } from "react";
import { Loader } from "lucide-react";
import { useUpsertSocket } from "@/hooks/use-upsert-socket";


interface MessagesBodyProps {
    profile: Profile;
    conversation: ExtendedConversation;
};

const MessagesBody = ({ profile, conversation }: MessagesBodyProps) => {

    const idKey = conversation.id;
    const queryKey = "conversation";

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isFetching
    } = useMessagesQuery(idKey, queryKey);

    useUpsertSocket(idKey, queryKey);

    if (!data?.pages.length) {
        return (
            <div className="flex flex-col items-center gap-4 justify-center h-full w-full">
                <Loader className="h-7 w-7 text-zinc-500 animate-spin" />
                Conversation between {profile.username} and {conversation.other.username}
            </div>
        );

    }

    return (
        <>
            <div className="flex flex-col overflow-y-auto items-center h-full">
                <div className="flex-1" />
                {hasNextPage && (
                    isFetchingNextPage || isFetching ?
                        <Loader className="h-6 w-6 text-zinc-500 animate-spin my-4" />
                        :
                        <button
                            onClick={() => hasNextPage && !isFetchingNextPage && !isFetching && fetchNextPage()}
                            className="text-zinc-500 mt-6 hover:text-foreground text-md"
                        >
                            Load More Messages...
                        </button>
                )}
                <div className="flex flex-col-reverse items-center w-full mt-auto" >
                    {
                        data.pages.map((page, index) => (
                            <Fragment key={index}>
                                {
                                    page.data.map((message, index) => (
                                        <Message
                                            key={message.id}
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
                <div />
            </div >
        </>

    );

};

export default MessagesBody;