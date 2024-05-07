import { DialogClose } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Pencil, Trash2 } from "lucide-react";
import { IoIosMore } from "react-icons/io";

interface UpdateMessageProps {
    onEdit: () => void;
    onDelete: () => void;
};
const UpdateMessage = ({ onEdit, onDelete }: UpdateMessageProps) => {
    const onEditClick = () => {
        onEdit();
    };
    const onDeleteClick = () => {
        onDelete();
    };
    return (
        <DropdownMenu >
            <DropdownMenuTrigger className="self-end flex justify-end"><IoIosMore className="w-4" /></DropdownMenuTrigger>
            <DropdownMenuContent side="top" className="">
                <DropdownMenuItem className="p-0 m-0 flex">
                    <button
                        className="h-full m-0 flex justify-between hover:bg-primary p-2  rounded-sm w-full"
                        onClick={onEditClick}>
                        <span>
                            Edit
                        </span>
                        <Pencil className="h-4 md:h-5" />
                    </button>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-0 m-0">
                    <button
                        className="h-full p-2 flex justify-between rounded-sm hover:bg-destructive w-full"
                        onClick={onDeleteClick}>
                        <span className="">
                            Delete
                        </span>
                        <Trash2 className="h-4 md:h-5" />
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent >
        </DropdownMenu >
    );
};
export default UpdateMessage;