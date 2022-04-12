import { useManageLogin } from 'Pages/Login/helpers/useManageLogin';
import { Link } from 'react-router-dom';
import Logo from 'assets/chadban.png';
import classes from './Login.module.scss';

export const Login = ({ onLogin }: { onLogin: (token: string) => void }) => {
  const {
    loginHandler,
    email,
    changeEmailHandler,
    password,
    changePasswordHandler,
    error,
    isLoading,
  } = useManageLogin(onLogin);

  return (
    <div className={classes.login}>
      <div className={classes['login__container']}>
        <img className={classes['login__logo']} src={Logo} alt="logo" />
        <form onSubmit={loginHandler} className={classes['login__form']}>
          <input
            value={email}
            onChange={changeEmailHandler}
            className={classes['login__input']}
            type="text"
            placeholder="Email"
          />
          <input
            value={password}
            onChange={changePasswordHandler}
            className={classes['login__input']}
            type="password"
            placeholder="Password"
          />
          <button
            disabled={isLoading}
            type="submit"
            className={
              classes[`login__${isLoading ? 'button--disabled' : 'button'}`]
            }
          >
            Login
          </button>
          <p
            style={error ? {} : { visibility: 'hidden' }}
            className={classes['login__error']}
          >
            Invalid login or password!
          </p>
          <Link to="/register" className={classes['login__text']}>
            Don`t have an account yet? Register!
          </Link>
        </form>
      </div>
    </div>
  );
};
