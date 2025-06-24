const express = require('express');
const bodyParser = require('body-parser');
const clientsRoutes = require('./routes/clients-routes');
const HttpError = require('./models/http-error');
const app = express();

app.use(bodyParser.json());

app.use('/api/clients-forms', clientsRoutes);

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

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});