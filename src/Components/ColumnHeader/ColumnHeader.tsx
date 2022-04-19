import { ColumnHeaderProps } from 'Components/ColumnHeader/ColumnHeaderProps.type';
import { trimText } from 'shared/helpers/formatters';
import { Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReportIcon from '@mui/icons-material/Report';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import classes from './ColumnHeader.module.scss';

export const ColumnHeader = ({
  numberOfTasks,
  onDelete,
  onEdit,
  id,
  tasks,
  title,
}: ColumnHeaderProps) => {
  const deleteColumnHandler = () =>
    onDelete({ id, title, warning: Boolean(tasks.length) });

  const editColumnHandler = () =>
    onEdit({
      id,
      name: title,
      numberOfTasks,
      tasks,
    });

  return (
    <div
      className={classes['column-header']}
      style={{
        backgroundColor: `${
          numberOfTasks && tasks.length > numberOfTasks ? 'red' : '#2c3e50'
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
          style={{}}
          className={
            tasks.length > numberOfTasks || numberOfTasks === 0
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
          <div className={classes['column-header__warning--icon']}>
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
