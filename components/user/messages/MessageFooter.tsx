"use client";
import { Button } from "@/components/ui/button";
import { ExtendedConversation } from "@/types/extended";
import { Profile } from "@/types/types";
import { SendHorizontal } from "lucide-react";
import { useState, useRef } from "react";
import FileInput from "./FileInput";
import EmojiPicker from "./EmojiPicker";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogTrigger } from "@/components/ui/dialog";

interface MessageFooterProps {
    conversation: ExtendedConversation;
    profile: Profile;
};

const MessageFooter = ({ conversation, profile }: MessageFooterProps) => {
    const [inputVal, setInputVal] = useState("");
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const fileDialogueRef = useRef<HTMLButtonElement>(null);
    const [file, setFile] = useState<File>();
    const [fileUrl, setFileUrl] = useState("");
    const [fileType, setFileType] = useState("");

    const onClick = () => {
        console.log(inputVal);
        setInputVal("");
    };

    const keyboardSend = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (inputVal === "")
            return;
        const key = e?.key;
        if (key === "Enter" && e?.ctrlKey)
            onClick();
    };

    const setFileData = (fileData: File) => {
        setFile(fileData);
        console.log(file);
        setFileUrl(URL.createObjectURL(fileData));
        setFileType(fileData.type);
        console.log("setFileData");
        fileDialogueRef.current?.click();
        textAreaRef.current?.focus();
    };

    return (
        <div className="mb-1 w-full p-2 pl-2 pr-2 flex items-center justify-center content-center">
            <FileInput buttonRef={fileDialogueRef} setFileData={setFileData} />
            <textarea
                ref={textAreaRef}
                id="message"
                name="message"
                placeholder="Enter Message"
                onChange={(event) => setInputVal(event.target.value)}
                value={inputVal}
                onKeyDown={(e) => keyboardSend(e)}
                className="resize-none max-h-10 w-full bg-transparent rounded-lg  p-2 flex justify-center focus:outline-none"
            />

            <EmojiPicker setInputVal={setInputVal} inputVal={inputVal} />

            <Button
                type="submit"
                disabled={inputVal === ""}
                onClick={onClick}
                className="flex items-center hover:text-ring hover:border-primary border-2  justify-center rounded-md"
            >
                <SendHorizontal />
            </Button>
        </div>
    );
};
export default MessageFooter;