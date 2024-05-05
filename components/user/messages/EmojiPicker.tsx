"use client";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Smile } from "lucide-react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

interface EmojiPickerProps {
    inputVal: string;
    setInputVal: (data: string) => void;
};
const EmojiPicker = ({ inputVal, setInputVal }: EmojiPickerProps) => {
    const onEmojiSelect = (e: any) => {
        setInputVal(inputVal + e.native);
    };
    return (
        <Popover>
            <PopoverTrigger className="p-2 ml-2 mr-2"><Smile /></PopoverTrigger>
            <PopoverContent
                side="right"
                className="bg-transparent border-none shadow-nondrop-shadow-none mb-16"
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