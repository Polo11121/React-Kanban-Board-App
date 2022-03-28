import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useCustomToast } from 'shared/helpers/useCustomToast';
import { useQueryClient } from 'react-query';
import { TaskModalInfoType } from 'shared/types/Kanban';
import { useManageColumn } from 'Hooks/useManageColumn';
import { useGetColumns } from 'Hooks/useGetColumns';

type UseManageTaskModalProps = {
  onClose: () => void;
  modalInfo: TaskModalInfoType;
};

export const useManageTaskModal = ({
  onClose,
  modalInfo,
}: UseManageTaskModalProps) => {
  const queryClient = useQueryClient();
  const [isValuesTouched, setIsValuesTouched] = useState({
    name: false,
    description: false,
  });
  const [inputValues, setInputValues] = useState({
    name: '',
    description: '',
  });
  const { name, description } = inputValues;
  const { data: columns } = useGetColumns();

  const changeNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setIsValuesTouched((prevValues) => ({
      ...prevValues,
      name: true,
    }));
    setInputValues((prevValues) => ({
      ...prevValues,
      name: event.target.value,
    }));
  };

  const changeDescriptionHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setIsValuesTouched((prevValues) => ({
      ...prevValues,
      description: true,
    }));
    setInputValues((prevValues) => ({
      ...prevValues,
      description: event.target.value,
    }));
  };

  const onSuccess = () => {
    queryClient.invalidateQueries('columns');
    useCustomToast({
      text: `Task successfully ${modalInfo.title}ed`,
      type: 'success',
    });
    const column = columns.find(({ id }) => id === modalInfo.columnId);
    if (
      column &&
      column?.tasks.length >= column?.numberOfTasks &&
      column.numberOfTasks
    ) {
      useCustomToast({
        text: `Maximum number of tasks allowed in ${column.name} column has been reached`,
        type: 'error',
        autoClose: 2500,
      });
    }

    onClose();
  };

  useEffect(() => {
    setInputValues({
      name: modalInfo.name,
      description: modalInfo.description,
    });
  }, []);

  const isNameInvalid = !name.trim().length && isValuesTouched.name;
  const isDescriptionInvalid =
    !description.trim().length && isValuesTouched.description;
  const haveValuesChanged =
    modalInfo.title === 'edit'
      ? name.trim() !== modalInfo.name ||
        description.trim() !== modalInfo.description
      : isValuesTouched.name && isValuesTouched.description;

  const { mutate, isLoading } = useManageColumn(onSuccess);

  const manageTaskHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    modalInfo.title === 'add'
      ? mutate({
          method: 'POST',
          payload: {
            name: name.trim(),
            description: description.trim(),
            column: modalInfo.columnId,
          },
          endpoint: `tasks`,
        })
      : mutate({
          method: 'PUT',
          payload: {
            name: name.trim(),
            description: description.trim(),
            column: modalInfo.columnId,
          },
          endpoint: `tasks/${modalInfo.taskId}`,
        });
  };

  return {
    manageTaskHandler,
    changeDescriptionHandler,
    changeNameHandler,
    isLoading,
    isNameInvalid,
    isDescriptionInvalid,
    haveValuesChanged,
    name,
    description,
  };
};
