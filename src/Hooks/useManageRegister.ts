import { AxiosResponse } from 'axios';
import { useLoginUser } from 'Hooks/useLoginUser';
import { useRegisterUser } from 'Hooks/useRegisterUser';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomToast } from 'shared/helpers/useCustomToast';

export const useManageRegister = (onRegister: (token: string) => void) => {
  const [inputValues, setInputValues] = useState({
    email: '',
    login: '',
    password: '',
    repeatedPassword: '',
    avatarUrl: '',
  });
  const [emailError, setEmailError] = useState(false);
  const [isInputValuesTouched, setIsInputValuesTouched] = useState({
    isLoginTouched: false,
    isPasswordTouched: false,
    email: false,
  });

  const navigate = useNavigate();
  const { login, password, repeatedPassword, email, avatarUrl } = inputValues;

  const changeEmailHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setIsInputValuesTouched((prevState) => ({
      ...prevState,
      email: true,
    }));
    setInputValues((prevState) => ({
      ...prevState,
      email: event.target.value,
    }));
    setEmailError(false);
  };

  const changeLoginHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setIsInputValuesTouched((prevState) => ({
      ...prevState,
      isLoginTouched: true,
    }));
    setInputValues((prevState) => ({
      ...prevState,
      login: event.target.value,
    }));
  };

  const changePasswordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setIsInputValuesTouched((prevState) => ({
      ...prevState,
      isPasswordTouched: true,
    }));
    setInputValues((prevState) => ({
      ...prevState,
      password: event.target.value,
    }));
  };

  const changeRepeatedPasswordHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setInputValues((prevState) => ({
      ...prevState,
      repeatedPassword: event.target.value,
    }));
  };

  const changeAvatarUrlHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setInputValues((prevState) => ({
      ...prevState,
      avatarUrl: event.target.value,
    }));

  const onError = (error: any) => {
    useCustomToast({ text: error.response.data.message, type: 'error' });
    setEmailError(true);
  };

  const onSuccess = (data: AxiosResponse<any, any>) => {
    useCustomToast({ text: data.data.message, type: 'success' });
    onRegister(data.data.token);
    sessionStorage.setItem(
      'token',
      JSON.stringify({ token: data.data.token, id: data.data.id })
    );
    navigate('/');
  };

  const { mutate: mutateLogin } = useLoginUser(onSuccess, onError);

  const { mutateAsync: mutateRegister } = useRegisterUser(onError);

  const registerHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutateRegister({
      email,
      name: login,
      password,
      photo: avatarUrl,
    }).then(() => mutateLogin({ email, password }));
  };

  const isButtonDisabled =
    !login ||
    password.length < 6 ||
    password !== repeatedPassword ||
    !email.includes('@') ||
    emailError;

  return {
    registerHandler,
    email,
    changeEmailHandler,
    isInputValuesTouched,
    emailError,
    login,
    changeLoginHandler,
    password,
    changePasswordHandler,
    repeatedPassword,
    changeRepeatedPasswordHandler,
    avatarUrl,
    changeAvatarUrlHandler,
    isButtonDisabled,
  };
};
