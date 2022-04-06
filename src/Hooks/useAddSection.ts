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
    axios.post('https://chadsoft-kanban-backend.herokuapp.com/api/sections', {
      name: sectionName,
      taskLimit: +sectionMaximumNumberOfTasks,
    });

  const { mutate, isLoading, mutateAsync } = useMutation(addSection, {
    onSuccess,
  });

  return { mutateAsync, mutate, isLoading };
};
