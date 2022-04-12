import { useQuery } from 'react-query';
import axios from 'axios';

export const useGetColumnsOrder = () => {
  const getColumnsOrder = (): Promise<string[]> =>
    axios
      .get('https://chadsoft-kanban-backend.herokuapp.com/api/arrayColumns')
      .then((resp) => resp.data[0]?.idColumns);

  const { data } = useQuery('columnsOrder', getColumnsOrder);

  return data || [];
};
