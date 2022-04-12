import { useMutation } from 'react-query';
import axios from 'axios';

export const useChangeTasksPerMembers = (onSuccess: () => void) => {
  const changeTasksPerMembers = (tasksPerMembers: number) =>
    axios.put(
      'https://chadsoft-kanban-backend.herokuapp.com/api/userTasksLimit/62547ce7b7f474c8b85bca30',
      {
        userTaskLimit: tasksPerMembers,
      }
    );

  const { mutate } = useMutation(changeTasksPerMembers, {
    onSuccess,
  });

  return { mutate };
};
