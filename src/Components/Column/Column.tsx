import { ReactNode } from 'react';
import { useCustomToast } from 'shared/helpers/useCustomToast';
import { TaskType } from 'shared/types/Kanban';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReportIcon from '@mui/icons-material/Report';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import { Tooltip } from '@mui/material';
import classes from './Column.module.scss';

type ColumnProps = {
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
  children: ReactNode;
};

export const Column = ({
  title,
  color,
  numberOfTasks,
  onDelete,
  onEdit,
  id,
  tasks,
  children,
}: ColumnProps) => {
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
      color,
      tasks,
    });

  return (
    <section className={classes.column} data-testid={`${title}-column`}>
      <div
        className={classes['column__header']}
        style={{ backgroundColor: color }}
      >
        <div className={classes['column__info']}>
          <div style={{ cursor: 'pointer' }}>{title}</div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            className={
              tasks.length > numberOfTasks
                ? classes['column__count--warning']
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
            <div className={classes['column__warrning--icon']}>
              <ReportIcon fontSize="medium" />
            </div>
          </Tooltip>
        )}
        <div className={classes['column__icons']}>
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
      <div className={classes['column__content']}>{children}</div>
    </section>
  );
};
