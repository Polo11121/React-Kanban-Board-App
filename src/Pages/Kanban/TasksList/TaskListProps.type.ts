import { TaskType } from 'shared/types/Kanban.type';

export type TaskListProps = {
  tasks: TaskType[];
  onDelete: ({
    title,
    name,
    id,
    warning,
  }: {
    title: string;
    name: string;
    id: string;
    warning: boolean;
  }) => void;
  idSection: string;
  onEdit: ({
    columnId,
    name,
    description,
    taskId,
    idMember,
    idSection,
    color,
  }: {
    columnId: string;
    name: string;
    description: string;
    taskId: string;
    color: string;
    idMember: string[];
    idSection: string;
  }) => void;
  columnId: string;
  isDropDisabled: boolean;
  isTasksLoading: boolean;
  tasksOrder: string[];
};
