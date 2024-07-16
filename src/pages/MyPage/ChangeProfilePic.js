import React, { useEffect, useState } from 'react';
import './ChangeProfilePic.css';
import defaultProfilePic from '../../assets/images/default_profile_img.png';

const ChangeProfilePic = ({ profileImage, setProfileImage, onUpdate, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (!profileImage) {
            setProfileImage(defaultProfilePic);
        }
    }, [profileImage, setProfileImage]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const supportedFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (file) {
            if (!supportedFormats.includes(file.type)) {
                alert('지원되는 이미지 형식은 JPEG, PNG, GIF, WEBP 입니다.');
                return;
            }
            if (file.size > maxSize) {
                alert('이미지 파일 크기는 최대 5MB 입니다.');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = async () => {
                try {
                    await onUpdate(file); // 이미지 업데이트 API 호출
                    setProfileImage(reader.result);
                    setIsModalOpen(false);
                } catch (error) {
                    console.error('Error updating profile image:', error);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDefaultImage = async () => {
        try {
            await onDelete(); // 이미지 삭제 API 호출
            setProfileImage(defaultProfilePic);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error deleting profile image:', error);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="profile-img-container">
            <img src={profileImage || defaultProfilePic} alt="Profile" className="profile-img" />
            <div className="overlay" onClick={openModal}>
                <div className="overlay-text">사진 변경</div>
            </div>
            {isModalOpen && (
                <div className="profile-img-modal">
                    <div className="profile-img-modal-content">
                        <span className="close-button" onClick={closeModal}>&times;</span>
                        <span className="text">프로필 이미지 변경 방법을 선택하세요.</span>
                        <button onClick={handleDefaultImage} className="profile-img-change-button">기본이미지로 변경</button>
                        <label htmlFor="file-upload" className="profile-img-change-button">내 PC 에서 선택</label>
                        <span className="alert">* 지원되는 이미지 형식은 JPEG, PNG, GIF, WEBP 입니다. 이미지 파일 크기는 최대 5MB 입니다.</span>
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
