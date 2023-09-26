import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { Overlay, ModalWindow } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ imgLarge, onClose }) {
  useEffect(() => {
    const handleCloseOnEscape = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleCloseOnEscape);

    return () => {
      window.removeEventListener('keydown', handleCloseOnEscape);
    };
  }, [onClose]);

  const handleCloseOnOverlay = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleCloseOnOverlay}>
      <ModalWindow>
        <img src={imgLarge} alt="" />
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
}
