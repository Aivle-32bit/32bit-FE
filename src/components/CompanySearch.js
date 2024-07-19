// components/CompanySearch.js
import React, { useState } from 'react';
import './CompanySearch.css';

const CompanySearch = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Mock search results based on the input value
    if (value) {
      setResults(['삼성전자', '삼성물산', '삼성전기', '삼성SDS', '삼성디스플레이'].filter(item => item.includes(value)));
    } else {
      setResults([]);
    }
  };

  return (
      <div className="company-search">
        <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="기업명을 입력하세요"
            className="search-input"
        />
        <ul className="search-results">
          {results.map((result, index) => (
              <li key={index} onClick={() => onSelect(result)}>
                {result}
              </li>
          ))}
        </ul>
      </div>
  );
};

export default CompanySearch;