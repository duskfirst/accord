import { Message } from "@/types/types";
import { Card, CardContent, CardHeader } from "./ui/card";
import MessageBox from "./ChatBox";

interface Props {
  conversation: Message[],
  user: string,
}
const ListItem = ({ conversation, user }: Props) => {

  return (
    <ul className="p-2 flex flex-col justify-end h-full">
      {
        conversation.map((convo: Message) =>
          <li className={convo.sender == user ? "text-left self-end m-2 w-fit max-w-lg" : "text-left max-w-lg self-start m-2 w-fit"} key={convo.id}>
            <MessageBox user={user} msg={convo} />
          </li>
        )
      }
    </ul >
  )
};
export default ListItem;