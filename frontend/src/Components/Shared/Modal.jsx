import React, { useEffect, useContext } from 'react'
import { createPortal } from 'react-dom'
import Button from '../Shared/Button'
import classes from './Modal.module.css'
import ModalContext from '../../store/ModalContext.jsx'

const Modal = ({ title, message, onConfirm }) => {

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
        document.body.style.overflow = 'unset';
    };
  }, []);

  const { closeModal } = useContext(ModalContext);

  const handleConfirm = () =>{
    onConfirm();
    closeModal();
  }

  return createPortal(
    <>
    <div className={classes.backdrop} onClick={closeModal}></div>
    <dialog className={classes.modal} open>
      <h2>{title}</h2>
      <p>{message}</p>
      <div className={classes.modalActions}>
        <Button className={classes.confirmBtn} onClick={handleConfirm}>Confirm</Button>
        <Button className={classes.cancelBtn} onClick={closeModal}>Cancel</Button>
      </div>
    </dialog>
    </>
  , document.getElementById("modal"))
}

export default Modal
