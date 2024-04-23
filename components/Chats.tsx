import ListItem from "@/components/ListItems";
import { Conversation, Message } from "@/types/types";
import MessageInput from "./MessageInput";
import SidePop from "./SidePop";
import { useEffect, useRef, useState } from "react";
import EmojiPicker, { EmojiStyle, SuggestionMode, Theme } from "emoji-picker-react";
import { Import } from "lucide-react";
import { Label } from "./ui/label";

const convo: Conversation = {
    "conversation": [
        {
            "id": "1",
            "sender": "Alice",
            "receiver": "Bob",
            "text": "Hey Bob, how's it going?"
        },
        {
            "id": "2",
            "sender": "Bob",
            "receiver": "Alice",
            "text": "Hi Alice, I'm doing well, thanks! How about you?"
        },
        {
            "id": "3",
            "sender": "Alice",
            "receiver": "Bob",
            "text": "I'm good too, thanks for asking."
        },
        {
            "id": "4",
            "sender": "Bob",
            "receiver": "Alice",
            "text": "Did you have a chance to look at the new project proposal?"
        },
        {
            "id": "5",
            "sender": "Alice",
            "receiver": "Bob",
            "text": "Yes, I did. It looks promising, but I think we need to revise the budget estimates."
        },
        {
            "id": "6",
            "sender": "Bob",
            "receiver": "Alice",
            "text": "That's a good point. Let's schedule a meeting to discuss it further."
        },
        {
            "id": "7",
            "sender": "Alice",
            "receiver": "Bob",
            "text": "Sure, when works for you?"
        },
        {
            "id": "8",
            "sender": "Bob",
            "receiver": "Alice",
            "text": "How about Thursday afternoon?"
        },
        {
            "id": "9",
            "sender": "Alice",
            "receiver": "Bob",
            "text": "Sounds good, let's do that."
        }
    ]
};



const Chats = ({ username }: { username: string }) => {

    const [emojiActive, setEmojiActive] = useState(false);
    const listRef = useRef<HTMLLIElement>(null);
    const [emoji, setEmoji] = useState('');
    const [messages, setMessages] = useState<Message[]>(convo.conversation);
    const [isFile, setIsFile] = useState(false);
    const [inputVal, setInputVal] = useState('');
    const [fileVal, setFile] = useState<File | undefined>(undefined);


    const onSend = (msg: string, name: string, file?: File) => {
        let data: Message;
        if (!isFile) {

            data = {
                sender: username,
                receiver: name,
                text: msg,
                id: `${messages.length + 1}`
            };
        }
        else {
            data = {
                sender: username,
                receiver: name,
                text: msg,
                id: `${messages.length + 1}`,
                file: file,
            };
        }

        setMessages([...messages, data]);
    };

    const onClick = () => {
        console.log(fileVal);

        if (fileVal === undefined) {

        }

        onSend(inputVal, "Bob");
        setInputVal('');
        setFile(undefined);
    };

    const onEnterClick = (e: KeyboardEvent) => {
        const key = e?.key;
        if (key === 'Enter' && e?.ctrlKey)
            onClick();
    };

    useEffect(() => {
        listRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, emojiActive, isFile]);

    useEffect(() => {
        setInputVal(inputVal + emoji);
        setEmoji('');
    }, [emoji]);

    const onFileChange = (e: any) => {
        if (e.target.files) {
            setInputVal(e.target.files[0]?.name);
            setFile(e.target.files[0]);

        }
    };

    return (
        <div className="h-full w-full flex flex-col p-1">
            <div className="border m-1 h-12 shrink-0 p-1  grid grid-cols-3 md:grid-cols-1 content-start">

                <SidePop className=" md:hidden " />
                <span className="w-full text-center content-center">
                    {username}
                </span>

            </div>
            <div className="border overflow-auto m-1 h-full text-center" >
                <div className="">
                    <ListItem conversation={messages} user={username} listRef={listRef} />
                </div>
            </div>
            {emojiActive &&
                <EmojiPicker width={"100%"}
                    lazyLoadEmojis={true}
                    emojiStyle={EmojiStyle.NATIVE}
                    suggestedEmojisMode={SuggestionMode.FREQUENT}
                    onEmojiClick={(e) => { setEmoji(e.emoji); }}
                    height={"100"}
                    className="transition "
                    theme={Theme.DARK} />
            }
            {isFile &&
                <div className="w-full h-3/4 border border-dashed rounded-md">
                    <Label htmlFor="fileUpload" className="h-full w-full flex flex-col items-center justify-center">
                        <span className="text-xl ">Upload A File</span>
                        <Import className="relative size-40" />
                    </Label>
                    <input id="fileUpload" type="file" className="opacity-0 z-0 hover:cursor-pointer" onChange={onFileChange} />
                </div>
            }
            <div className="border m-1 flex flex-col text-center h-fit" >
                <MessageInput
                    setFile={setIsFile}
                    isFile={isFile}
                    inputVal={inputVal}
                    setInputVal={setInputVal}
                    emojiActive={emojiActive}
                    setEmojiActive={setEmojiActive}
                    onClick={onClick}
                    onEnterClick={onEnterClick}
                />
            </div>
        </div >
    );
};
export default Chats;