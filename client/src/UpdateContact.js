import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Nav from './Nav'

// Update Contact Data Page
const UpdateContact = props => {

    const [state, setState] = useState({
        name: '',
        email: '',
        homeAdress: '',
        phoneNumbers: []
    })

    const { _id, name, email, homeAdress, phoneNumbers } = state;

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/${props.match.params._id}`)
            .then(res => {
                const { name, email, homeAdress, phoneNumbers } = res.data.data.contact;
                setState({ ...state, name, email, homeAdress, phoneNumbers })
            }).catch(error => alert('Error loading single contact.'));
    }, []);

    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.value });
    };

    // Change Name,Email and Home Address for specific contact
    const handleSubmit = event => {
        event.preventDefault();
        axios.patch(`${process.env.REACT_APP_API}/${props.match.params._id}`, { name, email, homeAdress, phoneNumbers })
            .then(res => {
                const { name, email, homeAdress, phoneNumbers } = res.data.data.contact;
                setState({ ...state, name, email, homeAdress, phoneNumbers });
            }).catch(error => {
                alert('Could not update the contact. Please try again. ')
            });
    };

    // Add New Phone Number for a specific contact
    const handleSubmitAddPhone = event => {
        event.preventDefault();
        axios.put(`${process.env.REACT_APP_API}/addNewNumber/${props.match.params._id}`, { phoneNumbers })
            .then(res => {
                alert('New Number Recently Added.')
            }).catch(error => {
                alert('Invalid number.Please add a valid one.')
            });
    };

    const showUpdateForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input value={name} onChange={handleChange('name')} type="text" className="form-control" placeholder="Add Name" required />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input value={email} onChange={handleChange('email')} type="text" className="form-control" placeholder="Add Email" required />
            </div>
            <div className="form-group">
                <label className="text-muted">Home Address</label>
                <input value={homeAdress} onChange={handleChange('homeAdress')} type="text" className="form-control" placeholder="Add Home Address" required />
            </div>
            <div>
                <button className="btn btn-primary"> Update Contact </button>
            </div>
        </form>
    );

    const addNewPhoneNumberForm = () => (
        <form className="pt-3" onSubmit={handleSubmitAddPhone}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('phoneNumbers')} type="text" className="form-control" placeholder="Add New Phone Number" required />
            </div>
            <button className="btn btn-primary"> Add New Phone Number </button>
        </form>
    );

    return (
        <div className="container">
            <Nav />
            <br />
            <h1>UPDATE CONTACT</h1>
            <div>
                {showUpdateForm()}
            </div>
            <br />
            <div>
                {addNewPhoneNumberForm()}
            </div>
        </div>
    );
};

export default UpdateContact;