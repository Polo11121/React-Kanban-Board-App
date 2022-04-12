import { useManageSectionModal } from 'Pages/Kanban/helpers/useManageSectionModal';
import { Modal } from 'Components';
import { Button, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import classes from './AddSectionModal.module.scss';

export const AddSectionModal = ({ onClose }: { onClose: () => void }) => {
  const {
    addSectionHandler,
    isSectionMaximumNumberOfTasksInvalid,
    isSectionNameInvalid,
    sectionMaximumNumberOfTasks,
    sectionMaximumNumberOfTasksHandler,
    sectionName,
    sectionNameHandler,
    isDisabled,
  } = useManageSectionModal(onClose);

  return (
    <Modal onClose={onClose}>
      <form
        onSubmit={addSectionHandler}
        data-testid="add-section-modal"
        className={classes['add-section-modal']}
      >
        <CloseIcon
          data-testid="close-add-section-modal-icon"
          onClick={onClose}
          color="warning"
          className={classes['add-section-modal__exit-button']}
        />
        <h1 className={classes['add-section-modal__title']}>ADD SECTION</h1>
        <TextField
          error={isSectionNameInvalid}
          helperText={isSectionNameInvalid && 'Section name cannot be empty'}
          data-testid="section-name-input"
          value={sectionName}
          onChange={sectionNameHandler}
          margin="normal"
          label="Section name"
          color="secondary"
          focused
        />
        <TextField
          error={isSectionMaximumNumberOfTasksInvalid}
          helperText={
            isSectionMaximumNumberOfTasksInvalid && 'Invalid number of tasks'
          }
          data-testid="column-number-of-tasks-input"
          margin="normal"
          label="Maximum number of tasks"
          color="info"
          focused
          value={sectionMaximumNumberOfTasks}
          onChange={sectionMaximumNumberOfTasksHandler}
        />
        <p className={classes['add-section__info-text']}>
          * Type 0 if you don`t want section to have maximum number of tasks
        </p>
        <Button
          disabled={isDisabled}
          type="submit"
          variant="contained"
          color="success"
        >
          ADD SECTION
        </Button>
      </form>
    </Modal>
  );
};
