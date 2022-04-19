import { useState } from 'react';
import { useGetMember } from 'Hooks/useGetMember';
import { useRemoveMember } from 'Hooks/useRemoveMember';
import { useCustomToast } from 'shared/helpers/useCustomToast';
import { useQueryClient } from 'react-query';

export const useHeader = () => {
  const [deleteInfo, setDeleteInfo] = useState({ id: '', name: '' });
  const [isAddSectionModalOpen, setIsAddSectionModalOpen] = useState(false);
  const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const member = useGetMember(JSON.parse(sessionStorage.token).id);
  const queryClient = useQueryClient();

  const openSectionModalHandler = () => setIsAddSectionModalOpen(true);

  const closeSectionModalHandler = () => setIsAddSectionModalOpen(false);

  const openMembersModalHandler = () => setIsMembersModalOpen(true);

  const closeMembersModalHandler = () => setIsMembersModalOpen(false);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const onDelete = ({ id, name }: { id: string; name: string }) =>
    setDeleteInfo({ id, name });

  const onCloseDelete = () => setDeleteInfo({ id: '', name: '' });

  const onSuccess = () => {
    useCustomToast({ text: 'Member successfully removed', type: 'success' });
    queryClient.invalidateQueries('columns');
    queryClient.invalidateQueries('memebers');
    onCloseDelete();
  };

  const mutate = useRemoveMember(onSuccess);

  const handleRemoveMember = () => mutate(deleteInfo.id);

  return {
    openMembersModalHandler,
    openSectionModalHandler,
    handleClick,
    member,
    anchorEl,
    open,
    handleClose,
    isAddSectionModalOpen,
    closeSectionModalHandler,
    isMembersModalOpen,
    closeMembersModalHandler,
    deleteInfo,
    onDelete,
    onCloseDelete,
    handleRemoveMember,
  };
};
