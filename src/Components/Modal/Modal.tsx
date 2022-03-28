import { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.scss';

const Backdrop = ({ onClose }: { onClose: () => void }) => {
  return <div className={classes.backdrop} onClick={onClose} />;
};

const ModalOverlay = ({ children }: { children: ReactNode }) => (
  <div className={classes.modal}>
    <div>{children}</div>
  </div>
);

export const Modal = ({
  onClose,
  children,
}: {
  onClose: () => void;
  children: ReactNode;
}) => {
  const portalElement = document.getElementById('overlays');

  return (
    <>
      {portalElement &&
        ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {portalElement &&
        ReactDOM.createPortal(
          <ModalOverlay>{children}</ModalOverlay>,
          portalElement
        )}
    </>
  );
};
