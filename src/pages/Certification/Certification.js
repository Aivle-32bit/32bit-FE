import React, { useState } from 'react';
import './Certification.css';

const Certification = () => {
  const [companyName, setCompanyName] = useState('');
  const [ceoName, setCeoName] = useState('');
  const [businessNumber, setBusinessNumber] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [registrationImage, setRegistrationImage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('회사 이름:', companyName);
    console.log('대표자명:', ceoName);
    console.log('사업자 등록 번호:', businessNumber);
    console.log('사업 종류:', businessType);
    console.log('사업자 등록증 이미지:', registrationImage);

    // 여기서 서버에 데이터를 전송하는 코드를 추가할 수 있습니다.
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
            <label htmlFor="ceoName">대표자명</label>
            <input
              type="text"
              id="ceoName"
              className="input-ceo-name"
              name="ceoName"
              value={ceoName}
              onChange={(e) => setCeoName(e.target.value)}
              required
            />
          </div>
          <div className="certification-form-group">
            <label htmlFor="businessNumber">사업자 등록 번호</label>
            <input
              type="text"
              id="businessNumber"
              className="input-business-number"
              name="businessNumber"
              value={businessNumber}
              onChange={(e) => setBusinessNumber(e.target.value)}
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
            <label htmlFor="registrationImage">사업자 등록증 이미지</label>
            <div className="file-input-wrapper">
              <input
                type="file"
                id="registrationImage"
                className="input-registration-image"
                name="registrationImage"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
              <label htmlFor="registrationImage" className="custom-file-upload">
                파일 선택
              </label>
              <span className="file-name">
                {registrationImage ? registrationImage.name : '선택된 파일 없음'}
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
