"use client";
import Image from "next/image";
import { Download, FileDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import ReactAudioPlayer from "react-audio-player";
import Link from "next/link";

interface Props {
    file: File | undefined,
}

const FileDisplay = ({ file }: Props) => {
    const [objectUrl, setObjectUrl] = useState("https://via.placeholder.com/150");

    useEffect(() => {
        if (file) {
            const url = URL.createObjectURL(file);
            setObjectUrl(url);
        }
    }, []);

    switch (file?.type.split("/")[0]) {
        case "image":
        case "gif":
            return (

                < div className="w-max p-2 gap-2 flex flex-col rounded-md items-start bg-accent" >
                    <span className="pb-1 flex justify-between gap-4">{file?.name}
                    </span>
                    {
                        <Dialog >
                            <DialogTrigger>
                                <Image src={objectUrl} alt={"Image"} width={400} height={400} objectFit="contain" className="rounded-md" />
                            </DialogTrigger>
                            <DialogContent className="min-w-[80vw] min-h-[90vh] items-center justify-center">
                                <Image src={objectUrl} alt={"Image"} objectFit="contain" fill={true} />
                            </DialogContent>
                        </ Dialog >
                    }
                </div >
            );
            break;
        case "video":
            return (

                < div className="w-max p-2 flex flex-col rounded-md items-start bg-accent" >
                    <span className="pb-1">{file?.name}</span>
                    <video src={objectUrl} controls >
                    </video>
                </div >
            );
            break;

        case "audio":
            return (

                < div className="w-max p-2 flex flex-col rounded-md items-start bg-accent" >
                    <span className="pb-1">{file?.name}</span>
                    <ReactAudioPlayer src={objectUrl} controls />
                </div >
            );
            break;
        default:
            return (

                <div className="w-max p-4 gap-4 flex rounded-md items-start bg-accent">
                    <span className="pb-1">{file?.name}</span>
                    <Link href={objectUrl} download={file?.name} >
                        <FileDown />
                    </Link>
                </div >
            );
            break;
    }

};
export default FileDisplay;