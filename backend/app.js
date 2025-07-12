const path = require('path');

// Load environment variables from root directory
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
}

const express = require('express');
const clientsRoutes = require('./routes/clients-routes');
const reviewsRoutes = require('./routes/reviews-routes');
const authRoutes = require('./routes/auth-routes');
const HttpError = require('./models/http-error');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/clients-forms', clientsRoutes);
app.use('/api/reviews', reviewsRoutes);

// Error handling middleware
app.use((error, req, res, next) =>{
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || "An unknown error occured!"});
});


mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    app.listen(process.env.PORT || 3000);
})
.catch(err => {
    console.log(err);
});