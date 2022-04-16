import { TaskListProps } from 'Pages/Kanban/TasksList/TaskListProps.type';
import { Task, Draggable } from 'Components';

export const TasksList = ({
  tasks,
  columnId,
  onDelete,
  onEdit,
  idSection,
  isTasksLoading,
  isDropDisabled,
}: TaskListProps) => (
  <>
    {tasks?.map(({ id, name, description, idMember, color }, index) => (
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
