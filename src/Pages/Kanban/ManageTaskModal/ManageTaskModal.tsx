import { Modal } from 'Components';
import { useManageTaskModal } from 'Pages/Kanban/helpers/useManageTaskModal';
import { TaskModalInfoType } from 'shared/types/Kanban';
import { Button, TextField } from '@mui/material';
import { Member } from 'Components/Member/Member';
import Select from 'react-select';
import CloseIcon from '@mui/icons-material/Close';
import classes from './ManageTaskModal.module.scss';

type ManageTaskModalProps = {
  onClose: () => void;
  modalInfo: TaskModalInfoType;
};

export const ManageTaskModal = ({
  onClose,
  modalInfo,
}: ManageTaskModalProps) => {
  const {
    manageTaskHandler,
    changeDescriptionHandler,
    changeNameHandler,
    isLoading,
    isNameInvalid,
    isDescriptionInvalid,
    haveValuesChanged,
    name,
    description,
    chosenMembers,
    members,
    changeMembersHandler,
  } = useManageTaskModal({ onClose, modalInfo });

  const isButtonDisabled =
    isNameInvalid || isDescriptionInvalid || isLoading || !haveValuesChanged;

  return (
    <Modal onClose={onClose}>
      <form
        data-testid="manage-task-modal"
        onSubmit={manageTaskHandler}
        className={classes['manage-task-modal']}
      >
        <CloseIcon
          data-testid="close-manage-task-modal-icon"
          onClick={onClose}
          color="warning"
          className={classes['manage-task-modal__exit-button']}
        />
        <h1 className={classes['manage-task-modal__title']}>
          {modalInfo.title} task
        </h1>
        <TextField
          helperText={isNameInvalid && 'Task Name cannot be empty'}
          error={isNameInvalid}
          data-testid="task-name-input"
          value={name}
          onChange={changeNameHandler}
          margin="normal"
          label="Task name"
          color="secondary"
          focused
        />
        <div style={{ width: '80%' }}>
          <TextField
            helperText={isDescriptionInvalid && 'Task Name cannot be empty'}
            error={isDescriptionInvalid}
            data-testid="task-description-input"
            value={description}
            onChange={changeDescriptionHandler}
            margin="normal"
            label="Description"
            color="info"
            multiline
            fullWidth
            rows={5}
            focused
          />
        </div>
        <Select
          onChange={changeMembersHandler}
          maxMenuHeight={200}
          styles={{
            valueContainer: (provided) => ({
              ...provided,
              maxHeight: '85px',
              overflow: 'auto',
            }),
          }}
          placeholder="Assign members to task"
          isMulti
          value={chosenMembers}
          className={classes['manage-task-modal__select']}
          closeMenuOnSelect={false}
          options={members
            .sort((memberA, memberB) =>
              memberA.name.localeCompare(memberB.name)
            )
            .map(({ id, name: memberName, avatarSrc }) => ({
              value: id,
              label: memberName,
              avatarSrc,
            }))}
          // eslint-disable-next-line react/no-unstable-nested-components
          formatOptionLabel={({ label, avatarSrc }) => (
            <Member
              style={{ width: 'fit-content' }}
              size="30"
              fontSize="1rem"
              name={label}
              src={avatarSrc}
            />
          )}
        />
        <Button
          disabled={isButtonDisabled}
          type="submit"
          variant="contained"
          color="success"
        >
          {modalInfo.title}
        </Button>
      </form>
    </Modal>
  );
};
