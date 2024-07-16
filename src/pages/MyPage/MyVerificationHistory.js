import React, {useEffect, useState} from 'react';
import {my_company_verification} from '../../api'; // 가상의 API 호출 함수
import './MyVerificationHistory.css';

const MyVerificationHistory = () => {
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
  }, []);

  return (
      <div className="verification-history-container">
        <h2>나의 인증 현황</h2>
        <ul>
          {history.map((item, index) => (
              <li key={index} className="verification-item">
                <img src={item.imageUri} alt={`Verification ${index}`}
                     className="verification-image"/>
                <div className="verification-details">
                  <div><strong>회사 이름:</strong> {item.name}</div>
                  <div><strong>주소:</strong> {item.address}</div>
                  <div><strong>대표자명:</strong> {item.representativeName}</div>
                  <div><strong>사업자
                    등록번호:</strong> {item.companyRegistrationNumber}</div>
                  <div><strong>전화번호:</strong> {item.companyPhoneNumber}</div>
                  <div><strong>업종:</strong> {item.businessType}</div>
                  <div><strong>인증 상태:</strong> {item.verificationStatus}</div>
                  <div><strong>생성 날짜:</strong> {new Date(
                      item.createdDate).toLocaleDateString()}</div>
                  <div><strong>마지막 수정 날짜:</strong> {new Date(
                      item.lastModifiedDate).toLocaleDateString()}</div>
                </div>
              </li>
          ))}
        </ul>
      </div>
  );
};

export default MyVerificationHistory;
