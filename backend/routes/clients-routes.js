const express = require('express');

const router = express.Router();

const DUMMY_CLIENTS = [
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


router.get('/:cid', (req, res, next) =>{
    const clientId = req.params.cid;
    const client = DUMMY_CLIENTS.find(client => {
        return (
            client.id === clientId
        );
    });

    if(!client){
        const error = new Error("Could not find a client for the provided id.");
        error.code = 404;
        return next(error);
    }
    res.json({client}); 
});

module.exports = router;