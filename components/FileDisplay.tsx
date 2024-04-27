"use client";
import Image from "next/image";
import { File } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import AudioPlayer from "./AudioPlayer";

interface Props {
    file: File | undefined,
}

const FileDisplay = ({ file }: Props) => {
    const [objectUrl, setObjectUrl] = useState("https://via.placeholder.com/150");

    useEffect(() => {
        if ((file?.type.split("/")[0] === "image" || file?.type.split("/")[0] === "video" || file?.type.split("/")[0] === "gif" || file?.type.split("/")[0] === "audio") && file) {
            const url = URL.createObjectURL(file);
            setObjectUrl(url);
            console.log(file);
        }
    }, []);

    switch (file?.type.split("/")[0]) {
        case "image":
        case "gif":
            return (

                < div className="w-max p-2 flex flex-col rounded-md items-start bg-accent" >
                    <span className="pb-1">{file?.name}</span>
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
                    {
                        <video src={objectUrl} controls />

                    }
                </div >
            );
            break;

        case "audio":
            return (

                < div className="w-max p-2 flex flex-col rounded-md items-start bg-accent" >
                    <span className="pb-1">{file?.name}</span>
                    <AudioPlayer src={objectUrl} />
                </div >
            );
            break;
        default:
            return (

                <div className="w-max p-4 gap-4 flex rounded-md items-start bg-accent">
                    <span className="pb-1">{file?.name}</span>
                    <File />
                </div >
            );
            break;
    }

};
export default FileDisplay;