import React, { useState } from 'react';
import Nav from './Nav'
import axios from 'axios'


// Create New Contact Page
const Create = () => {

    const [state, setState] = useState({
        name: '',
        email: '',
        homeAdress: '',
        phoneNumbers: ''
    });

    const { name, email, homeAdress, phoneNumbers } = state;

    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        axios.post(`${process.env.REACT_APP_API}/`, { name, email, homeAdress, phoneNumbers })
            .then(res => {
                setState({ ...state, name: '', email: '', homeAdress: '', phoneNumbers: '' });
                alert('New Contact Recently Added.');
            }).catch(error => {
                alert('Create Contact Failed.');
            });
    };

    return (
        <div className="container pb-5">
            <Nav />
            <h1 style={{ textAlign: 'center' }} className="pb-3 pt-3">CREATE CONTACTS</h1>
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
                <div className="form-group">
                    <label className="text-muted">Phone Number</label>
                    <input value={phoneNumbers} onChange={handleChange('phoneNumbers')} type="text" className="form-control" placeholder="Add Phone Number" required />
                </div>
                <div>
                    <button className="btn btn-primary"> Create </button>
                </div>
            </form>
        </div>
    )
}

export default Create;