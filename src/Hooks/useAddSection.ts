import { useMutation } from 'react-query';
import axios from 'axios';

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

  const { mutate } = useMutation(addSection, {
    onSuccess,
  });

  return mutate;
};
