const express = require('express');

const clientsControllers = require('../controllers/clients-controllers');

const router = express.Router();

router.get('/', clientsControllers.getClients);

router.get('/:cid', clientsControllers.getClientById);

router.post('/', clientsControllers.createClient);

router.delete('/:cid', clientsControllers.deleteClient);

module.exports = router;