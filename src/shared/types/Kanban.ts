export type TaskType = {
  id: string;
  name: string;
  description: string;
  column: string;
  idMember: string;
  idSection: string;
};

export type ColumnType = {
  id: string;
  color: string;
  name: string;
  numberOfTasks: number;
  tasks: TaskType[];
};

export type ColumnModalInfoType = {
  isOpen: boolean;
  name: string;
  numberOfTasks: number;
  color: string;
  tasks: TaskType[];
  id: string;
  title: string;
};

export type TaskModalInfoType = {
  isOpen: boolean;
  columnId: string;
  name: string;
  description: string;
  taskId: string;
  title: string;
  idSection: string;
  idMember: string[];
};
