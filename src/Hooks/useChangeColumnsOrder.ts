import axios from 'axios';
import { useMutation } from 'react-query';

export const useChangeColumnsOrder = (onSuccess: () => void) => {
  const changeColumnsOrder = ({ columnsOrder }: { columnsOrder: string[] }) =>
    axios.patch(
      'http://localhost:3001/api/arrayColumns/6243194d91f6c62c8149342b',
      {
        idColumns: columnsOrder,
      }
    );

  const { mutate, isLoading, mutateAsync } = useMutation(changeColumnsOrder, {
    onSuccess,
  });

  return { mutateAsync, mutate, isLoading };
};
