import axios from 'axios';
import { useQuery } from 'react-query';

type useGetMemberType = {
  member: { id: string; name: string; photo: string; email: string };
  isLoading: boolean;
};

export const useGetMember = (userId: string): useGetMemberType => {
  const getMember = () =>
    axios
      .get(`https://chadsoft-kanban-backend.herokuapp.com/api/users/${userId}`)
      .then((resp) => resp.data);

  const { data, isLoading } = useQuery('loggedInMember', getMember);

  return data
    ? { member: data, isLoading }
    : {
        member: { id: '', name: '', avatarSrc: '', email: '' },
        isLoading: false,
      };
};
