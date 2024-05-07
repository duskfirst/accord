import { useSocket } from "@/components/providers/socket-provider";
import { Message } from "@/types/types";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";


export const useUpsertSocket = (idKey: string, queryKey: string) => {
    
    const { socket } = useSocket();
    const queryClient = useQueryClient();

    const insertKey = `${queryKey}|${idKey}|insert`;
    const updateKey = `${queryKey}|${idKey}|update`;

    useEffect(() => {
        if (!socket)
            return;
        socket.on(updateKey, (message: Message) => {
            queryClient.setQueryData([idKey, queryKey], (oldData: any) => {
                if (!oldData?.pages?.length) {
                    return oldData;
                }
                const newData = oldData.pages.map((page: any) => {
                    return {
                        ...page,
                        data: page.data.map((item: Message) => item.id === message.id ? message : item)
                    };
                });
                return {
                    ...oldData,
                    pages: newData,
                };
            });
        });
        return () => {
            socket.off(updateKey);
            socket.off(insertKey);
        };
    }, [socket, idKey, queryKey, queryClient]); // eslint-disable-line react-hooks/exhaustive-deps

};