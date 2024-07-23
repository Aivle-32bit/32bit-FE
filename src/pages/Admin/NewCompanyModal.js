import React, { useState } from 'react';
import './NewCompanyModal.css';

const NewCompanyModal = ({ show, onClose, onSubmit }) => {
  const [companyData, setCompanyData] = useState({
    name: '',
    businessType: '',
    file: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData({ ...companyData, [name]: value });
  };

  const handleFileChange = (e) => {
    setCompanyData({ ...companyData, file: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(companyData);
  };

  if (!show) {
    return null;
  }

  return (
      <div className="new-company-modal-overlay">
        <div className="new-company-modal">
          <div className="new-company-modal-header">
            <span className="new-company-modal-title">새 회사 추가</span>
          </div>
          <div className="new-company-modal-content">
            <form className="new-company-modal-form" onSubmit={handleSubmit}>
              <span className="new-company-modal-label">회사명</span>
              <input
                  className="new-company-modal-input"
                  type="text"
                  name="name"
                  value={companyData.name}
                  onChange={handleInputChange}
                  placeholder="회사명"
                  required
              />
              <span className="new-company-modal-label">산업군</span>
              <input
                  className="new-company-modal-input"
                  type="text"
                  name="businessType"
                  value={companyData.businessType}
                  onChange={handleInputChange}
                  placeholder="산업군"
                  required
              />
              <span className="new-company-modal-label">로고 이미지</span>
              <input
                  className="new-company-modal-input"
                  type="file"
                  name="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  required
              />
              <button className="new-company-modal-action-button" type="submit">회사 생성</button>
              <button className="new-company-modal-action-button" type="button" onClick={onClose}>취소</button>
            </form>
          </div>
        </div>
      </div>
  );
};

export default NewCompanyModal;