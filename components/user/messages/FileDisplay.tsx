import Image from "next/image";
import { Download } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ReactAudioPlayer from "react-audio-player";
import Link from "next/link";

interface FileDisplayProps {
    file_url: string;
    file_type: string;
}

const FileDisplay = ({ file_type, file_url }: FileDisplayProps) => {

    switch (file_type.split("/")[0]) {
        case "image":
        case "gif":
            return (

                < div className="w-max p-2 gap-2 flex flex-col rounded-md items-start bg-accent" >
                    {
                        <Dialog >
                            <DialogTrigger>
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
                    <video src={file_url} controls >
                    </video>
                </div >
            );
            break;

        case "audio":
            return (

                < div className="w-max p-2 flex flex-col rounded-md items-start bg-accent" >
                    <ReactAudioPlayer src={file_url} controls />
                </div >
            );
            break;
        default:
            return (

                <div className="w-max p-4 gap-4 flex rounded-md justify-center items-center bg-accent">
                    <div className="pb-1 grid gap-2">
                        <span className="font-semibold text-md">
                            File
                        </span>

                    </div>
                    <Link href={file_url} target="_blank" download  >
                        <Download />
                    </Link>
                </div >
            );
            break;
    }

};
export default FileDisplay;