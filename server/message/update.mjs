export const updateMessage = async (req, res, user, supabase, io, user_socket) => {
    try {
        
        const updatedMessage = req.body;
        
        if (!updatedMessage?.id) {
            res.writeHead(400);
            throw new Error("Missing Message ID");
        }
        
        const { data: oldMessage } = await supabase
            .from("message")
            .select("*")
            .eq("id", updatedMessage.id)
            .single();

        if (!oldMessage) {
            res.writeHead(404);
            throw new Error("Message not found");
        }

        if (user.id !== oldMessage.sent_by) {
            res.writeHead(401);
            throw new Error("Only senders can update messages")
        }
        
        if (oldMessage.deleted) {
            res.writeHead(400);
            throw new Error("This message has already been deleted");
        }
        
        updatedMessage.file_url = updatedMessage.file_url?.trim();
        updatedMessage.file_type = updatedMessage.file_type?.trim();
        
        if (updatedMessage.file_url && !updatedMessage.file_type || updatedMessage.file_type && !updatedMessage.file_url) {
            res.writeHead(400);
            throw new Error("File URL and file type mismatch");
        }
        
        updatedMessage.content = updatedMessage.content?.trim();
        
        if (!updatedMessage.deleted && !updatedMessage.file_url && !updatedMessage.content) {
            res.writeHead(400);
            throw new Error("Missing content or file");
        }

        const { data: message } = await supabase
            .from("message")
            .update({
                content: updatedMessage.deleted ? "This message has been deleted" : updatedMessage.content,
                deleted: !!updatedMessage.deleted,
                edited: true,
                file_url: updatedMessage.deleted ? null : updatedMessage.file_url,
                file_type: updatedMessage.deleted ? null : updatedMessage.file_type,
            })
            .eq("id", updatedMessage.id)
            .select()
            .single();
        
        if (!message) {
            res.writeHead(500);
            throw new Error("Internal Error");
        }

        const { data: conversation } = await supabase
            .from("conversation")
            .select("one,another")
            .eq("id", oldMessage.conversation)
            .single();
        
        const idKey = oldMessage.conversation;
        const queryKey = "conversation";
        const updateKey = `${queryKey}|${idKey}|update`;
        
        if (conversation) {
            const one = conversation.one;
            const another = conversation.another;
            const oneId = user_socket.get(one);
            const anotherId = user_socket.get(another);
            if (anotherId) {
                io.to(anotherId).emit(updateKey, message);
            }
            if (oneId) {
                io.to(oneId).emit(updateKey, message);
            }
        }

        res.writeHead(200);
        res.write(JSON.stringify(message));
        
    } catch(error) {
        if (res.statusCode === 200)
            res.writeHeader(500);
        res.write(error.message);
    } finally {
        res.end();
    }
};