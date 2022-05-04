import { ColumnType, TaskType } from 'shared/types/Kanban.type';
import { useQuery } from 'react-query';
import axios from 'axios';

type UseGetColumnsType = { data: ColumnType[]; isLoading: boolean };

export const useGetColumns = (): UseGetColumnsType => {
  const getColumns = (): Promise<ColumnType[]> =>
    axios
      .get('https://chadsoft-kanban-backend.herokuapp.com/api/tasks')
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

  const { data, isFetching } = useQuery('columns', getColumns);

  if (data && !isFetching) {
    return { data, isLoading: isFetching };
  }
  return { data: [], isLoading: isFetching };
};
