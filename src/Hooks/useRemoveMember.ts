import { useMutation } from 'react-query';
import axios from 'axios';

export const useRemoveMember = (onSuccess: () => void) => {
  const removeSection = (memberId: string) =>
    axios.delete(
      `https://chadsoft-kanban-backend.herokuapp.com/api/users/${memberId}`
    );

  const { mutate } = useMutation(removeSection, {
    onSuccess,
  });

  return mutate;
};
