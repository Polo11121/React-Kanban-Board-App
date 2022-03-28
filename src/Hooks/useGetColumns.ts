import axios from 'axios';
import { ColumnType } from 'shared/types/Kanban';
import { useQuery } from 'react-query';

type useGetColumnsType = {
  columns: ColumnType[];
  isLoading: boolean;
};

export const useGetColumns = (): useGetColumnsType => {
  const getColumns = (): Promise<ColumnType[]> =>
    axios.get('http://localhost:3001/api/columns').then((resp) =>
      resp.data.map(
        (column: {
          [x: string]: any;
          name: any;
          numberOfTasks: any;
          color: any;
          numberOfTasksPerUsers: any;
          tasks: any[];
        }) => ({
          id: column['_id'],
          color: column.color,
          name: column.name,
          numberOfTasksPerUsers: column.numberOfTasksPerUsers,
          numberOfTasks: column.numberOfTasks,
          tasks: column.tasks.map((task) => ({
            id: task['_id'],
            name: task.name,
            description: task.description,
            column: task.column,
            idUser: task.idUser,
          })),
        })
      )
    );

  const { data, isLoading } = useQuery('columns', getColumns);

  return data
    ? { columns: data, isLoading }
    : { columns: [], isLoading: false };
};
