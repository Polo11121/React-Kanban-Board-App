import { Task, Draggable } from 'Components';
import { TaskType } from 'shared/types/Kanban.type';

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
  isDropDisabled: boolean;
  isTasksLoading: boolean;
};

export const TasksList = ({
  tasks,
  columnId,
  color,
  onDelete,
  onEdit,
  idSection,
  isTasksLoading,
  isDropDisabled,
}: TaskListProps) => (
  <>
    {tasks?.map(({ id, name, description, idMember }, index) => (
      <Draggable
        isDragDisabled={isTasksLoading}
        key={id}
        id={`${columnId}-${idSection}-${id}`}
        index={index}
      >
        <Task
          isDisabled={isTasksLoading}
          isDropDisabled={isDropDisabled || isTasksLoading}
          members={idMember}
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
      </Draggable>
    ))}
  </>
);
