import { Message } from "@/types/types";
import MessageBox from "./MessageBox";
import { LegacyRef } from "react";
import { Separator } from "../ui/separator";

interface Props {
    conversation: Message[] | undefined,
    user: string,
    listRef: LegacyRef<HTMLLIElement> | undefined,
    receiver?: string,
    onDelete: (msg: Message) => void;
    onEdit: (msg: Message, newText: string) => void;
}
const ListItem = ({ conversation, user, listRef, receiver, onDelete, onEdit }: Props) => {
    const filteredConvo = conversation?.filter((convo) => (convo.receiver === receiver && convo.sender === user) || (convo.sender === receiver && convo.receiver === user));

    return (
        <ul className="p-2 flex flex-col justify-end h-full scroll-auto w-full">
            {filteredConvo?.map((convo: Message) => (
                <li
                    className="text-left self-start m-2 w-full"

                    key={convo.id}
                    ref={
                        filteredConvo[filteredConvo.length - 1] === convo
                            ? listRef
                            : undefined
                    }
                >
                    <MessageBox
                        onDelete={onDelete}
                        onEdit={onEdit}
                        user={user}
                        msg={convo}
                    />

                </li>
            ))}
        </ul>
    );
};
export default ListItem;
