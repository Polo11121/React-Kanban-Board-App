import { ColumnType } from 'shared/types/Kanban.type';
import { useQuery } from 'react-query';
import axios from 'axios';

export const useGetColumns = () => {
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
              color: task.color,
            })),
          })
        )
      );

  const { data } = useQuery('columns', getColumns);

  return data || [];
};
