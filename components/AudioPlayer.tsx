"use client";

import { Pause, Play } from "lucide-react";
import React, { useState, useRef } from "react";

interface AudioPlayerProps {
    src: string;
}

const AudioPlayer = ({ src }: AudioPlayerProps) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [volume, setVolume] = useState<number>(0.5);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    return (
        <div className="flex">
            <button onClick={togglePlay}>{isPlaying ? <Pause /> : <Play />}</button>
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                className="w-full ::"
                onChange={handleVolumeChange}
            />
            <audio ref={audioRef} src={src} controls className="hidden" />
        </div>
    );
};

export default AudioPlayer;