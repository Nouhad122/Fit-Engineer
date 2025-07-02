import React, {useEffect, useContext} from 'react'
import { createPortal } from 'react-dom'
import classes from './Modal.module.css'

const Modal = ({ closeModal, title, message, onNeededAction }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
        document.body.style.overflow = 'unset';
    };
  }, []);

  const handleAction = () => {
    onNeededAction();
    sideCompController.hideContentInModal();
  }

  return createPortal(
    <div className={classes.blurBackground} onClick={closeModal}>
      {
        sideCompController.modalContent && (
          <div className={classes.blurContent} onClick={e => e.stopPropagation()}>
            <h1>{title}</h1>
            <p>{message}</p>
            {onNeededAction && (
              <div className={classes.modalBtns}>
                <button className={classes.mBtn} onClick={sideCompController.hideContentInModal}>Cancel</button> 
                <button className={classes.mBtn} onClick={handleAction}>Confirm</button>  
              </div>
            )}            
          </div>
        )
      }
    </div>
  , document.getElementById("modal"))
}

export default Modal
