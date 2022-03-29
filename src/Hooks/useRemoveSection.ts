import axios from 'axios';
import { useMutation } from 'react-query';

export const useRemoveSection = (onSuccess: () => void) => {
  const removeSection = (sectionId: string) =>
    axios.delete(`http://localhost:3001/api/sections/${sectionId}`);

  const { mutate, isLoading, mutateAsync } = useMutation(removeSection, {
    onSuccess,
  });

  return { mutateAsync, mutate, isLoading };
};
