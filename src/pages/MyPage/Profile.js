import React, { useEffect, useState } from 'react';
import { member_profile } from '../../api';
import ChangeProfilePic from './ChangeProfilePic'; // ChangeProfilePic 컴포넌트 임포트
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await member_profile();
        setProfile(data);
        setProfileImage(data.imageUrl); // 초기 프로필 이미지 설정
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <div> </div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-image">
          <ChangeProfilePic profileImage={profileImage} setProfileImage={setProfileImage} />
        </div>
        <div className="profile-details">
          <div className="profile-row">
            <span className="profile-label">이름</span>
            <span className="profile-value">{profile.name}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">이메일</span>
            <span className="profile-value">{profile.email}</span>
          </div>
          <div className="profile-row">
            <span className="profile-label">소속 회사</span>
            <span className="profile-value">{profile.companyName}</span>
            <button className="company-vefify-history-button">나의 인증 현황</button>
          </div>
        </div>
        <div className="profile-actions">
          <button className="change-password-button">비밀번호 변경</button>
          <button className="cancel-membership-button">회원 탈퇴</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
