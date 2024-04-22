
import { ChevronRight, CircleX, X } from "lucide-react";
import { Button } from "./ui/button";

interface Props {
    sideOpen: boolean,
    buttonClassname: string
    onClick: () => void
}

const SideButton = ({ sideOpen, buttonClassname, onClick }: Props) => {


    return (
        <div className={"sm:hidden visible " + buttonClassname}>
            <Button variant="ghost" onClick={onClick} size="icon">
                {!sideOpen ? <ChevronRight className="h-4 w-4 place-self-center " /> : <CircleX />}
            </Button>
        </div>
    );
};
export default SideButton;