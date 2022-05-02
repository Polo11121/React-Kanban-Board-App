import { ColumnType, TaskType } from 'shared/types/Kanban.type';
import { useQuery } from 'react-query';
import axios from 'axios';

export const useGetColumns = () => {
  const getColumns = (): Promise<ColumnType[]> =>
    axios
      .get('http://localhost:3001/api/tasks')
      .then((respTasks) =>
        respTasks.data.map(
          (task: {
            [x: string]: any;
            name: any;
            description: any;
            column: any;
            idMember: any;
            idSection: any;
            color: any;
          }) => ({
            id: task['_id'],
            name: task.name,
            description: task.description,
            column: task.column,
            idMember: task.idUser,
            idSection: task.idSection,
            color: task.color,
          })
        )
      )
      .then((tasks) =>
        axios.get('http://localhost:3001/api/columns').then((resp) =>
          resp.data.map(
            (column: {
              [x: string]: any;
              name: any;
              numberOfTasks: any;
              color: any;
              tasks: any[];
            }) => ({
              arrayOfTasks: column.arrayOfTasks,
              id: column['_id'],
              color: column.color,
              name: column.name,
              numberOfTasks: column.numberOfTasks,
              tasks: tasks.filter(
                (task: TaskType) => task.column === column['_id']
              ),
            })
          )
        )
      );

  const { data } = useQuery('columns', getColumns);

  return data || [];
};
