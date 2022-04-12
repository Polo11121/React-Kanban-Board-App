import { Modal, MembersList } from 'Components';
import CloseIcon from '@mui/icons-material/Close';
import classes from './MembersModal.module.scss';

export const MembersModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <Modal onClose={onClose}>
      <div className={classes['members-modal']}>
        <CloseIcon
          data-testid="close-members-modal-icon"
          onClick={onClose}
          color="warning"
          className={classes['members-modal__exit-button']}
        />
        <h1 className={classes['members-modal__title']}>MEMBERS</h1>
        <MembersList />
      </div>
    </Modal>
  );
};
