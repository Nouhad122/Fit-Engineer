import React, { useState, useContext } from 'react'
import classes from './Clients.module.css';
import { Upload } from 'antd';
import Modal from '../Shared/Modal';
import ModalContext from '../../store/ModalContext.jsx';
import { UploadOutlined } from '@ant-design/icons';
import SelectableClients from './SelectableClients.jsx';
import useHttp from '../../hooks/useHttp.js';
import AdminContext from '../../store/AdminContext.jsx';

const ClientsTransformation = ({clients, selectedClient, setSelectedClient}) => {
    const { openedModal, openModal } = useContext(ModalContext);
    const { refreshTransformations } = useContext(AdminContext);
    const { createTransformation, uploadImages } = useHttp();
    const [fileList, setFileList] = useState([]); 
    const [transformation, setTransformation] = useState('');
    const [message, setMessage] = useState({text: '', type: ''});
    const [uploading, setUploading] = useState(false);

    const handleTransformationSubmit = (e) => {
        e.preventDefault();
    };

    const handleUploadChange = (info) => {
        setFileList(info.fileList);
    };

    const handleCreateTransformation = async () => {
      try {
        if(transformation.length < 10) {
          setMessage({text: 'Transformation must be at least 10 characters long.', type: 'error'});
          return;
        }

        if(fileList.length === 0) {
          setMessage({text: 'At least one image is required.', type: 'error'});
          return;
        }

        setUploading(true);
        let imageUrls = [];

        if (fileList.length > 0) {
          try {
            const formData = new FormData();
            fileList.forEach((file) => {
              if (file.originFileObj) {
                formData.append('images', file.originFileObj);
              }
            });

            const uploadResult = await uploadImages(formData);
            imageUrls = uploadResult.files.map(file => file.url);
            setMessage({text: 'Images uploaded successfully!', type: 'success'});
          } catch (uploadError) {
            setMessage({text: `Failed to upload images: ${uploadError.message}`, type: 'error'});
            setUploading(false);
            return;
          }
        }

        await createTransformation({
          clientName: selectedClient.fullName,
          transformationText: transformation,
          transformationImages: imageUrls
        });

        setMessage({text: 'Transformation created successfully!', type: 'success'});
        setTransformation('');
        setFileList([]);
        setSelectedClient(null);
        refreshTransformations();
      } catch (err) {
        setMessage({text: 'Failed to create transformation. Please try again.', type: 'error'});
      } finally {
        setUploading(false);
      }
    }

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

        <div className={classes.uploadSection}>
          <label>Upload Images (Max 5, 5MB each)</label>
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleUploadChange}
            beforeUpload={() => false}
            maxCount={5}
            accept="image/*"
            disabled={uploading}
          >
            {fileList.length >= 5 ? null : (
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
          {uploading && (
            <div className={classes.uploadStatus}>
              <span>Uploading images and creating transformation...</span>
            </div>
          )}
        </div>

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
           disabled={
            !selectedClient ||
            !transformation.trim() || 
            uploading || 
            fileList.length === 0
          } 
           onClick={() => openModal({
            title: "Submit Transformation",
            message: `Are you sure you want to submit a transformation for ${selectedClient?.fullName}?`,
            onConfirm: handleCreateTransformation
          })}>
            {uploading ? 'Creating...' : 'Submit Transformation'}
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
