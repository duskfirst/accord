import ListItem from "@/components/ListItem/ListItem";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Conversation } from "@/types/types";

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

const chats = () => {

  return (

    <div className="h-full w-full flex flex-col p-1">
      <div className="border m-1 h-12 shrink-0 text-center">Name</div>
      <div className="border overflow-auto m-1 h-full text-center">
        <div className="">
          <ListItem conversation={convo.conversation} user="Alice" />
        </div>
      </div>
      <div className="border m-1 text-center h-14">Message Box</div>
    </div>
  )
};
export default chats;