"use client";
import { Message } from "@/types/types";
import Image from "next/image";
import FileDisplay from "./FileDisplay";
import { useState } from "react";
import { Pencil, Save, Trash2 } from "lucide-react";
import { Input } from "./ui/input";

interface Props {
    msg: Message,
    user: string,
}
const MessageBox = ({ msg, user }: Props) => {
    const [isEdit, setEdit] = useState(false);
    const onSave = () => {
        setEdit(false);
        console.log("save");
    };
    const onEdit = () => {
        setEdit(true);
        console.log("Edit");
    };
    const onDelete = () => {
        console.log("Delete");
    };

    const date = new Date();
    return (
        <div className={"flex items-start p-2 ps-3 min-w-12 gap-2 hover:bg-accent"}>
            <div>
                <Image src={"https://via.placeholder.com/150"} width={35} height={35} className="rounded-full" alt={""} />
            </div>
            <div className="text-start text-foreground mb-1 flex flex-col w-full">
                <div className="flex min-w-fit justify-start gap-4 items-baseline w-full">
                    <span className="font-bold text-md align-middle text-start">
                        {msg.sender == user ? "You" : msg.sender}
                    </span>
                    <span className="text-slate-300 min-w-20 text-wrap text-xs mt-2">
                        {date.toString().substring(0, date.toString().length - 34)}
                    </span>
                    <div className="self-end flex-grow flex justify-end">
                        {!msg.file && <button className="h-fit hover:bg-primary p-1 rounded-md w-fit" onClick={!isEdit ? onEdit : onSave}>{!isEdit ? <Pencil className="h-4 md:h-5" /> : <Save className="h-4 md:h-5" />}</button>}
                        <button className="h-fit hover:bg-destructive p-1 rounded-md w-fit" onClick={onDelete}><Trash2 className="h-4 md:h-5" /></button>
                    </div>
                </div>
                {!isEdit ?
                    <div className="text-wrap whitespace-pre-line">
                        {msg.file ? <FileDisplay file={msg.file} /> : msg.text}
                    </div>
                    :
                    <div>
                        <Input type="text" className="bg-background" defaultValue={msg.text}></Input>
                    </div>
                }
            </div >

        </div>
    );
};
export default MessageBox;