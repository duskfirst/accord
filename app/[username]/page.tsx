import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { createServerClient } from "@/utils/supabase/server";
import { PostgrestResponse } from "@supabase/supabase-js";
import { Profile } from "@/types/types";
import Link from "next/link";
import EditProfile from "@/components/profile/EditProfile";

const ProfilePage = async ({ params }: { params: { username: string } }) => {
    const supabase = createServerClient();
    const { data, error } = (await supabase
        .from("profile")
        .select("avatar_url,display_name,id,username,website")
        .eq("username", params.username)) as PostgrestResponse<Profile>;

    if (error || !data?.length) {
        return (
            <div className="h-full w-full flex justify-center items-center">
                <p className="text-center text-4xl w-full font-semibold">
          User does not exist!
                </p>
            </div>
        );
    }

    const profile = data[0];

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user?.id === profile.id) {
        return <EditProfile profile={profile} />;
    }

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
            <div className="flex flex-col gap-1">
                <p className="text-lg font-medium">{profile.display_name}</p>
                <p className="text-xs font-light">{profile.username}</p>
                {profile.website && (
                    <Link href={profile.website}>{profile.website}</Link>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
