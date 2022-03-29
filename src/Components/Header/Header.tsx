import { useState } from 'react';
import { AddSectionModal } from 'Components';
import AddIcon from '@mui/icons-material/Add';
import Logo from 'assets/chadban.png';
import classes from './Header.module.scss';

export const Header = () => {
  const [isAddSectionModalOpen, setIsAddSectionModalOpen] = useState(false);

  const openModalHandler = () => setIsAddSectionModalOpen(true);

  const closeModalHandler = () => setIsAddSectionModalOpen(false);

  return (
    <header className={classes.header} data-testid="header">
      <img
        className={classes['header__logo']}
        src={Logo}
        alt="logo"
        width="260px"
        height="80px"
      />
      <button
        onClick={openModalHandler}
        className={classes['header__add-member-button']}
        type="button"
      >
        <AddIcon />
        Add Section
      </button>
      {isAddSectionModalOpen && <AddSectionModal onClose={closeModalHandler} />}
    </header>
  );
};
