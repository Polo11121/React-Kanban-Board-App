import { useState } from 'react';
import { useCustomToast } from 'shared/helpers/useCustomToast';
import { useManageColumn } from 'Hooks/useManageColumn';
import { useQueryClient } from 'react-query';

export const useColumnList = () => {
  const queryClient = useQueryClient();
  const [manageTaskModalInfo, setManageTaskModalInfo] = useState({
    isOpen: false,
    columnId: '',
    name: '',
    description: '',
    taskId: '',
    title: 'add',
  });

  const hideModalHandler = () =>
    setManageTaskModalInfo({
      isOpen: false,
      columnId: '',
      name: '',
      description: '',
      taskId: '',
      title: 'add',
    });

  const showModalHandler = (id: string) =>
    setManageTaskModalInfo((prevInfo) => ({
      ...prevInfo,
      isOpen: true,
      columnId: id,
    }));

  const onSuccess = () => {
    setManageTaskModalInfo({
      isOpen: false,
      columnId: '',
      name: '',
      description: '',
      taskId: '',
      title: 'add',
    });
    useCustomToast({ text: 'Task successfully deleted', type: 'success' });
    queryClient.invalidateQueries('columns');
  };

  const { mutate } = useManageColumn(onSuccess);

  const deleteTaskHandler = (taskId: string) =>
    mutate({
      method: 'DELETE',
      endpoint: `tasks/${taskId}`,
    });

  const editTaskHandler = ({
    columnId,
    name,
    description,
    taskId,
  }: {
    columnId: string;
    name: string;
    description: string;
    taskId: string;
  }) =>
    setManageTaskModalInfo({
      isOpen: true,
      columnId,
      name,
      description,
      taskId,
      title: 'edit',
    });

  return {
    showModalHandler,
    deleteTaskHandler,
    editTaskHandler,
    manageTaskModalInfo,
    hideModalHandler,
  };
};
