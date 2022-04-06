import { TaskType } from 'shared/types/Kanban';
import { useCustomToast } from 'shared/helpers/useCustomToast';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReportIcon from '@mui/icons-material/Report';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import { Tooltip } from '@mui/material';
import { trimText } from 'shared/helpers/formatters';
import classes from './ColumnHeader.module.scss';

type ColumnHeaderProps = {
  title: string;
  color: string;
  numberOfTasks: number;
  onDelete: (id: string) => void;
  onEdit: ({
    id,
    name,
    numberOfTasks,
    color,
    tasks,
  }: {
    id: string;
    name: string;
    numberOfTasks: number;
    color: string;
    tasks: TaskType[];
  }) => void;
  id: string;
  tasks: TaskType[];
};

export const ColumnHeader = ({
  color,
  numberOfTasks,
  onDelete,
  onEdit,
  id,
  tasks,
  title,
}: ColumnHeaderProps) => {
  const deleteColumnHandler = () => {
    if (tasks.length) {
      useCustomToast({
        text: `Remove tasks from ${title} column first`,
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
      color,
      tasks,
    });

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
        <div style={{ cursor: 'pointer' }}>
          <Tooltip arrow title={`${title.length > 15 ? title : ''}`}>
            <span>{trimText(title, 15)}</span>
          </Tooltip>
        </div>
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
