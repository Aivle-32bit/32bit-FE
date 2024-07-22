import React, { useState, useEffect } from 'react';
import { approveUser, rejectUser, getUserLatestRegistration } from '../../api';
import './RegistrationDetailsModal.css';

const RegistrationDetailsModal = ({ userId, onClose }) => {
  const [registrationData, setRegistrationData] = useState(null);
  const [reason, setReason] = useState('');

  useEffect(() => {
    const fetchRegistrationData = async () => {
      try {
        const data = await getUserLatestRegistration(userId);
        setRegistrationData(data);
      } catch (error) {
        alert(`증빙자료 조회 중 에러 발생: ${error.response?.data?.message || error.message}`);
        onClose();
      }
    };

    fetchRegistrationData();
  }, [userId, onClose]);

  const handleApprove = async () => {
    if (window.confirm(`ID가 ${userId}인 사용자를 승인하시겠습니까?`)) {
      try {
        await approveUser(registrationData.id);
        alert(`ID가 ${userId}인 사용자를 승인했습니다.`);
        onClose();
      } catch (error) {
        alert(`승인 처리 중 에러 발생: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  const handleReject = async () => {
    if (window.confirm(`ID가 ${userId}인 사용자를 거부하시겠습니까?`)) {
      try {
        await rejectUser(registrationData.id, reason);
        alert(`ID가 ${userId}인 사용자를 거부했습니다.`);
        onClose();
      } catch (error) {
        alert(`거부 처리 중 에러 발생: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  if (!registrationData) {
    return null; // or some loading indicator
  }

  return (
      <div className="regist-detail-modal">
        <div className="regist-detail-modal-content">
          <span className="regist-detail-title">증빙자료</span>
            <div className="modal-image">
              <img src={registrationData.imageUri} alt="Company Registration" />
            </div><div className="modal-details">
            <div>ID{'\u00A0'.repeat(25)}{registrationData.id}</div>
            <div>회사명{'\u00A0'.repeat(18)}{registrationData.name}</div>
            <div>주소{'\u00A0'.repeat(22)}{registrationData.address}</div>
            <div>대표자명{'\u00A0'.repeat(14)}{registrationData.representativeName}</div>
            <div>사업자등록번호{'\u00A0'.repeat(3)}{registrationData.companyRegistrationNumber}</div>
            <div>회사 전화번호{'\u00A0'.repeat(6)}{registrationData.companyPhoneNumber}</div>
            <div>업종{'\u00A0'.repeat(22)}{registrationData.businessType}</div>
            <div>상태{'\u00A0'.repeat(22)}{registrationData.verificationStatus}</div>
            <div>생성일{'\u00A0'.repeat(18)}{registrationData.createdDate}</div>
            <div>마지막 수정일{'\u00A0'.repeat(6)}{registrationData.lastModifiedDate}</div>
          </div>
          <div className="modal-footer">
            <button className="approve-button" onClick={handleApprove}>승인</button>
            <button className="reject-button" onClick={handleReject}>거부</button>
          </div>
          <div className="modal-reason">
            <textarea
                placeholder="거부 사유를 입력하세요"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
            />
          </div>
          <span className="regist-detail-close-button" onClick={onClose}>확인</span>
        </div>
      </div>
  );
};

export default RegistrationDetailsModal;
