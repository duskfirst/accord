"use client";
import { _Message } from "@/types/types";
import Image from "next/image";
import FileDisplay from "./FileDisplay";
import { useRef, useState } from "react";
import { Pencil, Save, Trash2 } from "lucide-react";
import { Input } from "./ui/input";

interface Props {
    msg: _Message,
    user: string,
    onDelete: (msg: _Message) => void;
    onEdit: (msg: _Message, newText: string) => void;
}

const EditableCheck = (msgDate: Date) => {
    const msPerDay = 24 * 60 * 60 * 1000;
    return (new Date().getTime() - msgDate.getTime()) / msPerDay < 4;
};

const MessageBox = ({ msg, user, onDelete, onEdit }: Props) => {
    const [isEdit, setEdit] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    let msgAlter = true;
    if (!EditableCheck(msg.time))
        msgAlter = false;

    const onSave = () => {
        setEdit(false);
        if (inputRef.current?.value && (msg.text !== inputRef?.current?.value))
            onEdit(msg, inputRef?.current?.value);
    };
    const onEdited = () => {
        setEdit(true);
        console.log("Edit");
    };

    const onDeleted = () => {
        onDelete(msg);
    };

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
                        {msg.time.toDateString()}
                    </span>
                    {msgAlter && <div className="self-end flex-grow flex justify-end">
                        {!msg.file && <button className="h-fit hover:bg-primary p-1 rounded-md w-fit" onClick={!isEdit ? onEdited : onSave}>{!isEdit ? <Pencil className="h-4 md:h-5" /> : <Save className="h-4 md:h-5" />}</button>}
                        <button className="h-fit hover:bg-destructive p-1 rounded-md w-fit" onClick={onDeleted}><Trash2 className="h-4 md:h-5" /></button>
                    </div>}
                </div>
                {!isEdit ?
                    <div className="text-wrap whitespace-pre-line">
                        {msg.file ? <FileDisplay file={msg.file} /> : msg.text}
                    </div>
                    :
                    <div>
                        <Input type="text" className="bg-background" ref={inputRef} defaultValue={msg.text}></Input>
                    </div>
                }
            </div >
        </div>
    );
};
export default MessageBox;