import React from 'react';
import './EnterID.css';
import lockImage from '../images/input_box_locked.png';

const EnterID = ({ value, onChange }) => {
  return (
    <div className="enter-id-wrapper" style={{ backgroundImage: `url(${lockImage})` }}>
      <input
        type="text"
        placeholder="아이디"
        value={value}
        onChange={onChange}
        className="input-field"
      />
    </div>
  );
};

export default EnterID;