import Chats from "@/components/Chats";
import FriendList from "@/components/FriendList";
import Sidenav from "@/components/Sidenav";

const client = () => {

  return (

    <div className="flex h-full w-full">
      <div className="border flex items-center justify-center h-full">
        <Sidenav />
      </div>
      <div className="border flex items-center justify-center w-4/12 h-full">
        <FriendList />
      </div>
      <div className="border flex items-center justify-center flex-grow h-full">
        <Chats />
      </div>
    </ div>
  )
};
export default client;