import { useQuery } from 'react-query';
import { MemberType } from 'shared/types/Kanban.type';
import axios from 'axios';

type useGetMembersType = {
  members: MemberType[];
  isInitialLoaded: boolean;
};

export const useGetMembers = (): useGetMembersType => {
  const getMembers = () =>
    axios.get('http://localhost:3001/api/users').then((resp) =>
      resp.data.map((member: { [x: string]: any; name: any }) => ({
        id: member['_id'],
        name: member.name,
        avatarSrc: member.photo,
        email: member.email,
        taskCount: member.taskCount,
      }))
    );

  const { data, isFetchedAfterMount } = useQuery('members', getMembers);

  return data
    ? { members: data, isInitialLoaded: isFetchedAfterMount }
    : { members: [], isInitialLoaded: false };
};
