import { useState } from 'react';
import { AddSectionModal } from 'Components';
import { MembersModal } from 'Components/MembersModal/MembersModal';
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { useGetMember } from 'Hooks/useGetMember';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from 'react-avatar';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import Logo from 'assets/chadban.png';
import classes from './Header.module.scss';

export const Header = ({ onLogout }: { onLogout: () => void }) => {
  const [isAddSectionModalOpen, setIsAddSectionModalOpen] = useState(false);
  const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { member } = useGetMember(JSON.parse(sessionStorage.token).id);

  const openSectionModalHandler = () => setIsAddSectionModalOpen(true);

  const closeSectionModalHandler = () => setIsAddSectionModalOpen(false);

  const openMembersModalHandler = () => setIsMembersModalOpen(true);

  const closeMembersModalHandler = () => setIsMembersModalOpen(false);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

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
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          onClick={handleClick}
          style={{
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
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
      {isMembersModalOpen && (
        <MembersModal onClose={closeMembersModalHandler} />
      )}
    </header>
  );
};
