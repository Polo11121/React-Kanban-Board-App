import axios from 'axios';
import { useMutation } from 'react-query';

export const useAddSection = (onSuccess: () => void) => {
  const addSection = ({
    sectionName,
    sectionMaximumNumberOfTasks,
  }: {
    sectionName: string;
    sectionMaximumNumberOfTasks: string;
  }) =>
    axios.post('http://localhost:3001/api/sections', {
      name: sectionName,
      taskLimit: +sectionMaximumNumberOfTasks,
    });

  const { mutate, isLoading, mutateAsync } = useMutation(addSection, {
    onSuccess,
  });

  return { mutateAsync, mutate, isLoading };
};
