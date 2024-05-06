import { useEffect, useState } from "react";

type ChatScrollProps = {
    chatRef: React.RefObject<HTMLDivElement>;
    bottomRef: React.RefObject<HTMLDivElement>;
    shouldLoadMore: boolean;
    loadMore: () => void;
};


export const useChatScroll = (
    {
        chatRef,
        bottomRef,
        shouldLoadMore,
        loadMore
    }: ChatScrollProps
) => {
    const [hasInintialized, setHasInintialized] = useState(false);

    useEffect(() => {
        console.log("ok");
        const topDiv = chatRef?.current;
        const handleScroll = () => {
            const scrollTop = topDiv?.scrollTop;
            console.log("scrolled");
            if (scrollTop === 0 && shouldLoadMore) {
                loadMore();
            }
        };
        topDiv?.addEventListener("scroll", handleScroll);
        return () => {
            topDiv?.removeEventListener("scroll", handleScroll);
        };
    }, [shouldLoadMore, loadMore, chatRef]);


    useEffect(() => {
        const bottomDiv = bottomRef?.current;
        const topDiv = chatRef?.current;

        const shouldAutoScroll = () => {
            if (!hasInintialized && bottomDiv) {
                setHasInintialized(true);
                return true;
            }

            if (!topDiv) {
                return false;
            }
            const distanceFromBottom = topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight;
            console.log(distanceFromBottom);
            return distanceFromBottom <= 100;
        };

        if (shouldAutoScroll()) {
            setTimeout(() => {
                bottomRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }
    }, [bottomRef, chatRef, hasInintialized]);
};
