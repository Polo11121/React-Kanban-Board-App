import { useQuery } from 'react-query';
import axios from 'axios';

export const useGetTasksPerMembers = () => {
  const getTasksPerMembers = (): Promise<number> =>
    axios
      .get('https://chadsoft-kanban-backend.herokuapp.com/api/userTasksLimit')
      .then((resp) => resp.data[0].userTaskLimit);

  const { data } = useQuery('tasksPerMembers', getTasksPerMembers);

  return data || null;
};
