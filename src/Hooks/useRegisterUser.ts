import axios from 'axios';
import { useMutation } from 'react-query';
import { UserType } from 'shared/types/User.type';

export const useRegisterUser = (onError: (data: any) => void) => {
  const registerUser = ({ name, photo, email, password }: UserType) =>
    axios.post(
      'https://chadsoft-kanban-backend.herokuapp.com/api/users',
      photo
        ? {
            name,
            photo,
            email,
            password,
          }
        : {
            name,
            password,
            email,
          }
    );

  const { mutate, isLoading, mutateAsync } = useMutation(registerUser, {
    onError,
  });

  return { mutateAsync, mutate, isLoading };
};
