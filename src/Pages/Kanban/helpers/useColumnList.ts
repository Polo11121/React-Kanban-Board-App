import { useState } from 'react';
import { useCustomToast } from 'shared/helpers/useCustomToast';
import { useManageColumn } from 'Hooks/useManageColumn';
import { useRemoveMember } from 'Hooks/useRemoveMember';
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
    idUser: '',
  });

  const hideModalHandler = () =>
    setManageTaskModalInfo({
      isOpen: false,
      columnId: '',
      name: '',
      description: '',
      taskId: '',
      title: 'add',
      idUser: '',
    });

  const showModalHandler = (id: string, idUser: string) =>
    setManageTaskModalInfo((prevInfo) => ({
      ...prevInfo,
      isOpen: true,
      columnId: id,
      idUser,
    }));

  const onSuccess = () => {
    setManageTaskModalInfo({
      isOpen: false,
      columnId: '',
      name: '',
      description: '',
      taskId: '',
      title: 'add',
      idUser: '',
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
    idUser,
  }: {
    columnId: string;
    name: string;
    description: string;
    taskId: string;
    idUser: string;
  }) =>
    setManageTaskModalInfo({
      isOpen: true,
      columnId,
      name,
      description,
      taskId,
      title: 'edit',
      idUser,
    });

  const onSuccessRemoveMember = () => {
    useCustomToast({
      text: 'Member successfully removed',
      type: 'success',
    });
    queryClient.invalidateQueries('columns');
    queryClient.invalidateQueries('users');
  };

  const { mutate: mutateRemoveMember } = useRemoveMember(onSuccessRemoveMember);

  const removeMemberHandler = (userId: string) => mutateRemoveMember(userId);

  return {
    showModalHandler,
    deleteTaskHandler,
    editTaskHandler,
    manageTaskModalInfo,
    hideModalHandler,
    removeMemberHandler,
  };
};
