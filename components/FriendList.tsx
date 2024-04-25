import { Separator } from "./ui/separator";

interface Props {
    className?: string,

}

const friendData = [
    { "id": "1", "username": "Lily", "unseen_messages": 3, "image_url": "https://via.placeholder.com/150" },
    { "id": "2", "username": "Max", "unseen_messages": 1, "image_url": "https://via.placeholder.com/150" },
    { "id": "3", "username": "Sophia", "unseen_messages": 5, "image_url": "https://via.placeholder.com/150" },
    { "id": "4", "username": "Ethan", "unseen_messages": 2, "image_url": "https://via.placeholder.com/150" },
    { "id": "5", "username": "Olivia", "unseen_messages": 0, "image_url": "https://via.placeholder.com/150" },
    { "id": "6", "username": "Liam", "unseen_messages": 4, "image_url": "https://via.placeholder.com/150" },
    { "id": "7", "username": "Ava", "unseen_messages": 2, "image_url": "https://via.placeholder.com/150" },
    { "id": "8", "username": "Noah", "unseen_messages": 3, "image_url": "https://via.placeholder.com/150" },
    { "id": "9", "username": "Emma", "unseen_messages": 1, "image_url": "https://via.placeholder.com/150" },
    { "id": "10", "username": "Mason", "unseen_messages": 6, "image_url": "https://via.placeholder.com/150" }
];

const FriendList = ({ className }: Props) => {

    return (
        <div className={className + "w-full"} >
            FriendList
            {/* <ul className="p-2 grid grid-cols-1 gap-1 h-full w-full overflow-auto">
                {friendData.map((user: any) => (
                    <>
                        <li
                            key={user.id + "friendData"}
                            className=
                            "flex text-left items-center self-end m-2 w-full  max-w-lg"
                        >
                            <img src={user.image_url} alt="Pfp" key={user.id + "friendDataimg"} className="w-10 h-10 mr-2 rounded-full" />
                            <span key={user.id + "friendDatauser"}>
                                {user.username}
                            </span>
                            <div className=" rounded-full flex justify-center items-center p-2 h-4 w-4 text-sm text-background bg-primary">{user.unseen_messages}</div>
                        </li>
                        <Separator key={user.id + "Separator"} />
                    </>
                ))}
            </ul> */}
        </div>
    );
};
export default FriendList;