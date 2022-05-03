import { useState, useEffect } from 'react';
import { useGetColumns } from 'Hooks/useGetColumns';
import { useManageColumn } from 'Hooks/useManageColumn';
import { useGetTasksPerMembers } from 'Hooks/useGetTasksPerMembers';
import { useGetSections } from 'Hooks/useGetSections';
import { useGetMembers } from 'Hooks/useGetMembers';
import { useGetColumnsOrder } from 'Hooks/useGetColumnsOrder';
import { useChangeColumnsOrder } from 'Hooks/useChangeColumnsOrder';
import { ColumnType, TaskType } from 'shared/types/Kanban.type';
import { useCustomToast } from 'shared/helpers/useCustomToast';
import { useQueryClient } from 'react-query';

export const useKanban = () => {
  const initialState = {
    isOpen: false,
    name: '',
    tasks: [] as unknown as TaskType[],
    numberOfTasks: 0,
    id: '',
    title: 'add',
  };
  const [deleteInfo, setDeleteInfo] = useState({
    id: '',
    title: '',
    warning: false,
  });
  const [columnsData, setColumnsData] = useState<null | ColumnType[]>(null);
  const [manageColumnModalInfo, setManageColumnModalInfo] =
    useState(initialState);
  const { data: columns, isLoading: isColumnsLoading } = useGetColumns();
  const { sections, isInitialLoaded: isSectionsInitialLoaded } =
    useGetSections();
  const { isInitialLoaded: isMembersInitialLoaded } = useGetMembers();
  const { isInitialLoaded: isTasksPerMembersInitialLoaded } =
    useGetTasksPerMembers();
  const { data: columnsOrder, isLoading: isColumnsOrderLoading } =
    useGetColumnsOrder();
  const queryClient = useQueryClient();

  const hideModalHandler = () => setManageColumnModalInfo(initialState);

  const onCloseDelete = () =>
    setDeleteInfo({ id: '', title: '', warning: false });

  const showModalHandler = () =>
    setManageColumnModalInfo((prevInfo) => ({ ...prevInfo, isOpen: true }));

  const onSuccess = () => {
    setManageColumnModalInfo(initialState);
    useCustomToast({ text: 'Column successfully removed', type: 'success' });
    queryClient.invalidateQueries('columns');
    onCloseDelete();
  };

  const { mutateAsync } = useManageColumn(onSuccess);

  const { mutateAsync: mutateColumnsOrder } = useChangeColumnsOrder();

  const onDelete = ({
    id,
    title,
    warning,
  }: {
    id: string;
    title: string;
    warning: boolean;
  }) => setDeleteInfo({ id, title, warning });

  const deleteColumnHandler = () =>
    mutateAsync({
      method: 'DELETE',
      endpoint: `columns/${deleteInfo.id}`,
    }).then(() =>
      mutateColumnsOrder({
        columnsOrder: columnsOrder.filter(
          (columnId) => columnId !== deleteInfo.id
        ),
      }).then(() => {
        queryClient
          .invalidateQueries('columnsOrder')
          .then(() => queryClient.invalidateQueries('columns'));
      })
    );

  const editColumnHandler = ({
    id,
    name,
    numberOfTasks,
    tasks,
  }: {
    id: string;
    name: string;
    numberOfTasks: number;
    tasks: TaskType[];
  }) =>
    setManageColumnModalInfo({
      isOpen: true,
      name,
      tasks,
      numberOfTasks,
      id,
      title: 'edit',
    });

  useEffect(() => {
    if (columns.length === columnsOrder.length) {
      setColumnsData(
        columnsOrder.map((columnId) =>
          columns.find(({ id }) => columnId === id)
        ) as ColumnType[]
      );
    }
  }, [isColumnsLoading, isColumnsOrderLoading]);

  return {
    editColumnHandler,
    deleteColumnHandler,
    showModalHandler,
    hideModalHandler,
    columns: columnsData,
    setColumns: setColumnsData,
    manageColumnModalInfo,
    sections: [...sections.slice(1), ...sections.slice(0, 1)],
    isInitialLoading:
      !isMembersInitialLoaded ||
      !isSectionsInitialLoaded ||
      !isTasksPerMembersInitialLoaded,
    columnsOrder,
    deleteInfo,
    onDelete,
    onCloseDelete,
  };
};
