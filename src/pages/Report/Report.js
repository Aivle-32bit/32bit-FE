import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Bar, Radar } from 'react-chartjs-2';
import {
  getCompanyInfo,
  getCompanyMetric,
  getCompanyReport,
  getCompanySWOT,
} from '../../api';
// assets
import good_face from '../../assets/images/good_face.png';
import normal_face from '../../assets/images/normal_face.png';
import bad_face from '../../assets/images/bad_face.png';
// CSS
import './Report.css';

const Report = () => {
  const [totalData, setTotalData] = useState(null);
  const [metricDataMap, setMetricDataMap] = useState({});
  const [swotData, setSwotData] = useState(null);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState('DEBT');
  const [formattedSummary, setFormattedSummary] = useState('');

  const companyId = useSelector((state) => state.auth.user?.companyId);

  useEffect(() => {
    if (!companyId) return;

    const fetchData = async () => {
      try {
        const [
          totalResponse,
          debtResponse,
          atrResponse,
          roaResponse,
          agrResponse,
          ppeResponse,
          swotResponse,
          infoResponse,
        ] = await Promise.all([
          getCompanyReport(companyId),
          getCompanyMetric(companyId, 'DEBT'),
          getCompanyMetric(companyId, 'ATR'),
          getCompanyMetric(companyId, 'ROA'),
          getCompanyMetric(companyId, 'AGR'),
          getCompanyMetric(companyId, 'PPE'),
          getCompanySWOT(companyId),
          getCompanyInfo(companyId),
        ]);

        setTotalData(totalResponse);
        setMetricDataMap({
          DEBT: { data: debtResponse, summary: formatSummary(debtResponse.summary) },
          ATR: { data: atrResponse, summary: formatSummary(atrResponse.summary) },
          ROA: { data: roaResponse, summary: formatSummary(roaResponse.summary) },
          AGR: { data: agrResponse, summary: formatSummary(agrResponse.summary) },
          PPE: { data: ppeResponse, summary: formatSummary(ppeResponse.summary) },
        });
        setSwotData(swotResponse);
        setCompanyInfo(infoResponse);

        setFormattedSummary(formatSummary(debtResponse.summary)); // 초기 요약 설정
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [companyId]);

  const formatSummary = (summary) => {
    return summary
    .replace(/(\d+)\. /g, '\n$1. ') // 숫자와 점 앞에 줄바꿈 추가
    .replace(/\.\s/g, '.\n'); // 점과 공백 뒤에 줄바꿈 추가
  };

  useEffect(() => {
    if (metricDataMap[selectedMetric]) {
      setFormattedSummary(metricDataMap[selectedMetric].summary);
    }
  }, [selectedMetric, metricDataMap]);

  if (!totalData || !swotData || !companyInfo || Object.keys(metricDataMap).length === 0) {
    return <div>Loading...</div>;
  }

  const selectedData = metricDataMap[selectedMetric].data;

  const radarData = {
    labels: ['DEBT', 'ATR', 'ROA', 'AGR', 'PPE'],
    datasets: [
      {
        label: 'Current Year',
        data: [totalData.debt, totalData.atr, totalData.roa, totalData.agr, totalData.ppe],
        backgroundColor: 'rgba(34, 202, 236, .2)',
        borderColor: 'rgba(34, 202, 236, 1)',
        borderWidth: 2,
      },
      {
        label: 'Previous Year',
        data: [
          totalData.previousDEBT,
          totalData.previousATR,
          totalData.previousROA,
          totalData.previousAGR,
          totalData.previousPPE,
        ],
        backgroundColor: 'rgba(255, 99, 132, .2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
      },
    ],
  };

  const radarOptions = {
    scales: {
      r: {
        beginAtZero: true,
        min: 0,
        ticks: {
          stepSize: 0.1,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
    maintainAspectRatio: false,
  };

  const barData = {
    labels: selectedData.metricsValues.map((data) => data.year),
    datasets: [
      {
        label: selectedMetric,
        data: selectedData.metricsValues.map((data) => data.value),
        backgroundColor: 'rgba(34, 202, 236, .2)',
        borderColor: 'rgba(34, 202, 236, 1)',
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    maintainAspectRatio: false,
  };

  const renderSWOTItem = (item) => {
    if (typeof item === 'object' && item.description) {
      return item.description;
    }
    return item;
  };

  return (
      <div className="report-container">
        <div className="report-content">
          <div className="report-card">
            <span className="report-card-title">현황<br />신호등</span>
            <div className="report-rating-box">
              <span>매출액</span>
              <img
                  src={
                    totalData.salesAmountStatus === 'GOOD'
                        ? good_face
                        : totalData.salesAmountStatus === 'NORMAL'
                            ? normal_face
                            : bad_face
                  }
                  alt="Sales Amount Status"
              />
            </div>
            <div className="report-rating-box">
              <span>당기순이익</span>
              <img
                  src={
                    totalData.netIncomeStatus === 'GOOD'
                        ? good_face
                        : totalData.netIncomeStatus === 'NORMAL'
                            ? normal_face
                            : bad_face
                  }
                  alt="Net Income Status"
              />
            </div>
            <div className="report-rating-box">
              <span>자산총계</span>
              <img
                  src={
                    totalData.totalAssetStatus === 'GOOD'
                        ? good_face
                        : totalData.totalAssetStatus === 'NORMAL'
                            ? normal_face
                            : bad_face
                  }
                  alt="Total Asset Status"
              />
            </div>
            <div className="report-rating-box">
              <span>부채총계</span>
              <img
                  src={
                    totalData.totalLiabilityStatus === 'GOOD'
                        ? bad_face
                        : totalData.totalLiabilityStatus === 'NORMAL'
                            ? normal_face
                            : good_face
                  }
                  alt="Total Liability Status"
              />
            </div>
          </div>
          <div className="report-details">
            <div className="report-detail-container">
              <span className="report-detail-title">종합 평가</span>
              <div className="chart-container">
                <Radar data={radarData} options={radarOptions} />
              </div>
            </div>
            <div className="report-detail-container">
              <span className="report-detail-title">세부 지표 Trend</span>
              <div className="report-detail-header">
                <label htmlFor="metric-select">Metric : </label>
                <select
                    id="metric-select"
                    value={selectedMetric}
                    onChange={(e) => setSelectedMetric(e.target.value)}
                >
                  {Object.keys(metricDataMap).map((metric) => (
                      <option key={metric} value={metric}>
                        {metric}
                      </option>
                  ))}
                </select>
              </div>
              <div className="chart-container">
                <Bar data={barData} options={barOptions} />
              </div>
            </div>
            <div className="report-detail-container">
              <span className="report-detail-title">요약</span>
              <div className="report-summary">
                {formattedSummary.split('\n').map((line, index) => (
                    <p key={index}>{line}</p>
                ))}
              </div>
            </div>
          </div>
          <div className="report-card">
            <div className="venn-diagram">
              <h1 className="venn-title">TOWS 분석</h1>
              <svg viewBox="0 0 600 600">
                <g transform="rotate(45, 300, 300)">
                  <circle cx="150" cy="300" r="150" fill="rgba(140, 213, 237, 0.5)" />
                  <text
                      x="150"
                      y="300"
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      transform="rotate(-45, 150, 300)"
                      className="circle-title"
                  >
                    Threat
                  </text>
                  <text x="150" y="330" textAnchor="middle" alignmentBaseline="middle" transform="rotate(-45, 150, 300)" className="circle-content">
                    {swotData.threats.map((item, index) => (
                        <tspan key={index} x="150" dy="1.2em">{renderSWOTItem(item)}</tspan>
                    ))}
                  </text>

                  <circle cx="450" cy="300" r="150" fill="rgba(255,200,210, 0.5)" />
                  <text
                      x="450"
                      y="300"
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      transform="rotate(-45, 450, 300)"
                      className="circle-title"
                  >
                    Opportunity
                  </text>
                  <text x="450" y="330" textAnchor="middle" alignmentBaseline="middle" transform="rotate(-45, 450, 300)" className="circle-content">
                    {swotData.opportunities.map((item, index) => (
                        <tspan key={index} x="450" dy="1.2em">{renderSWOTItem(item)}</tspan>
                    ))}
                  </text>

                  <circle cx="300" cy="450" r="150" fill="rgba(182, 229, 180, 0.5)" />
                  <text
                      x="300"
                      y="450"
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      transform="rotate(-45, 300, 450)"
                      className="circle-title"
                  >
                    Weakness
                  </text>
                  <text x="300" y="480" textAnchor="middle" alignmentBaseline="middle" transform="rotate(-45, 300, 450)" className="circle-content">
                    {swotData.weaknesses.map((item, index) => (
                        <tspan key={index} x="300" dy="1.2em">{renderSWOTItem(item)}</tspan>
                    ))}
                  </text>

                  <circle cx="300" cy="150" r="150" fill="rgba(254,226,178,0.5)" />
                  <text
                      x="300"
                      y="150"
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      transform="rotate(-45, 300, 150)"
                      className="circle-title"
                  >
                    Strength
                  </text>
                  <text x="300" y="180" textAnchor="middle" alignmentBaseline="middle" transform="rotate(-45, 300, 150)" className="circle-content">
                    {swotData.strengths.map((item, index) => (
                        <tspan key={index} x="300" dy="1.2em">{renderSWOTItem(item)}</tspan>
                    ))}
                  </text>

                  <circle cx="300" cy="300" r="70" className="white-circle" />
                  <text
                      x="300"
                      y="300"
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      transform="rotate(-45, 300, 300)"
                      className="circle-title"
                  >
                    TOWS
                  </text>
                </g>
              </svg>
              
            </div>
          </div>
          <div className="report-card">
                    <div className="stats-container">
                        <div className="stats-card">
                        <span className="stats-card-title">사원수</span>
                        <span className="stats-card-value">49명</span>
                    </div>
                    <div className="stats-card">
                        <span className="stats-card-title">업력</span>
                        <span className="stats-card-value">107년</span>
                    </div>
                    <div className="stats-card">
                        <span className="stats-card-title">입사율</span>
                        <span className="stats-card-value">44%(22명)</span>
                        </div>
                    <div className="stats-card">
                        <span className="stats-card-title">퇴사율</span>
                        <span className="stats-card-value">40%(20명)</span>
                        </div>
                    </div>
                </div>
        </div>
      </div>
  );
};

export default Report;
