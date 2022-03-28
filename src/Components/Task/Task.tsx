import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { trimText } from 'shared/helpers/formatters';
import classes from './Task.module.scss';

type TaskProps = {
  title: string;
  description: string;
  color: string;
  id: string;
  onDelete: (taskId: string) => void;
  onEdit: ({
    columnId,
    name,
    description,
    taskId,
  }: {
    columnId: string;
    name: string;
    description: string;
    taskId: string;
  }) => void;
  columnId: string;
};

export const Task = ({
  title,
  description,
  color,
  id,
  columnId,
  onDelete,
  onEdit,
}: TaskProps) => {
  const deleteTaskHandler = () => onDelete(id);

  const editTaskHandler = () =>
    onEdit({ columnId, name: title, description, taskId: id });

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
      </div>
    </article>
  );
};
