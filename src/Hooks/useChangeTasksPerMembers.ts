import { useMutation } from 'react-query';
import axios from 'axios';

export const useChangeTasksPerMembers = (onSuccess: () => void) => {
  const changeTasksPerMembers = (tasksPerMembers: number) =>
    axios.put(
      'http://localhost:3001/api/userTasksLimit/62547ce7b7f474c8b85bca30',
      {
        userTaskLimit: tasksPerMembers,
      }
    );

  const { mutate } = useMutation(changeTasksPerMembers, {
    onSuccess,
  });

  return { mutate };
};
