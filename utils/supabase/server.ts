import { createServerClient as supabaseClient } from '@supabase/ssr';
import { cookies } from 'next/headers';


export function createServerClient() {

    const cookieStore = cookies();

    // Create a server's supabase client with newly configured cookie,
    // which could be used to maintain user's session
    return supabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value;
                },
                set(name, value, options) {
                    try {
                        cookieStore.set({ name, value, ...options });
                    } catch (error) {
                        console.error(error);
                    }
                },
                remove(name, options) {
                    try {
                        cookieStore.set({ name, value: '', ...options });
                    } catch (error) {
                        console.error(error);
                    }
                },
            },
        }
    );
}