import { ColumnHeader, Draggable } from 'Components';
import { Droppable } from 'react-beautiful-dnd';
import { ColumnsHeadersType } from './ColumnsHeadersProps.type';
import classes from './ColumnsHeaders.module.scss';

export const ColumnsHeaders = ({
  columns,
  onDelete,
  onEdit,
}: ColumnsHeadersType) => (
  <Droppable direction="horizontal" key="column" droppableId="column">
    {(droppableProvided) => (
      <div
        style={{ width: `${257.59 * columns.length}px` }}
        className={classes['columns-headers']}
        {...droppableProvided.droppableProps}
        ref={droppableProvided.innerRef}
      >
        {columns?.map(({ name, id, numberOfTasks, tasks }, index) => (
          <Draggable key={id} id={id} index={index}>
            <div style={{ marginRight: '1rem' }}>
              <ColumnHeader
                key={id}
                title={name}
                numberOfTasks={numberOfTasks}
                onDelete={onDelete}
                onEdit={onEdit}
                id={id}
                tasks={tasks}
              />
            </div>
          </Draggable>
        ))}
        {droppableProvided.placeholder}
      </div>
    )}
  </Droppable>
);
