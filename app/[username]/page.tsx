import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Page = () => {
    return (
        <div className="flex flex-col h-full justify-center gap-8 items-center">
            <Avatar className="size-40">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>Profile Picture</AvatarFallback>
            </Avatar>
            <Card className="border-2 bg-zinc-800">
                <CardHeader>
                    <CardTitle>Profile Details</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <p className="border-2 rounded-lg p-2 w-full">
            Username: username_placeholder
                    </p>
                    <Separator />
                    <p className="border-2 rounded-lg p-2 w-full">
            About: about_placeholder
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default Page;
