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
    axios.post('http://localhost:3001/api/sections', {
      name: sectionName,
      taskLimit: +sectionMaximumNumberOfTasks,
    });

  const { mutate } = useMutation(addSection, {
    onSuccess,
  });

  return mutate;
};
