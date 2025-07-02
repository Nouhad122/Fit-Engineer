import React, { useState } from 'react';
import Modal from './Modal';

// Simple usage example
const ModalUsage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        Open Modal
      </button>

      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title="My Modal"
        size="medium"
      >
        <p>This is the modal content!</p>
        <button onClick={() => setIsOpen(false)}>Close</button>
      </Modal>
    </div>
  );
};

export default ModalUsage;

/*
// Advanced usage example with different sizes
const AdvancedModalUsage = () => {
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    size: 'medium',
    title: 'Default Modal'
  });

  const openModal = (size, title) => {
    setModalConfig({
      isOpen: true,
      size,
      title
    });
  };

  return (
    <div>
      <button onClick={() => openModal('small', 'Small Modal')}>
        Small Modal
      </button>
      <button onClick={() => openModal('medium', 'Medium Modal')}>
        Medium Modal
      </button>
      <button onClick={() => openModal('large', 'Large Modal')}>
        Large Modal
      </button>
      <button onClick={() => openModal('xlarge', 'Extra Large Modal')}>
        Extra Large Modal
      </button>

      <Modal 
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
        title={modalConfig.title}
        size={modalConfig.size}
      >
        <div>
          <h3>Modal Content</h3>
          <p>This modal has size: {modalConfig.size}</p>
          <p>You can put any content here!</p>
        </div>
      </Modal>
    </div>
  );
};

// Modal without title
const ModalWithoutTitle = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        Open Modal (No Title)
      </button>

      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        size="medium"
      >
        <div>
          <h3>Custom Header</h3>
          <p>This modal doesn't have a title prop, so no header is shown.</p>
          <p>You can add your own custom header inside the content.</p>
        </div>
      </Modal>
    </div>
  );
};
*/ 