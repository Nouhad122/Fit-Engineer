import React, { createContext, useState } from 'react'

const ModalContext = createContext({
    openedModal: false,
    openModal: () =>{},
    closeModal: () =>{}
});

export const ModalProvider = ({ children }) =>{
    const [openedModal, setOpenedModal] = useState(false);

    const openModal = () =>{
        setOpenedModal(true);
    }

    const closeModal = () =>{
        setOpenedModal(false);
    }

    const modalValue = {
        openedModal,
        openModal,
        closeModal
    }
    return (
        <ModalContext.Provider value={modalValue}>
            {children}
        </ModalContext.Provider>
    )
}

export default ModalContext
