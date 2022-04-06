import Logo from 'assets/chadban.png';
import Avatar from 'react-avatar';
import { useManageRegister } from 'Hooks/useManageRegister';
import { Link } from 'react-router-dom';
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
          <div style={{ marginBottom: '1rem' }}>
            <input
              className={classes['register__input']}
              style={{ width: '174px' }}
              type="text"
              value={email}
              onChange={changeEmailHandler}
              placeholder="Email"
            />
            <p
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
          <div style={{ marginBottom: '1rem' }}>
            <input
              style={{ width: '174px' }}
              className={classes['register__input']}
              type="text"
              value={login}
              onChange={changeLoginHandler}
              placeholder="Login"
            />
            <p
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
          <div
            style={{
              marginBottom: '1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <input
              className={classes['register__input']}
              style={{ width: '174px' }}
              type="password"
              value={password}
              onChange={changePasswordHandler}
              placeholder="Password"
            />
            <p
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
          <div style={{ marginBottom: '1rem' }}>
            <input
              style={{ width: '174px' }}
              className={classes['register__input']}
              type="password"
              value={repeatedPassword}
              onChange={changeRepeatedPasswordHandler}
              placeholder="Repeat password"
            />
            <p
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
            }}
          >
            <input
              style={{
                height: '100%',
                border: 0,
                backgroundColor: 'inherit',
                outline: 'none',
                marginRight: '5px',
                width: '134px',
              }}
              type="text"
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
