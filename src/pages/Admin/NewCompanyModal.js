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
      <div className="terms-modal-overlay">
        <div className="terms-modal">
          <div className="terms-modal-header">
            <h2>새 회사 추가</h2>
          </div>
          <div className="terms-modal-content">
            <form onSubmit={handleSubmit}>
              <input
                  type="text"
                  name="name"
                  value={companyData.name}
                  onChange={handleInputChange}
                  placeholder="회사명"
                  required
              />
              <input
                  type="text"
                  name="businessType"
                  value={companyData.businessType}
                  onChange={handleInputChange}
                  placeholder="산업군"
                  required
              />
              <input
                  type="file"
                  name="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  required
              />
              <button type="submit">회사 생성</button>
              <button type="button" onClick={onClose}>취소</button>
            </form>
          </div>
        </div>
      </div>
  );
};

export default NewCompanyModal;