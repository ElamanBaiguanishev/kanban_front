// userService.ts
import { instance } from '../../api/axios.api';
import { IUser } from '../../types/types';

export const getUsers = async (): Promise<IUser[]> => {
  const response = await instance.get('/user');
  return response.data;
};
