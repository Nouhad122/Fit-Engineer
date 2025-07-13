import React, { useState } from 'react';
import classes from './ClientForm.module.css';
import useHttp from '../../hooks/useHttp';
import { validateClientForm } from '../../utils/validators/clientFormValidators';
import Input from './Input';

const initialState = {
  fullName: '',
  email: '',
  whatsapp: '',
  age: '',
  gender: '',
  height: '',
  weight: '',
  mainGoal: '',
  otherGoal: '',
  activity: '',
  injuries: '',
  allergies: '',
  workoutType: '',
  pedExperience: '',
  pedExplain: '',
  weightGoal: '',
  notes: '',
};

const ClientForm = () => {
  const { createClient, loading, error } = useHttp();
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
    setSuccess(null);
    setErrors({});
    
    // Validate form
    const validation = validateClientForm(form);
    setErrors(validation.errors);
    
    if (!validation.isValid) {
      return; // Don't submit if validation fails
    }
    
    try {
      await createClient(form);
      setSuccess('Your information has been submitted successfully!');
      setForm(initialState);
      setErrors({}); // Clear errors on success
    } catch (err) {
      // If there's a backend validation error, it will be handled by useHttp
      // and displayed in the error state
    }
  };
  
  return (
    <section className={classes.formSection} id="client-form">
      <div className={classes.container}>
        <h2 className={classes.formTitle}>Fill in Your Information to Start Your Custom Plan</h2>
        {error && <div className={classes.backendError}>{error}</div>}
        {success && <div className={classes.success}>{success}</div>}
        <form className={classes.form} autoComplete="off" onSubmit={handleSubmit}>
          <div className={classes.formGroupGrid}>
            <Input 
             label="Full Name" 
             type="text" 
             name="fullName" 
             value={form.fullName} 
             onChange={handleChange} 
             error={errors.fullName}
              
            />
            <Input 
             label="Email Address" 
             type="email" 
             name="email" 
             value={form.email} 
             onChange={handleChange} 
             error={errors.email}
              
            />
            <Input 
             label="WhatsApp Number" 
             type="text" 
             name="whatsapp" 
             value={form.whatsapp} 
             onChange={handleChange} 
             error={errors.whatsapp}
              
            />
            <Input 
            label="Age" 
            type="number" 
            name="age" 
            value={form.age} 
            onChange={handleChange} 
            error={errors.age}
            min="0" 
             
            />

            <Input 
             label="Gender" 
             type="select" 
             name="gender" 
             value={form.gender} 
             onChange={handleChange} 
             error={errors.gender}
             options={[
              {value: ''},
              {value: 'Male'},
              {value: 'Female'},
              {value: 'Other'},
             ]}
              
            />

            <Input 
             label="Height (cm)" 
             type="number" 
             name="height" 
             value={form.height} 
             onChange={handleChange} 
             error={errors.height}
             min="0" 
              
            />

            <Input
             label="Weight (kg)" 
             type="number" 
             name="weight" 
             value={form.weight} 
             onChange={handleChange} 
             error={errors.weight}
             min="0" 
              
            />
            
          </div>

          <Input 
           label="Your Main Goal" 
           type="select" 
           name="mainGoal" 
           value={form.mainGoal} 
           onChange={handleChange}
           error={errors.mainGoal}
           options={[
            {value: ''},
            {value: 'Fat Loss'},
            {value: 'Muscle Gain'},
            {value: 'Recovery / Rehab'},
            {value: 'Performance / PED Cycle'},
            {value: 'Other'},
           ]}
            
          />
          {form.mainGoal === 'Other' && (
              <Input
               label={null} 
               placeholder="Please specify your goal" 
               type="text" 
               name="otherGoal" 
               value={form.otherGoal} 
               onChange={handleChange} 
               error={errors.otherGoal}
                
               rows={2} 
              />
            )}
        

            <Input 
             label="How Active Are You During the Day?" 
             type="select" 
             name="activity" 
             value={form.activity} 
             onChange={handleChange}
             error={errors.activity}
             options={[
              {value: ''},
              {value: 'Very Active'},
              {value: 'Moderate'},
              {value: 'Low Activity'},
              {value: 'Sedentary'},
             ]}
              
            />

            <Input 
             label="Do You Have Any Injuries or Health Issues?" 
             type="text" 
             name="injuries" 
             value={form.injuries} 
             onChange={handleChange} 
             error={errors.injuries}
             isTextArea 
              
             rows={2} 
            />
            <Input
             label="Any Food Allergies or Restrictions?" 
             type="text" 
             name="allergies" 
             value={form.allergies} 
             onChange={handleChange} 
             error={errors.allergies}
             isTextArea 
              
             rows={2} 
            />
            <Input 
             label="What Type of Workouts You Like or Want? (gym, home, etc.)" 
             type="text" 
             name="workoutType" 
             value={form.workoutType} 
             onChange={handleChange} 
             error={errors.workoutType}
              
             rows={2} 
            />

          <div className={classes.formGroup}>
            <label>Do You Have Any Experience With Steroids or PEDs?</label>
            <div className={classes.radioGroup}>
              <label>
                <input
                  type="radio"
                  name="pedExperience"
                  value="Yes"
                  checked={form.pedExperience === 'Yes'}
                  onChange={handleChange}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="pedExperience"
                  value="No"
                  checked={form.pedExperience === 'No'}
                  onChange={handleChange}
                />
                No
              </label>
            </div>
            {errors.pedExperience && <span className={classes.errorText}>{errors.pedExperience}</span>}
            {form.pedExperience === 'Yes' && (
                <Input
                 label={null} 
                 placeholder="Please explain your experience" 
                 type="text" 
                 name="pedExplain" 
                 value={form.pedExplain} 
                 onChange={handleChange} 
                 error={errors.pedExplain}
                  
                 rows={2} 
                />
            )}
          </div>

          <Input 
           label="Do You Want to Gain or Lose Weight? How Much?" 
           type="text" 
           name="weightGoal" 
           value={form.weightGoal} 
           onChange={handleChange} 
           error={errors.weightGoal}
          />

          <Input 
           label="Any Additional Notes?" 
           type="text" 
           name="notes" 
           value={form.notes} 
           onChange={handleChange} 
           isTextArea 
           rows={2} />

          <button type="submit" className={classes.submitButton} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ClientForm; 