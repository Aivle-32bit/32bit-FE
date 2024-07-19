import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './compete.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Compete() {
  const [searchA, setSearchA] = useState('');
  const [searchB, setSearchB] = useState('');
  const [filteredData, setFilteredData] = useState({
    labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'],
    datasets: [
      {
        label: '기업 A',
        data: [65, 59, 80, 81, 56],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: '기업 B',
        data: [28, 48, 40, 19, 72],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const originalData = {
      labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'],
      datasets: [
        {
          label: '기업 A',
          data: [65, 59, 80, 81, 56],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
        {
          label: '기업 B',
          data: [28, 48, 40, 19, 72],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };

    const filteredDatasets = originalData.datasets.map(dataset => {
      if (dataset.label === '기업 A') {
        return {
          ...dataset,
          data: dataset.data.map((value, index) => 
            originalData.labels[index].toLowerCase().includes(searchA.toLowerCase()) ? value : 0
          ),
        };
      } else if (dataset.label === '기업 B') {
        return {
          ...dataset,
          data: dataset.data.map((value, index) => 
            originalData.labels[index].toLowerCase().includes(searchB.toLowerCase()) ? value : 0
          ),
        };
      }
      return dataset;
    });

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
        text: '기업 비교',
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

  return (
    <div className="compete-container">
      <div className="compete-content">
        
        <Bar data={filteredData} options={options} />
      </div>
    </div>
  );
}

export default Compete;
