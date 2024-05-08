"use client";
import { Button } from "@/components/ui/button";
import { ExtendedConversation } from "@/types/extended";
import { Profile } from "@/types/types";
import { CircleX, Loader, SendHorizontal } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import FileInput from "./FileInput";
import EmojiPicker from "./EmojiPicker";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { createBrowserClient } from "@/utils/supabase/client";
import { v4 as uuidv4 } from "uuid";


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
    const [wait, setWait] = useState(false);

    const onClick = async () => {
        setWait(true);
        const finalContent = inputVal.trim();
        setInputVal("");
        const supabase = createBrowserClient();
        let path = "";
        if (file) {
            const fileExt = file.name.split(".").pop();
            const fileId = uuidv4() + "." + fileExt;
            const { data, error } = await supabase
                .storage
                .from("media")
                .upload(fileId, file, {
                    cacheControl: "3600",
                    upsert: false
                });
            const { data: { publicUrl } } = await supabase
                .storage
                .from("media")
                .getPublicUrl(fileId);
            path = publicUrl;
        }
        if (path || finalContent) {
            const response = await fetch("/api/socket/io", {
                method: "POST",
                body: JSON.stringify({
                    content: finalContent,
                    file_url: path,
                    file_type: file?.type || null,
                    conversation: conversation.id,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            clearFile();
        }
        setWait(false);
    };


    const changeTextAreaHeight = () => {
        if (textAreaRef.current) {
            textAreaRef.current!.style.height = "0";
            textAreaRef.current!.style.height = textAreaRef.current!.scrollHeight + "px";
        }
    };

    const keyboardSend = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        changeTextAreaHeight();
        if (inputVal === "")
            return;
        const key = e?.key;
        if (key === "Enter" && e?.ctrlKey)
            onClick();
        else if (key === "Enter") {
            textAreaRef.current?.focus();
        }
    };
    useEffect(() => {
        changeTextAreaHeight();
    }, [textAreaRef.current?.scrollHeight]);


    const setFileData = (fileData: File) => {
        setFile(fileData);
        setFileUrl(URL.createObjectURL(fileData));
        setFileType(fileData.type);
        fileDialogueRef.current?.click();
        textAreaRef.current?.focus();
    };

    const clearFile = () => {
        setFileUrl("");
        setFileType("");
        setFile(undefined);
    };

    return (
        <div className="w-full flex flex-col">
            <span className="w-full flex pl-8 text-gray-300 italic">
                {fileUrl &&
                    <span className="flex gap-2 items-center">
                        {file!.name!}
                        <CircleX size={16} className="cursor-pointer" onClick={clearFile} />
                    </span>
                }
            </span>
            <div className="mb-1 w-full p-2 pl-2 pr-2 flex items-center justify-center content-center">
                <FileInput buttonRef={fileDialogueRef} setFileData={setFileData} />
                <textarea
                    ref={textAreaRef}
                    id="message"
                    name="message"
                    placeholder="Enter Message"
                    onChange={(e) => setInputVal(e.target.value)}
                    value={inputVal}
                    onKeyDown={(e) => keyboardSend(e)}
                    className="resize-none h-11 max-h-40 w-full bg-transparent rounded-lg  p-2 flex justify-center focus:outline-none"
                />

                <EmojiPicker textAreaRef={textAreaRef} setInputVal={setInputVal} inputVal={inputVal} />

                <Button
                    type="submit"
                    disabled={inputVal === "" && !file}
                    onClick={onClick}
                    className="flex items-center hover:text-ring hover:border-primary border-2  justify-center rounded-md"
                >
                    { wait ? <Loader className="animate-spin" /> : <SendHorizontal /> }
                </Button>
            </div>
        </div>
    );
};
export default MessageFooter;