import { ColumnType } from 'shared/types/Kanban.type';

export const countColumnHeight = (
  columns: ColumnType[],
  section: {
    id: string;
    name: string;
    taskLimit: number;
  }
) =>
  `${
    Math.max(
      1,
      ...columns.map(
        ({ tasks: columnTasks }) =>
          columnTasks.filter(({ idSection }) => idSection === section.id).length
      )
    ) *
      220 +
    18
  }px`;
