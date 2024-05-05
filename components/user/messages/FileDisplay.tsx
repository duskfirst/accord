"use client";
import Image from "next/image";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ReactAudioPlayer from "react-audio-player";
import Link from "next/link";

interface Props {
    file: File | undefined,
}

const fileSizeConvert = (size: number) => {
    var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    return +((size / Math.pow(1024, i)).toFixed(2)) * 1 + " " + ["B", "kB", "MB", "GB", "TB"][i];
};
const FileDisplay = ({ file }: Props) => {
    const [objectUrl, setObjectUrl] = useState("https://via.placeholder.com/150");
    useEffect(() => {
        if (file) {
            const url = URL.createObjectURL(file);
            setObjectUrl(url);
        }
    }, [file]);

    if (!file)
        return null;
    switch (file?.type.split("/")[0]) {
        case "image":
        case "gif":
            return (

                < div className="w-max p-2 gap-2 flex flex-col rounded-md items-start bg-accent" >
                    {
                        <Dialog >
                            <DialogTrigger>
                                <Image src={objectUrl} alt={"Image"} width={400} height={400} className="rounded-md" />
                            </DialogTrigger>
                            <DialogContent className="min-w-[80vw] min-h-[90vh] items-center justify-center">
                                <Image src={objectUrl} alt={"Image"} fill style={{ objectFit: "contain" }} />
                            </DialogContent>
                        </ Dialog >
                    }
                </div >
            );
            break;
        case "video":
            return (

                < div className="w-max p-2 flex flex-col rounded-md items-start bg-accent" >
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

                <div className="w-max p-4 gap-4 flex rounded-md justify-center items-center bg-accent">
                    <div className="pb-1 grid gap-2">
                        <span className="font-semibold text-md">
                            {file?.name}
                        </span>
                        <span className="text-xs">
                            {fileSizeConvert(file?.size)}
                        </span>

                    </div>
                    <Link href={objectUrl} target="_blank" download={file?.name}  >
                        <Download />
                    </Link>
                </div >
            );
            break;
    }

};
export default FileDisplay;