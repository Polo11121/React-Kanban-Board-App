import { useMutation } from 'react-query';
import axios from 'axios';

export const useRemoveSection = (onSuccess: () => void) => {
  const removeSection = (sectionId: string) =>
    axios.delete(
      `https://chadsoft-kanban-backend.herokuapp.com/api/sections/${sectionId}`
    );

  const { mutate } = useMutation(removeSection, {
    onSuccess,
  });

  return mutate;
};
