import { useState } from 'react';
import { useCustomToast } from 'shared/helpers/useCustomToast';
import { useManageColumn } from 'Hooks/useManageColumn';
import { useRemoveSection } from 'Hooks/useRemoveSection';
import { useQueryClient } from 'react-query';

export const useColumnList = () => {
  const [deleteInfo, setDeleteInfo] = useState({
    title: '',
    name: '',
    id: '',
    warning: false,
  });
  const initialState = {
    isOpen: false,
    columnId: '',
    name: '',
    description: '',
    taskId: '',
    title: 'add',
    idSection: '',
    color: '',
    idMember: [] as string[],
  };
  const queryClient = useQueryClient();
  const [manageTaskModalInfo, setManageTaskModalInfo] = useState(initialState);

  const hideModalHandler = () => setManageTaskModalInfo(initialState);

  const showModalHandler = (id: string, idSection: string) =>
    setManageTaskModalInfo((prevInfo) => ({
      ...prevInfo,
      isOpen: true,
      columnId: id,
      idSection,
    }));

  const onCloseDelete = () =>
    setDeleteInfo({ title: '', name: '', id: '', warning: false });

  const onSuccess = () => {
    setManageTaskModalInfo(initialState);
    useCustomToast({ text: 'Task successfully removed', type: 'success' });
    queryClient.invalidateQueries('columns');
    onCloseDelete();
  };

  const { mutate: mutateManageColumn } = useManageColumn(onSuccess);

  const deleteTaskHandler = () =>
    mutateManageColumn({
      method: 'DELETE',
      endpoint: `tasks/${deleteInfo.id}`,
    });

  const editTaskHandler = ({
    columnId,
    name,
    description,
    taskId,
    color,
    idSection,
    idMember,
  }: {
    columnId: string;
    name: string;
    description: string;
    taskId: string;
    color: string;
    idSection: string;
    idMember: string[];
  }) =>
    setManageTaskModalInfo({
      isOpen: true,
      columnId,
      name,
      color,
      description,
      taskId,
      title: 'edit',
      idSection,
      idMember,
    });

  const onSuccessRemoveSection = () => {
    useCustomToast({
      text: `Section successfully removed`,
      type: 'success',
    });

    queryClient.invalidateQueries('columns');
    queryClient.invalidateQueries('sections');
    onCloseDelete();
  };

  const mutateRemoveSection = useRemoveSection(onSuccessRemoveSection);

  const onDelete = ({
    title,
    name,
    id,
    warning,
  }: {
    title: string;
    name: string;
    id: string;
    warning: boolean;
  }) => setDeleteInfo({ title, name, id, warning });

  const removeSectionHandler = () => mutateRemoveSection(deleteInfo.id);

  return {
    showModalHandler,
    deleteTaskHandler,
    editTaskHandler,
    manageTaskModalInfo,
    hideModalHandler,
    removeSectionHandler,
    onDelete,
    deleteInfo,
    onCloseDelete,
  };
};
