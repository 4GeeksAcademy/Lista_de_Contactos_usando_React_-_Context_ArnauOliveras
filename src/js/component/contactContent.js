import React, { Component, useState } from "react";

import { Link } from "react-router-dom";

export const ContactContent = ({ id, FullName, Email, Address, PhoneNum, onDelete}) => {
    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const deleteContact = () => {
        setShowModal(false);
        onDelete();
    }
    return (
        <li className="list-group-item mx-1" >
            <div className=" d-flex justify-content-between w-100">
                <div className="d-flex align-items-start>">
                    <img src="https://miro.medium.com/v2/resize:fit:1224/1*XKpA4-JcY06QcMOiPB1zaQ.jpeg" className="rounded-circle" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                    <div className="d-flex flex-column align-items-start mx-3">
                        <h5 className="mb-1">{FullName}</h5>
                        <p className="fs-6 mb-0 text-muted"><i className="fa-solid fa-location-dot"></i> {Address}</p>
                        <p className="fs-6 mb-0 text-muted"><i className="fa-solid fa-phone"></i> {PhoneNum}</p>
                        <p className="fs-6 mb-0 text-muted"><i className="fa-solid fa-envelope"></i> {Email}</p>
                    </div>
                </div>
                <div className="d-flex align-items-end>">
                    <Link to={"/editContact/" + id}>
                        <button type="button" className="btn"><i className="fa-solid fa-pen-to-square"></i></button>
                    </Link>
                    <div>

                        <button type="button" className="btn" onClick={handleShow}><i className="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            </div>

            <div className={`modal fade ${showModal ? 'show' : ''}`} tabIndex="-1" aria-hidden={!showModal} style={{ display: showModal ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Are you sure?</h5>
                            <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            If you delete this thing the entire universe will go down!
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={handleClose}>Oh no!</button>
                            <button type="button" className="btn btn-secondary" onClick={deleteContact }>Yes baby!</button>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}
