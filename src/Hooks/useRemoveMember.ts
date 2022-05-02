import { useMutation } from 'react-query';
import axios from 'axios';

export const useRemoveMember = (onSuccess: () => void) => {
  const removeSection = (memberId: string) =>
    axios.delete(`http://localhost:3001/api/users/${memberId}`);

  const { mutate } = useMutation(removeSection, {
    onSuccess,
  });

  return mutate;
};
