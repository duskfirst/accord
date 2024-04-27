"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Page = ({ params }: { params: { username: string } }) => {
  const isLoggedIn = true;

  return (
    <div className="flex flex-col h-full justify-center gap-8 items-center">
      <Avatar className="size-40">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>Profile Picture</AvatarFallback>
      </Avatar>
      <Card className="border-2 bg-zinc-800 flex flex-col items-center p-4">
        <CardHeader>
          <CardTitle className="text-center">Profile Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-y-2">
          <p className="p-2">Username:</p>
          <Input
            type="text"
            className="border-2 rounded-lg p-2"
            defaultValue="username_placeholder"
            readOnly={!isLoggedIn}
          />
          <p className="p-2">About:</p>
          <Input
            type="text"
            className="border-2 rounded-lg p-2"
            defaultValue="about_placeholder"
            readOnly={!isLoggedIn}
          />
        </CardContent>
        <CardFooter className="w-full">
          <Button
            disabled={params.username !== "username_placeholder" || !isLoggedIn}
            className="bg-zinc-600 border-2 w-full rounded-lg p-2"
            type="submit"
            onClick={() => console.log("Details updated!")}
          >
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
