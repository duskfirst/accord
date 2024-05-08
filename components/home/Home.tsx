import Image from "next/image";
import Link from "next/link";
import logo from "@/public/Home.png";

import "./Home.css";


const Home = () => {
    return (
        <div className="body w-full h-full">
            <div className="Home">
                <header className="App-header">
                    <div className="wave"></div>
                    <div className="wave"></div>
                    <div className="wave"></div>
                    <Image src={logo} alt="Logo" className="App-logo" />
                    <h1 className="App-heading uppercase">Accord</h1>
                    <div className="App-link flex gap-4 text-md">
                        <Link href="/login" className="hover:underline">
                            Login
                        </Link>
                        <Link href="/register" className="hover:underline">
                            Register
                        </Link>
                    </div>
                </header>
            </div>
        </div>
    );
};
export default Home;
