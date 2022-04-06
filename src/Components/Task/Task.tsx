import { trimText } from 'shared/helpers/formatters';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AvatarGroup, Tooltip } from '@mui/material';
import { Member } from 'Components/Member/Member';
import { useGetMembers } from 'Hooks/useGetMembers';
import Avatar from 'react-avatar';

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
        <Tooltip arrow title={`${title.length > 8 ? title : ''}`}>
          <span style={{ cursor: 'pointer' }}>{trimText(title, 8)}</span>
        </Tooltip>
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
        <div style={{ flex: '1' }}>
          {trimText(description, members.length ? 100 : 125)}
        </div>
        <AvatarGroup className={classes['task__avatars']} spacing={5} max={6}>
          {taskMembers
            .sort((memberA, memberB) =>
              memberA.name.localeCompare(memberB.name)
            )
            .map(({ id: memberId, name, avatarSrc }) => (
              <Avatar
                key={memberId}
                name={name}
                src={avatarSrc}
                size="30"
                round="50px"
              />
            ))}
        </AvatarGroup>
      </div>
    </article>
  );
};
