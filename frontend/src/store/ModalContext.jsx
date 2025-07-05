import React, { createContext, useState } from 'react'

const ModalContext = createContext({
    openedModal: false,
    modalConfig: null,
    openModal: () =>{},
    closeModal: () =>{}
});

export const ModalProvider = ({ children }) =>{
    const [openedModal, setOpenedModal] = useState(false);
    const [modalConfig, setModalConfig] = useState(null);

    const openModal = (config) =>{
        setModalConfig(config);
        setOpenedModal(true);
    }

    const closeModal = () =>{
        setOpenedModal(false);
        setModalConfig(null);
    }

    const modalValue = {
        openedModal,
        modalConfig,
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
