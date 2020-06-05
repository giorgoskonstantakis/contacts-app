const express = require('express');
const contactsController = require('./../controllers/contactsControllers');

const router = express.Router();

// Routers 
router
    .route('/')
    .get(contactsController.getAllContacts)
    .post(contactsController.createContact);

router
    .route('/:id')
    .patch(contactsController.updateContact)
    .delete(contactsController.deleteContact)
    .get(contactsController.readContact);;

router
    .route('/addNewNumber/:id')
    .put(contactsController.addNewPhoneNumber);

router
    .route('/deleteNumber/:id')
    .patch(contactsController.deletePhoneNumber);

module.exports = router;










