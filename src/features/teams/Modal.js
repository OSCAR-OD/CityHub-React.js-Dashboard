import React from "react";
import "./Modal.css";

const Modal = ({ isOpen, onRequestClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onRequestClose}>
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;