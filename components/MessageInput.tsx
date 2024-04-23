"use client";
import { SendHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface Props {
    onSend: (msg: string, name: string) => void
}

const MessageInput = ({ onSend }: Props) => {
    const [inputVal, setInputVal] = useState("");
    const onClick = () => {
        onSend(inputVal, "Bob");
        setInputVal("");
    };
    const enterClick = (e: any) => {
        const key = e?.key;
        if (key === 'Enter' && e?.ctrlKey)
            onClick();
    };


    return (
        <div className="h-full w-full p-1 pl-2 pr-2 flex items-center justify-center">
            <textarea
                id="message"
                name="message"
                placeholder="Type Your Message ....."
                onChange={(event) => setInputVal(event.target.value)}
                value={inputVal}
                onKeyDown={(e) => enterClick(e)}
                className="resize-none h-full w-full bg-transparent rounded-lg  p-2  focus:outline-none "
            />
            <Button
                type="submit"
                disabled={inputVal === ""}
                onClick={onClick}
                className="flex items-center hover:text-ring hover:border  justify-center rounded-md"
            >
                <SendHorizontal />
            </Button>
        </div>
    );
};
export default MessageInput;
