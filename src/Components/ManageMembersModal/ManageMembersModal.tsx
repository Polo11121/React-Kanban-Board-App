import { Modal } from 'Components';
import { Button, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Member } from 'Components/Member/Member';
import { useManageMember } from 'Hooks/useManageMember';
import { MembersList } from 'Components/MembersList/MembersList';
import classes from './ManageMembersModal.module.scss';

export const ManageMembersModal = ({ onClose }: { onClose: () => void }) => {
  const {
    memberName,
    isMemberNameInvalid,
    memberNameHandler,
    memberAvatarSrcHandler,
    memberAvatarSrc,
    addMemberHandler,
  } = useManageMember();
  return (
    <Modal onClose={onClose}>
      <form
        onSubmit={addMemberHandler}
        data-testid="members-modal"
        className={classes['members-modal']}
      >
        <CloseIcon
          data-testid="close-members-modal-icon"
          onClick={onClose}
          color="warning"
          className={classes['members-modal__exit-button']}
        />

        <TextField
          helperText={isMemberNameInvalid && 'Member Name cannot be empty'}
          error={isMemberNameInvalid}
          data-testid="member-name-input"
          margin="normal"
          label="Member name"
          value={memberName}
          onChange={memberNameHandler}
          color="secondary"
          focused
        />
        <TextField
          data-testid="member-src-input"
          margin="normal"
          value={memberAvatarSrc}
          onChange={memberAvatarSrcHandler}
          label="Member avatar src"
          color="info"
          focused
        />
        <Member
          style={{ marginBottom: '1rem' }}
          name={memberName || 'Member name'}
          src={memberAvatarSrc}
        />
        <Button
          disabled={isMemberNameInvalid || !memberName}
          type="submit"
          variant="contained"
          color="success"
        >
          ADD MEMBER
        </Button>
      </form>
      <h1 className={classes['members-modal__title']}>MEMBERS</h1>
      <MembersList />
    </Modal>
  );
};
