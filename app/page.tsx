import Sidenav from "@/components/Sidenav";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex">
        <Sidenav />
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          HOME
        </main>
      </div>
    </>
  );
}
