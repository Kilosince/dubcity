import React, { useState, useEffect } from 'react';

const Modal = ({ closeModal }) => {




  return (
    <div className="modalBackground">
    <div className="modalContainer"></div>
    <div className="card-body" style={{border: "solid", borderWidth: "2px",
    marginRight: "15%", marginLeft: "15%",
    borderColor: "#A0B8C1",  borderRadius: "10px"}}>
        <div className="title"></div>
       <h3>Please hold while your payment submits </h3>
        <div className="body"></div>
        <div className="footer"></div>

        </div>
    </div>

  );
}
export default Modal;
