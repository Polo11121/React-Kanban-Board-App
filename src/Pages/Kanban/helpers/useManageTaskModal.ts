import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useGetMembers } from 'Hooks/useGetMembers';
import { useGetSections } from 'Hooks/useGetSections';
import { useManageColumn } from 'Hooks/useManageColumn';
import { useGetColumns } from 'Hooks/useGetColumns';
import { useCustomToast } from 'shared/helpers/useCustomToast';
import { TaskModalInfoType } from 'shared/types/Kanban.type';
import { useQueryClient } from 'react-query';
import { ColorResult } from 'react-color';

type UseManageTaskModalProps = {
  onClose: () => void;
  modalInfo: TaskModalInfoType;
};

export const useManageTaskModal = ({
  onClose,
  modalInfo,
}: UseManageTaskModalProps) => {
  const [isValuesTouched, setIsValuesTouched] = useState({
    name: false,
    description: false,
  });
  const [color, setColor] = useState('#2c3e50');
  const [inputValues, setInputValues] = useState<{
    name: string;
    description: string;
    members: { value: string; label: string; avatarSrc: string }[] | null;
  }>({
    name: '',
    description: '',
    members: null,
  });
  const { name, description, members: chosenMembers } = inputValues;
  const columns = useGetColumns();
  const { sections } = useGetSections();
  const { members } = useGetMembers();
  const queryClient = useQueryClient();

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

  const changeMembersHandler = (event: any) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      members: event,
    }));
  };

  const changeColorHandler = (pickedColor: ColorResult) =>
    setColor(pickedColor.hex);

  const onSuccess = () => {
    const column = columns.find(({ id }) => id === modalInfo.columnId);
    queryClient.invalidateQueries('columns');
    queryClient.invalidateQueries('members');
    useCustomToast({
      text: `Task successfully ${modalInfo.title}ed`,
      type: 'success',
    });

    if (
      modalInfo.title === 'add' &&
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

    if (
      modalInfo.title === 'add' &&
      column &&
      sectionTaskLimit &&
      sectionTasks >= sectionTaskLimit
    ) {
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
      members: members
        .filter(({ id }) => modalInfo.idMember.includes(id))
        .map(({ id, name: memberName, avatarSrc }) => ({
          value: id,
          label: memberName,
          avatarSrc,
        })),
    });

    if (modalInfo.title === 'edit') {
      setColor(modalInfo.color);
    }
  }, []);

  const isNameInvalid = !name.trim().length && isValuesTouched.name;
  const isDescriptionInvalid =
    !description.trim().length && isValuesTouched.description;
  const haveValuesChanged =
    modalInfo.title === 'edit'
      ? (name && name.trim() !== modalInfo.name) ||
        (description && description.trim() !== modalInfo.description) ||
        (chosenMembers &&
          chosenMembers
            .map(({ value }) => value)
            .sort()
            .join(',') !== modalInfo.idMember.sort().join(',')) ||
        color !== modalInfo.color
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
            idMember: inputValues.members
              ? inputValues.members.map(({ value }) => value)
              : [],
            idSection: modalInfo.idSection,
            color,
          },
          endpoint: `tasks`,
        })
      : mutate({
          method: 'PUT',
          payload: {
            name: name.trim(),
            description: description.trim(),
            column: modalInfo.columnId,
            idMember: inputValues.members
              ? inputValues.members.map(({ value }) => value)
              : [],
            idSection: modalInfo.idSection,
            color,
          },
          endpoint: `tasks/${modalInfo.taskId}`,
        });
  };

  const isDisabled =
    isNameInvalid || isDescriptionInvalid || isLoading || !haveValuesChanged;

  return {
    manageTaskHandler,
    changeDescriptionHandler,
    changeNameHandler,
    isNameInvalid,
    isDescriptionInvalid,
    name,
    description,
    members,
    chosenMembers,
    changeMembersHandler,
    isDisabled,
    changeColorHandler,
    color,
  };
};
