import React, { useState } from 'react';
import classes from './ClientForm.module.css';

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
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    // try {
    //   // Replace the URL below with the actual backend endpoint
    //   const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(form),
    //   });
    //   if (!response.ok) throw new Error('Failed to submit form');
    //   setSuccess('Your information has been submitted successfully!');
    //   setForm(initialState);
    // } catch (err) {
    //   setError('There was an error submitting your information. Please try again.');
    // } finally {
    //   setLoading(false);
    // }
  };
  console.log(form);
  return (
    <section className={classes.formSection} id="client-form">
      <div className={classes.container}>
        <h2 className={classes.formTitle}>Fill in Your Information to Start Your Custom Plan</h2>
        <form className={classes.form} autoComplete="off" onSubmit={handleSubmit}>
          <div className={classes.formGroupGrid}>
            <div className={classes.formGroup}>
              <label>Full Name</label>
              <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required />
            </div>
            <div className={classes.formGroup}>
              <label>Email Address</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className={classes.formGroup}>
              <label>WhatsApp Number</label>
              <input type="text" name="whatsapp" value={form.whatsapp} onChange={handleChange} required />
            </div>
            <div className={classes.formGroup}>
              <label>Age</label>
              <input type="number" name="age" value={form.age} onChange={handleChange} min="0" required />
            </div>
            <div className={classes.formGroup}>
              <label>Gender</label>
              <select name="gender" value={form.gender} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className={classes.formGroup}>
              <label>Height (cm)</label>
              <input type="number" name="height" value={form.height} onChange={handleChange} min="0" required />
            </div>
            <div className={classes.formGroup}>
              <label>Weight (kg)</label>
              <input type="number" name="weight" value={form.weight} onChange={handleChange} min="0" required />
            </div>
          </div>

          <div className={classes.formGroup}>
            <label>Your Main Goal</label>
            <select name="mainGoal" value={form.mainGoal} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="Fat Loss">Fat Loss</option>
              <option value="Muscle Gain">Muscle Gain</option>
              <option value="Recovery / Rehab">Recovery / Rehab</option>
              <option value="Performance / PED Cycle">Performance / PED Cycle</option>
              <option value="Other">Other (write below)</option>
            </select>
            {form.mainGoal === 'Other' && (
              <input
                type="text"
                name="otherGoal"
                value={form.otherGoal}
                onChange={handleChange}
                placeholder="Please specify your goal"
                className={classes.mt}
                required
              />
            )}
          </div>

          <div className={classes.formGroup}>
            <label>How Active Are You During the Day?</label>
            <select name="activity" value={form.activity} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="Very Active">Very Active</option>
              <option value="Moderate">Moderate</option>
              <option value="Low Activity">Low Activity</option>
              <option value="Sedentary">Sedentary</option>
            </select>
          </div>

          <div className={classes.formGroup}>
            <label>Do You Have Any Injuries or Health Issues?</label>
            <textarea name="injuries" value={form.injuries} onChange={handleChange} rows={2} required/>
          </div>

          <div className={classes.formGroup}>
            <label>Any Food Allergies or Restrictions?</label>
            <textarea name="allergies" value={form.allergies} onChange={handleChange} rows={2} required/>
          </div>

          <div className={classes.formGroup}>
            <label>What Type of Workouts You Like or Want? (gym, home, etc.)</label>
            <input type="text" name="workoutType" value={form.workoutType} onChange={handleChange} required/>
          </div>

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
            {form.pedExperience === 'Yes' && (
              <input
                type="text"
                name="pedExplain"
                value={form.pedExplain}
                onChange={handleChange}
                placeholder="Please explain your experience"
                className={classes.mt}
                required
              />
            )}
          </div>

          <div className={classes.formGroup}>
            <label>Do You Want to Gain or Lose Weight? How Much?</label>
            <input type="text" name="weightGoal" value={form.weightGoal} onChange={handleChange} />
          </div>

          <div className={classes.formGroup}>
            <label>Any Additional Notes?</label>
            <textarea name="notes" value={form.notes} onChange={handleChange} rows={2} />
          </div>

          {success && <div className={classes.successMsg}>{success}</div>}
          {error && <div className={classes.errorMsg}>{error}</div>}

          <button type="submit" className={classes.submitButton} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ClientForm; 