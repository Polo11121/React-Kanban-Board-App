import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { useGetColumns } from 'Hooks/useGetColumns';
import { useManageColumn } from 'Hooks/useManageColumn';
import { TaskType } from 'shared/types/Kanban';
import { useCustomToast } from 'shared/helpers/useCustomToast';

export const useKanban = () => {
  const queryClient = useQueryClient();
  const [manageColumnModalInfo, setManageColumnModalInfo] = useState({
    isOpen: false,
    name: '',
    tasks: [] as unknown as TaskType[],
    color: '',
    numberOfTasks: 0,
    id: '',
    title: 'add',
  });
  const { data } = useGetColumns();

  const hideModalHandler = () =>
    setManageColumnModalInfo({
      isOpen: false,
      name: '',
      tasks: [] as unknown as TaskType[],
      color: '',
      numberOfTasks: 0,
      id: '',
      title: 'add',
    });

  const showModalHandler = () =>
    setManageColumnModalInfo((prevInfo) => ({ ...prevInfo, isOpen: true }));

  const onSuccess = () => {
    setManageColumnModalInfo({
      isOpen: false,
      name: '',
      tasks: [] as unknown as TaskType[],
      color: '',
      numberOfTasks: 0,
      id: '',
      title: 'add',
    });
    useCustomToast({ text: 'Column successfully deleted', type: 'success' });
    queryClient.invalidateQueries('columns');
  };

  const { mutate } = useManageColumn(onSuccess);

  const deleteColumnHandler = (id: string) =>
    mutate({ method: 'DELETE', endpoint: `columns/${id}` });

  const editColumnHandler = ({
    id,
    name,
    numberOfTasks,
    color,
    tasks,
  }: {
    id: string;
    name: string;
    numberOfTasks: number;
    color: string;
    tasks: TaskType[];
  }) =>
    setManageColumnModalInfo({
      isOpen: true,
      name,
      tasks,
      color,
      numberOfTasks,
      id,
      title: 'edit',
    });

  return {
    editColumnHandler,
    deleteColumnHandler,
    showModalHandler,
    hideModalHandler,
    data,
    manageColumnModalInfo,
  };
};
