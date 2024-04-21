import { ChevronRight } from "lucide-react";
import FriendList from "./FriendList";
import Sidenav from "./Sidenav";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

interface Props {
  className?: string,
}

const SidePop = ({ className }: Props) => (
  <Sheet>
    <SheetTrigger className={className + "w-fit"} asChild>
      <Button className="min-w-10 max-w-14">
        <ChevronRight />
      </Button>
    </SheetTrigger>
    <SheetContent side="left" className=" flex w-screen h-full">
      <Sidenav />
      <FriendList className="flex-grow border" />
    </SheetContent>
  </Sheet>
);
export default SidePop;