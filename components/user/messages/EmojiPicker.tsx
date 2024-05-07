"use client";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Smile } from "lucide-react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import React from "react";

interface EmojiPickerProps {
    inputVal: string;
    setInputVal: (data: string) => void;
    textAreaRef: React.RefObject<HTMLTextAreaElement>;
};
const EmojiPicker = ({ inputVal, setInputVal, textAreaRef }: EmojiPickerProps) => {
    const onEmojiSelect = (e: any) => {
        setInputVal(inputVal + e.native);
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Escape") {
            setTimeout(() => {
                textAreaRef.current?.focus();
            }, 1);
        }
    };
    return (
        <Popover>
            <PopoverTrigger className="p-2 ml-2 mr-2 w-fit h-fit"><Smile /></PopoverTrigger>
            <PopoverContent
                onKeyDown={(e) => onKeyDown(e)}
                side="top"
                className="bg-transparent border-none shadow-nondrop-shadow-none mr-28"
            >
                <Picker
                    data={data}
                    onEmojiSelect={onEmojiSelect}
                />
            </PopoverContent>
        </Popover>
    );
};
export default EmojiPicker;