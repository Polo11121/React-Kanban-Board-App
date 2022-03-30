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
    axios.post('http://localhost:3001/api/member', {
      name: memberName,
      surname: memberAvatarSrc || 'mock',
    });

  const { mutate, isLoading, mutateAsync } = useMutation(addMember, {
    onSuccess,
  });

  return { mutateAsync, mutate, isLoading };
};
