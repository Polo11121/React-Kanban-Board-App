import { useMutation } from 'react-query';
import axios, { AxiosResponse } from 'axios';

export const useLoginUser = (
  onSuccess: (data: AxiosResponse<any, any>) => void,
  onError?: (data: AxiosResponse<any, any>) => void
) => {
  const loginUser = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) =>
    axios.post('https://chadsoft-kanban-backend.herokuapp.com/api/login', {
      email,
      password,
    });

  const { mutate, mutateAsync, isLoading } = useMutation(loginUser, {
    onSuccess,
    onError,
  });

  return { mutateAsync, mutate, isLoading };
};
