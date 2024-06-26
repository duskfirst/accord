import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ReactAudioPlayer from "react-audio-player";
import { File } from "lucide-react";
import { Message } from "@/types/types";

interface FileDisplayProps {
    file_url: string;
    file_type: string;
    message: Message;
}

const FileDisplay = ({ file_type, file_url, message }: FileDisplayProps) => {

    switch (file_type.split("/")[0]) {
        case "image":
        case "gif":
            return (

                < div className="w-max p-2 gap-2 flex flex-col rounded-md items-start bg-accent" >
                    {
                        <Dialog >
                            {message.content}
                            <DialogTrigger >
                                <Image src={file_url} alt={"Image"} width={400} height={400} className="rounded-md" />
                            </DialogTrigger>
                            <DialogContent className="min-w-[80vw] min-h-[90vh] items-center justify-center">
                                <Image src={file_url} alt={"Image"} fill style={{ objectFit: "contain" }} />
                            </DialogContent>
                        </ Dialog >
                    }
                </div >
            );
            break;
        case "video":
            return (

                < div className="w-max p-2 flex flex-col rounded-md items-start bg-accent" >
                    {message.content}
                    <video src={file_url} controls >
                    </video>
                </div >
            );
            break;

        case "audio":
            return (

                < div className="w-max p-2 flex flex-col rounded-md items-start bg-accent" >
                    {message.content}
                    <ReactAudioPlayer src={file_url} controls />
                </div >
            );
            break;
        default:
            return (

                <div className="w-1/3 p-4 gap-4 flex flex-col text-start rounded-md hover:bg-background justify-center items-start bg-accent">
                    {message.content}
                    <div className="pb-1 flex w-full gap-2  items-center">
                        <File />
                        <span className="font-semibold text-md">
                            File
                        </span>
                    </div>
                </div >
            );
            break;
    }

};
export default FileDisplay;