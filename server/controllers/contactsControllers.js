const Contacts = require('./../model/contactModel');
const catchAsync = require('./../utilities/catchAsync');
const AppError = require('./../utilities/appError');

// Route Handlers ( functions ) 
exports.getAllContacts = catchAsync(async (req, res, next) => {
    const contacts = await Contacts.find();

    // SEND RESPONSE TO CLIENT
    res.status(200).json({
        status: 'success',
        results: contacts.length,
        data: {
            contacts
        }
    });
});

exports.createContact = catchAsync(async (req, res, next) => {
    const newContact = await Contacts.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            contacts: newContact
        }
    });
});

exports.updateContact = catchAsync(async (req, res, next) => {
    const contact = await Contacts.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!contact) {
        return next(new AppError('No contact found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            contact: contact
        }
    });
});

exports.deleteContact = catchAsync(async (req, res, next) => {
    const contact = await Contacts.findByIdAndDelete(req.params.id);

    if (!contact) {
        return next(new AppError('No contact found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: null
    });
});


exports.addNewPhoneNumber = catchAsync(async (req, res, next) => {

    if (!(/^(?:[0-9] ?){6,14}[0-9]$/.test(req.body.phoneNumbers))) {
        return next(new AppError('Invalid phone number. Number failed to be stored.', 404));
    };

    const phone = await Contacts.update(
        { _id: req.params.id },
        { $push: { phoneNumbers: req.body.phoneNumbers } }
    );

    if (!phone) {
        return next(new AppError('Could not add new phone number. Please try again.', 404));
    }

    res.status(200).json({
        status: 'success',
        data: null
    });
});

exports.deletePhoneNumber = catchAsync(async (req, res, next) => {
    const phoneNumber = await Contacts.update(
        { _id: req.params.id },
        { $pull: { phoneNumbers: req.body.phoneNumbers } }
    );

    if (!phoneNumber) {
        return next(new AppError('There is no such number.', 404));
    }

    res.status(200).json({
        status: 'success',
        data: null
    });
});

exports.readContact = catchAsync(async (req, res, next) => {
    const contact = await Contacts.findById(req.params.id);

    if (!contact) {
        return next(new AppError('No contact found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            contact
        }
    });
});