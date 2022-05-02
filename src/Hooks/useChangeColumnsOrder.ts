import { useMutation } from 'react-query';
import axios from 'axios';

export const useChangeColumnsOrder = (onSuccess?: () => void) => {
  const changeColumnsOrder = ({ columnsOrder }: { columnsOrder: string[] }) =>
    axios.patch(
      'http://localhost:3001/api/arrayColumns/624b532f3f95f547a043ea4c',
      {
        idColumns: columnsOrder,
      }
    );

  const { mutate, mutateAsync } = useMutation(changeColumnsOrder, {
    onSuccess,
  });

  return { mutateAsync, mutate };
};
