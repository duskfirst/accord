import ListItem from "@/components/ListItem";
import { Conversation } from "@/types/types";
import SideButton from "./SideButton";
import MessageInput from "./MessageInput";

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
interface Props {
  sideOpen: boolean,
  buttonClassname: string
  onClick: () => void
}


const Chats = ({ sideOpen, buttonClassname, onClick }: Props) => {


  return (
    <div className="h-full w-full flex flex-col p-1">
      <div className="border m-1 h-12 shrink-0 p-1  grid grid-cols-3 content-start">
        {/* <div className="w-fit">
          <SideButton sideOpen={sideOpen} onClick={onClick} buttonClassname={buttonClassname} />
        </div> */}
        <span className="w-full text-center content-center">
          Name
        </span>

      </div>
      <div className="border overflow-auto m-1 h-full text-center">
        <div className="">
          <ListItem conversation={convo.conversation} user="Alice" />
        </div>
      </div>
      <div className="border m-1 text-center h-14"><MessageInput /></div>
    </div>
  )
};
export default Chats;