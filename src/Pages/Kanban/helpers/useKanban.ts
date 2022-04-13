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
    color: '',
    numberOfTasks: 0,
    id: '',
    title: 'add',
  };
  const [columnsData, setColumnsData] = useState<null | ColumnType[]>(null);
  const [manageColumnModalInfo, setManageColumnModalInfo] =
    useState(initialState);
  const columns = useGetColumns();
  const { sections, isInitialLoaded: isSectionsInitialLoaded } =
    useGetSections();
  const { isInitialLoaded: isMembersInitialLoaded } = useGetMembers();
  const { isInitialLoaded: isTasksPerMembersInitialLoaded } =
    useGetTasksPerMembers();
  const columnsOrder = useGetColumnsOrder();
  const queryClient = useQueryClient();

  const hideModalHandler = () => setManageColumnModalInfo(initialState);

  const showModalHandler = () =>
    setManageColumnModalInfo((prevInfo) => ({ ...prevInfo, isOpen: true }));

  const onSuccess = () => {
    setManageColumnModalInfo(initialState);
    useCustomToast({ text: 'Column successfully deleted', type: 'success' });
    queryClient.invalidateQueries('columns');
  };

  const { mutateAsync } = useManageColumn(onSuccess);

  const { mutateAsync: mutateColumnsOrder } = useChangeColumnsOrder();

  const deleteColumnHandler = (id: string) =>
    mutateAsync({ method: 'DELETE', endpoint: `columns/${id}` }).then(() =>
      mutateColumnsOrder({
        columnsOrder: columnsOrder.filter((columnId) => columnId !== id),
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
    color,
    tasks,
  }: {
    id: string;
    name: string;
    color: string;
    numberOfTasks: number;
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

  useEffect(() => {
    if (columns.length === columnsOrder.length) {
      setColumnsData(
        columnsOrder.map((columnId) =>
          columns.find(({ id }) => columnId === id)
        ) as ColumnType[]
      );
    }
  }, [columns, columnsOrder]);

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
  };
};
