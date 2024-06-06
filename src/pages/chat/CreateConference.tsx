import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { instance } from '../../api/axios.api';
import './createChatPage.css';

interface User {
  id: number;
  name: string;
  email: string;
  image: string;
}

const CreateChatPage: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [chatName, setChatName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all users
    const fetchUsers = async () => {
      try {
        const response = await instance.get('/user');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserSelect = (userId: number) => {
    setSelectedUsers(prevSelected =>
      prevSelected.includes(userId)
        ? prevSelected.filter(id => id !== userId)
        : [...prevSelected, userId]
    );
  };

  const handleSubmit = async () => {
    try {
      await instance.post('/chat', { userIds: selectedUsers, name: chatName });
      navigate('/chat'); // Navigate to the chat list page
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  return (
    <div className="create-chat-page">
      <h2>Create Chat</h2>
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      <ul className="user-list">
        {filteredUsers.map(user => (
          <li key={user.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedUsers.includes(user.id)}
                onChange={() => handleUserSelect(user.id)}
              />
              <img src={`http://localhost:3000/${user.image}`} alt="User Image" />
              {user.name || user.email}
            </label>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Chat name"
        value={chatName}
        onChange={e => setChatName(e.target.value)}
        className="chat-name-input"
      />
      <button onClick={handleSubmit} className="submit-button">Create Chat</button>
    </div>
  );
};

export default CreateChatPage;
