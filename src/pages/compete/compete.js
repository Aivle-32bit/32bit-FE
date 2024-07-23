import React, { useState, useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './compete.css';
import CompanySearch from '../../components/CompanySearch';
import { getAnalysisData } from '../../api.js'; // Ensure correct import

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Compete() {
  const chartRef = useRef(null);

  const [filteredData, setFilteredData] = useState({
    labels: ['DEBT', 'ATR', 'ROA', 'AGR', 'PPE'],
    datasets: [
      {
        label: '기업 A',
        data: [0, 0, 0, 0, 0],
      },
      {
        label: '기업 B',
        data: [0, 0, 0, 0, 0],
      },
    ],
  });

  const [showPopup, setShowPopup] = useState(false);
  const [activeSearch, setActiveSearch] = useState('');

  const fetchCompanyData = async (companyId, companyType, companyName) => {
    try {
      const data = await getAnalysisData(companyId);

      setFilteredData((prevData) => ({
        ...prevData,
        datasets: prevData.datasets.map((dataset) => {
          if ((companyType === 'A' && dataset.label === '기업 A') || (companyType === 'B' && dataset.label === '기업 B')) {
            return {
              ...dataset,
              label: companyName, // Update the label with the selected company name
              data: [data.debt, data.atr, data.roa, data.agr, data.ppe],
            };
          }
          return dataset;
        }),
      }));
    } catch (error) {
      console.error('Error fetching company data:', error);
    }
  };

  const handleSearchClick = (searchType) => {
    setActiveSearch(searchType);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleSelectCompany = (selectedCompany) => {
    const companyId = selectedCompany.id; // Assuming the selectedCompany has an id field
    const companyName = selectedCompany.name; // Assuming the selectedCompany has a name field
    fetchCompanyData(companyId, activeSearch, companyName);
    setShowPopup(false);
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    animation: {
      duration: 50,
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

    const gradientA = ctx.createLinearGradient(0, 0, ctx.canvas.width, 0);
    gradientA.addColorStop(0, '#332F49');
    gradientA.addColorStop(1, '#7970AF');

    const gradientB = ctx.createLinearGradient(0, 0, ctx.canvas.width, 0);
    gradientB.addColorStop(0, '#053F54');
    gradientB.addColorStop(1, '#0B8CBA');

    setFilteredData((prevData) => ({
      ...prevData,
      datasets: prevData.datasets.map((dataset, index) => ({
        ...dataset,
        backgroundColor: index === 0 ? gradientA : gradientB,
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 20,
      })),
    }));
  }, []);

  return (
      <div className="compete-container">
        <div className="compete-content">
          <div className="compete-search-container">
            <button className="compete-search-button" onClick={() => handleSearchClick('A')}>기업 A 검색</button>
            <button className="compete-search-button" onClick={() => handleSearchClick('B')}>기업 B 검색</button>
          </div>
          <div className="compete-chart-container">
            <span className="compete-bar-chart-title">주요 지표 비교 분석</span>
            <Bar className="compete-bar-chart" ref={chartRef} data={filteredData} options={options} />
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