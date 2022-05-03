import { useQuery } from 'react-query';
import axios from 'axios';

export const useGetMember = (userId: string) => {
  const getMember = () =>
    axios
      .get(`http://localhost:3001/api/users/${userId}`)
      .then((resp) => resp.data);

  const { data } = useQuery('loggedInMember', getMember);

  return data || { id: '', name: '', avatarSrc: '', email: '' };
};
