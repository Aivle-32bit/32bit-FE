import React, { useState } from 'react';
import './Profile.css';
import defaultProfilePic from '../images/default_profile_img.png';
import eyeIcon from '../icons/eye.png';
import eyeSlashIcon from '../icons/eye-slash.png';
import ChangeProfilePic from '../components/ChangeProfilePic';
import ChangePW from '../components/ChangePW';

const Profile = ({ user }) => {
    const [profileImage, setProfileImage] = useState(defaultProfilePic);
    const [isPwModalOpen, setIsPwModalOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const openPwModal = () => {
        setIsPwModalOpen(true);
    };

    const closePwModal = () => {
        setIsPwModalOpen(false);
    };

    return (
        <div className="profile-container">
            <div className="card">
                <ChangeProfilePic profileImage={profileImage} setProfileImage={setProfileImage} />
                <div className="infos">
                    <div className="info">
                        <h6>NAME</h6>
                        <span className="name">{user.name}</span>
                    </div>
                    <div className="info">
                        <h6>비밀번호</h6>
                        {showPassword ? (
                            <input 
                                type="text" 
                                className="password" 
                                defaultValue={user.password} 
                                onBlur={() => setShowPassword(false)} 
                            />
                        ) : (
                            <span className="password">{'*'.repeat(user.password.length)}</span>
                        )}
                        <img 
                            src={showPassword ? eyeSlashIcon : eyeIcon} 
                            alt="Toggle Password Visibility" 
                            className="password-toggle-icon" 
                            onClick={toggleShowPassword} 
                        />
                    </div>
                    <div className="button-container">
                        <h6> </h6>
                        <input type="button" className="button" value="비밀번호 변경   >" onClick={openPwModal} />
                    </div>
                    <div className="info">
                        <h6>이메일</h6>
                        <span className="email">{user.email}</span>
                    </div>
                    <div className="info">
                        <h6>소속 회사</h6>
                        <span className="company">{user.state === 0 ? '소속 회사가 없습니다.' : user.company }</span>
                    </div>
                    <div className="button-container">
                        <h6> </h6>
                        <input type="button" className="button" value="인증 현황   >" />
                    </div>
                </div>
            </div>
            
            {isPwModalOpen && (
                <ChangePW user={user} closePwModal={closePwModal} />
            )}
        </div>
    );
}

export default Profile;