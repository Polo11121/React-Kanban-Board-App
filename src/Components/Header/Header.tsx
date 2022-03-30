import { useState } from 'react';
import { AddSectionModal } from 'Components';
import { ManageMembersModal } from 'Components/ManageMembersModal/ManageMembersModal';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import Logo from 'assets/chadban.png';
import classes from './Header.module.scss';

export const Header = () => {
  const [isAddSectionModalOpen, setIsAddSectionModalOpen] = useState(false);
  const [isManageMembersModalOpen, setIsManageMembersModalOpen] =
    useState(false);

  const openSectionModalHandler = () => setIsAddSectionModalOpen(true);

  const closeSectionModalHandler = () => setIsAddSectionModalOpen(false);

  const openMembersModalHandler = () => setIsManageMembersModalOpen(true);

  const closeMembersModalHandler = () => setIsManageMembersModalOpen(false);

  return (
    <header className={classes.header} data-testid="header">
      <img
        className={classes['header__logo']}
        src={Logo}
        alt="logo"
        width="260px"
        height="80px"
      />
      <div className={classes['header__buttons']}>
        <button
          onClick={openMembersModalHandler}
          className={classes['header__button']}
          type="button"
        >
          <PersonIcon />
          Members
        </button>
        <button
          onClick={openSectionModalHandler}
          className={classes['header__button']}
          type="button"
        >
          <AddIcon />
          Add Section
        </button>
      </div>
      {isAddSectionModalOpen && (
        <AddSectionModal onClose={closeSectionModalHandler} />
      )}
      {isManageMembersModalOpen && (
        <ManageMembersModal onClose={closeMembersModalHandler} />
      )}
    </header>
  );
};
