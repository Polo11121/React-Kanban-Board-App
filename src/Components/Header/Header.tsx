import { useHeader } from 'Pages/Kanban/helpers/useHeader';
import { AddSectionModal, MembersModal, DeleteModal } from 'Components';
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from 'react-avatar';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import Logo from 'assets/chadban.png';
import classes from './Header.module.scss';

export const Header = ({ onLogout }: { onLogout: () => void }) => {
  const {
    openMembersModalHandler,
    openSectionModalHandler,
    handleClick,
    member,
    anchorEl,
    open,
    handleClose,
    isAddSectionModalOpen,
    closeSectionModalHandler,
    isMembersModalOpen,
    closeMembersModalHandler,
    deleteInfo,
    onDelete,
    onCloseDelete,
    handleRemoveMember,
  } = useHeader();

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
      <div className={classes['header__user-info']}>
        <div className={classes['header__user-avatar']} onClick={handleClick}>
          <Avatar
            name={member.name}
            src={member.photo || member.name}
            round="50px"
            size="40px"
          />
          <span>{member.name || ''}</span>
        </div>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={onLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>
      </div>
      {isAddSectionModalOpen && (
        <AddSectionModal onClose={closeSectionModalHandler} />
      )}
      {isMembersModalOpen && !deleteInfo.id && (
        <MembersModal onDelete={onDelete} onClose={closeMembersModalHandler} />
      )}
      {deleteInfo.id && (
        <DeleteModal
          onDelete={handleRemoveMember}
          onClose={onCloseDelete}
          deleteTitle="Member"
          deleteItem={`"${deleteInfo.name}" Member`}
        />
      )}
    </header>
  );
};
