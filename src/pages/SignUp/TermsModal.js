import React from 'react';
import './TermsModal.css';

const Modal = ({ show, onClose, title, children }) => {
  if (!show) {
    return null;
  }

  return (
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <h2>{title}</h2>
          </div>
          <div className="modal-content">{children}</div>
        </div>
      </div>
  );
};

export default Modal;
