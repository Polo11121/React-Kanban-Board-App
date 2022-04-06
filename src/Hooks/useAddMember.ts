import axios from 'axios';
import { useMutation } from 'react-query';

export const useAddMember = (onSuccess: () => void) => {
  const addMember = ({
    memberName,
    memberAvatarSrc,
  }: {
    memberName: string;
    memberAvatarSrc: string;
  }) =>
    axios.post('https://chadsoft-kanban-backend.herokuapp.com/api/users', {
      name: memberName,
      surname: memberAvatarSrc || 'mock',
    });

  const { mutate, isLoading, mutateAsync } = useMutation(addMember, {
    onSuccess,
  });

  return { mutateAsync, mutate, isLoading };
};
