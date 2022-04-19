export type TaskType = {
  id: string;
  name: string;
  description: string;
  column: string;
  idMember: string[];
  idSection: string;
  color: string;
};

export type ColumnType = {
  id: string;

  name: string;
  numberOfTasks: number;
  tasks: TaskType[];
};

export type ColumnModalInfoType = {
  isOpen: boolean;
  name: string;
  numberOfTasks: number;

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
  color: string;
};

export type MemberType = {
  id: string;
  name: string;
  avatarSrc: string;
  email: string;
  taskCount: number;
};
