import { useState } from 'react';
import { useGetMember } from 'Hooks/useGetMember';

export const useHeader = () => {
  const [isAddSectionModalOpen, setIsAddSectionModalOpen] = useState(false);
  const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const member = useGetMember(JSON.parse(sessionStorage.token).id);

  const openSectionModalHandler = () => setIsAddSectionModalOpen(true);

  const closeSectionModalHandler = () => setIsAddSectionModalOpen(false);

  const openMembersModalHandler = () => setIsMembersModalOpen(true);

  const closeMembersModalHandler = () => setIsMembersModalOpen(false);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);
  
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
  };
};
