import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './compete.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Compete() {
  const [searchA, setSearchA] = useState('');
  const [searchB, setSearchB] = useState('');
  const [filteredData, setFilteredData] = useState({
    labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'],
    datasets: [
      {
        label: '기업 A',
        data: [65, 59, 80, 81, 56],
        backgroundColor: 'rgba(121, 112, 175, 0.8)', // #7970AF
        borderColor: 'rgba(121, 112, 175, 1)', // #7970AF
        borderWidth: 1,
        borderRadius: 10,
      },
      {
        label: '기업 B',
        data: [28, 48, 40, 19, 72],
        backgroundColor: 'rgba(11, 140, 186, 0.8)', // #0B8CBA
        borderColor: 'rgba(11, 140, 186, 1)', // #0B8CBA
        borderWidth: 1,
        borderRadius: 10,
      },
    ],
  });

  const [showPopup, setShowPopup] = useState(false);
  const [activeSearch, setActiveSearch] = useState('');

  useEffect(() => {
    const originalData = {
      labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'],
      datasets: [
        {
          label: '기업 A',
          data: [65, 59, 80, 81, 56],
          backgroundColor: 'rgba(121, 112, 175, 0.8)', // #7970AF
          borderColor: 'rgba(121, 112, 175, 1)', // #7970AF
          borderWidth: 1,
          borderRadius: 10,
        },
        {
          label: '기업 B',
          data: [28, 48, 40, 19, 72],
          backgroundColor: 'rgba(11, 140, 186, 0.8)', // #0B8CBA
          borderColor: 'rgba(11, 140, 186, 1)', // #0B8CBA
          borderWidth: 1,
          borderRadius: 10,
        },
      ],
    };

    const filteredDatasets = originalData.datasets.map(dataset => ({
      ...dataset,
      data: dataset.data.map((value, index) => {
        const searchTerm = dataset.label === '기업 A' ? searchA : searchB;
        return originalData.labels[index].toLowerCase().includes(searchTerm.toLowerCase()) ? value : 0;
      }),
    }));

    setFilteredData({ ...originalData, datasets: filteredDatasets });
  }, [searchA, searchB]);

  const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            style: 'italic',
            weight: 'bold',
          },
          color: '#FFFFFF',
        },
      },
      title: {
        display: true,
        text: '기업 비교 분석',
        font: {
          size: 18,
          style: 'italic',
          weight: 'bold',
        },
        color: '#FFFFFF',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };
// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  const handleSearchClick = (searchType) => {
    setActiveSearch(searchType);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handlePopupSearch = () => {
    setShowPopup(false);
  };

  return (
    <div className="compete-container">
      <div className="search-container">
        <button onClick={() => handleSearchClick('A')}>기업 A 검색</button>
        <button onClick={() => handleSearchClick('B')}>기업 B 검색</button>
      </div>
      <div className="compete-content">
        <Bar data={filteredData} options={options} />
      </div>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>검색</h2>
            <input 
              type="text" 
              placeholder={`기업 ${activeSearch} 검색`} 
              value={activeSearch === 'A' ? searchA : searchB} 
              onChange={e => activeSearch === 'A' ? setSearchA(e.target.value) : setSearchB(e.target.value)} 
            />
            <button onClick={handlePopupClose}>닫기</button>
            <button onClick={handlePopupSearch}>검색</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Compete;
