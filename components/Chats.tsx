import ListItem from "@/components/ListItems";
import { Conversation, Message } from "@/types/types";
import MessageInput from "./MessageInput";
import SidePop from "./SidePop";
import { useEffect, useRef, useState } from "react";
import EmojiPicker, { EmojiStyle, SuggestionMode, Theme } from "emoji-picker-react";
import { Import, User } from "lucide-react";
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
        },
        {
            "sender": "Alice",
            "receiver": "Ethan",
            "time": new Date(2024, 3, 22, 10, 18), // April 22, 2024, 10:18 AM
            "text": "Hey Ethan, what's up?",
            "id": "11"
        },
        {
            "sender": "Ethan",
            "receiver": "Alice",
            "time": new Date(2024, 3, 22, 10, 19), // April 22, 2024, 10:19 AM
            "text": "Hi Alice, not much. Just chilling. How about you?",
            "id": "12"
        },
        {
            "sender": "Alice",
            "receiver": "Ethan",
            "time": new Date(2024, 3, 22, 10, 20), // April 22, 2024, 10:20 AM
            "text": "Same here, just relaxing after a long day. Did anything interesting happen lately?",
            "id": "13"
        },
        {
            "sender": "Alice",
            "receiver": "Max",
            "time": new Date(),
            "text": "By the way, have you seen the new movie that came out?",
            "id": "21"
        },
        {
            "sender": "Max",
            "receiver": "Alice",
            "time": new Date(),
            "text": "Not yet, but I heard it's really good. We should watch it together!",
            "id": "22"
        },
        {
            "sender": "Alice",
            "receiver": "Max",
            "time": new Date(),
            "text": "That sounds like a plan. Let's check the showtimes and go this weekend.",
            "id": "23"
        },
        {
            "sender": "Max",
            "receiver": "Alice",
            "time": new Date(),
            "text": "Great idea! I'll look it up and let you know.",
            "id": "24"
        },
        {
            "sender": "Alice",
            "receiver": "Max",
            "time": new Date(),
            "text": "Awesome! I'm looking forward to it.",
            "id": "25"
        },
        {
            "sender": "Max",
            "receiver": "Alice",
            "time": new Date(),
            "text": "Me too!",
            "id": "26"
        },
        {
            "sender": "Alice",
            "receiver": "Max",
            "time": new Date(),
            "text": "Hey Max, did you hear about the new restaurant that opened downtown?",
            "id": "27"
        },
        {
            "sender": "Max",
            "receiver": "Alice",
            "time": new Date(),
            "text": "No, I haven't. What's it called?",
            "id": "28"
        },
        {
            "sender": "Alice",
            "receiver": "Max",
            "time": new Date(),
            "text": "It's called 'The Green Leaf'. They serve amazing vegan dishes.",
            "id": "29"
        },
        {
            "sender": "Max",
            "receiver": "Alice",
            "time": new Date(),
            "text": "Sounds interesting! We should definitely try it out sometime.",
            "id": "30"
        },

        // Additional messages for Alice and Ethan
        {
            "sender": "Alice",
            "receiver": "Ethan",
            "time": new Date(),
            "text": "Ethan, have you ever been to that new art gallery downtown?",
            "id": "42"
        },
        {
            "sender": "Ethan",
            "receiver": "Alice",
            "time": new Date(),
            "text": "No, I haven't. Is it worth checking out?",
            "id": "43"
        },
        {
            "sender": "Alice",
            "receiver": "Ethan",
            "time": new Date(),
            "text": "I think so. They have some really cool exhibits. We should go together.",
            "id": "44"
        },
        {
            "sender": "Ethan",
            "receiver": "Alice",
            "time": new Date(),
            "text": "That sounds like a plan. Let's do it this weekend.",
            "id": "45"
        },
        {
            "sender": "Alice",
            "receiver": "Ethan",
            "time": new Date(),
            "text": "Great! I'll check the opening hours and let you know.",
            "id": "46"
        },
        {
            "sender": "Ethan",
            "receiver": "Alice",
            "time": new Date(),
            "text": "Looking forward to it!",
            "id": "47"
        },
        {
            "sender": "Alice",
            "receiver": "Ethan",
            "time": new Date(),
            "text": "Hey Ethan, do you know any good places to eat around here?",
            "id": "48"
        },
        {
            "sender": "Ethan",
            "receiver": "Alice",
            "time": new Date(),
            "text": "Yeah, there's this great Italian restaurant on Elm Street. Their pasta is amazing.",
            "id": "49"
        },
        {
            "sender": "Alice",
            "receiver": "Ethan",
            "time": new Date(),
            "text": "Sounds delicious! Let's go there for dinner sometime.",
            "id": "50"
        },
        {
            "sender": "Ethan",
            "receiver": "Alice",
            "time": new Date(),
            "text": "Sure, I'm up for it.",
            "id": "31"
        }
    ]
};



const Chats = ({ username, setReceiver, receiver }: { receiver: string, username: string, setReceiver: (data: string) => void }) => {

    const [emojiActive, setEmojiActive] = useState(false);
    const listRef = useRef<HTMLLIElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
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
        if (fileVal) {
            onSend(inputVal, receiver, fileVal);
        }
        else {
            onSend(inputVal, receiver);
        }
        setInputVal('');
        setFile(undefined);
        setIsFile(false);
    };

    const onEnterClick = (e: KeyboardEvent) => {
        if (inputVal === '')
            return;
        const key = e?.key;
        if (key === 'Enter' && e?.ctrlKey)
            onClick();
    };

    useEffect(() => {
        listRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, emojiActive, isFile]);

    useEffect(() => {
        setInputVal(inputVal => inputVal + emoji);
        setEmoji('');
    }, [emoji]);

    const onFileChange = (e: any) => {
        if (e.target.files) {
            setInputVal(e.target.files[0]?.name);
            setFile(e.target.files[0]);
            textAreaRef.current?.focus();
        }
    };



    return (
        <div className="h-full w-full flex flex-col p-1 bg-gradient">
            <div className="border m-1 h-12 shrink-0 p-1  grid grid-cols-3 md:flex items-center content-start">

                <SidePop receiver={receiver} setReceiver={setReceiver} className=" md:hidden " />
                <span className="w-full text-center content-center">
                    {username}
                </span>
                <div className="mr-8">
                    <User />
                </div>

            </div>
            <div className="border overflow-auto m-1 h-full text-center" >
                <div className="">
                    <ListItem conversation={messages} user={username} listRef={listRef} receiver={receiver} />
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
                    <input id="fileUpload" type="file" className="w-0 h-0 hover:cursor-pointer" onChange={onFileChange} />
                </div>
            }
            <div className="border m-1 flex flex-col text-center h-fit" >
                <MessageInput
                    textAreaRef={textAreaRef}
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