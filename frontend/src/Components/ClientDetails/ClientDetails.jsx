import React, { useState, useEffect } from 'react';
import classes from './ClientDetails.module.css';
import InfoCard from './InfoCard';
import ClientHeader from './ClientHeader';
import { useParams } from 'react-router-dom';

const ClientDetails = () => {
    const { id } = useParams();
    const [client, setClient] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() =>{
        const fetchClientData = async (id) =>{
            setLoading(true);
            setError(null);

            try{
                const res = await fetch(`http://localhost:3000/api/clients-forms/${id}`);
                const data = await res.json();
                setClient(data.client || {});
            }
            catch (err) {
                setError('Failed to fetch client.');
            } finally {
                setLoading(false);
            }
        }
        fetchClientData(id);
    },[]);
//   const client = {
//     fullName: 'John Doe',
//     email: 'john.doe@example.com',
//     whatsapp: '+1234567890',
//     age: 28,
//     gender: 'Male',
//     height: 175,
//     weight: 75,
//     mainGoal: 'Muscle Gain',
//     otherGoal: '',
//     activity: 'Moderate',
//     injuries: 'Minor knee injury from sports',
//     allergies: 'Peanuts and shellfish',
//     workoutType: 'Gym workouts with focus on strength training',
//     pedExperience: 'No',
//     pedExplain: '',
//     weightGoal: 'Gain 10kg of muscle mass',
//     notes: 'Prefers morning workouts, interested in nutrition guidance'
//   };

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

  return (
    <div className={classes.clientDetailsContainer}>
        {loading ? 
            <p>Loading Client Data...</p>
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
          <button className={classes.deleteButton}>
            🗑️ Delete Client
          </button>
        </div>
        </> 
        }

        {error && <p className={classes.error}>{error}</p>}
    </div>
  );
};

export default ClientDetails;
