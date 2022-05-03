import axios from 'axios';
import { useMutation } from 'react-query';

export const useAddMemberToTask = (
  onSuccess: () => void,
  onError: (data: any) => void
) => {
  const addMemberToTask = ({ id, userId }: { id: string; userId: string }) =>
    axios.patch(`http://localhost:3001/api/tasks/${id}/addUser`, {
      idUser: userId,
    });

  const { mutate, isLoading } = useMutation(addMemberToTask, {
    onSuccess,
    onError,
  });

  return { mutate, isLoading };
};
