import axios from 'axios';
import { useQuery } from 'react-query';

type useGetSectionsType = {
  columnsOrder: string[];
  isLoading: boolean;
};

export const useGetColumnsOrder = (): useGetSectionsType => {
  const getColumnsOrder = () =>
    axios
      .get('http://localhost:3001/api/arrayColumns')
      .then((resp) => resp.data[0].idColumns);

  const { data, isLoading } = useQuery('columnsOrder', getColumnsOrder);

  return data
    ? { columnsOrder: data, isLoading }
    : { columnsOrder: [], isLoading: false };
};
