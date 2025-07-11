export const validateFullName = (value) => {
  if (!value.trim()) return 'Full name is required';
  if (value.length < 2) return 'Full name must be at least 2 characters';
  if (value.length > 50) return 'Full name must be less than 50 characters';
  if (!/^[a-zA-Z\s]+$/.test(value)) return 'Full name can only contain letters and spaces';
  return null; // no error
};

export const validateEmail = (value) => {
  if (!value) return 'Email is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) return 'Please enter a valid email address';
  return null;
};

export const validateWhatsApp = (value) => {
  if (!value) return 'WhatsApp number is required';
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  if (!phoneRegex.test(value.replace(/\s/g, ''))) return 'Please enter a valid phone number';
  return null;
};

export const validateAge = (value) => {
  if (!value) return 'Age is required';
  const age = parseInt(value);
  if (isNaN(age) || age < 13 || age > 100) return 'Age must be between 13 and 100';
  return null;
};

export const validateHeight = (value) => {
  if (!value) return 'Height is required';
  const height = parseInt(value);
  if (isNaN(height) || height < 100 || height > 250) return 'Height must be between 100 and 250 cm';
  return null;
};

export const validateWeight = (value) => {
  if (!value) return 'Weight is required';
  const weight = parseInt(value);
  if (isNaN(weight) || weight < 30 || weight > 300) return 'Weight must be between 30 and 300 kg';
  return null;
};

export const validateMainGoal = (value) => {
  if (!value) return 'Main goal is required';
  return null;
};

export const validateActivity = (value) => {
  if (!value) return 'Activity level is required';
  return null;
};

export const validateInjuries = (value) => {
  if (!value.trim()) return 'Please provide information about injuries or health issues';
  return null;
};

export const validateAllergies = (value) => {
  if (!value.trim()) return 'Please provide information about food allergies or restrictions';
  return null;
};

export const validateWorkoutType = (value) => {
  if (!value.trim()) return 'Workout type is required';
  return null;
};

export const validatePedExperience = (value) => {
  if (!value) return 'Please select your PED experience';
  return null;
};

export const validatePedExplain = (value, pedExperience) => {
  if (pedExperience === 'Yes' && !value.trim()) {
    return 'Please explain your PED experience';
  }
  return null;
};

export const validateWeightGoal = (value) => {
  if (!value.trim()) return 'Please specify your weight goal';
  return null;
};

// Form-level validation
export const validateClientForm = (formData) => {
  const errors = {};
  
  errors.fullName = validateFullName(formData.fullName);
  errors.email = validateEmail(formData.email);
  errors.whatsapp = validateWhatsApp(formData.whatsapp);
  errors.age = validateAge(formData.age);
  errors.gender = formData.gender ? null : 'Gender is required';
  errors.height = validateHeight(formData.height);
  errors.weight = validateWeight(formData.weight);
  errors.mainGoal = validateMainGoal(formData.mainGoal);
  errors.otherGoal = formData.mainGoal === 'Other' ? validateWeightGoal(formData.otherGoal) : null;
  errors.activity = validateActivity(formData.activity);
  errors.injuries = validateInjuries(formData.injuries);
  errors.allergies = validateAllergies(formData.allergies);
  errors.workoutType = validateWorkoutType(formData.workoutType);
  errors.pedExperience = validatePedExperience(formData.pedExperience);
  errors.pedExplain = validatePedExplain(formData.pedExplain, formData.pedExperience);
  errors.weightGoal = validateWeightGoal(formData.weightGoal);
  
  return {
    isValid: Object.values(errors).every(error => error === null),
    errors
  };
}; 