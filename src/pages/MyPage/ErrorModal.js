import React from 'react';
import './ErrorModal.css';

const ErrorModal = ({error, setError}) => {
  return (
      <div className="error-modal-overlay" onClick={() => setError(null)}>
        <div className="error-modal-content"
             onClick={(e) => e.stopPropagation()}>
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => setError(null)}>Close</button>
        </div>
      </div>
  );
};

export default ErrorModal;