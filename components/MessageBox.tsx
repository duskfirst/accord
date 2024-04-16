import { Message } from "@/types/types";

interface Props {
  msg: Message,
  user: string,
}
const MessageBox = ({ msg, user }: Props) => {

  return (
    <div className={msg.sender == user ? "flex flex-col overflow-hidden rounded-l-lg" : "flex flex-col overflow-hidden rounded-r-lg"} >

      < div className={msg.sender == user ? " bg-accent p-2.5 rounded-t-lg rounded-bl-lg" : "bg-accent p-2.5 rounded-t-lg rounded-br-lg"}>
        <div className="text-start font-bold mb-4  max-w-lg">
          {msg.sender == user ? "You" : msg.sender}
        </div >
        <div className="text-wrap">
          {msg.text}
        </div>
      </div>
      {
        <div className="bg-accent h-5">
          <div className={msg.sender == user ? "bg-background w-full h-full rounded-tr-full" : "bg-background w-full h-full rounded-tl-full"}>

          </div>
        </div>
      }
    </ div >
  )
};
export default MessageBox;