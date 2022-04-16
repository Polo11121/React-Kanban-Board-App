import { Button, TextField } from '@mui/material';
import { Member } from 'Components';
import { useGetMember } from 'Hooks/useGetMember';
import { useMembersList } from 'Pages/Kanban/helpers/useMembersList';
import classes from './MembersList.module.scss';

export const MembersList = ({
  onDelete,
}: {
  onDelete: ({ id, name }: { id: string; name: string }) => void;
}) => {
  const {
    members,
    isTasksPerMembersInvalid,
    tasksPerMembers,
    changeTaskPerMemberHandler,
    submitTasksPerMembersHandler,
    actualTasksPerMembers,
    minNumberOfTasks,
  } = useMembersList();
  const member = useGetMember(JSON.parse(sessionStorage.token).id);

  return (
    <div className={classes['members-list']}>
      <div className={classes['members-list__container']}>
        {members
          .sort((memberA, memberB) => memberA.name.localeCompare(memberB.name))
          .map(({ id, name, avatarSrc, taskCount }) => (
            <div key={id}>
              <Member
                memberId={id}
                onDelete={onDelete}
                numberOfTasks={taskCount}
                style={{ marginBottom: '1rem' }}
                memberName={name}
                src={avatarSrc}
                key={id}
                isAdmin={member.role === 'Admin'}
              />
            </div>
          ))}
      </div>
      <TextField
        error={isTasksPerMembersInvalid}
        helperText={
          isTasksPerMembersInvalid &&
          `Invalid number of tasks (min. ${minNumberOfTasks})`
        }
        data-testid="member-list-number-of-tasks-input"
        margin="normal"
        type="number"
        label="Maximum member tasks"
        color="info"
        focused
        value={tasksPerMembers}
        onChange={changeTaskPerMemberHandler}
      />
      <p className={classes['members-list__info-text']}>
        * Type 0 if you don`t want column to have maximum number of tasks per
        member
      </p>
      <Button
        onClick={submitTasksPerMembersHandler}
        disabled={
          isTasksPerMembersInvalid || actualTasksPerMembers === tasksPerMembers
        }
        variant="contained"
        color="success"
      >
        change
      </Button>
    </div>
  );
};
