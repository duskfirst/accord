"use client";
import Image from "next/image";
import { File } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { useEffect, useRef, useState } from "react";

interface Props {
    file: File,
}

const FileDisplay = ({ file }: Props) => {
    const [imageUrl, setImageUrl] = useState('');
    if (file.type.split('/')[0] !== 'image') {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target?.result) {
                setImageUrl(e.target.result as string);
            }
        };

    }
    console.log(file);
    return (

        <Card>
            <CardHeader>
                {file.name}
            </CardHeader>
            <CardContent>
                {
                    file.type.split('/')[0] !== 'image'
                        ?
                        <File />
                        :
                        <Image src={imageUrl} alt={"Image"} />

                }
            </CardContent>
        </Card>

    );
};
export default FileDisplay;