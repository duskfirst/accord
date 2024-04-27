"use client";
import Image from "next/image";
import { File } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

interface Props {
    file: File | undefined,
}

const FileDisplay = ({ file }: Props) => {
    const [imageUrl, setImageUrl] = useState('https://via.placeholder.com/150');

    useEffect(() => {

        if (file?.type.split('/')[0] === 'image' && file) {
            const url = URL.createObjectURL(file);
            setImageUrl(url);
            console.log(file);
        }
    }, []);


    return (

        <div className={file?.type.split('/')[0] !== 'image' ? "w-max p-2 flex items-center bg-accent" : "w-max p-2 flex flex-col items-start bg-accent"}>
            <span className="pb-1">{file?.name}</span>
            {
                file?.type.split('/')[0] !== 'image'
                    ?
                    <File />
                    :
                    <Dialog >
                        <DialogTrigger>
                            <Image src={imageUrl} alt={"Image"} width={400} height={400} className="rounded-md" />
                        </DialogTrigger>
                        <DialogContent className="w-auto h-auto">
                            <Image src={imageUrl} alt={"Image"} fill={true} />
                        </DialogContent>
                    </ Dialog >
            }
        </div >

    );
};
export default FileDisplay;