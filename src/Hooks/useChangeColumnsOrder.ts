import { useMutation } from 'react-query';
import axios from 'axios';

export const useChangeColumnsOrder = (onSuccess?: () => void) => {
  const changeColumnsOrder = ({ columnsOrder }: { columnsOrder: string[] }) =>
    axios.patch(
      'https://chadsoft-kanban-backend.herokuapp.com/api/arrayColumns/624b532f3f95f547a043ea4c',
      {
        idColumns: columnsOrder,
      }
    );

  const { mutate, mutateAsync } = useMutation(changeColumnsOrder, {
    onSuccess,
  });

  return { mutateAsync, mutate };
};
