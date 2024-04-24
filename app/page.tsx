import { createServerClient } from "@/utils/supabase/server";
import Link from "next/link";

const UserPage = () => {
    return (
        <div>
            user page
        </div>
    );
};

const HomePage = () => {
    return (
        <div>
            <div>
                home page
            </div>
            <Link href={"/login"} >Login</Link>
        </div>
    );
};

export default async function Home() {
    const supabase = createServerClient();
    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (user) {
        return <UserPage />;
    } else {
        return <HomePage />;
    }
}
