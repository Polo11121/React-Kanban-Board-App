import axios from 'axios';
import { ColumnType } from 'shared/types/Kanban';
import { useQuery } from 'react-query';

type useGetColumnsType = {
  columns: ColumnType[];
  isLoading: boolean;
};

export const useGetColumns = (): useGetColumnsType => {
  const getColumns = (): Promise<ColumnType[]> =>
    axios
      .get('https://chadsoft-kanban-backend.herokuapp.com/api/columns')
      .then((resp) =>
        resp.data.map(
          (column: {
            [x: string]: any;
            name: any;
            numberOfTasks: any;
            color: any;
            tasks: any[];
          }) => ({
            id: column['_id'],
            color: column.color,
            name: column.name,
            numberOfTasks: column.numberOfTasks,
            tasks: column.tasks.map((task) => ({
              id: task['_id'],
              name: task.name,
              description: task.description,
              column: task.column,
              idMember: task.idMember,
              idSection: task.idSection,
            })),
          })
        )
      );

  const { data, isLoading } = useQuery('columns', getColumns);

  return data
    ? { columns: data, isLoading }
    : { columns: [], isLoading: false };
};
