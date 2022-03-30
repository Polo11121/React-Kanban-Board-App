import { trimText } from 'shared/helpers/formatters';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import { Tooltip } from '@mui/material';
import { Member } from 'Components/Member/Member';
import { useGetMembers } from 'Hooks/useGetMembers';
import GroupIcon from '@mui/icons-material/Group';
import classes from './Task.module.scss';

type TaskProps = {
  title: string;
  description: string;
  color: string;
  id: string;
  idSection: string;
  members: string[];
  onDelete: (taskId: string) => void;
  onEdit: ({
    columnId,
    name,
    description,
    taskId,
    idMember,
    idSection,
  }: {
    columnId: string;
    name: string;
    description: string;
    taskId: string;
    idMember: string[];
    idSection: string;
  }) => void;
  columnId: string;
};

export const Task = ({
  title,
  idSection,
  description,
  color,
  id,
  members,
  columnId,
  onDelete,
  onEdit,
}: TaskProps) => {
  const deleteTaskHandler = () => onDelete(id);

  const editTaskHandler = () =>
    onEdit({
      columnId,
      name: title,
      description,
      taskId: id,
      idSection,
      idMember: members,
    });

  const { members: allMembers } = useGetMembers();

  const taskMembers = allMembers.filter(({ id: memberId }) =>
    members.includes(memberId)
  );

  return (
    <article className={classes.task} data-testid={`${title}-task`}>
      <div
        className={classes['task__header']}
        style={{ backgroundColor: color }}
      >
        {trimText(title, 10)}
        <div className={classes['task__icons']}>
          <EditIcon
            onClick={editTaskHandler}
            style={{ cursor: 'pointer' }}
            fontSize="small"
            data-testid={`task-${title}-edit-icon`}
          />
          <DeleteIcon
            style={{ cursor: 'pointer' }}
            onClick={deleteTaskHandler}
            fontSize="small"
            data-testid={`task-${title}-delete-icon`}
          />
        </div>
      </div>
      <div className={classes['task__content']}>
        {trimText(description, 125)}
        <Tooltip
          placement="bottom"
          title={taskMembers
            .sort((memberA, memberB) =>
              memberA.name.localeCompare(memberB.name)
            )
            .map(({ id: memberId, name, avatarSrc }) => (
              <Member
                key={memberId}
                style={{
                  width: 'fit-content',
                  color: 'white',
                  margin: '0.3rem',
                }}
                size="30"
                fontSize="1rem"
                name={name}
                src={avatarSrc}
              />
            ))}
        >
          <div className={classes['task__members']}>
            {members.length === 1 && <PersonIcon />}
            {members.length > 1 && (
              <>
                {members.length}
                <GroupIcon />
              </>
            )}
          </div>
        </Tooltip>
      </div>
    </article>
  );
};
