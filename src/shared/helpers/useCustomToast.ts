import { toast, TypeOptions } from 'react-toastify';

type UseCustomToastType = {
  text: string;
  type: TypeOptions;
  autoClose?: number;
};

export const useCustomToast = ({
  text,
  type,
  autoClose = 2000,
}: UseCustomToastType) =>
  toast.success(text, {
    type,
    position: 'top-right',
    autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });
