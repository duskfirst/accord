"use client";


import { Conversation, Profile } from "@/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";
import { Mail } from "lucide-react";
import { User } from "@supabase/supabase-js";
import { createBrowserClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";


interface UserProfileProps {
    profile: Profile;
    conversation: Conversation | null;
    user: User | null;
};

const UserProfile = ({ user, conversation, profile }: UserProfileProps) => {

    const supabase = createBrowserClient();
    const router = useRouter();

    const gotoConvo = async () => {
        if (!conversation) {
            const { data } = await supabase
                .from("conversation")
                .insert({ id: uuidv4(), one: profile.id, another: user!.id })
                .select()
                .single();
            conversation = data;
        }
        router.push(`/conversation/${conversation!.id}`);
    };

    return (
        <div className="h-full w-full flex flex-col py-10 px-56 gap-5">
            <div>
                <AspectRatio ratio={4 / 1} className="bg-muted">
                    <Image
                        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                        alt="Header image"
                        fill
                        className="rounded-md object-cover"
                    />
                </AspectRatio>
                <Avatar className="size-40 ml-4 -mt-20">
                    <AvatarImage
                        src={profile.avatar_url || "https://github.com/shadcn.png"}
                    />
                    <AvatarFallback>Profile picture</AvatarFallback>
                </Avatar>
            </div>
            <div className="flex justify-between">
                <div className="flex flex-col gap-1">
                    <p className="text-lg font-medium">{profile.display_name}</p>
                    <p className="text-xs font-light">{profile.username}</p>
                    {profile.website && (
                        <Link href={profile.website}>{profile.website}</Link>
                    )}
                </div>
                <div className="flex justify-end pr-4 items-center">
                    {user && <Mail onClick={gotoConvo} className="cursor-pointer" />}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;