import React, { useState } from 'react';
import './CompanySearch.css';
import { searchCompanies } from "../api";

const CompanySearch = ({ onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value) {
      try {
        const response = await searchCompanies(value);
        setResults(response);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setResults([]);
      }
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
          {results.map((result) => (
              <li key={result.id} onClick={() => onSelect(result)}>
                {result.name} ({result.businessType})
              </li>
          ))}
        </ul>
      </div>
  );
};

export default CompanySearch;