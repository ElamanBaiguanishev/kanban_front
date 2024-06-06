// TaskAdminPage.tsx
import { FC, useEffect, useState } from 'react';
import { instance } from '../../api/axios.api';
import { Form } from 'react-router-dom';
import { EnumTaskPriority, TypeTaskFormState } from '../../types/task.types';
import './taskAdmin.css';
import { IUser } from '../../types/types';
import { getUsers } from './userService';

export const taskAction = async ({ request }: any) => {
  switch (request.method) {
    case 'POST': {
      const formData = await request.formData();
      const newTask: TypeTaskFormState = {
        name: formData.get('name') as string,
        priority: formData.get('priority') as EnumTaskPriority,
        dueDate: formData.get('dueDate') as string,
        userId: formData.get('userId') as number,
      };
      await instance.post('/task', newTask);
      return null;
    }
    case 'DELETE': {
      return null;
    }
  }
};

const TaskAdminPage: FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      setUsers(users);
      setFilteredUsers(users);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, users]);

  return (
    <div className="task-admin">
      <Form method="post" action="/task/admin" className="task-form">
        <label htmlFor="name">
          <span>Название</span>
          <input type="text" placeholder="name.." name="name" />
        </label>
        <label htmlFor="priority">
          <span>Приоритет</span>
          <select name="priority">
            {Object.values(EnumTaskPriority).map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="dueDate">
          <span>Срок выполнения</span>
          <input type="date" name="dueDate" />
        </label>
        <label htmlFor="user">
          <span>Назначить задачу пользователю</span>
          <input
            type="text"
            placeholder="Поиск пользователя..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="user-list">
            {filteredUsers.map(user => (
              <div
                key={user.id}
                className={`user-item ${selectedUser?.id === user.id ? 'selected' : ''}`}
                onClick={() => setSelectedUser(user)}
              >
                <img src={`http://localhost:3000/${user.image}`}alt={user.name} className="user-image" />
                <span>{user.name}</span>
              </div>
            ))}
          </div>
        </label>
        <input type="hidden" name="userId" value={selectedUser?.id || ''} />
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
};

export default TaskAdminPage;
