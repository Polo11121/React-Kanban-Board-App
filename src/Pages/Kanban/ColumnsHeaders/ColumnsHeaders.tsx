import { ColumnHeader } from 'Components/ColumnHeader/ColumnHeader';
import { ColumnType, TaskType } from 'shared/types/Kanban';

type ColumnsHeadersType = {
  onDelete: (id: string) => void;
  onEdit: ({
    id,
    name,
    numberOfTasks,
    numberOfTasksPerMember,
    color,
    tasks,
  }: {
    id: string;
    name: string;
    numberOfTasks: number;
    numberOfTasksPerMember: number;
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
  <div
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
    {columns.map(
      ({ name, color, id, numberOfTasks, tasks, numberOfTasksPerUsers }) => (
        <ColumnHeader
          numberOfTasksPerUsers={numberOfTasksPerUsers}
          title={name}
          color={color}
          numberOfTasks={numberOfTasks}
          onDelete={onDelete}
          onEdit={onEdit}
          id={id}
          tasks={tasks}
        />
      )
    )}
  </div>
);
