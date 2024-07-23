import React, {useEffect, useRef, useState} from 'react';
import {debounce} from 'lodash';
import './CompanySearch.css';
import {searchCompanies} from "../api";

const CompanySearch = ({onSelect}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const debouncedFetchResultsRef = useRef(null);

  const fetchResults = async (value) => {
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

  useEffect(() => {
    debouncedFetchResultsRef.current = debounce(fetchResults, 300);
  }, []); // 빈 배열을 사용하여 한 번만 실행

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    debouncedFetchResultsRef.current(value);
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
