import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Bar, Radar } from 'react-chartjs-2';
import {
  getCompanyInfo,
  getCompanyMetric,
  getCompanyReport,
  getCompanySWOT,
  financialsummary
} from '../../api';
// assets
import good_face from '../../assets/images/good_face.png';
import normal_face from '../../assets/images/normal_face.png';
import bad_face from '../../assets/images/bad_face.png';
// CSS
import './Report.css';

const Report = ({ companyId: propCompanyId }) => {
  const { companyId: routeCompanyId } = useParams();
  const stateCompanyId = useSelector((state) => state.auth.user?.companyId);
  const companyId = propCompanyId || routeCompanyId || stateCompanyId;
  const navigate = useNavigate();

  const [totalData, setTotalData] = useState(null);
  const [metricDataMap, setMetricDataMap] = useState({});
  const [swotData, setSwotData] = useState(null);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState('DEBT');
  const [formattedSummary, setFormattedSummary] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [financialData, setFinancialSummary] = useState({});

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
          financialResponse
        ] = await Promise.all([
          getCompanyReport(companyId),
          getCompanyMetric(companyId, 'DEBT'),
          getCompanyMetric(companyId, 'ATR'),
          getCompanyMetric(companyId, 'ROA'),
          getCompanyMetric(companyId, 'AGR'),
          getCompanyMetric(companyId, 'PPE'),
          getCompanySWOT(companyId),
          getCompanyInfo(companyId),
          financialsummary(companyId)
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
        setFinancialSummary(financialResponse);
        setFormattedSummary(formatSummary(debtResponse.summary)); // 초기 요약 설정
      } catch (error) {
        console.error('Error fetching data:', error);
        await setShowMessage(true); // Show message if there is an error
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

  if (showMessage || !totalData || !swotData || !companyInfo || Object.keys(metricDataMap).length === 0) {
    return (
        <div className="support-message">
          <p>지원하지 않는 기능입니다. 문의사항이 있으시면 건의사항에 남겨주세요.</p>
          <button onClick={() => navigate('/')}>확인</button>
        </div>
    );
  }

  const selectedData = metricDataMap[selectedMetric].data;

  const radarData = {
    labels: ['DEBT', 'ATR', 'ROA', 'AGR', 'PPE'],
    datasets: [
      {
        label: '2024_IF',
        data: [totalData.debt, totalData.atr, totalData.roa, totalData.agr, totalData.ppe],
        backgroundColor: 'rgba(34, 202, 236, .2)',
        borderColor: 'rgba(34, 202, 236, 1)',
        borderWidth: 2,
      },
      {
        label: '2023',
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
          backdropColor: 'transparent',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
    maintainAspectRatio: false,
    responsive: true,
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
    responsive: true,
    plugins: {
      legend: {
        display: false, // 범례 숨기기
      },
    },
  };

  const renderSWOTItem = (item) => {
    if (typeof item === 'object' && item.description) {
      return item.description;
    }
    return item;
  };

  return (
      <div className='report-container'>
        <div className='report-content'>
          <div className='pages'>
            <input id='one' name='trigger' type='radio' />
            <input id='two' name='trigger' type='radio' />
            <input id='three' name='trigger' type='radio' />
            <input id='four' name='trigger' type='radio' />
            {/* =============== 1페이지 =============== */}
            <div className='pages_page'>
              <div className='pages_page__inner'>
                <div className='logo'>FINANCIAL DETECTIVE</div>
                <div className='content'>
                  <div className='report-cover-page-left'>
                    <div className='report-company-img-container'>
                      <img className='report-company-img' src={totalData.companyImage} alt="company-logo"/>
                    </div>
                    <span className='report-company-intro'>
                      <span className='report-highlight'>AI 재무 어드바이저</span>가 생성한<br/>
                      <span className='report-highlight'>{totalData.companyName}의 재무 분석 Report</span>를 확인해보세요.
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* =============== 2페이지 =============== */}
            <div className='pages_page'>
              <div className='pages_page__inner'>
                <div className='report-cover-page-right'>
                  <span className='report-next-page'>다음 페이지로 이동합니다.</span>
                </div>
                <div className='control next'>
                  <label htmlFor='two'></label>
                </div>
              </div>
            </div>
            {/* =============== 3페이지 =============== */}
            <div className='pages_page'>
              <div className='pages_page__inner'>
                <div className='logo'>{totalData.companyName}</div>
                <div className='control'>
                  <label htmlFor='one'></label>
                </div>
                <div className='content'>
                  <div className="report-card">
                    <span className="report-card-title">현황 신호등</span>
                    <span className="report-card-description">여기에 이 섹션에 대한 설명을 쉽고 간단하게 작성해주세요. 사용자가 직관적으로 이해할 수 있도록 해주세요.</span>
                    <div className="report-rating-boxes">
                      <div
                        className="report-rating-box"
                        data-description={
                          totalData.salesAmountStatus === 'GOOD'
                            ? '전년도 대비 올해가 높을 것으로 예측됨'
                            : totalData.salesAmountStatus === 'NORMAL'
                            ? '전년도와 올해가 유사할 것으로 예측됨'
                            : '전년도 대비 올해가 낮을 것으로 예측됨'
                        }
                      >
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
                      <div
                        className="report-rating-box"
                        data-description={
                          totalData.netIncomeStatus === 'GOOD'
                            ? '전년도 대비 올해가 높을 것으로 예측됨'
                            : totalData.netIncomeStatus === 'NORMAL'
                            ? '전년도와 올해가 유사할 것으로 예측됨'
                            : '전년도 대비 올해가 낮을 것으로 예측됨'
                        }
                      >
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
                      <div
                        className="report-rating-box"
                        data-description={
                          totalData.totalAssetStatus === 'GOOD'
                            ? '전년도 대비 올해가 높을 것으로 예측됨'
                            : totalData.totalAssetStatus === 'NORMAL'
                            ? '전년도와 올해가 유사할 것으로 예측됨'
                            : '전년도 대비 올해가 낮을 것으로 예측됨'
                        }
                      >
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
                      <div
                        className="report-rating-box"
                        data-description={
                          totalData.totalLiabilityStatus === 'GOOD'
                            ? '전년도 대비 올해가 높을 것으로 예측됨'
                            : totalData.totalLiabilityStatus === 'NORMAL'
                            ? '전년도와 올해가 유사할 것으로 예측됨'
                            : '전년도 대비 올해가 낮을 것으로 예측됨'
                        }
                      >
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
                  </div>
                  <div className="report-card">
                    <span className="report-card-title">종합 평가</span>
                    <span className="report-card-description">여기에 이 섹션에 대한 설명을 쉽고 간단하게 작성해주세요. 사용자가 직관적으로 이해할 수 있도록 해주세요.</span>
                    <div className="report-radar-chart-container">
                      <Radar data={radarData} options={radarOptions} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* =============== 4페이지 =============== */}
            <div className='pages_page'>
              <div className='pages_page__inner'>
                <div className='logo_space'>&nbsp;</div>
                <div className='control next'>
                  <label htmlFor='three'></label>
                </div>
                <div className='bg'></div>
                <div className='content'>
                  <div className="report-card">
                    <span className="report-card-title">세부 지표 Trend</span>
                    <span className="report-card-description">여기에 이 섹션에 대한 설명을 쉽고 간단하게 작성해주세요. 사용자가 직관적으로 이해할 수 있도록 해주세요.</span>
                    <div className="report-metric">
                      <label className="report-metric-dropbox" htmlFor="metric-select">Metric : </label>
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
                    <div className="report-bar-chart-container">
                      <Bar data={barData} options={barOptions} />
                    </div>
                  </div>
                  <div className="report-card">
                    <span className="report-card-title">요약</span>
                    <span className="report-card-description">여기에 이 섹션에 대한 설명을 쉽고 간단하게 작성해주세요. 사용자가 직관적으로 이해할 수 있도록 해주세요.</span>
                    <div className="report-summary">
                      {formattedSummary.split('\n').map((line, index) => (
                          <p key={index}>{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* =============== 5페이지 =============== */}
            <div className='pages_page'>
              <div className='pages_page__inner'>
                <div className='logo'>{totalData.companyName}</div>
                <div className='content'>
                  <div className="report-card">
                    <span className="report-card-title">TOWS 분석</span>
                    <span className="report-card-description">여기에 이 섹션에 대한 설명을 쉽고 간단하게 작성해주세요. 사용자가 직관적으로 이해할 수 있도록 해주세요.</span>
                    <div className="tows-grid">
                      <div className="tows-box threat">
                        <span className="tows-title">Threat</span>
                        <div className="tows-content">
                          {swotData.threats.map((item, index) => (
                              <p key={index}>{renderSWOTItem(item)}</p>
                          ))}
                        </div>
                      </div>
                      <div className="tows-box opportunity">
                        <span className="tows-title">Opportunity</span>
                        <div className="tows-content">
                          {swotData.opportunities.map((item, index) => (
                              <p key={index}>{renderSWOTItem(item)}</p>
                          ))}
                        </div>
                      </div>
                      <div className="tows-box weakness">
                        <span className="tows-title">Weakness</span>
                        <div className="tows-content">
                          {swotData.weaknesses.map((item, index) => (
                              <p key={index}>{renderSWOTItem(item)}</p>
                          ))}
                        </div>
                      </div>
                      <div className="tows-box strength">
                        <span className="tows-title">Strength</span>
                        <div className="tows-content">
                          {swotData.strengths.map((item, index) => (
                              <p key={index}>{renderSWOTItem(item)}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='control'>
                  <label htmlFor='two'></label>
                </div>
              </div>
            </div>
            {/* =============== 6페이지 =============== */}
            <div className='pages_page'>
              <div className='pages_page__inner'>
                <div className='logo_space'>&nbsp;</div>
                <div className='bg'></div>
                <div className='content'>
                  <div className="report-card">
                    <span className="report-card-title">사업 현황</span>
                    <span className="report-card-description">여기에 이 섹션에 대한 설명을 쉽고 간단하게 작성해주세요. 사용자가 직관적으로 이해할 수 있도록 해주세요.</span>
                    <div className="stats-container">
                      <div className="stats-card">
                        <span className="stats-card-title">사원수</span>
                        <span className="stats-card-value">{companyInfo.numEmployees.toLocaleString()}명<br/>&nbsp;</span>
                      </div>
                      <div className="stats-card">
                        <span className="stats-card-title">업력</span>
                        <span className="stats-card-value">{companyInfo.experience.toLocaleString()}년<br/>&nbsp;</span>
                      </div>
                      <div className="stats-card">
                        <span className="stats-card-title">입사율</span>
                        <span className="stats-card-value">{((companyInfo.numHires / companyInfo.numEmployees) * 100).toFixed(2)}%<br/>({companyInfo.numHires.toLocaleString()}명)</span>
                      </div>
                      <div className="stats-card">
                        <span className="stats-card-title">퇴사율</span>
                        <span className="stats-card-value">{((companyInfo.numResignations / companyInfo.numEmployees) * 100).toFixed(2)}%<br/>({companyInfo.numResignations.toLocaleString()}명)</span>
                      </div>
                    </div>
                  </div>
                  <div className="report-card">
                    <span className="report-card-title">재무제표</span>
                    <span className="report-card-description">회사의 재무제표를 요약하여 보여줍니다.</span>
                    <div className="financial-summary">
                    <table>
                      <tr>
                        <td className='financial-summary-label'>년도</td>
                        <td className='financial-summary-value'>{financialData[1].year}</td>
                        <td className='financial-summary-label'>매출액</td>
                        <td className='financial-summary-value'>{financialData[1].salesAmount.toLocaleString()} 억</td>
                      </tr>
                      <tr>
                        <td className='financial-summary-label'>당기순이익</td>
                        <td className='financial-summary-value'>{financialData[1].netIncome.toLocaleString()} 억</td>
                        <td className='financial-summary-label'>총 자산</td>
                        <td className='financial-summary-value'>{financialData[1].totalAssets.toLocaleString()} 억</td>
                      </tr>
                      <tr>
                        <td className='financial-summary-label'>총 부채</td>
                        <td className='financial-summary-value'>{financialData[1].totalLiabilities.toLocaleString()} 억</td>
                        <td className='financial-summary-label'>운영 수익</td>
                        <td className='financial-summary-value'>{financialData[1].operatingIncome.toLocaleString()} 억</td>
                      </tr>
                      <tr>
                        <td className='financial-summary-label'>자본금</td>
                        <td className='financial-summary-value'>{financialData[1].capitalStock.toLocaleString()} 억</td>
                        <td className='financial-summary-label'>영업 활동으로 인한 현금 흐름</td>
                        <td className='financial-summary-value'>{financialData[1].cashFlowFromOperatingActivities.toLocaleString()} 억</td>
                      </tr>
                      <tr>
                        <td className='financial-summary-label'>부채 비율</td>
                        <td className='financial-summary-value'>{(financialData[1].debt * 100).toFixed(2)}%</td>
                        <td className='financial-summary-label'>자산 회전율</td>
                        <td className='financial-summary-value'>{(financialData[1].atr * 100).toFixed(2)}%</td>
                      </tr>
                      <tr>
                        <td className='financial-summary-label'>매출 성장률</td>
                        <td className='financial-summary-value'>{(financialData[1].agr * 100).toFixed(2)}%</td>
                        <td className='financial-summary-label'>총자산순이익률</td>
                        <td className='financial-summary-value'>{(financialData[1].roa * 100).toFixed(2)}%</td>
                      </tr>
                      <tr>
                        <td className='financial-summary-label'>고정 자산 비율</td>
                        <td className='financial-summary-value'>{(financialData[1].ppe * 100).toFixed(2)}%</td>
                        <td className='financial-summary-label'>자기자본 이익률</td>
                        <td className='financial-summary-value'>{financialData[1].roe ? (financialData[1].roe * 100).toFixed(2) + '%' : '정보 없음'}</td>
                      </tr>
                    </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Report;
