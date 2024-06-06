import { FC, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";


const ChatList: FC = () => {
    const navigate = useNavigate();
    const { chats } = useLoaderData() as any;
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredChats, setFilteredChats] = useState<any[]>([]);


    useEffect(() => {
        setFilteredChats(
            chats.filter((chat: { name: any; }) =>
                chat.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, chats]);

    return (
        <div className="users-list">
            <h2>Chat List</h2>
            <button onClick={() => navigate('create')}>Создать конференцию</button>
            <ul>
                <input
                    type="text"
                    placeholder="Поиск конференции..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {filteredChats.map((chat: any) => (
                    <li key={chat.id}>
                        <span>{chat.name}</span>
                        <button onClick={() => navigate(`${chat.id}`)}>Message</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatList;
