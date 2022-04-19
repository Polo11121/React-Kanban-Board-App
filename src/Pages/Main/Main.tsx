import { useNavigate } from 'react-router-dom';
import Logo from 'assets/chadban.png';
import classes from './Main.module.scss';

export const Main = () => {
  const navigate = useNavigate();

  const goToLoginPage = () => navigate('/login');

  const goToRegisterPage = () => navigate('/register');

  return (
    <div className={classes.main}>
      <div>
        <img
          data-testid="main-logo"
          className={classes['main__logo']}
          src={Logo}
          alt="logo"
        />
        <div className={classes['main__buttons']}>
          <button
            onClick={goToLoginPage}
            className={classes['main__button']}
            type="button"
          >
            Login
          </button>
          <button
            onClick={goToRegisterPage}
            className={classes['main__button']}
            type="button"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};
