import React, {useEffect, useState} from 'react';
import {
  member_password_update,
  member_profile,
  member_profile_image,
  member_profile_image_delete,
  member_profile_update,
  member_withdraw
} from '../../api';
import ChangeProfilePic from './ChangeProfilePic'; // ChangeProfilePic 컴포넌트 임포트
import './Profile.css';
import defaultProfilePic from '../../assets/images/default_profile_img.png'; // 기본 이미지 임포트

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [profileImage, setProfileImage] = useState('');
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await member_profile();
        setProfile(data);
        setProfileImage(data.imageUrl || defaultProfilePic); // 초기 프로필 이미지 설정
        setNewName(data.name);
        setNewAddress(data.address);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setProfileImage(defaultProfilePic); // 에러 발생 시 기본 이미지 설정
      }
    };

    fetchProfile();
  }, []);

  const handleProfileImageUpdate = async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      await member_profile_image(formData);
      // 프로필 이미지 갱신
      setProfileImage(URL.createObjectURL(imageFile));
    } catch (error) {
      console.error('Error updating profile image:', error);
    }
  };

  const handleProfileImageDelete = async () => {
    try {
      await member_profile_image_delete();
      setProfileImage(defaultProfilePic);
    } catch (error) {
      console.error('Error deleting profile image:', error);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const updatedProfile = {
        name: newName,
        address: newAddress,
      };
      await member_profile_update(updatedProfile);
      setProfile({...profile, ...updatedProfile});
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      const passwordData = {
        currentPassword,
        newPassword,
        retype: retypePassword,
      };
      await member_password_update(passwordData);
      setCurrentPassword('');
      setNewPassword('');
      setRetypePassword('');
      alert('비밀번호가 성공적으로 변경되었습니다.');
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  const handleMemberWithdraw = async () => {
    try {
      if (!window.confirm('정말로 탈퇴하시겠습니까?')) {
        return;
      }
      await member_withdraw();
      alert('회원 탈퇴가 완료되었습니다.');
      window.location.href = '/login';
    } catch (error) {
      console.error('Error withdrawing membership:', error);
    }
  };

  if (!profile) {
    return <div>로딩 중...</div>;
  }

  return (
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-image">
            <ChangeProfilePic
                profileImage={profileImage}
                setProfileImage={setProfileImage}
                onUpdate={handleProfileImageUpdate}
                onDelete={handleProfileImageDelete}
            />
          </div>
          <div className="profile-details">
            {editing ? (
                <>
                  <div className="profile-row">
                    <span className="profile-label">이름</span>
                    <input type="text" value={newName}
                           onChange={(e) => setNewName(e.target.value)}
                           className="profile-input"/>
                  </div>
                  <div className="profile-row">
                    <span className="profile-label">주소</span>
                    <input type="text" value={newAddress}
                           onChange={(e) => setNewAddress(e.target.value)}
                           className="profile-input"/>
                  </div>
                  <div className="profile-actions">
                    <button onClick={handleProfileUpdate}>저장</button>
                    <button onClick={() => setEditing(false)}>취소</button>
                  </div>
                </>
            ) : (
                <>
                  <div className="profile-row">
                    <span className="profile-label">이름</span>
                    <span className="profile-value">{profile.name}</span>
                  </div>
                  <div className="profile-row">
                    <span className="profile-label">주소</span>
                    <span className="profile-value">{profile.address}</span>
                  </div>
                  <div className="profile-actions">
                    <button onClick={() => setEditing(true)}>수정</button>
                  </div>
                </>
            )}
            <div className="profile-row">
              <span className="profile-label">이메일</span>
              <span className="profile-value">{profile.email}</span>
            </div>
            <div className="profile-row">
              <span className="profile-label">소속 회사</span>
              <span className="profile-value">{profile.companyName}</span>
              <button className="company-vefify-history-button">나의 인증 현황
              </button>
            </div>
          </div>
          <div className="profile-password-change">
            <h3>비밀번호 변경</h3>
            <div className="profile-row">
              <input type="password" placeholder="현재 비밀번호"
                     value={currentPassword}
                     onChange={(e) => setCurrentPassword(e.target.value)}
                     className="profile-input"/>
            </div>
            <div className="profile-row">
              <input type="password" placeholder="새 비밀번호" value={newPassword}
                     onChange={(e) => setNewPassword(e.target.value)}
                     className="profile-input"/>
            </div>
            <div className="profile-row">
              <input type="password" placeholder="새 비밀번호 확인"
                     value={retypePassword}
                     onChange={(e) => setRetypePassword(e.target.value)}
                     className="profile-input"/>
            </div>
            <div className="profile-actions">
              <button onClick={handlePasswordUpdate}>비밀번호 변경</button>
            </div>
          </div>
          <div className="profile-actions">
            <button className="cancel-membership-button"
                    onClick={handleMemberWithdraw}>회원 탈퇴
            </button>
          </div>
        </div>
      </div>
  );
};

export default Profile;
