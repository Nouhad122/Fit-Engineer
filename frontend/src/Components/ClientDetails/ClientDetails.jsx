import React, { useState, useEffect, useContext } from 'react';
import classes from './ClientDetails.module.css';
import InfoCard from './InfoCard';
import ClientHeader from './ClientHeader';
import { useParams, useNavigate } from 'react-router-dom';
import ModalContext from '../../store/ModalContext.jsx';
import Modal from '../Shared/Modal';
import useHttp from '../../hooks/useHttp';
import Loading from '../Shared/Loading';

const ClientDetails = () => {
    const { openModal, openedModal } = useContext(ModalContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const { getClientById, deleteClient, loading, error } = useHttp();
    const [client, setClient] = useState({});
  
    useEffect(() =>{
        const fetchClientData = async () =>{
            try{
                const data = await getClientById(id);
                setClient(data.client || {});
            }
            catch (err) {
                // Error is handled by useHttp hook
            }
        }
        fetchClientData();
    },[id, getClientById]);

  const renderField = (label, value, type = 'text') => {
    if (!value || value === '') return null;
    
    return (
      <div className={classes.field}>
        <label className={classes.fieldLabel}>{label}</label>
        <div className={classes.fieldValue}>
          {type === 'textarea' ? (
            <p className={classes.textareaValue}>{value}</p>
          ) : (
            <span className={classes.textValue}>{value}</span>
          )}
        </div>
      </div>
    );
  };

  const handleDeleteClient = async () =>{
    try {
      await deleteClient(id);
      navigate('/admin-dashboard');
    } catch (err) {
      // Error is handled by useHttp hook
    }
  }

  const handleDeleteClick = () =>{
    openModal({
      title: "Are you sure?",
      message: "Deleting this client will remove all their data from the system. This action cannot be undone.",
      onConfirm: handleDeleteClient
    });
  }

  return (
    <>
    <div className={classes.clientDetailsContainer}>
        {loading ? 
            <Loading message="Loading Client Data..." />
        :
        <>
        <ClientHeader client={client}/>

        <div className={classes.content}>
          <InfoCard 
           title="Personal Information" 
           icon="👤"
           fields={[
              renderField('Age', `${client.age} years old`),
              renderField('Gender', client.gender),
              renderField('Height', `${client.height} cm`),
              renderField('Weight', `${client.weight} kg`)
           ]}
          />
  
          <InfoCard 
           title="Fitness Goals"
           icon="🎯"
           fields={[
              renderField('Main Goal', client.mainGoal),
              renderField('Other Goal', client.otherGoal),
              renderField('Weight Goal', client.weightGoal),
              renderField('Activity Level', client.activity)
           ]}
          />
  
          <InfoCard 
           title="Workout Preferences"
           icon="💪"
           fields={[
              renderField('Workout Type', client.workoutType),
              renderField('PED Experience', client.pedExperience),
              renderField('PED Explanation', client.pedExplain)
           ]}
          />
  
          <InfoCard 
           title="Health Information"
           icon="⚠️"
           fields={[
              renderField('Injuries/Health Issues', client.injuries, 'textarea'),
              renderField('Food Allergies/Restrictions', client.allergies, 'textarea')
           ]}
          />
          {client.notes && (
              <InfoCard 
              title="Additional Notes"
              icon="📝"
              fields={[
                  renderField('', client.notes, 'textarea'),
              ]}
              />
          )}
        </div>
  
        <div className={classes.actions}>
          <button className={classes.deleteButton} onClick={handleDeleteClick}>
            🗑️ Delete Client
          </button>
        </div>
        </> 
        }

        {error && <p className={classes.error}>{error}</p>}
    </div>
    {openedModal && <Modal />}
    </>
  );
};

export default ClientDetails;
