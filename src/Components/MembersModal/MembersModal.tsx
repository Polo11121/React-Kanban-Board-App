import { Modal, MembersList } from 'Components';
import CloseIcon from '@mui/icons-material/Close';
import classes from './MembersModal.module.scss';

export const MembersModal = ({
  onClose,
  onDelete,
}: {
  onClose: () => void;
  onDelete: ({ id, name }: { id: string; name: string }) => void;
}) => {
  return (
    <Modal onClose={onClose}>
      <div data-testid="members-modal" className={classes['members-modal']}>
        <CloseIcon
          data-testid="members-modal-close-icon"
          onClick={onClose}
          color="warning"
          className={classes['members-modal__exit-button']}
        />
        <h1 className={classes['members-modal__title']}>MEMBERS</h1>
        <MembersList onDelete={onDelete} />
      </div>
    </Modal>
  );
};
