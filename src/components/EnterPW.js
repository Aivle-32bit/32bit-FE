import React from 'react';
import './EnterPW.css';
import lockImage from '../images/input_box_locked.png';

const EnterPW = ({ value, onChange }) => {
  return (
    <div className="enter-pw-wrapper" style={{ backgroundImage: `url(${lockImage})` }}>
      <input
        type="password"
        placeholder="비밀번호"
        value={value}
        onChange={onChange}
        className="enter-pw-input"
      />
    </div>
  );
};

export default EnterPW;