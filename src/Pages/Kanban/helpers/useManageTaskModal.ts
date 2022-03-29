import { useGetSections } from 'Hooks/useGetSections';
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
  const { columns } = useGetColumns();
  const { sections } = useGetSections();

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
    const column = columns.find(({ id }) => id === modalInfo.columnId);
    queryClient.invalidateQueries('columns');
    useCustomToast({
      text: `Task successfully ${modalInfo.title}ed`,
      type: 'success',
    });

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

    const sectionTaskLimit = sections.find(
      ({ id }) => id === modalInfo.idSection
    )?.taskLimit;

    const sectionName = sections.find(
      ({ id }) => id === modalInfo.idSection
    )?.name;

    const sectionTasks = columns.reduce(
      (sum, columnn) =>
        sum +
        columnn.tasks.filter(
          ({ idSection }) => idSection === modalInfo.idSection
        ).length,
      0
    );

    if (column && sectionTaskLimit && sectionTasks >= sectionTaskLimit) {
      useCustomToast({
        text: `Maximum number of tasks allowed in ${sectionName} section has been reached`,
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
            idMember: ['624305f531cea3da70a37245'],
            idSection: modalInfo.idSection,
          },
          endpoint: `tasks`,
        })
      : mutate({
          method: 'PUT',
          payload: {
            name: name.trim(),
            description: description.trim(),
            column: modalInfo.columnId,
            idMember: ['624305f531cea3da70a37245'],
            idSection: modalInfo.idSection,
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
