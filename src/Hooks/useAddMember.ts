import axios from 'axios';
import { useMutation } from 'react-query';

export const useAddMember = (onSuccess: () => void) => {
  const addMember = (userName: string) =>
    axios.post('http://localhost:3001/api/users', {
      name: userName,
      taskLimit: 1,
    });

  const { mutate, isLoading, mutateAsync } = useMutation(addMember, {
    onSuccess,
  });

  return { mutateAsync, mutate, isLoading };
};
