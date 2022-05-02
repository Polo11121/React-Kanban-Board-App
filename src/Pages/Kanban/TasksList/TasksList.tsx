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
  tasksOrder,
}: TaskListProps) => (
  <>
    {tasksOrder
      .map((order) => tasks.find(({ id }) => order === id))
      ?.map(
        (task, index) =>
          task && (
            <Draggable
              isDragDisabled={isTasksLoading}
              key={task.id}
              id={`${columnId}-${idSection}-${task.id}`}
              index={index}
            >
              <Task
                isDisabled={isTasksLoading}
                isDropDisabled={isDropDisabled || isTasksLoading}
                members={task.idMember}
                idSection={idSection}
                onEdit={onEdit}
                columnId={columnId}
                onDelete={onDelete}
                title={task.name}
                description={task.description}
                key={task.id}
                id={task.id}
                color={task.color}
              />
            </Draggable>
          )
      )}
  </>
);
