// UsersList.tsx
import { instance } from "../../api/axios.api";
import { FC, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import './mainChat.css';

const UsersList: FC = () => {
  const navigate = useNavigate();
  const { users } = useLoaderData() as any;
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);


  useEffect(() => {
    setFilteredUsers(
      users.filter((user: { name: any; }) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, users]);
  
  const openChat = async (userId: number) => {
    try {
      const response = await instance.post(`/chat/${userId}`);
      navigate(`${response.data.id}`);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="users-list">
      <h2>Users List</h2>
      <ul>
        <input
          type="text"
          placeholder="Поиск пользователя..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {filteredUsers.map((user: any) => (
          <li key={user.id}>
            <img src={`http://localhost:3000/${user.image}`} alt="User Image" className="profile-image" />
            <span>{user.name || user.email}</span>
            <button onClick={() => openChat(user.id)}>Message</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
