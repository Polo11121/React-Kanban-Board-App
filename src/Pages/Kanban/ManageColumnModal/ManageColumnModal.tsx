import { Modal } from 'Components';
import { ColumnModalInfoType } from 'shared/types/Kanban';
import { useManageColumnModal } from 'Pages/Kanban/helpers/useManageColumnModal';
import { Button, TextField } from '@mui/material';
import { CirclePicker } from 'react-color';
import CloseIcon from '@mui/icons-material/Close';
import classes from './ManageColumnModal.module.scss';

type ManageColumnModalProps = {
  onClose: () => void;
  modalInfo: ColumnModalInfoType;
};

export const ManageColumnModal = ({
  onClose,
  modalInfo,
}: ManageColumnModalProps) => {
  const {
    manageColumnHandler,
    changeColorHandler,
    changeNumberOfTasksHandler,
    changeNumberOfTasksPerMemberHandler,
    changeNameHandler,
    isLoading,
    isNameInvalid,
    isNumberOfTasksInvalid,
    isNumberOfTasksPerMemberInvalid,
    haveValuesChanged,
    color,
    name,
    numberOfTasks,
    numberOfTasksPerMember,
  } = useManageColumnModal({ modalInfo, onClose });

  const isButtonDisabled =
    isNameInvalid ||
    isNumberOfTasksInvalid ||
    isLoading ||
    !haveValuesChanged ||
    isNumberOfTasksPerMemberInvalid;

  return (
    <Modal onClose={onClose}>
      <form
        data-testid="manage-column-modal"
        onSubmit={manageColumnHandler}
        className={classes['manage-column-modal']}
      >
        <CloseIcon
          onClick={onClose}
          color="warning"
          data-testid="close-manage-column-modal-icon"
          className={classes['manage-column-modal__exit-button']}
        />
        <h1 className={classes['manage-column-modal__title']}>
          {modalInfo.title} column
        </h1>
        <TextField
          error={isNameInvalid}
          helperText={isNameInvalid && 'Column name cannot be empty'}
          data-testid="column-name-input"
          margin="normal"
          label="Column name"
          color="secondary"
          focused
          value={name}
          onChange={changeNameHandler}
        />
        <TextField
          error={isNumberOfTasksInvalid}
          helperText={isNumberOfTasksInvalid && 'Invalid number of tasks'}
          data-testid="column-number-of-tasks-input"
          margin="normal"
          label="Maximum number of tasks"
          color="info"
          focused
          value={numberOfTasks}
          onChange={changeNumberOfTasksHandler}
        />
        <p style={{ fontSize: '10px', marginTop: '-8px', color: '#0288d1' }}>
          * Type 0 if you don`t want column to have maximum number of tasks
        </p>
        <TextField
          error={isNumberOfTasksPerMemberInvalid}
          helperText={
            isNumberOfTasksPerMemberInvalid && 'Invalid number of tasks'
          }
          data-testid="column-number-of-tasks-input"
          margin="normal"
          label="Number of tasks per member"
          color="success"
          focused
          value={numberOfTasksPerMember}
          onChange={changeNumberOfTasksPerMemberHandler}
        />
        <p style={{ fontSize: '10px', marginTop: '-8px', color: '#2e7d32' }}>
          * Type 0 if you don`t want column to have maximum number of tasks per
          member
        </p>
        <p style={{ color, marginTop: '1rem' }}>
          Choose main color for columns
        </p>
        <div style={{ margin: '1rem' }}>
          <CirclePicker onChangeComplete={changeColorHandler} color={color} />
        </div>
        <Button
          type="submit"
          disabled={isButtonDisabled}
          variant="contained"
          color="success"
        >
          {modalInfo.title}
        </Button>
      </form>
    </Modal>
  );
};
