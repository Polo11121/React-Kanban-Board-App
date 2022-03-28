import axios from 'axios';
import { useMutation } from 'react-query';

export const useRemoveMember = (onSuccess: () => void) => {
  const removeMember = (userId: string) =>
    axios.delete(`http://localhost:3001/api/users/${userId}`);

  const { mutate, isLoading, mutateAsync } = useMutation(removeMember, {
    onSuccess,
  });

  return { mutateAsync, mutate, isLoading };
};
