import { Message } from "@/types/types";

interface Props {
  msg: Message,
  user: string,
}
const MessageBox = ({ msg, user }: Props) => {

  return (
    <div className={msg.sender == user ? "flex flex-col text-background overflow-hidden m-2 rounded-l-lg rounded-bl-none" : "flex flex-col m-2 text-background overflow-hidden rounded-r-lg rounded-br-none"} >

      < div className={msg.sender == user ? " bg-accent p-2 ps-3 min-w-12 rounded-t-lg rounded-bl-lg" : "bg-accent  p-2 ps-3 min-w-12 rounded-t-lg rounded-br-lg"}>
        <div className="text-start font-bold mb-1 max-w-lg">
          {msg.sender == user ? "You" : msg.sender}
        </div >
        <div className="text-wrap">
          {msg.text}
        </div>
      </div>
      {
        <div className="bg-accent h-5">
          <div className={msg.sender == user ? "bg-background w-full h-full rounded-tr-full " : "bg-background w-full h-full rounded-tl-full"}>
          </div>
        </div>
      }
    </ div >
  )
};
export default MessageBox;