import { FC, useState, useEffect } from 'react';
import { instance } from '../../api/axios.api';
import './userSearch.css';

interface User {
    id: number;
    name: string;
    image: string;
}

const UserSearch: FC<{ onSelectUser: (user: User) => void }> = ({ onSelectUser }) => {
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    useEffect(() => {
        if (search) {
            instance.get(`/user?search=${search}`).then(response => {
                setUsers(response.data);
            });
        } else {
            setUsers([]);
        }
    }, [search]);

    return (
        <div className="user-search">
            <input
                type="text"
                placeholder="Search user..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {users.length > 0 && (
                <ul className="user-list">
                    {users.map(user => (
                        <li key={user.id} onClick={() => {
                            setSelectedUser(user);
                            onSelectUser(user);
                            setSearch('');
                            setUsers([]);
                        }}>
                            <img src={user.image} alt={user.name} className="user-image" />
                            <span>{user.name}</span>
                        </li>
                    ))}
                </ul>
            )}
            {selectedUser && (
                <div className="selected-user">
                    <img src={selectedUser.image} alt={selectedUser.name} />
                    <span>{selectedUser.name}</span>
                </div>
            )}
        </div>
    );
};

export default UserSearch;
