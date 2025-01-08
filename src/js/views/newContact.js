import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { Context } from "../store/appContext";

export const NewContact = () => {
    const params = useParams();
    const { store, actions } = useContext(Context);
    const [contactToEdit, setContactToEdit] = useState(null);
    const [name, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        if (params.theid != undefined) {
            actions.loadContacts();
        }
    }, [params.theid]);

    useEffect(() => {
        if (params.theid !== undefined) {
            const contact = store.contacts.find(item => item.id === parseInt(params.theid)); 
            if (contact) {
                setContactToEdit(contact);
                setFullName(contact.name);
                setEmail(contact.email);
                setPhone(contact.phone);
                setAddress(contact.address);
            }
        }
    }, [store.contacts, params.theid]);

    const handleSaveNew = () => {
        if (name === "") return; 

        const contact = {
            name,
            phone,
            email,
            address
        };

        console.log('Contact saved:', contact);

        fetch('https://playground.4geeks.com/contact/agendas/arnauoliveras/contacts', {
            method: "POST",
            body: JSON.stringify(contact),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => {
                console.log(resp.ok);
                console.log(resp.status);
                return resp.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleSave = () => {
        if (name === "") return; 

        const contact = {
            name,
            phone,
            email,
            address
        };

        console.log('Contact saved:', contact);

        fetch('https://playground.4geeks.com/contact/agendas/arnauoliveras/contacts/' + params.theid, {
            method: "PUT",
            body: JSON.stringify(contact),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => {
                console.log(resp.ok);
                console.log(resp.status);
                return resp.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className="container mt-3">
            {params.theid == undefined ? (
                <h1 className="text-center">Add a new contact</h1>
            ) : (
                <h1 className="text-center">Edit {contactToEdit?.name}</h1>
            )}

            <div className="mb-3">
                <label htmlFor="fullName" className="form-label">Full Name</label>
                <div className="input-group">
                    <input type="text" id="fullName" className="form-control" placeholder="Full Name" value={name} onChange={(e) => setFullName(e.target.value)} />
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <div className="input-group">
                    <input type="text" id="email" className="form-control" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone</label>
                <div className="input-group">
                    <input type="text" id="phone" className="form-control" placeholder="Enter phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="address" className="form-label">Address</label>
                <div className="input-group">
                    <input type="text" id="address" className="form-control" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
            </div>

            <Link to="/">
                <div className="d-flex flex-column">
                    {params.theid == undefined ? (
                        <button className="btn btn-primary" onClick={handleSaveNew}>Save</button>
                    ) : (
                        <button className="btn btn-primary" onClick={handleSave}>Save</button>
                    )}
                </div>
            </Link>
            <Link to="/">
                <button className="btn btn-link">Or get back to contacts</button>
            </Link>
        </div>
    );
};