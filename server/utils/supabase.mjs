import { createServerClient as createSupabaseServerClient } from "@supabase/ssr";

import cookie from "cookie";


export const createServerClient = (context, { url, anon_key }) => {
    const parsedCookies = cookie.parse(context.req.headers.cookie || "");
    return createSupabaseServerClient(url, anon_key, {
        cookies: {
            get: (key) => {
                const cookie = parsedCookies[key] ?? "";
                return decodeURIComponent(cookie);
            },
            set: (key, value, options) => {
                if (!context.res)
                    return;
                context.res.setHeader("Set-Cookie", cookie.serialize(key, value, {
                    ...options,
                    httpOnly: true,
                    sameSite: "Lax",
                }));
            },
            remove: (key, options) => {
                if (!context.res)
                    return;
                context.res.setHeader("Set-Cookie", cookie.serialize(key, value, {
                    ...options,
                    expires: new Date(0),
                    httpOnly: true,
                }));
            },
        },
    });
};
