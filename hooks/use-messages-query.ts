import { Message } from "@/types/types";
import { createBrowserClient } from "@/utils/supabase/client";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { useInfiniteQuery } from "@tanstack/react-query";


const MESSAGE_COUNT = 5; // TODO: Change it to 20


export const useMessagesQuery = (conversationId: string) => {
    
    const supabase = createBrowserClient();
    
    const fetchMessages = async ({ pageParam = 0 }) => {
        let query = supabase
            .from("message")
            .select("*")
            .eq("conversation", conversationId)
            .limit(MESSAGE_COUNT)
            .order("id", { ascending: false });
        if (pageParam) {
            query = query.lt("id", pageParam);
        }
        const {
            data, error
        } = await query as PostgrestSingleResponse<Message[]>;
        if (error) {
            throw new Error(error.message);
        }
        let nextPage = null;
        if (data.length === MESSAGE_COUNT) {
            nextPage = data[MESSAGE_COUNT - 1].id;
        }
        return { data, nextPage };
    };

    return useInfiniteQuery({
        queryKey: ["messages", conversationId],
        queryFn: fetchMessages,
        getNextPageParam: lastPage => lastPage?.nextPage,
        initialPageParam: 0,
        refetchInterval: 15 * 60 * 1000, // replace this to false once we have socket connection
        refetchOnWindowFocus: false
    });

};