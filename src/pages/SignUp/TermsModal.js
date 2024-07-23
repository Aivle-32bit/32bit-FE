import React from 'react';
import './TermsModal.css';

const TermsModal = ({ show, title, children }) => {
  if (!show) {
    return null;
  }

  return (
      <div className="terms-modal-overlay">
        <div className="terms-modal">
          <div className="terms-modal-header">
            <span className='terms-modal-title'>{title}</span>
          </div>
          <div className="terms-modal-content">{children}</div>
        </div>
      </div>
  );
};

export default TermsModal;