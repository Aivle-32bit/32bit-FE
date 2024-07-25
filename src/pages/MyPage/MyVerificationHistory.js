import React, { useEffect, useState } from 'react';
import { my_company_verification } from '../../api';
import './MyVerificationHistory.css';

const MyVerificationHistory = ({ userState, onClose }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await my_company_verification();
        setHistory(data);
      } catch (error) {
        console.error('Error fetching verification history:', error);
      }
    };

    fetchHistory();

    if (userState !== 'UNVERIFIED' && userState !== 'USER_DORMANT') {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [userState, onClose]);

  if (userState !== 'UNVERIFIED' && userState !== 'USER_DORMANT') {
    return (
        <div className="verification-history-container">
          <h2>이미 인증된 회원입니다</h2>
          <p>3초 후에 마이페이지로 이동합니다...</p>
        </div>
    );
  }

  return (
      <div className="verification-history-container">
        <h2>나의 인증 현황</h2>
        <ul>
          {history.map((item, index) => (
              <li key={index} className="verification-item">
                <img src={item.imageUri} alt={`Verification ${index}`} className="verification-image" />
                <div className="verification-details">
                  <div><strong>회사 이름:</strong> {item.name}</div>
                  <div><strong>주소:</strong> {item.address}</div>
                  <div><strong>대표자명:</strong> {item.representativeName}</div>
                  <div><strong>사업자 등록번호:</strong> {item.companyRegistrationNumber}</div>
                  <div><strong>전화번호:</strong> {item.companyPhoneNumber}</div>
                  <div><strong>업종:</strong> {item.businessType}</div>
                  <div><strong>인증 상태:</strong> {item.verificationStatus}</div>
                  <div><strong>생성 날짜:</strong> {new Date(item.createdDate).toLocaleDateString()}</div>
                  <div><strong>마지막 수정 날짜:</strong> {new Date(item.lastModifiedDate).toLocaleDateString()}</div>
                </div>
              </li>
          ))}
        </ul>
        <button onClick={onClose} className="close-button">닫기</button>
      </div>
  );
};

export default MyVerificationHistory;