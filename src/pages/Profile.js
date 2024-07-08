import React, { useState } from 'react';
import './Profile.css';
import defaultProfilePic from '../images/default_profile_img.png';
import pencilIcon from '../icons/pencil.png';

const Profile = ({ user }) => {
    const [profileImage, setProfileImage] = useState(defaultProfilePic);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const supportedFormats = ['image/jpeg', 'image/png', 'image/gif'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (file) {
            if (!supportedFormats.includes(file.type)) {
                alert('지원되는 이미지 형식은 JPEG, PNG, GIF 입니다.');
                return;
            }
            if (file.size > maxSize) {
                alert('이미지 파일 크기는 최대 5MB 입니다.');
                return;
            }
            
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
                setIsModalOpen(false);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDefaultImage = () => {
        setProfileImage(defaultProfilePic);
        setIsModalOpen(false);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="profile-container">
            <div className="card">
                <div className="profile-picture-container">
                    <img src={profileImage} alt="" className="profile-picture" />
                    <button onClick={openModal} className="upload-button">
                        <img src={pencilIcon} alt="Edit" className="upload-icon" />
                    </button>
                </div>
                <div className="infos">
                    <div className="info">
                        <h6>NAME</h6>
                        <input type="text" className="name" placeholder={user.name} />
                    </div>
                    <div className="info">
                        <h6>BIRTH</h6>
                        <input type="text" className="birth" placeholder={user.birth} />
                    </div>
                    <div className="info">
                        <h6>GENDER</h6>
                        <input type="text" className="gender" placeholder={user.gender} />
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="infos">
                    <div className="info">
                        <h6>비밀번호 변경</h6>
                        <input type="text" className="password" placeholder={user.password} />
                    </div>
                    <div className="info">
                        <h6>비밀번호 확인</h6>
                        <input type="text" className="check-password" />
                    </div>
                    <div className="info">
                        <h6>소속 회사</h6>
                        <input type="text" className="belong" placeholder={user.belong} />
                        <input type="button" className="edit-button" value="검색" />
                    </div>
                    <div className="info">
                        <h6>이메일</h6>
                        <input type="text" className="email" placeholder={user.email} />
                        <input type="button" className="edit-button" value="인증" />
                    </div>
                    <div className="info">
                        <h6>인증번호 확인</h6>
                        <input type="text" className="check-email" />
                        <input type="button" className="edit-button" value="확인" />
                    </div>
                </div>
            </div>
            <div className="edit-button-container">
                <input type="button" className="edit-button" value="EDIT" />
            </div>
            
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={closeModal}>&times;</span>
                        <span className='text'>프로필 이미지 변경 방법을 선택하세요.</span>
                        <button onClick={handleDefaultImage} className="modal-button">기본이미지로 변경</button>
                        <label htmlFor="file-upload" className="modal-button">내 PC 에서 선택</label>
                        <span className='alert'>* 지원되는 이미지 형식은 JPEG, PNG, GIF 입니다. 이미지 파일 크기는 최대 5MB 입니다.</span>
                        <input
                            type="file"
                            id="file-upload"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleImageUpload}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;