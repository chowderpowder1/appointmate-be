import { React, useState } from 'react'
import ModalStyles from './Modal.module.css'
import { createPortal } from 'react-dom';
import { IoIosCloseCircle } from "react-icons/io";

const Modal = ({open,children, onClose}) => {
    if (!open){
        return null;
    } 

    return createPortal(
        <div className={ModalStyles.modalContainer}>
            <div onClick={onClose} className={ModalStyles.overlay}></div>
            <div className={ModalStyles.modalContent}>            
            <IoIosCloseCircle className={ModalStyles.closeBtn} onClick={onClose}/>
                {children}
            </div>
        </div>,document.body
  )
}

export default Modal


