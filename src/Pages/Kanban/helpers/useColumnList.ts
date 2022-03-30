import { useState } from 'react';
import { useCustomToast } from 'shared/helpers/useCustomToast';
import { useManageColumn } from 'Hooks/useManageColumn';
import { useRemoveSection } from 'Hooks/useRemoveSection';
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
    idSection: '',
    idMember: [] as string[],
  });

  const hideModalHandler = () =>
    setManageTaskModalInfo({
      isOpen: false,
      columnId: '',
      name: '',
      description: '',
      taskId: '',
      title: 'add',
      idSection: '',
      idMember: [],
    });

  const showModalHandler = (id: string, idSection: string) =>
    setManageTaskModalInfo((prevInfo) => ({
      ...prevInfo,
      isOpen: true,
      columnId: id,
      idSection,
    }));

  const onSuccess = () => {
    setManageTaskModalInfo({
      isOpen: false,
      columnId: '',
      name: '',
      description: '',
      taskId: '',
      title: 'add',
      idSection: '',
      idMember: [],
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
    idSection,
    idMember,
  }: {
    columnId: string;
    name: string;
    description: string;
    taskId: string;
    idSection: string;
    idMember: string[];
  }) =>
    setManageTaskModalInfo({
      isOpen: true,
      columnId,
      name,
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
  };

  const { mutate: mutateRemoveSection } = useRemoveSection(
    onSuccessRemoveSection
  );

  const removeSectionHandler = (sectionId: string) =>
    mutateRemoveSection(sectionId);

  return {
    showModalHandler,
    deleteTaskHandler,
    editTaskHandler,
    manageTaskModalInfo,
    hideModalHandler,
    removeSectionHandler,
  };
};
