import { createServer } from "node:http";
import { Server } from "socket.io";

import next from "next";


const dev = process.env.NODE_ENV?.trim() !== "production";
const hostname = process.env.HOST || "localhost";
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

import { createServerClient } from "./server/utils/supabase.mjs";

let io = null;

async function customerHandler(req, res, parsedUrl) {
    if (req.url === '/api/socket/io') {
        const supabase = createServerClient({ req, res }, {
            url: process.env.NEXT_PUBLIC_SUPABASE_URL,
            anon_key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        });
        const { data: { user } } = await supabase.auth.getUser();
    }
    handler(req, res, parsedUrl);
}

app.prepare().then(() => {
    const httpServer = createServer(customerHandler);
    io = new Server(httpServer);
    io.on("connection", (socket) => {
        console.log(socket.id);
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
