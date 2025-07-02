const HttpError = require('../models/http-error');
const uuid = require('uuid');
const Client = require('../models/client');

exports.getClients = async (req, res, next) =>{
    let clients;
    try{
        clients = await Client.find();
    }
    catch(err){
        const error = new HttpError('Something went wrong, could not find a client.', 500);
        return next(error);
    }

    res.json({clients: clients.map(client => client.toObject({getters: true}))});
}

exports.getClientById = async (req, res, next) =>{
    const clientId = req.params.cid;
    let client;
    try{
        client = await Client.findById(clientId);
    }
    catch(err){
        const error = new HttpError('Something went wrong, could not find a client.', 500);
        return next(error);
    }

    if(!client){
        return next(
            new HttpError("Could not find a client for the provided id.", 404)
        );
    }
    res.json({client: client.toObject({getters: true})}); 
}

exports.createClient = async (req, res, next) =>{
    const {
         activity, age, allergies, email, fullName, gender, height, injuries,
          mainGoal, notes, otherGoal, pedExperience, pedExplain, weight, weightGoal,
           whatsapp, workoutType } = req.body;

    const createdClient = new Client({
        id: uuid.v4(),
        activity,
        age,
        allergies,
        email,
        fullName, 
        gender, 
        height, 
        injuries,
        mainGoal, 
        notes, 
        otherGoal, 
        pedExperience, 
        pedExplain, 
        weight, 
        weightGoal,
        whatsapp, 
        workoutType
    });

    try{
        await createdClient.save();
    }
    catch(err){
        const error = new HttpError('Creating client failed, please try again.', 500);
        return next(error);
    }

    res.status(201).json({client: createdClient});
}

exports.deleteClient = async (req, res, next) => {
    const clientId = req.params.cid;

    try {
        const client = await Client.findByIdAndDelete(clientId);
        if (!client) {
            return next(new HttpError('Could not find a client for the provided id.', 404));
        }
        res.status(200).json({ message: "Deleted Client." });
    } catch (err) {
        const error = new HttpError('Something went wrong, could not delete client.', 500);
        return next(error);
    }
};
