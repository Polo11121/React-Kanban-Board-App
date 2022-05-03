import { useMutation } from 'react-query';
import axios, { Method } from 'axios';

type payloadTaskType = {
  name?: string;
  description?: string;
  column?: string;
  idUser?: string[];
  idSection?: string;
  color?: string;
  index?: number;
  prevColumn?: string;
};

type payloadColumnType = {
  name: string;
  numberOfTasks: number;
};

type useManageTaskProps = {
  method: Method;
  payload?: payloadTaskType | payloadColumnType;
  endpoint: string;
};

export const useManageColumn = (onSuccess?: () => void) => {
  const manageColumn = ({ method, payload, endpoint }: useManageTaskProps) =>
    axios.request({
      url: `http://localhost:3001/api/${endpoint}`,
      method,
      data: payload || null,
    });

  const { mutate, isLoading, mutateAsync } = useMutation(manageColumn, {
    onSuccess,
  });

  return { mutateAsync, mutate, isLoading };
};
