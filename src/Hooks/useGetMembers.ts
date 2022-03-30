import axios from 'axios';
import { useQuery } from 'react-query';

type useGetMembersType = {
  members: { id: string; name: string; avatarSrc: string }[];
  isLoading: boolean;
};

export const useGetMembers = (): useGetMembersType => {
  const getMembers = () =>
    axios.get('http://localhost:3001/api/member').then((resp) =>
      resp.data.map((member: { [x: string]: any; name: any }) => ({
        id: member['_id'],
        name: member.name,
        avatarSrc: member.surname,
      }))
    );

  const { data, isLoading } = useQuery('members', getMembers);

  return data
    ? { members: data, isLoading }
    : { members: [], isLoading: false };
};
