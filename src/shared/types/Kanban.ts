export type TaskType = {
  id: string;
  name: string;
  description: string;
  column: string;
  idUser: string;
};

export type ColumnType = {
  id: string;
  color: string;
  name: string;
  numberOfTasks: number;
  tasks: TaskType[];
  numberOfTasksPerUsers: number;
};

export type ColumnModalInfoType = {
  isOpen: boolean;
  name: string;
  numberOfTasks: number;
  numberOfTasksPerMember: number;
  color: string;
  tasks: TaskType[];
  id: string;
  title: string;
};

export type TaskModalInfoType = {
  isOpen: boolean;
  name: string;
  description: string;
  columnId: string;
  taskId: string;
  title: string;
  idUser: string;
};
