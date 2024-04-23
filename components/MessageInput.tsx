"use client";
import { File, SendHorizontal, Smile, X } from "lucide-react";
import { Button } from "./ui/button";

interface Props {
    onClick: () => void,
    onEnterClick: (e: any) => void,
    emojiActive: boolean,
    setEmojiActive: (emojiActive: boolean) => void,
    inputVal: string,
    setInputVal: (data: string) => void;
    isFile: boolean,
    setFile: (fileActive: boolean) => void,
}

const MessageInput = ({ onClick, onEnterClick, inputVal, setInputVal, emojiActive, setEmojiActive, isFile, setFile }: Props) => {


    const onEmojiOpen = () => {
        setEmojiActive((emojiActive && !true || !emojiActive && true));
    };

    const onFileOpen = () => {
        setFile((isFile && !true || !isFile && true));
    };

    return (
        <>
            <div className="h-full w-full p-2 pl-2 pr-2 flex items-center justify-center content-center">

                <Button variant={"ghost"} onClick={onFileOpen} className="rounded-sm w-fit p-2">{isFile ? <X /> : <File />}</Button>
                <Button variant={"ghost"} onClick={onEmojiOpen} className="rounded-full w-fit p-2">{emojiActive ? <X /> : <Smile />}</Button>

                <textarea
                    id="message"
                    name="message"
                    placeholder="Enter Message"
                    onChange={(event) => setInputVal(event.target.value)}
                    value={inputVal}
                    onKeyDown={(e) => onEnterClick(e)}
                    className="resize-none max-h-10 w-full bg-transparent rounded-lg  p-2 flex justify-center focus:outline-none"
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
        </>
    );
};
export default MessageInput;
