"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Conversation, Message as MessageType, Profile } from "@/types/types";
import { CircleUserRound, Download } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import FileDisplay from "@/components/user/messages/FileDisplay";
import MessageOptions from "@/components/user/messages/MessageOptions";
import { Button } from "@/components/ui/button";
import EmojiPicker from "@/components/user/messages/EmojiPicker";

interface MessageProps {
    conversation: Conversation;
    message: MessageType;
    profile: Profile;
    sender: Profile;
};

const Message = ({ sender, conversation, message, profile }: MessageProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [editedValue, setEditedValue] = useState(message.content || "");
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const onSave = () => {
        if (message.content !== editedValue) {
            console.log(editedValue);
        }
        setIsEditing(false);
    };

    const onEdit = () => {
        setIsEditing(true);
        setTimeout(() => {
            textAreaRef.current?.focus();
            textAreaRef.current!.selectionStart = textAreaRef.current!.value.length;
            if (textAreaRef.current) {
                textAreaRef.current!.style.height = "0";
                textAreaRef.current!.style.height = textAreaRef.current!.scrollHeight + "px";
            }
        }, 1);
    };

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current!.style.height = "0";
            textAreaRef.current!.style.height = textAreaRef.current!.scrollHeight + "px";
        }
    }, [textAreaRef.current?.scrollHeight]);

    const onKeyEvent = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        textAreaRef.current!.style.height = "0";
        textAreaRef.current!.style.height = textAreaRef.current!.scrollHeight + "px";

        if (e.key === "Enter" && e.ctrlKey) {
            onSave();
        }
        else if (e.key === "Escape") {
            setIsEditing(false);
        }
    };

    const onDelete = async () => {
        const response = await fetch("/api/socket/io", {
            method: "PUT",
            body: JSON.stringify({
                deleted: true,
                id: message.id,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
    };


    const dateTime = (new Date(message.sent_at)).toLocaleString().split(",");
    return (
        <div className="flex px-4 my-2 w-full hover:bg-accent">
            <div className="flex flex-col items-center justify-start p-2">
                <Link href={`/ ${sender.username}`} className="cursor-pointer">
                    <Avatar>
                        <AvatarImage src={sender.avatar_url || "https://github.com/shadcn.png"} />
                        <AvatarFallback>
                            <CircleUserRound />
                        </AvatarFallback>
                    </Avatar>
                </Link>
            </div>
            <div className="text-start mb-1 flex flex-col p-1 w-full text-gray-100">
                <div className="flex min-w-fit justify-start gap-4 items-baseline w-full">
                    <span className="font-bold text-md align-middle text-start">
                        {sender.display_name || sender.username}
                    </span>
                    <span className="text-slate-300 min-w-20 text-wrap text-xs mt-2">

                        {dateTime[1] + " " + dateTime[0]}
                    </span>
                    {
                        !isEditing &&
                        <div className="self-end flex gap-4 flex-grow justify-end">
                            {
                                message.deleted || message.sent_by === profile.id && <MessageOptions file_url={message.file_url} onDelete={onDelete} onEdit={onEdit} />
                            }
                        </div>
                    }
                </div>
                {
                    message.file_url && message.file_type &&
                    <FileDisplay file_url={message.file_url} file_type={message.file_type} />
                }
                {
                    !isEditing && !message.file_url &&
                    <div className="text-wrap whitespace-pre-line text-sm">
                        <p className={message.deleted ? "italic text-gray-300" : ""}>
                            {message.content}
                        </p>
                        {
                            message.deleted || message.edited &&
                            <span className="text-slate-300 w-fit text-xs mx-2">
                                Edited
                            </span>
                        }
                    </div>
                }
                {
                    isEditing &&
                    <div className="flex flex-col items-center text-sm gap-2">
                        <div className="flex w-full bg-background rounded-md">
                            <textarea
                                rows={1}
                                onKeyDown={(e) => onKeyEvent(e)}
                                ref={textAreaRef}
                                onChange={(event) => setEditedValue(event.target.value)}
                                value={editedValue}
                                className="resize-none w-full auto-rows-auto bg-background rounded-lg p-2 flex justify-center focus:outline-none"

                            />
                            <EmojiPicker inputVal={editedValue} setInputVal={setEditedValue} />
                        </div>
                        <div className="grid grid-cols-2 gap-4 self-start">
                            <Button
                                className="h-fit font-semibold py-1 w-full border-2 border-primary"
                                onClick={onSave}>
                                Save
                            </Button>
                            <Button
                                variant={"destructive"}
                                className="h-fit w-full py-1 font-semibold border-2 border-destructive hover:bg-transparent"
                                onClick={() => setIsEditing(false)}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                }
            </div>
        </div >
    );

};

export default Message;