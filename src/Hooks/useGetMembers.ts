import axios from 'axios';
import { useQuery } from 'react-query';

type useGetMembersType = {
  members: { id: string; name: string; avatarSrc: string; email: string }[];
  isLoading: boolean;
};

export const useGetMembers = (): useGetMembersType => {
  const getMembers = () =>
    axios
      .get('https://chadsoft-kanban-backend.herokuapp.com/api/users')
      .then((resp) =>
        resp.data.map((member: { [x: string]: any; name: any }) => ({
          id: member['_id'],
          name: member.name,
          avatarSrc: member.photo,
          email: member.email,
        }))
      );

  const { data, isLoading } = useQuery('members', getMembers);

  return data
    ? { members: data, isLoading }
    : { members: [], isLoading: false };
};
