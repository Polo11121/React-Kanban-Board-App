import { Task } from 'Components';
import { Draggable } from 'react-beautiful-dnd';
import { TaskType } from 'shared/types/Kanban';

type TaskListProps = {
  tasks: TaskType[];
  color: string;
  onDelete: (taskId: string) => void;
  idSection: string;
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

export const TasksList = ({
  tasks,
  columnId,
  color,
  onDelete,
  onEdit,
  idSection,
}: TaskListProps) => (
  <>
    {tasks?.map(({ id, name, description }, index) => (
      <Draggable
        key={id}
        draggableId={`${columnId}-${idSection}-${id}`}
        index={index}
      >
        {(draggableProvided) => (
          <div
            {...draggableProvided.dragHandleProps}
            {...draggableProvided.draggableProps}
            ref={draggableProvided.innerRef}
          >
            <Task
              idSection={idSection}
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
