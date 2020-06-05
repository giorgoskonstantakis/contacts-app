import React, { useState, useEffect } from 'react';
import Nav from './Nav'
import { Link } from 'react-router-dom'
import axios from 'axios'

const App = () => {

  const [contacts, setContacts] = useState([]);

  // Get Request for Contacts
  const fetchContacts = () => {
    axios.get(`${process.env.REACT_APP_API}/`)
      .then(res => { setContacts(res.data.data.contacts) })
      .catch(error => alert('Error fetching the contacts.'))
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Delete Request for Contact
  const deleteContact = (_id) => {
    axios.delete(`${process.env.REACT_APP_API}/${_id}`)
      .then(res => {
        fetchContacts();
      }).catch(error => alert('Error deleting contact.'));
  };

  // Generate alert message to user about deleting a contact,if yes , it send affirmative reply
  const deleteConfirm = (_id) => {
    let answer = window.confirm('Are you sure you want to delete this contact ?');
    if (answer) {
      deleteContact(_id);
      alert('You have succesfully deleted this contact.')
    };
  };

  // Delete specific number from a contact 
  const deleteNumber = (_id, phoneNumbers) => {
    axios.patch(`${process.env.REACT_APP_API}/deleteNumber/${_id}`, { phoneNumbers })
      .then(res => {
        alert('Succesfully deleted number.')
        fetchContacts();
      }).catch(error => alert('Error deleting phone number.'));
  };

  return (
    <div className="container pb-5">
      <Nav />
      <br />
      <h1 style={{ textAlign: 'center', paddingTop: "10px" }} className="pb-3">CONTACTS</h1>
      {
        contacts.map((contact, index) => (
          <div className="row mb-2" key={contact._id} style={{ border: '2px solid silver', borderRadius: '10px' }}>
            <div className="col pt-3 pb-2">
              <div className="row">
                <div className="col-md-8">
                  <p style={{ fontSize: "30px", fontWeight: "bold" }}>{contact.name}</p>
                  <p style={{ fontSize: "25px" }}>{contact.email}</p>
                  <p style={{ fontSize: "25px" }}>{contact.homeAdress}</p>
                  <p style={{ fontSize: "25px" }}>{contact.phoneNumbers.map((num, i) =>
                    <li style={{ listStyleType: 'none' }} key={i}>
                      <textarea readOnly="readonly" rows="1" style={{ fontSize: "25px" }}>{num}</textarea>
                      <button onClick={() => deleteNumber(contact._id, contact.phoneNumbers[i])}
                        style={{ position: "relative", bottom: "7px", fontSize: "20px" }}
                        className="btn btn-md btn-outline-danger ml-1 mb-3">
                        x</button>
                    </li>
                  )}
                  </p>
                </div>
                <div className="col-md-2">
                  <Link to={`/contact/update/${contact._id}`} className="btn btn-lg btn-outline-primary">
                    Update Contact
                  </Link>
                </div>
                <div className="col-md-2">
                  <button onClick={() => deleteConfirm(contact._id)} className="btn btn-lg btn-outline-danger ml-1">Delete Contact</button>
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </div >
  );
};

export default App;