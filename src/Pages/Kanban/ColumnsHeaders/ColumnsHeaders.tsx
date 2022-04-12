import { ColumnType, TaskType } from 'shared/types/Kanban.type';
import { ColumnHeader, Draggable } from 'Components';
import { Droppable } from 'react-beautiful-dnd';
import classes from './ColumnsHeaders.module.scss';

type ColumnsHeadersType = {
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
  columns: ColumnType[];
};

export const ColumnsHeaders = ({
  columns,
  onDelete,
  onEdit,
}: ColumnsHeadersType) => (
  <Droppable direction="horizontal" key="column" droppableId="column">
    {(droppableProvided) => (
      <div
        className={classes['columns-headers']}
        {...droppableProvided.droppableProps}
        ref={droppableProvided.innerRef}
      >
        {columns?.map(({ name, color, id, numberOfTasks, tasks }, index) => (
          <Draggable key={id} id={id} index={index}>
            <div style={{ marginRight: '1rem' }}>
              <ColumnHeader
                key={id}
                title={name}
                color={color}
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
