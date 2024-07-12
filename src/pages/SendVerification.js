import React from 'react';
import './send-verification.css'; // 별도의 CSS 파일을 사용할 경우

const SendVerification = ({ onClick }) => {
    return (
        <div className="verification-container">
            <button 
                type="button" 
                className="verification-button" 
                onClick={onClick}
            >
                인증 번호 보내기
            </button>
        </div>
    );
};

export default SendVerification;