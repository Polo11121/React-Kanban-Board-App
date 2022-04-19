export type TaskProps = {
  isDropDisabled: boolean;
  title: string;
  description: string;
  color: string;
  id: string;
  idSection: string;
  isDisabled: boolean;
  members: string[];
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
  onEdit: ({
    columnId,
    name,
    description,
    taskId,
    color,
    idMember,
    idSection,
  }: {
    columnId: string;
    name: string;
    color: string;
    description: string;
    taskId: string;
    idMember: string[];
    idSection: string;
  }) => void;
  columnId: string;
};
