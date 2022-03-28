import { IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import Logo from 'assets/chadban.png';
import classes from './Header.module.scss';

export const Header = () => (
  <header className={classes.header} data-testid="header">
    <img
      className={classes['header__logo']}
      src={Logo}
      alt="logo"
      width="260px"
      height="80px"
    />
    <IconButton className={classes['header__logout']}>
      <LogoutIcon />
      <span>Logout</span>
    </IconButton>
  </header>
);
