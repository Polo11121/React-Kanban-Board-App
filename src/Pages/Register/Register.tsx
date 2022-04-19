import { useManageRegister } from 'Pages/Register/helpers/useManageRegister';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';
import Logo from 'assets/chadban.png';
import classes from './Register.module.scss';

export const Register = ({
  onRegister,
}: {
  onRegister: (token: string) => void;
}) => {
  const {
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
  } = useManageRegister(onRegister);

  return (
    <div className={classes.register}>
      <div className={classes['register__container']}>
        <img className={classes['register__logo']} src={Logo} alt="logo" />
        <form onSubmit={registerHandler} className={classes['register__form']}>
          <div className={classes['register__input-container']}>
            <input
              className={classes['register__input']}
              type="text"
              data-testid="register-email-input"
              value={email}
              onChange={changeEmailHandler}
              placeholder="Email"
            />
            <p
              data-testid="register-email-input-error"
              style={
                (!email.includes('@') && isInputValuesTouched.email) ||
                emailError
                  ? {}
                  : { visibility: 'hidden' }
              }
              className={classes['register__error']}
            >
              Invalid email
            </p>
          </div>
          <div className={classes['register__input-container']}>
            <input
              className={classes['register__input']}
              type="text"
              data-testid="register-login-input"
              value={login}
              onChange={changeLoginHandler}
              placeholder="Login"
            />
            <p
              data-testid="register-register-input-error"
              style={
                !login && isInputValuesTouched.isLoginTouched
                  ? {}
                  : { visibility: 'hidden' }
              }
              className={classes['register__error']}
            >
              Invalid login
            </p>
          </div>
          <div className={classes['register__password-input']}>
            <input
              className={classes['register__input']}
              type="password"
              data-testid="register-password-input"
              value={password}
              onChange={changePasswordHandler}
              placeholder="Password"
            />
            <p
              data-testid="register-password-input-error"
              style={
                password.length < 6 && isInputValuesTouched.isPasswordTouched
                  ? {}
                  : { visibility: 'hidden' }
              }
              className={classes['register__error']}
            >
              Invalid password (min. 6 characters)
            </p>
          </div>
          <div className={classes['register__input-container']}>
            <input
              className={classes['register__input']}
              type="password"
              value={repeatedPassword}
              onChange={changeRepeatedPasswordHandler}
              data-testid="register-repeatPassword-input"
              placeholder="Repeat password"
            />
            <p
              data-testid="register-repeatPassword-input-error"
              style={
                password !== repeatedPassword &&
                isInputValuesTouched.isPasswordTouched
                  ? {}
                  : { visibility: 'hidden' }
              }
              className={classes['register__error']}
            >
              Passwords must be equals
            </p>
          </div>
          <div
            className={classes['register__input']}
            style={{
              marginBottom: '2.35rem',
              display: 'flex',
              alignItems: 'center',
              paddingRight: '0',
              width: 'fitContent',
            }}
          >
            <input
              type="text"
              className={classes['register__avatar-input']}
              value={avatarUrl}
              onChange={changeAvatarUrlHandler}
              placeholder="Avatar url"
            />
            <Avatar name={login} src={avatarUrl} size="45px" round="50%" />
          </div>
          <button
            disabled={isButtonDisabled}
            type="submit"
            className={
              classes[
                `register__${isButtonDisabled ? 'button--disabled' : 'button'}`
              ]
            }
          >
            Register
          </button>
          <Link to="/login" className={classes['register__text']}>
            Have an Account Already? Login!
          </Link>
        </form>
      </div>
    </div>
  );
};
