import { Modal } from 'Components';
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import classes from './DeleteModal.module.scss';

type DeleteModalType = {
  onDelete: () => void;
  onClose: () => void;
  deleteTitle: string;
  deleteItem: string;
  additionalInfo?: string | boolean;
  isDisabled?: boolean;
};
export const DeleteModal = ({
  onClose,
  deleteTitle,
  deleteItem,
  additionalInfo,
  isDisabled,
  onDelete,
}: DeleteModalType) => {
  return (
    <Modal onClose={onClose}>
      <div data-testid="delete-modal" className={classes['delete-modal']}>
        <CloseIcon
          data-testid="close-delete-modal-icon"
          onClick={onClose}
          color="warning"
          className={classes['delete-modal__exit-button']}
        />
        <h1 className={classes['delete-modal__title']}>DELETE {deleteTitle}</h1>
        <p className={classes['delete-modal__text']}>
          Are you sure you want to delete {deleteItem}?
        </p>
        <p className={classes['delete-modal__text']}>{additionalInfo}</p>
        <div className={classes['delete-modal__buttons']}>
          <Button onClick={onClose} variant="contained" color="success">
            cancel
          </Button>
          <Button
            data-testid="delete-button"
            disabled={isDisabled}
            onClick={onDelete}
            variant="contained"
            color="warning"
          >
            delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};
