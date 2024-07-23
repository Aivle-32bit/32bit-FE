import React, { useState, useEffect } from 'react';
import './CompanyInfoModal.css';

const CompanyInfoModal = ({ show, onClose, onSubmit, company }) => {
  const [experience, setExperience] = useState('');
  const [numEmployees, setNumEmployees] = useState('');
  const [numHires, setNumHires] = useState('');
  const [numResignations, setNumResignations] = useState('');

  useEffect(() => {
    if (company) {
      setExperience(company.experience || '');
      setNumEmployees(company.num_employees || '');
      setNumHires(company.num_hires || '');
      setNumResignations(company.num_resignations || '');
    }
  }, [company]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedCompanyData = {
      experience,
      numEmployees,
      numHires,
      numResignations,
    };
    onSubmit(updatedCompanyData, company.id);
    onClose(); // 등록 후 모달을 닫음
  };

  return (
      show && (
          <div className="regist-company-modal-overlay">
            <div className="regist-company-modal">
              <div className="regist-company-modal-header">
                <span className="regist-company-modal-title">회사 정보 등록</span>
              </div>
            <div className="regist-company-modal-content">
              <form className="regist-company-modal-form" onSubmit={handleSubmit}>
                <span className="regist-company-modal-label">업력</span>
                <input className="regist-company-modal-input"
                      type="number" value={experience} onChange={(e) => setExperience(e.target.value)} />
                <span className="regist-company-modal-label">직원 수</span>
                <input className="regist-company-modal-input"
                      type="number" value={numEmployees} onChange={(e) => setNumEmployees(e.target.value)} />
                <span className="regist-company-modal-label">입사자 수</span>
                <input className="regist-company-modal-input"
                      type="number" value={numHires} onChange={(e) => setNumHires(e.target.value)} />
                <span className="regist-company-modal-label">퇴사자 수</span>
                <input className="regist-company-modal-input"
                      type="number" value={numResignations} onChange={(e) => setNumResignations(e.target.value)} />
                <button className="regist-company-modal-action-button" type="submit">등록</button>
                <button className="regist-company-modal-action-button" type="button" onClick={onClose}>취소</button>
              </form>
            </div>
          </div>
        </div>
      )
  );
};

export default CompanyInfoModal;