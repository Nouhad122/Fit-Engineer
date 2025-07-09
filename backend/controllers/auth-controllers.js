const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const login = async (req, res, next) => {
  const { email, password, meal, workout } = req.body;

  try {
    // Check if all required fields are provided
    if (!email || !password || !meal || !workout) {
      return res.status(400).json({ 
        message: 'All fields are required: email, password, meal, and workout' 
      });
    }

    // Verify admin credentials from environment variables
    const isEmailValid = email === process.env.ADMIN_EMAIL;
    const isPasswordValid = password === process.env.ADMIN_PASSWORD;
    const isMealValid = meal === process.env.ADMIN_FAVORITE_MEAL;
    const isWorkoutValid = workout === process.env.ADMIN_FAVORITE_WORKOUT;

    if (!isEmailValid || !isPasswordValid || !isMealValid || !isWorkoutValid) {
      return res.status(401).json({ 
        message: 'Invalid credentials. Please try again.' 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: 'admin',
        email: email,
        role: 'admin'
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token: token,
      user: {
        email: email,
        role: 'admin'
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const verifyToken = async (req, res, next) => {
  try {
    // This endpoint just confirms the token is valid
    res.status(200).json({
      message: 'Token is valid',
      user: req.user
    });
  } catch (error) {
    res.status(401).json({ message: 'Token verification failed' });
  }
};

exports.login = login;
exports.verifyToken = verifyToken; 