import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { IoIosCloseCircle } from 'react-icons/io';
import ModalStyles from './Modal.module.css';

function Modal({ open, onClose, children }) {
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (open) {
      setShouldRender(true);

      setTimeout(() => {
        setIsAnimating(true);
      }, 20); // Small delay to ensure CSS transition triggers
    } else {
      setIsAnimating(false);
    }
  }, [open]);

  const handleTransitionEnd = () => {
    if (!open) {
      setShouldRender(false);
    }
  };

  if (!shouldRender) return null;

  return createPortal(
    <div className={ModalStyles.modalContainer}>
      <div 
        onClick={onClose} 
        className={`${ModalStyles.overlay} ${isAnimating ? ModalStyles.open : ''}`}
        onTransitionEnd={handleTransitionEnd}
      />
      <div className={`${ModalStyles.modalContent} ${isAnimating ? ModalStyles.open : ''}`}>            
        <IoIosCloseCircle className={ModalStyles.closeBtn} onClick={onClose}/>
        {children}
      </div>
    </div>,
    document.body
  );
}

export default Modal;