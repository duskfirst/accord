import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Download, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { IoIosMore } from "react-icons/io";

interface MessageOptionsProps {
    onEdit: () => void;
    onDelete: () => void;
    file_url: string | null;
};
const MessageOptions = ({ onEdit, onDelete, file_url }: MessageOptionsProps) => {
    const onEditClick = () => {
        onEdit();
    };
    const onDeleteClick = () => {
        onDelete();
    };
    return (
        <DropdownMenu >
            <DropdownMenuTrigger className="self-end flex justify-end"><IoIosMore className="w-4" /></DropdownMenuTrigger>
            <Dialog>
                <DropdownMenuContent side="top" className="">
                    <DropdownMenuItem className="p-0 m-0 flex">
                        {
                            file_url ?
                                <Link href={file_url} target="_blank" download className="h-full m-0 flex justify-between hover:bg-primary p-2  rounded-sm w-full" >
                                    <span>
                                        Download
                                    </span>
                                    <Download className="h-4 md:h-5" />
                                </Link>
                                :
                                <button
                                    className="h-full m-0 flex justify-between hover:bg-primary p-2  rounded-sm w-full"
                                    onClick={onEditClick}>
                                    <span>
                                        Edit
                                    </span>
                                    <Pencil className="h-4 md:h-5" />
                                </button>
                        }
                    </DropdownMenuItem>
                    <DropdownMenuItem className="p-0 m-0">
                        <DialogTrigger
                            className="h-full p-2 flex justify-between rounded-sm hover:bg-destructive w-full"
                        >
                            <span className="">
                                Delete
                            </span>
                            <Trash2 className="h-4 md:h-5" />
                        </DialogTrigger>
                    </DropdownMenuItem>
                </DropdownMenuContent >
                <DialogContent className="grid grid-cols-2 items-center  gap-4 min-h-40 justify-items-center justify-center">
                    <span className="col-span-2 mb-5">
                        Are you sure you want to delete the message?
                    </span>
                    <DialogClose onClick={onDeleteClick} className="w-24 bg-destructive p-1 rounded-md border-2 border-destructive hover:bg-transparent">Yes</DialogClose>
                    <DialogClose className="w-24 bg-primary p-1 rounded-md border-2 border-primary hover:bg-transparent">No</DialogClose>
                </DialogContent>
            </Dialog>
        </DropdownMenu >
    );
};
export default MessageOptions;