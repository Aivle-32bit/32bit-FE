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
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>회사 정보 등록</h2>
              <form onSubmit={handleSubmit}>
                <label>
                  업력:
                  <input type="number" value={experience} onChange={(e) => setExperience(e.target.value)} />
                </label>
                <label>
                  직원 수:
                  <input type="number" value={numEmployees} onChange={(e) => setNumEmployees(e.target.value)} />
                </label>
                <label>
                  입사자 수:
                  <input type="number" value={numHires} onChange={(e) => setNumHires(e.target.value)} />
                </label>
                <label>
                  퇴사자 수:
                  <input type="number" value={numResignations} onChange={(e) => setNumResignations(e.target.value)} />
                </label>
                <button type="submit">등록</button>
                <button type="button" onClick={onClose}>취소</button>
              </form>
            </div>
          </div>
      )
  );
};

export default CompanyInfoModal;