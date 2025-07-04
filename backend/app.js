const express = require('express');
const clientsRoutes = require('./routes/clients-routes');
const reviewsRoutes = require('./routes/reviews-routes');
const HttpError = require('./models/http-error');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());

app.use('/api/clients-forms', clientsRoutes);
app.use('/api/reviews', reviewsRoutes);

app.use((req, res, next) =>{
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

app.use((error, req, res, next) =>{
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || "An unknown error occured!"});
});

mongoose.connect('mongodb+srv://nouhadalhallab122:PFgnMYCT8Xa5lU2U@mostafa-cluster.26fdouu.mongodb.net/general?retryWrites=true&w=majority&appName=mostafa-cluster')
.then(() => {
    app.listen(3000);
})
.catch(err => {
    console.log(err);
});