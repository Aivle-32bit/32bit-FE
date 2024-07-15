import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfo } from '../actions/authActions';
import './Profile.css';
import defaultProfilePic from '../images/default_profile_img.png';
import eyeIcon from '../icons/eye.png';
import eyeSlashIcon from '../icons/eye-slash.png';
import ChangeProfilePic from '../components/ChangeProfilePic';
import ChangePW from '../components/ChangePW';

const Profile = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth); // Redux 스토어에서 유저 정보 가져오기
    const [profileImage, setProfileImage] = useState(defaultProfilePic);
    const [isPwModalOpen, setIsPwModalOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        dispatch(fetchUserInfo());
    }, [dispatch]);

    useEffect(() => {
        if (user.imageUrl) {
            setProfileImage(user.imageUrl);
        }
    }, [user.imageUrl]);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const openPwModal = () => {
        setIsPwModalOpen(true);
    };

    const closePwModal = () => {
        setIsPwModalOpen(false);
    };

    if (user.loading) {
        return <div>Loading...</div>; // 로딩 중인 경우 처리
    }

    if (user.error) {
        return <div>Error: {user.error}</div>; // 에러 발생 시 처리
    }

    return (
        <div className="profile-container">
            <div className="profile-card">
                <ChangeProfilePic profileImage={profileImage} setProfileImage={setProfileImage} />
                <div className="profile-info">
                    <div className="info">
                        <h6>NAME</h6>
                        <span className="name">{user.memberName}</span>
                    </div>
                    <div className="info">
                        <h6>이메일</h6>
                        <span className="email">{user.email}</span>
                    </div>
                    <div className="info">
                        <h6>소속 회사</h6>
                        <span className="company">{user.companyName === '소속 없음' ? '소속 회사가 없습니다.' : user.companyName}</span>
                    </div>
                    <div className="button-container">
                        <input type="button" className="button" value="비밀번호 변경" onClick={openPwModal} />
                    </div>
                    <div className="button-container">
                        <input type="button" className="button" value="인증 현황" />
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