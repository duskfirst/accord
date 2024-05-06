"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Conversation, Message as MessageType, Profile } from "@/types/types";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import FileDisplay from "./FileDisplay";
import { IoIosMore } from "react-icons/io";
import UpdateMessage from "./UpdateMessage";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
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
    const [editedValue, setEditedValue] = useState(message.content ? message.content : "");

    const onSave = () => {
        if (message.content !== editedValue) {
            console.log(editedValue);
        }
        setIsEditing(false);
    };

    const onEdit = () => {

        setIsEditing(true);

    };


    const onDelete = () => {
        console.log("delete ", message.content);
    };


    if (message.deleted) return null;

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
                        {message.sent_at}
                    </span>
                    {
                        !isEditing &&
                        <div className="self-end flex flex-grow justify-end">
                            <UpdateMessage onDelete={onDelete} onEdit={onEdit} />
                        </div>
                    }
                </div>
                {
                    message.file_url &&
                    <FileDisplay file_url={message.file_url} file_type={"images/png"} />
                }
                {
                    !isEditing && !message.file_url &&
                    <div className="text-wrap whitespace-pre-line text-sm">
                        {message.content}
                        {
                            message.edited &&
                            < span className="text-slate-300 w-fit text-xs mx-2">
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
                        <Button className="h-fit font-semibold" onClick={onSave}>Save</Button>
                    </div>
                }

            </div>
        </div >
    );

};

export default Message;