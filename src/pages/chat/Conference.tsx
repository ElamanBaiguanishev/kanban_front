import { FC } from 'react'
import { Outlet } from 'react-router-dom';
import ChatList from './ChatList';
import { instance } from '../../api/axios.api';

export const conferenceLoader = async () => {
    const chats = await instance.get<any[]>('/chat/')

    const data = {
        chats: chats.data
    }

    return data
}


const Conference: FC = () => {
    return (
        <div className="main-chat">
            <Outlet />
            <ChatList />
        </div>
    );
}

export default Conference