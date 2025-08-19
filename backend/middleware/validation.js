const { body, validationResult } = require('express-validator');

// Helper function to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    return res.status(400).json({
      message: 'Validation failed',
      errors: errorMessages
    });
  }
  next();
};

// Client form validation rules
const validateClientForm = [
  // Full Name validation
  body('fullName')
    .trim()
    .notEmpty().withMessage('Full name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Full name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/).withMessage('Full name can only contain letters and spaces'),

  // Email validation
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email address'),

  // WhatsApp validation
  body('whatsapp')
    .trim()
    .notEmpty().withMessage('WhatsApp number is required')
    .matches(/^[\+]?[1-9][\d]{0,15}$/).withMessage('Please enter a valid phone number'),

  // Age validation
  body('age')
    .trim()
    .notEmpty().withMessage('Age is required')
    .isInt({ min: 13, max: 100 }).withMessage('Age must be between 13 and 100'),

  // Gender validation
  body('gender')
    .notEmpty().withMessage('Gender is required'),

  // Height validation
  body('height')
    .trim()
    .notEmpty().withMessage('Height is required')
    .isInt({ min: 100, max: 250 }).withMessage('Height must be between 100 and 250 cm'),

  // Weight validation
  body('weight')
    .trim()
    .notEmpty().withMessage('Weight is required')
    .isInt({ min: 30, max: 300 }).withMessage('Weight must be between 30 and 300 kg'),

  // Main Goal validation
  body('mainGoal')
    .notEmpty().withMessage('Main goal is required'),

  // Other Goal validation (conditional)
  body('otherGoal')
    .custom((value, { req }) => {
      if (req.body.mainGoal === 'Other' && !value.trim()) {
        throw new Error('Please specify your weight goal');
      }
      return true;
    }),

  // Activity validation
  body('activity')
    .notEmpty().withMessage('Activity level is required'),

  // Injuries validation
  body('injuries')
    .trim()
    .notEmpty().withMessage('Please provide information about injuries or health issues'),

  // Allergies validation
  body('allergies')
    .trim()
    .notEmpty().withMessage('Please provide information about food allergies or restrictions'),

  // Workout Type validation
  body('workoutType')
    .trim()
    .notEmpty().withMessage('Workout type is required'),

  // PED Experience validation
  body('pedExperience')
    .notEmpty().withMessage('Please select your PED experience'),

  // PED Explain validation (conditional)
  body('pedExplain')
    .custom((value, { req }) => {
      if (req.body.pedExperience === 'Yes' && !value.trim()) {
        throw new Error('Please explain your PED experience');
      }
      return true;
    }),

  // Weight Goal validation
  body('weightGoal')
    .trim()
    .notEmpty().withMessage('Please specify your weight goal'),

  handleValidationErrors
];

// Admin form validation rules
const validateAdminForm = [
  body('clientName')
    .trim()
    .notEmpty().withMessage('Client name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Client name must be between 2 and 100 characters'),

  body('reviewText')
    .trim()
    .notEmpty().withMessage('Review text is required')
    .isLength({ min: 10, max: 1000 }).withMessage('Review text must be between 10 and 1000 characters'),

  handleValidationErrors
];


// Login validation rules
const validateLogin = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email address'),

  body('password')
    .trim()
    .notEmpty().withMessage('Password is required'),

  body('meal')
    .trim()
    .notEmpty().withMessage('Favorite meal is required'),

  body('workout')
    .trim()
    .notEmpty().withMessage('Favorite workout is required'),

  handleValidationErrors
];

module.exports = {
  validateClientForm,
  validateAdminForm,
  validateLogin,
  handleValidationErrors
}; 