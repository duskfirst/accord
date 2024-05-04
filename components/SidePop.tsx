import { ChevronRight } from "lucide-react";
import FriendList from "./conversations/Conversations";
import Sidenav from "./sidenav/Sidenav";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

interface Props {
    className?: string,
    setReceiver: (data: string) => void,
    receiver: string,
}

const SidePop = ({ className, setReceiver, receiver }: Props) => (
    <Sheet>
        <SheetTrigger className={className + "w-fit"} asChild>
            <Button className="min-w-10 max-w-14">
                <ChevronRight />
            </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex p-2 gap-1 w-full max-h-full">
            <Sidenav />
            <FriendList receiver={receiver} setReceiver={setReceiver} className="flex-grow border" />
        </SheetContent>
    </Sheet>
);
export default SidePop;