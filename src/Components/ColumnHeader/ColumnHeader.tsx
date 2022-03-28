import { TaskType } from 'shared/types/Kanban';
import { useCustomToast } from 'shared/helpers/useCustomToast';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReportIcon from '@mui/icons-material/Report';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import { Tooltip } from '@mui/material';
import classes from './ColumnHeader.module.scss';

type ColumnHeaderProps = {
  title: string;
  color: string;
  numberOfTasks: number;
  numberOfTasksPerUsers: number;
  onDelete: (id: string) => void;
  onEdit: ({
    id,
    name,
    numberOfTasks,
    numberOfTasksPerMember,
    color,
    tasks,
  }: {
    id: string;
    name: string;
    numberOfTasks: number;
    numberOfTasksPerMember: number;
    color: string;
    tasks: TaskType[];
  }) => void;
  id: string;
  tasks: TaskType[];
};

export const ColumnHeader = ({
  color,
  numberOfTasks,
  numberOfTasksPerUsers,
  onDelete,
  onEdit,
  id,
  tasks,
  title,
}: ColumnHeaderProps) => {
  const deleteColumnHandler = () => {
    if (tasks.length) {
      useCustomToast({
        text: 'Remove tasks from column before removing it',
        type: 'error',
      });
    } else {
      onDelete(id);
    }
  };

  const editColumnHandler = () =>
    onEdit({
      id,
      name: title,
      numberOfTasks,
      numberOfTasksPerMember: numberOfTasksPerUsers,
      color,
      tasks,
    });

  console.log(numberOfTasksPerUsers);
  return (
    <div
      className={classes['column-header']}
      style={{
        backgroundColor: `${
          numberOfTasks && tasks.length > numberOfTasks ? 'red' : color
        }`,
      }}
    >
      <div className={classes['column-header__info']}>
        <div style={{ cursor: 'pointer' }}>{title}</div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className={
            tasks.length > numberOfTasks
              ? classes['column-header__count--warning']
              : ''
          }
        >
          {tasks.length}/
          {numberOfTasks || <AllInclusiveIcon fontSize="small" />}
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          (
          {numberOfTasksPerUsers || (
            <AllInclusiveIcon
              style={{ marginRight: '0.4rem' }}
              fontSize="small"
            />
          )}
          {` per
          member)`}
        </div>
      </div>
      {tasks.length > numberOfTasks && Boolean(numberOfTasks) && (
        <Tooltip
          placement="bottom"
          title={`Maximum number of tasks allowed in ${title} column has been reached. Close, move or remove task to fix this error!`}
        >
          <div className={classes['column-header__warrning--icon']}>
            <ReportIcon fontSize="medium" />
          </div>
        </Tooltip>
      )}
      <div className={classes['column-header__icons']}>
        <EditIcon
          style={{ cursor: 'pointer' }}
          onClick={editColumnHandler}
          fontSize="small"
          data-testid={`column-${title}-edit-icon`}
        />
        <DeleteIcon
          style={{ cursor: 'pointer' }}
          onClick={deleteColumnHandler}
          fontSize="small"
          data-testid={`column-${title}-delete-icon`}
        />
      </div>
    </div>
  );
};

export default ColumnHeader;
