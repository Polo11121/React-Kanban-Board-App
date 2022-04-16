import { TaskType } from 'shared/types/Kanban.type';

export type ColumnHeaderProps = {
  title: string;
  numberOfTasks: number;
  onDelete: ({
    id,
    title,
    warning,
  }: {
    id: string;
    title: string;
    warning: boolean;
  }) => void;
  onEdit: ({
    id,
    name,
    numberOfTasks,
    tasks,
  }: {
    id: string;
    name: string;
    numberOfTasks: number;
    tasks: TaskType[];
  }) => void;
  id: string;
  tasks: TaskType[];
};
