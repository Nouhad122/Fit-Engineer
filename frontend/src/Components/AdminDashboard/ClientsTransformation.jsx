import React, { useState, useContext } from 'react'
import classes from './Clients.module.css';
import { Upload } from 'antd';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';
import ModalContext from '../../store/ModalContext.jsx';
import { UploadOutlined } from '@ant-design/icons';
import SelectableClients from './SelectableClients.jsx';

const ClientsTransformation = ({clients, selectedClient, setSelectedClient}) => {
    const { openedModal, openModal } = useContext(ModalContext);
    const [fileList, setFileList] = useState([]); 
    const [transformation, setTransformation] = useState('');
    const [message, setMessage] = useState({text: '', type: ''});

    const handleTransformationSubmit = (e) => {
        e.preventDefault();
    };

    const handleUploadChange = () =>{};


  return (
    <>
    <section className={`${classes.adminSection}`}>
      <h2>Clients Transformation</h2>

      <form onSubmit={handleTransformationSubmit} className={classes.adminForm}>
          <SelectableClients    
            clients={clients}
            selectedClient={selectedClient}
            setSelectedClient={setSelectedClient}
          />

        <Upload
          action="http://localhost:3000/api/upload"
          listType="picture"
          fileList={fileList}
          onChange={handleUploadChange}
          className={classes.imageUpload}
          maxCount={1}
          accept="image/*"
        >
          <Button className={classes.uploadBtn}><UploadOutlined /> Upload Images</Button>
        </Upload>

          <textarea
            placeholder="Write your transformation here..."
            value={transformation}
            onChange={e => setTransformation(e.target.value)}
            rows={3}
            required
          />
          <button 
           type="button" 
           className={classes.submitBtn} 
           disabled={!selectedClient || !transformation.trim()} 
           onClick={() => openModal({
            title: "Submit Transformation",
            message: `Are you sure you want to submit a transformation for ${selectedClient?.fullName}?`,
            // onConfirm: handleCreateReview
          })}>
            Submit Transformation
          </button>
        </form>
        {message.text && <p className={`${classes.message} ${classes[message.type]}`}>{message.text}</p>}
    </section>
    {
        openedModal && <Modal />
    }
    </>
  )
}

export default ClientsTransformation
