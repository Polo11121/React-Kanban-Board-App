import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useGetColumnsOrder } from 'Hooks/useGetColumnsOrder';
import { useChangeColumnsOrder } from 'Hooks/useChangeColumnsOrder';
import { useManageColumn } from 'Hooks/useManageColumn';
import { useCustomToast } from 'shared/helpers/useCustomToast';
import { ColumnModalInfoType } from 'shared/types/Kanban.type';
import { useQueryClient } from 'react-query';

type useManageColumnModalProps = {
  onClose: () => void;
  modalInfo: ColumnModalInfoType;
};

export const useManageColumnModal = ({
  onClose,
  modalInfo,
}: useManageColumnModalProps) => {
  const queryClient = useQueryClient();
  const columnsOrder = useGetColumnsOrder();
  const [isValuesTouched, setIsValuesTouched] = useState({
    name: false,
    numberOfTasks: false,
  });
  const [inputValues, setInputValues] = useState({
    name: '',
    numberOfTasks: '',
  });
  const { name, numberOfTasks } = inputValues;

  const changeNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      name: event.target.value,
    }));
    setIsValuesTouched((prevValues) => ({
      ...prevValues,
      name: true,
    }));
  };

  const changeNumberOfTasksHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      numberOfTasks: event.target.value,
    }));
    setIsValuesTouched((prevValues) => ({
      ...prevValues,
      numberOfTasks: true,
    }));
  };

  const onSuccess = () => {
    queryClient.invalidateQueries('columns');
    useCustomToast({
      text: `Column successfully ${modalInfo.title}ed`,
      type: 'success',
    });
    onClose();
  };

  useEffect(() => {
    if (modalInfo.title === 'edit') {
      setInputValues({
        name: modalInfo.name,
        numberOfTasks: `${modalInfo.numberOfTasks}`,
      });
    }
  }, []);

  const isNameInvalid = !name.trim().length && isValuesTouched.name;
  const isNumberOfTasksInvalid =
    (!numberOfTasks.trim().match(/^[0-9]+[0-9]*$/) &&
      isValuesTouched.numberOfTasks) ||
    +numberOfTasks > 999999999;
  const haveValuesChanged =
    modalInfo.title === 'edit'
      ? name.trim() !== modalInfo.name ||
        +numberOfTasks !== modalInfo.numberOfTasks
      : isValuesTouched.name && isValuesTouched.numberOfTasks;

  const {
    mutate: mutateManageColumn,
    isLoading,
    mutateAsync,
  } = useManageColumn(onSuccess);

  const { mutateAsync: mutateColumnsOrder } = useChangeColumnsOrder();

  const manageColumnHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    modalInfo.title === 'add'
      ? mutateAsync({
          method: 'POST',
          payload: {
            name: name.trim(),
            numberOfTasks: +numberOfTasks,
          },
          endpoint: 'columns',
        }).then((resp) => {
          mutateColumnsOrder({
            columnsOrder: [...columnsOrder, resp.data.data['_id']],
          }).then(() => queryClient.invalidateQueries('columnsOrder'));
        })
      : mutateManageColumn({
          method: 'PUT',
          payload: {
            name: name.trim(),
            numberOfTasks: +numberOfTasks,
          },
          endpoint: `columns/${modalInfo.id}`,
        });
  };

  const isDisabled =
    isNameInvalid || isNumberOfTasksInvalid || isLoading || !haveValuesChanged;

  return {
    manageColumnHandler,
    changeNumberOfTasksHandler,
    changeNameHandler,
    isNameInvalid,
    isNumberOfTasksInvalid,
    name,
    numberOfTasks,
    isDisabled,
  };
};
