import { useQuery } from 'react-query';
import axios from 'axios';

type UseGetColumnsOrder = { data: string[]; isLoading: boolean };

export const useGetColumnsOrder = (): UseGetColumnsOrder => {
  const getColumnsOrder = (): Promise<string[]> =>
    axios
      .get('http://localhost:3001/api/arrayColumns')
      .then((resp) => resp.data[0]?.idColumns);

  const { data, isFetching } = useQuery('columnsOrder', getColumnsOrder);

  if (data) {
    return { data, isLoading: isFetching };
  }
  return { data: [], isLoading: isFetching };
};
