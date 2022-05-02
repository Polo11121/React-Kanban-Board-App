import { useQuery } from 'react-query';
import axios from 'axios';

export const useGetColumnsOrder = () => {
  const getColumnsOrder = (): Promise<string[]> =>
    axios
      .get('http://localhost:3001/api/arrayColumns')
      .then((resp) => resp.data[0]?.idColumns);

  const { data } = useQuery('columnsOrder', getColumnsOrder);

  return data || [];
};
