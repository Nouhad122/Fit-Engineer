import React, { useEffect, useContext } from 'react'
import { createPortal } from 'react-dom'
import Button from '../Shared/Button'
import classes from './Modal.module.css'
import ModalContext from '../../store/ModalContext.jsx'

const Modal = () => {

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
        document.body.style.overflow = 'unset';
    };
  }, []);

  const { closeModal, modalConfig } = useContext(ModalContext);

  const handleConfirm = () =>{
    if (modalConfig && modalConfig.onConfirm) {
      modalConfig.onConfirm();
    }
    closeModal();
  }

  if (!modalConfig) return null;

  return createPortal(
    <>
    <div className={classes.backdrop} onClick={closeModal}></div>
    <dialog className={classes.modal} open>
      <h2>{modalConfig.title}</h2>
      <p>{modalConfig.message}</p>
      <div className={classes.modalActions}>
        <Button className={classes.confirmBtn} onClick={handleConfirm}>Confirm</Button>
        <Button className={classes.cancelBtn} onClick={closeModal}>Cancel</Button>
      </div>
    </dialog>
    </>
  , document.getElementById("modal"))
}

export default Modal
