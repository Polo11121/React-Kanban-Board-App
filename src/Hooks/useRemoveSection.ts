import { useMutation } from 'react-query';
import axios from 'axios';

export const useRemoveSection = (onSuccess: () => void) => {
  const removeSection = (sectionId: string) =>
    axios.delete(`http://localhost:3001/api/sections/${sectionId}`);

  const { mutate } = useMutation(removeSection, {
    onSuccess,
  });

  return mutate;
};
