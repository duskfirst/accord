import Image from "next/image";
import chatImage from "@/public/chatImage.png";
const UserPage = () => {

    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <Image src={chatImage} alt={"Image For Chat"} className="w-72 " />
            <span className="text-lg text-zinc-500 font-semibold">
                Click on a Conversation to continue chatting.
            </span>
        </div>
    );
};

export default UserPage;