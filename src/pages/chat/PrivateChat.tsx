import { FC } from "react";
import UsersList from "./UsersList";
import { Outlet } from "react-router-dom";
import { instance } from "../../api/axios.api";


export const privateChatLoader = async () => {
    const users = await instance.get<any[]>('/user/')

    const data = {
        users: users.data
    }

    return data
}

const PrivateMainChat: FC = () => {
  return (
    <div className="main-chat">
      <Outlet />
      <UsersList />
    </div>
  );
};

export default PrivateMainChat;

