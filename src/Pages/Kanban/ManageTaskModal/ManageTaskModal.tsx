import { useManageTaskModal } from 'Pages/Kanban/helpers/useManageTaskModal';
import { useGetTasksPerMembers } from 'Hooks/useGetTasksPerMembers';
import { TaskModalInfoType } from 'shared/types/Kanban.type';
import { Modal, Member } from 'Components';
import { CirclePicker } from 'react-color';
import { Button, TextField } from '@mui/material';
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
  const { tasksPerMembers } = useGetTasksPerMembers();
  const {
    manageTaskHandler,
    changeDescriptionHandler,
    changeNameHandler,
    isNameInvalid,
    isDescriptionInvalid,
    name,
    description,
    chosenMembers,
    members,
    changeMembersHandler,
    isDisabled,
    color,
    changeColorHandler,
  } = useManageTaskModal({ onClose, modalInfo });

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
            rows={4}
            focused
          />
        </div>
        <p style={{ color }}>Choose main color for task</p>
        <div style={{ marginBottom: '1rem' }}>
          <CirclePicker
            width="300px"
            colors={[
              '#2c3e50',
              '#3498db',
              '#9b59b6',
              '#2ecc71',
              '#1abc9c',
              '#f1c40f',
              '#e67e22',
            ]}
            color={color}
            onChange={changeColorHandler}
          />
        </div>
        <Select
          onChange={changeMembersHandler}
          maxMenuHeight={150}
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
            .filter(
              ({ taskCount, id }) =>
                (tasksPerMembers !== null &&
                  (taskCount < tasksPerMembers || tasksPerMembers === 0)) ||
                modalInfo.idMember.includes(id)
            )
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
              memberName={label}
              src={avatarSrc}
            />
          )}
        />
        <Button
          disabled={isDisabled}
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
