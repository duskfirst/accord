"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Conversation, Message as MessageType, Profile } from "@/types/types";
import { CircleUserRound, Pencil, Save, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

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

    if (message.deleted) return null;

    return (
        <div className="flex px-4 my-2 w-full hover:bg-accent">
            <div className="flex flex-col items-center justify-start p-2">
                <Link href={`/${sender.username}`} className="cursor-pointer">
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

                    <div className="self-end flex flex-grow justify-end">
                        <button className="h-fit hover:bg-primary p-1 rounded-md w-fit" onClick={() => setIsEditing(!isEditing)}>{isEditing ? <Save className="h-4 md:h-5" /> : <Pencil className="h-4 md:h-5" />} </button>
                        <Dialog>
                            <DialogTrigger className="h-fit hover:bg-destructive p-1 rounded-md w-fit">
                                <Trash2 className="h-4 md:h-5" />
                            </DialogTrigger>
                            <DialogContent className="grid grid-cols-2 gap-4 w-fit min-h-fit  place-items-center">
                                <span className="col-span-2 m-2">
                                    Are you sure you want to delete?
                                </span>
                                <DialogClose className="p-2 bg-destructive pr-4 pl-4 rounded-md active:ring-0 focus:ring-0">
                                    <div className="w-full h-full" >
                                        Yes
                                    </div>
                                </DialogClose>

                                <DialogClose className="p-2 bg-primary pr-4 pl-4 rounded-md active:ring-0 focus:ring-0">
                                    <div className="w-full h-full">
                                        No
                                    </div>
                                </DialogClose>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                {
                    !isEditing ?
                        <div className="text-wrap whitespace-pre-line text-sm">
                            {message.content}
                            {
                                message.edited &&
                                < span className="text-slate-300 w-fit text-xs mx-2">
                                    Edited
                                </span>
                            }
                        </div>
                        :
                        <div className="text-wrap whitespace-pre-line text-sm">
                            <textarea
                                onChange={(event) => setEditedValue(event.target.value)}
                                value={editedValue}

                                className="resize-none max-h-12  md:max-h-11 w-full bg-background rounded-lg  p-2 flex justify-center focus:outline-none"
                            /></div>
                }

            </div>
        </div >
    );

};

export default Message;