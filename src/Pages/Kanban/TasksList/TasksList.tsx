import { Task } from 'Components';
import { Draggable } from 'react-beautiful-dnd';
import { TaskType } from 'shared/types/Kanban';

type TaskListProps = {
  tasks: TaskType[];
  color: string;
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

export const TasksList = ({
  tasks,
  columnId,
  color,
  onDelete,
  onEdit,
}: TaskListProps) => (
  <>
    {tasks?.map(({ id, name, description }, index) => (
      <Draggable key={id} draggableId={`${columnId}-${id}`} index={index}>
        {(draggableProvided) => (
          <div
            {...draggableProvided.dragHandleProps}
            {...draggableProvided.draggableProps}
            ref={draggableProvided.innerRef}
          >
            <Task
              onEdit={onEdit}
              columnId={columnId}
              onDelete={onDelete}
              title={name}
              description={description}
              key={id}
              id={id}
              color={color}
            />
          </div>
        )}
      </Draggable>
    ))}
  </>
);
