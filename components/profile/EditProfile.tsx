"use client";

import Image from "next/image";
import React, { useState } from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Profile } from "@/types/types";
import { object, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { PostgrestResponse, SupabaseClient } from "@supabase/supabase-js";
import { createBrowserClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { v4 as uuidv4 } from "uuid";


interface Props {
    profile: Profile;
}

const formSchema = z.object({
    username: z
        .string()
        .trim()
        .min(3, "Username must have at least 3 characters.")
        .max(30, "Username is too long.")
        .refine(
            (username) => /^[\w-]{3,30}$/.test(username),
            "Username can only have a-z, A-Z, - or _"
        )
        .refine(
            (username) =>
                !["profile", "register", "settings", "login"].includes(username),
            "Sorry you cannot use this as your username."
        ),
    display_name: z
        .string()
        .trim()
        .min(1, "Display name cannot be empty")
        .max(30, "Display name is too long"),
    website: z.string(),
});

const EditProfile = ({ profile }: Props) => {

    const router = useRouter();

    const [userProfile, setUserProfile] = useState<Profile>(profile);
    const [open, setOpen] = useState(false);
    const supabase = createBrowserClient();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: userProfile.username,
            display_name: userProfile.display_name || profile.username,
            website: userProfile.website || "",
        },
        mode: "onSubmit",
        reValidateMode: "onChange",
    });

    const onSubmit = async ({ display_name, username, website }: z.infer<typeof formSchema>) => {
        if (username !== userProfile.username) {
            const { data, error } = (await supabase
                .from("profile")
                .select("username")
                .eq("username", username)) as PostgrestResponse<string>;
            if (error) {
                console.log("Something went wrong.");
                return;
            }
            if (data?.length) {
                form.setError("username", { message: "Username is already taken." });
                return;
            }
        }
        const { error } = await supabase
            .from("profile")
            .update({ display_name, username, website })
            .eq("id", userProfile.id);

        if (error) {
            console.log(error);
            form.setError("root", error);
            return;
        }

        setUserProfile({
            ...userProfile,
            display_name, username, website
        });

        setOpen(false);
        router.push("/" + username);

    };

    const [wait, setWait] = useState(false);
    const [file, setFile] = useState<File>();
    const [openProfile, setOpenProfile] = useState(false);

    const UploadProfilePic = async () => {
        if (!file)
            return;
        setWait(true);
        const fileExt = file.name.split(".").pop();
        const fileId = uuidv4() + "." + fileExt;
        const { data, error } = await supabase
            .storage
            .from("media")
            .upload(fileId, file, {
                cacheControl: "3600",
                upsert: false
            });
        const { data: { publicUrl } } = await supabase
            .storage
            .from("media")
            .getPublicUrl(fileId);
        await supabase
            .from("profile")
            .update({ avatar_url: publicUrl })
            .eq("id", userProfile.id);
        setUserProfile({
            ...userProfile,
            avatar_url: publicUrl
        });
        setWait(false);
        setOpenProfile(false);
    };

    const handleChange = (event: any) => {
        setFile(event.target.files[0]);
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
                <Dialog open={openProfile} onOpenChange={setOpenProfile}>
                    <DialogTrigger asChild>
                        <Avatar className="size-40 ml-4 -mt-20 bg-transparent hover:scale-105 cursor-pointer" onClick={() => console.log("Clicked!")}>
                            <AvatarImage
                                src={userProfile.avatar_url || "https://github.com/shadcn.png"}
                            />
                            <AvatarFallback>Profile picture</AvatarFallback>
                        </Avatar>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Upload Profile Picture</DialogTitle>
                        </DialogHeader>
                        <input onChange={handleChange} id="profile-pic-upload" type="file" className="hover:cursor-pointer" accept="image/" />
                        <div className="grid gap-4 py-4">
                            <DialogFooter>
                                <Button disabled={wait} onClick={UploadProfilePic}>{wait ? <Loader className="animate-spin" /> : "Save"}</Button>
                            </DialogFooter>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="flex flex-col gap-1">
                <p className="text-lg font-medium">{userProfile.display_name}</p>
                <p className="text-xs font-light">{userProfile.username}</p>
                {userProfile.website && (
                    <Link className="text-blue-500 hover:underline" href={userProfile.website}>{userProfile.website}</Link>
                )}
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger className="flex" asChild>
                    <Button variant="outline" className="w-32 h-12 self-end">
                        Edit Profile
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you are done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-8"
                            >
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="display_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Display Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="website"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Website URL</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <DialogFooter>
                                    <Button type="submit">Save changes</Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default EditProfile;
