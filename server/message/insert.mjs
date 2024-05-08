export const insertMessage = async (req, res, user, supabase, io, user_socket) => {
    try {
        
        const message = req.body;

        if (!message.conversation) {
            res.writeHead(400);
            throw new Error("Missing Conversation ID");
        }
        
        const { data: conversation } = await supabase
            .from("conversation")
            .select("one,another")
            .eq("id", message.conversation)
            .single();

        if (!conversation) {
            res.writeHead(404);
            throw new Error("Could not find conversation");
        }

        const one = conversation.one;
        const another = conversation.another;

        if (user.id !== one && user.id !== another) {
            res.writeHead(403);
            throw new Error("User is not a part of the conversation");
        }

        message.file_url = message.file_url?.trim();
        message.file_type = message.file_type?.trim();

        message.content = message.content?.trim();
        
        if (!message.deleted && !message.file_url && !message.content) {
            res.writeHead(400);
            throw new Error("Missing content or file");
        }

        const { data: finalMessage, error } = await supabase
            .from("message")
            .insert({
                content: message.content,
                conversation: message.conversation,
                file_url: message.file_url || null,
                file_type: message.file_type || null,
                sent_by: user.id,
                sent_at: ((new Date()).toISOString()).toLocaleString('zh-TW')
            })
            .select()
            .single();

        if (!finalMessage) {
            res.writeHead(500);
            throw new Error("Internal Error");
        }

        const idKey = finalMessage.conversation;
        const queryKey = "conversation";
        const insertKey = `${queryKey}|${idKey}|insert`;
        
        if (conversation) {
            const oneId = user_socket.get(one);
            const anotherId = user_socket.get(another);
            if (anotherId) {
                io.to(anotherId).emit(insertKey, finalMessage);
            }
            if (oneId) {
                io.to(oneId).emit(insertKey, finalMessage);
            }
        }

        res.writeHead(200);
        res.write(JSON.stringify(finalMessage));

    } catch(error) {
        console.log(error);
        if (res.statusCode === 200)
            res.writeHeader(500);
        res.write(error.message);
    } finally {
        res.end();
    }
};