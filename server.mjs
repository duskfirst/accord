import { createServer } from "node:http";
import { Server } from "socket.io";

import next from "next";
import bodyParser from "body-parser";

import { createServerClient } from "./server/utils/supabase.mjs";
import { updateMessage } from "./server/message/update.mjs";
import { insertMessage } from "./server/message/insert.mjs";


const dev = process.env.NODE_ENV?.trim() !== "production";
const hostname = process.env.HOST || "localhost";
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();


let io = null;
const socket_user = new Map();
const user_socket = new Map();



async function customerHandler(req, res, parsedUrl) {
    if (req.url === "/api/socket/io") {
        const supabase = createServerClient({ req, res }, {
            url: process.env.NEXT_PUBLIC_SUPABASE_URL,
            anon_key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        });
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            res.writeHead(401);
            res.write("Unauthorized");
            res.end();
            return;
        }
        const jsonParser  = bodyParser.json();
        switch (req.method) {
            case "PUT":
                jsonParser(req, res, () => updateMessage(req, res, user, supabase, io, user_socket));
                return;
            case "POST":
                jsonParser(req, res, () => insertMessage(req, res, user, supabase, io, user_socket));
                return;
        }
        res.writeHead(405);
        res.write("Method not allowed");
        res.end();
    } else {
        handler(req, res, parsedUrl);
    }
}

app.prepare().then(() => {
    const httpServer = createServer(customerHandler);
    io = new Server(httpServer);
    io.engine.use(async (req, res, next) => {
        const supabase = createServerClient({ req, res }, {
            url: process.env.NEXT_PUBLIC_SUPABASE_URL,
            anon_key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        });
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            req._query.userId = user.id;
            next();
        } else {
            next(new Error("Unauthorized"));
        }
    });
    io.on("connection", (socket) => {
        user_socket.set(socket.handshake.query.userId, socket.id);
        socket_user.set(socket.id, socket.handshake.query.userId);
        socket.on("disconnect", (reason) => {
            const socketId = socket.id;
            const userId = socket_user[socketId];
            user_socket.delete(userId);
            socket_user.delete(socketId);
        })
    });
    httpServer
        .once("error", (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`);
        });
});
