import ListItem from "@/components/ListItem";
import { Conversation, Message } from "@/types/types";
import SideButton from "./SideButton";
import MessageInput from "./MessageInput";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import SidePop from "./SidePop";
import { createRef, useEffect, useState } from "react";

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
}


const Chats = () => {


  const [messages, setMessages] = useState<Message[]>([]);
  useEffect(() => {
    setMessages(convo.conversation)
  }, [])
  const onSend = (msg: string, name: string) => {
    const data: Message = {
      sender: "Alice",
      receiver: name,
      text: msg,
      id: `${messages.length + 1}`
    }
    setMessages([...messages, data])

  }

  return (
    <div className="h-full w-full flex flex-col p-1">
      <div className="border m-1 h-12 shrink-0 p-1  grid grid-cols-3 md:grid-cols-1 content-start">

        <SidePop className=" md:hidden " />
        <span className="w-full text-center content-center">
          Alice
        </span>

      </div>
      <div className="border overflow-auto m-1 h-full text-center">
        <div className="">
          <ListItem conversation={messages} user="Alice" />
        </div>
      </div>
      <div className="border m-1 text-center h-14"><MessageInput onSend={onSend} /></div>
    </div>
  )
};
export default Chats;