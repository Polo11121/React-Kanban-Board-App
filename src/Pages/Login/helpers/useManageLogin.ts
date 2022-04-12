import { ChangeEvent, FormEvent, useState } from 'react';
import { useLoginUser } from 'Hooks/useLoginUser';
import { useCustomToast } from 'shared/helpers/useCustomToast';
import { useNavigate } from 'react-router-dom';

export const useManageLogin = (onLogin: (token: string) => void) => {
  const [inputValues, setInputValues] = useState({ email: '', password: '' });
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { email, password } = inputValues;

  const changeEmailHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setInputValues((prevState) => ({
      ...prevState,
      email: event.target.value,
    }));
  };

  const changePasswordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setInputValues((prevState) => ({
      ...prevState,
      password: event.target.value,
    }));
  };

  const onError = () => {
    useCustomToast({
      text: 'Invalid login or password!',
      type: 'error',
    });
    setError(true);
  };
  const onSuccess = (data: any) => {
    useCustomToast({ text: data.data.message, type: 'success' });
    onLogin(data.data.token);
    sessionStorage.setItem(
      'token',
      JSON.stringify({ token: data.data.token, id: data.data.id })
    );
    navigate('/kanban');
  };

  const { mutateAsync: mutateLogin, isLoading } = useLoginUser(
    onSuccess,
    onError
  );

  const loginHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutateLogin({ email, password });
  };

  return {
    loginHandler,
    email,
    changeEmailHandler,
    password,
    changePasswordHandler,
    error,
    isLoading,
  };
};
