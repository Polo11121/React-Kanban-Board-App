import { useQuery } from 'react-query';
import axios from 'axios';

export const useGetTasksPerMembers = () => {
  const getTasksPerMembers = (): Promise<number> =>
    axios
      .get('http://localhost:3001/api/userTasksLimit')
      .then((resp) => resp.data[0].userTaskLimit);

  const { data, isFetchedAfterMount } = useQuery(
    'tasksPerMembers',
    getTasksPerMembers
  );

  if (data !== undefined) {
    return { tasksPerMembers: data, isInitialLoaded: isFetchedAfterMount };
  }

  return { tasksPerMembers: null, isInitialLoaded: isFetchedAfterMount };
};
