import React, { useState } from 'react';
import './ChangePW.css';
import { changePassword } from '../api'; // api.js 파일에서 password 함수 임포트

const ChangePW = ({ user, closePwModal }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePwChange = async () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

        if (currentPassword !== user.password) {
            alert('현재 비밀번호가 일치하지 않습니다.');
            return;
        }

        if (!passwordRegex.test(newPassword)) {
            alert('새 비밀번호는 8자 이상 20자 이하이며, 적어도 하나의 숫자, 소문자, 대문자, 특수 문자를 포함해야 합니다.');
            return;
        }

        if (newPassword !== confirmPassword) {
            alert('새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.');
            return;
        }

        try {
            await changePassword(newPassword); // 비밀번호 변경 API 호출
            alert('비밀번호가 성공적으로 변경되었습니다.');
            closePwModal();
        } catch (error) {
            alert('비밀번호 변경 중 오류가 발생했습니다. 다시 시도해 주세요.');
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close-button" onClick={closePwModal}>&times;</span>
                <div className="modal-input">
                    <label>현재 비밀번호</label>
                    <input 
                        type="password" 
                        value={currentPassword} 
                        onChange={(e) => setCurrentPassword(e.target.value)} 
                        className="modal-password-input"
                    />
                </div>
                <div className="modal-input">
                    <label>새 비밀번호</label>
                    <input 
                        type="password" 
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)} 
                        className="modal-password-input"
                    />
                </div>
                <div className="modal-input">
                    <label>새 비밀번호 확인</label>
                    <input 
                        type="password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        className="modal-password-input"
                    />
                </div>
                <button onClick={handlePwChange} className="modal-button">확인</button>
            </div>
        </div>
    );
};

export default ChangePW;
