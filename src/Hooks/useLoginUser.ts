import axios, { AxiosResponse } from 'axios';
import { useMutation } from 'react-query';

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

  const { mutate, isLoading, mutateAsync } = useMutation(loginUser, {
    onSuccess,
    onError,
  });

  return { mutateAsync, mutate, isLoading };
};
