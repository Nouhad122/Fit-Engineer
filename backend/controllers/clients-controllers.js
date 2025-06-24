let DUMMY_CLIENTS = [
    {
        id: 'c1',
        activity: 'Moderate',
        age: '32',
        allergies: 'vsdcdsv',
        email: 'mostafa@gmail.com',
        fullName: 'Mostafa',
        gender: 'Male',
        height: '170',
        injuries: 'fvfdcsd',
        mainGoal: 'Muscle Gain',
        notes: 'csvfcds',
        otherGoal: '',
        pedExperience: 'No',
        pedExplain: '',
        weight: '76',
        weightGoal: 'btbcfv',
        whatsapp: '43543',
        workoutType: 'cdsvfs',
    },
    {
        id: 'c2',
        activity: 'Moderate',
        age: '32',
        allergies: 'vsdcdsv',
        email: 'nouhad@gmail.com',
        fullName: 'Nouhad',
        gender: 'Male',
        height: '170',
        injuries: 'fvfdcsd',
        mainGoal: 'Muscle Gain',
        notes: 'csvfcds',
        otherGoal: '',
        pedExperience: 'No',
        pedExplain: '',
        weight: '76',
        weightGoal: 'btbcfv',
        whatsapp: '43543',
        workoutType: 'cdsvfs',
    }
]

const HttpError = require('../models/http-error');
const uuid = require('uuid');

exports.getClientById = (req, res, next) =>{
    const clientId = req.params.cid;
    const client = DUMMY_CLIENTS.find(client => {
        return (
            client.id === clientId
        );
    });

    if(!client){
        return next(
            new HttpError("Could not find a client for the provided id.", 404)
        );
    }
    res.json({client}); 
}

exports.createClient = (req, res, next) =>{
    const {
         activity, age, allergies, email, fullName, gender, height, injuries,
          mainGoal, notes, otherGoal, pedExperience, pedExplain, weight, weightGoal,
           whatsapp, workoutType } = req.body;

    const createdClient = {
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
    }

    DUMMY_CLIENTS.unshift(createdClient);

    res.status(201).json({client: createdClient});
}

exports.deleteClient = (req, res, next) =>{
    const clientId = req.params.cid;
    DUMMY_CLIENTS = DUMMY_CLIENTS.filter(client => client.id !== clientId);
    res.status(200).json({message: "Deleted Client."});
}