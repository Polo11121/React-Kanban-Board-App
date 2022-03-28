import axios from 'axios';
import { useQuery } from 'react-query';

type useGetUsersType = {
  users: { id: string; name: string }[];
  isLoading: boolean;
};

export const useGetUsers = (): useGetUsersType => {
  const getUsers = () =>
    axios.get('http://localhost:3001/api/users').then((resp) =>
      resp.data.map((user: { [x: string]: any; name: any }) => ({
        id: user['_id'],
        name: user.name,
      }))
    );

  const { data, isLoading } = useQuery('users', getUsers);

  return data ? { users: data, isLoading } : { users: [], isLoading: false };
};
