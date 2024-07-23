import React, { useState } from 'react';
import './Certification.css';
import { companyregistrations } from '../../api'; // api.js 파일에서 companyregistrations 함수 가져오기

const Certification = () => {
  const [companyName, setCompanyName] = useState('');
  const [representativeName, setCeoName] = useState('');
  const [companyRegistrationNumber, setBusinessNumber] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [image, setRegistrationImage] = useState(null);
  const [companyAddress, setCompanyAddress] = useState(null);
  const [companyPhoneNumber, setCompanyPhoneNumber] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('companyName', companyName);
    formData.append('representativeName', representativeName);
    formData.append('companyAddress', companyAddress);
    formData.append('companyPhoneNumber', companyPhoneNumber);
    formData.append('companyRegistrationNumber', companyRegistrationNumber);
    formData.append('businessType', businessType);
    formData.append('image', image);

    try {
      const response = await companyregistrations(formData);
      console.log('서버 응답:', response);
      // 추가적으로, 응답에 따라 다른 동작을 수행할 수 있습니다.
    } catch (error) {
      console.error('데이터 전송 중 오류 발생:', error);
    }
  };

  const handleFileChange = (event) => {
    setRegistrationImage(event.target.files[0]);
  };

  return (
    <div className="certification-container">
      <div className='certification-content'>
        <form className="certification-form" onSubmit={handleSubmit}>
          <span className="certification-title">소속 회사 인증</span>
          <span className="certification-intro">재무탐정의 AI 재무 분석 서비스를 이용하기 위해서는, 소속 회사 인증이 필요합니다.</span>
          <div className="certification-form-group">
            <label htmlFor="companyName">소속 회사명</label>
            <input
              type="text"
              id="companyName"
              className="input-company-name"
              name="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </div>
          <div className="certification-form-group">
            <label htmlFor="representativeName">대표자명</label>
            <input
              type="text"
              id="representativeName"
              className="input-ceo-name"
              name="representativeName"
              value={representativeName}
              onChange={(e) => setCeoName(e.target.value)}
              required
            />
          </div>
          <div className="certification-form-group">
            <label htmlFor="companyRegistrationNumber">사업자 등록 번호</label>
            <input
              type="text"
              id="companyRegistrationNumber"
              className="input-business-number"
              name="companyRegistrationNumber"
              value={companyRegistrationNumber}
              onChange={(e) => setBusinessNumber(e.target.value)}
              required
            />
          </div>
          <div className="certification-form-group">
            <label htmlFor="companyAddress">사업자 주소</label>
            <input
              type="text"
              id="companyAddress"
              className="input-business-number"
              name="companyAddress"
              value={companyAddress }
              onChange={(e) => setCompanyAddress(e.target.value)}
              required
            />
          </div>

          <div className="certification-form-group">
            <label htmlFor="companyPhoneNumber">사업자 전화번호</label>
            <input
              type="text"
              id="companyPhoneNumber"
              className="input-business-number"
              name="companyPhoneNumber"
              value={companyPhoneNumber }
              onChange={(e) => setCompanyPhoneNumber(e.target.value)}
              required
            />
          </div>   

          <div className="certification-form-group">
            <label htmlFor="businessType">사업 종류</label>
            <input
              type="text"
              id="businessType"
              className="input-business-type"
              name="businessType"
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              required
            />
          </div>
          <div className="certification-form-group">
            <label htmlFor="image">사업자 등록증 이미지</label>
            <div className="file-input-wrapper">
              <input
                type="file"
                id="image"
                className="input-registration-image"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
              <label htmlFor="image" className="custom-file-upload">
                파일 선택
              </label>
              <span className="file-name">
                {image ? image.name : '선택된 파일 없음'}
              </span>
            </div>
          </div>
          <button type='submit' className="certification-submit-button">제출</button>
        </form>
      </div>
    </div>
  );
};

export default Certification;
