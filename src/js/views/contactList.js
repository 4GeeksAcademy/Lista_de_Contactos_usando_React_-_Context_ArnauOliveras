import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import { ContactContent } from "./../component/contactContent.js";

export const ContactList = () => {

    const { store, actions } = useContext(Context);
    useEffect(() => {
        actions.loadContacts();
    }, []);


    const editContact = (contactToEdit) => {

    }


    const removeContact = (contactToRemove) => {

        fetch('https://playground.4geeks.com/contact/agendas/arnauoliveras/contacts/' + contactToRemove.id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const updatedContacts = store.contacts.filter(contact => contact.id !== contactToRemove.id);
        actions.setContacts(updatedContacts);

    }


    return (
        <div className="container mt-3">
            <Link to="/newContact" className="d-flex justify-content-end">
                <div>
                    <button type="button" className="btn btn-success">Add new contact</button>
                </div>
            </Link>
            <ul className="list-group mt-4">

                {(store.contacts.length != 0) ? (
                    store.contacts.map((item, index) => (
                        <ContactContent key={index} id={item.id} FullName={item.name} Email={item.email} Address={item.address} PhoneNum={item.phone} onDelete={() => removeContact(item)} onEdit={() => editContact(item)} />
                    ))
                ) : (
                    <li className="list-group-item">No contacts available.</li>
                )}



            </ul>
        </div>
    );
};
