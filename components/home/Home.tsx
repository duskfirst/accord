import { Button } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";
import logo from "../../public/Home.png";

import "./Home.css";
const Home = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <Image src={logo} alt="Logo" className="App-logo" />
        <h1 className="App-heading">CHAT APP</h1>{" "}
        {/* Moved this line below the image */}
        <div className="App-link flex flex-col gap-1">
          <a href="/login">
            <button className="App-button">LOGIN</button>
          </a>
          <p className="App-text">Not registered yet?</p>
          <a href="/register">
            <button className="App-button">REGISTER</button>
          </a>
        </div>
      </header>
    </div>
  );
};
export default Home;
