import React, { useState } from 'react';
import './ChangeProfilePic.css';
import defaultProfilePic from '../images/default_profile_img.png';
import pencilIcon from '../icons/pencil.png';

const ChangeProfilePic = ({ profileImage, setProfileImage }) => {
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
        <div className="profile-picture-container">
            <img src={profileImage} alt="Profile" className="profile-picture" />
            <button onClick={openModal} className="upload-button">
                <img src={pencilIcon} alt="Edit" className="upload-icon" />
            </button>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={closeModal}>&times;</span>
                        <span className="text">프로필 이미지 변경 방법을 선택하세요.</span>
                        <button onClick={handleDefaultImage} className="modal-button">기본이미지로 변경</button>
                        <label htmlFor="file-upload" className="modal-button">내 PC 에서 선택</label>
                        <span className="alert">* 지원되는 이미지 형식은 JPEG, PNG, GIF 입니다. 이미지 파일 크기는 최대 5MB 입니다.</span>
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
};

export default ChangeProfilePic;