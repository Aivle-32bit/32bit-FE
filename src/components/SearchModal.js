// components/SearchModal.js
import React from 'react';
import './SearchModal.css';
import CompanySearch from './CompanySearch';

const SearchModal = ({isVisible, onClose, onSelect}) => {
  if (!isVisible) {
    return null;
  }

  return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
          <h2>기업 찾기</h2>
          <p>검색창에 기업명을 입력하여 분석을 원하는 기업을 선택하여 주세요.</p>
          <CompanySearch onSelect={onSelect}/>
        </div>
      </div>
  );
};

export default SearchModal;
