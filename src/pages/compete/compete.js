import React, { useState, useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './compete.css';
import CompanySearch from '../../components/CompanySearch';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Compete() {
  const chartRef = useRef(null);

  const [searchA, setSearchA] = useState('');
  const [searchB, setSearchB] = useState('');
  const [filteredData, setFilteredData] = useState({
    labels: ['DEBT', 'ATR', 'ROA', 'AGR', 'PPE'],
    datasets: [
      {
        label: '기업 A',
        data: [65, 59, 80, 81, 56],
      },
      {
        label: '기업 B',
        data: [28, 48, 40, 19, 72],
      },
    ],
  });

  const [showPopup, setShowPopup] = useState(false);
  const [activeSearch, setActiveSearch] = useState('');

  useEffect(() => {
    const originalData = {
      labels: ['DEBT', 'ATR', 'ROA', 'AGR', 'PPE'],
      datasets: [
        {
          label: '기업 A',
          data: [65, 59, 80, 81, 56],
        },
        {
          label: '기업 B',
          data: [28, 48, 40, 19, 72],
        },
      ],
    };

    const filteredDatasets = originalData.datasets.map((dataset) => ({
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
    animation: {
      duration: 50, // 애니메이션 속도를 500ms로 설정 (기본값은 1000ms)
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold',
          },
          color: '#424242',
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    const ctx = chart.ctx;

    // 기업 A 그라데이션
    const gradientA = ctx.createLinearGradient(0, 0, ctx.canvas.width, 0);
    gradientA.addColorStop(0, '#332F49');
    gradientA.addColorStop(1, '#7970AF');

    // 기업 B 그라데이션
    const gradientB = ctx.createLinearGradient(0, 0, ctx.canvas.width, 0);
    gradientB.addColorStop(0, '#053F54');
    gradientB.addColorStop(1, '#0B8CBA');

    const updatedDatasets = filteredData.datasets.map((dataset, index) => {
      return {
        ...dataset,
        backgroundColor: index === 0 ? gradientA : gradientB, // 그라데이션 설정
        borderColor: 'transparent', // 테두리 제거
        borderWidth: 0, // 테두리 두께를 0으로 설정
        borderRadius: 20, // 막대 끝을 둥글게 설정
      };
    });

    setFilteredData({
      ...filteredData,
      datasets: updatedDatasets,
    });
  }, [filteredData]);

  const handleSearchClick = (searchType) => {
    setActiveSearch(searchType);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleSelectCompany = (selectedCompany) => {
    if (activeSearch === 'A') {
      setSearchA(selectedCompany);
    } else {
      setSearchB(selectedCompany);
    }
    setShowPopup(false);
  };

  return (
    <div className="compete-container">
      <div className="compete-content">
        <div className="compete-search-container">
          <button className="compete-search-button" onClick={() => handleSearchClick('A')}>기업 A 검색</button>
          <button className="compete-search-button" onClick={() => handleSearchClick('B')}>기업 B 검색</button>
        </div>
        <div className="compete-chart-container">
          <span className='compete-bar-chart-title'>주요 지표 비교 분석</span>
          <Bar className='compete-bar-chart' ref={chartRef} data={filteredData} options={options} />
        </div>
      </div>
      {showPopup && (
        <div className="modal-overlay" onClick={handlePopupClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handlePopupClose}>&times;</button>
            <h2>기업 찾기</h2>
            <p>검색창에 기업명을 입력하여 분석을 원하는 기업을 선택하여 주세요.</p>
            <CompanySearch onSelect={handleSelectCompany} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Compete;
