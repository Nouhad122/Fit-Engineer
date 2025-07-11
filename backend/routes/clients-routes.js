const express = require('express');
const auth = require('../middleware/auth');
const { validateClientForm } = require('../middleware/validation');
const clientsControllers = require('../controllers/clients-controllers');

const router = express.Router();

// Public route for creating clients (form submission)
router.post('/', validateClientForm, clientsControllers.createClient);

// Protected routes for admin operations
router.get('/', auth, clientsControllers.getClients);
router.get('/:cid', auth, clientsControllers.getClientById);
router.delete('/:cid', auth, clientsControllers.deleteClient);

module.exports = router;