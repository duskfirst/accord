"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Conversation, Message as MessageType, Profile } from "@/types/types";
import { CircleUserRound, Download } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import FileDisplay from "@/components/user/messages/FileDisplay";
import UpdateMessage from "@/components/user/messages/UpdateMessage";
import { Button } from "@/components/ui/button";

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

    const onSave = () => {
        if (message.content !== editedValue) {
            console.log(editedValue);
        }
        setIsEditing(false);
    };

    const onEdit = () => {

        setIsEditing(true);

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
        if (response.ok) {
            console.log("success");
        }
    };


    if (message.deleted) return null;
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
                    <span className="font-bold text-lg align-middle text-start">
                        {sender.display_name || sender.username}
                    </span>
                    <span className="text-slate-300 min-w-20 text-wrap text-xs mt-2">

                        {dateTime[1] + " " + dateTime[0]}
                    </span>
                    {
                        !isEditing &&
                        <div className="self-end flex gap-4 flex-grow justify-end">
                            {
                                message.file_url &&
                                <Link href={message.file_url} target="_blank" download className="self-end" >
                                    <Download />
                                </Link>
                            }
                            {
                                message.sent_by === profile.id && <UpdateMessage onDelete={onDelete} onEdit={onEdit} />
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
                        {message.content}
                        {
                            message.edited &&
                            <span className="text-slate-300 w-fit text-xs mx-2">
                                Edited
                            </span>
                        }
                    </div>
                }
                {
                    isEditing &&
                    <div className="flex items-center text-sm gap-2">
                        <textarea
                            onChange={(event) => setEditedValue(event.target.value)}
                            value={editedValue}
                            className="resize-none max-h-12  md:max-h-11 w-full bg-background rounded-lg  p-2 flex justify-center focus:outline-none"
                        />
                        <Button className="h-fit font-semibold border-2 hover:border-primary" onClick={onSave}>Save</Button>
                    </div>
                }
                {
                    message.edited &&
                    <span className="text-zinc-600 w-full text-sm mx-2 text-end">
                        Edited
                    </span>
                }
            </div>
        </div >
    );

};

export default Message;