import { ColumnHeader } from 'Components/ColumnHeader/ColumnHeader';
import { ColumnType, TaskType } from 'shared/types/Kanban';
import { Droppable, Draggable } from 'react-beautiful-dnd';

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
        {...droppableProvided.droppableProps}
        ref={droppableProvided.innerRef}
        style={{
          display: 'flex',
          marginBottom: '1rem',
          marginLeft: '1rem',
          position: 'sticky',
          top: '0',
          backgroundColor: 'white',
          zIndex: 4,
        }}
      >
        {columns?.map(({ name, color, id, numberOfTasks, tasks }, index) => (
          <Draggable key={id} draggableId={`${id}`} index={index}>
            {(draggableProvided) => (
              <div style={{ marginRight: '1rem' }}>
                <div
                  {...draggableProvided.dragHandleProps}
                  {...draggableProvided.draggableProps}
                  ref={draggableProvided.innerRef}
                >
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
                </div>{' '}
              </div>
            )}
          </Draggable>
        ))}
        {droppableProvided.placeholder}
      </div>
    )}
  </Droppable>
);
