import { Button } from "@/components/ui/button";

import Link from "next/link";


const Home = () => {
    return (
        <div className="flex w-full items-center justify-center h-full flex-col gap-16">
            <div className="font-extrabold text-3xl">HOME</div>
            <div className="gap-20 flex">
                <Button className="w-32">
                    <Link href={"/login"} >Login</Link>
                </Button>
                <Button className="w-32">
                    <Link href={"/register"} >Register</Link>
                </Button>
            </div>
        </div>
    );
};
export default Home;