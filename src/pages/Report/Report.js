import React, { useState } from 'react';
import { Radar, Bar } from 'react-chartjs-2';
// assets
import good_face from '../../assets/images/good_face.png';
import normal_face from '../../assets/images/normal_face.png';
import bad_face from '../../assets/images/bad_face.png';
// CSS
import './Report.css';

const total_data = {
    "companyName": "KT",
    "salesAmountStatus": "good",
    "netIncomeStatus": "normal",
    "totalAssetStatus": "bad",
    "totalLiabilityStatus": "normal",
    "previousDEBT": 0.33785,
    "previousATR": 0.077712,
    "previousROA": 0.050147,
    "previousAGR": 0.039843,
    "previousPPE": 0.012658,
    "debt": 0.386552,
    "atr": 0.093014,
    "roa": 0.048696,
    "agr": 0.055077,
    "ppe": 0.003199
};

const debt_data = {
    "metricsValues": [
        { "year": "2020", "metric": "DEBT", "value": 0.30785 },
        { "year": "2021", "metric": "DEBT", "value": 0.56785 },
        { "year": "2022", "metric": "DEBT", "value": 0.386552 },
        { "year": "2023", "metric": "DEBT", "value": 0.33785 },
        { "year": "2024", "metric": "DEBT", "value": 0.406552 }
    ],
    "summary": "평가: 예측 부채 비율 0.599975%는 2023 실제 부채 비율 0.838315916%과 비교했을 때 낮습니다. 이는 예측보다 실제 부채 비율이 더 높다는 것을 의미합니다.\n산업별 솔루션: 제조업 산업에서는 부채 비율을 낮추기 위해 비용 절감, 자본 재구성, 그리고 추가적인 자본 조달을 고려할 필요가 있습니다. 특히, 운영 효율성을 높이기 위한 자동화 및 기술 투자가 도움이 될 수 있습니다.\n영향: 높은 부채 비율은 금융 비용 증가와 재정적 유연성 감소를 초래할 수 있으며, 이는 기업의 장기적인 성장과 안정성에 부정적인 영향을 미칠 수 있습니다."
};

const atr_data = {
    "metricsValues": [
        { "year": "2020", "metric": "ATR", "value": 1.2 },
        { "year": "2021", "metric": "ATR", "value": 1.3 },
        { "year": "2022", "metric": "ATR", "value": 1.4 },
        { "year": "2023", "metric": "ATR", "value": 1.35 },
        { "year": "2024", "metric": "ATR", "value": 1.45 }
    ],
    "summary": "평가: ATR 수치는 2023년에는 1.35로 감소했으나, 2024년에는 1.45로 다시 상승했습니다. 이는 단기적으로 기업의 유동성이 개선되고 있음을 나타냅니다."
};

const roa_data = {
    "metricsValues": [
        { "year": "2020", "metric": "ROA", "value": 0.05 },
        { "year": "2021", "metric": "ROA", "value": 0.06 },
        { "year": "2022", "metric": "ROA", "value": 0.055 },
        { "year": "2023", "metric": "ROA", "value": 0.065 },
        { "year": "2024", "metric": "ROA", "value": 0.07 }
    ],
    "summary": "평가: ROA는 꾸준히 증가하여 2024년에는 0.07에 도달했습니다. 이는 자산을 효율적으로 활용하여 수익을 창출하고 있음을 보여줍니다."
};

const agr_data = {
    "metricsValues": [
        { "year": "2020", "metric": "AGR", "value": 0.1 },
        { "year": "2021", "metric": "AGR", "value": 0.15 },
        { "year": "2022", "metric": "AGR", "value": 0.12 },
        { "year": "2023", "metric": "AGR", "value": 0.18 },
        { "year": "2024", "metric": "AGR", "value": 0.2 }
    ],
    "summary": "평가: AGR 수치는 2023년부터 급격히 상승하여 2024년에는 0.2에 도달했습니다. 이는 기업의 매출 성장이 가속화되고 있음을 의미합니다."
};

const ppe_data = {
    "metricsValues": [
        { "year": "2020", "metric": "PPE", "value": 0.25 },
        { "year": "2021", "metric": "PPE", "value": 0.3 },
        { "year": "2022", "metric": "PPE", "value": 0.28 },
        { "year": "2023", "metric": "PPE", "value": 0.32 },
        { "year": "2024", "metric": "PPE", "value": 0.35 }
    ],
    "summary": "평가: PPE 비율은 2024년에는 0.35로 증가하여, 기업이 자산에 대한 투자를 늘리고 있음을 보여줍니다."
};

function Report() {
    const [selectedMetric, setSelectedMetric] = useState('DEBT');

    const metricDataMap = {
        DEBT: debt_data,
        ATR: atr_data,
        ROA: roa_data,
        AGR: agr_data,
        PPE: ppe_data
    };

    const selectedData = metricDataMap[selectedMetric];

    const radarData = {
        labels: ['DEBT', 'ATR', 'ROA', 'AGR', 'PPE'],
        datasets: [
            {
                label: 'Current Year',
                data: [total_data.debt, total_data.atr, total_data.roa, total_data.agr, total_data.ppe],
                backgroundColor: 'rgba(34, 202, 236, .2)',
                borderColor: 'rgba(34, 202, 236, 1)',
                borderWidth: 2,
            },
            {
                label: 'Previous Year',
                data: [total_data.previousDEBT, total_data.previousATR, total_data.previousROA, total_data.previousAGR, total_data.previousPPE],
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
                    stepSize: 0.1
                }
            }
        },
        plugins: {
            legend: {
                display: true
            }
        },
        maintainAspectRatio: false,
    };

    const barData = {
        labels: selectedData.metricsValues.map(data => data.year),
        datasets: [
            {
                label: selectedMetric,
                data: selectedData.metricsValues.map(data => data.value),
                backgroundColor: 'rgba(34, 202, 236, .2)',
                borderColor: 'rgba(34, 202, 236, 1)',
                borderWidth: 1,
            },
        ],
    };

    const barOptions = {
        maintainAspectRatio: false,
    };

    return (
        <div className="report-container">
            <div className="report-content">
                <div className="report-card">
                    <span className="report-card-title">현황<br />신호등</span>
                    <div className="report-rating-box">
                        <span>매출액</span>
                        <img src={total_data.salesAmountStatus === 'good' ? good_face : total_data.salesAmountStatus === 'normal' ? normal_face : bad_face} alt="Sales Amount Status" />
                    </div>
                    <div className="report-rating-box">
                        <span>당기순이익</span>
                        <img src={total_data.netIncomeStatus === 'good' ? good_face : total_data.netIncomeStatus === 'normal' ? normal_face : bad_face} alt="Net Income Status" />
                    </div>
                    <div className="report-rating-box">
                        <span>자산총계</span>
                        <img src={total_data.totalAssetStatus === 'good' ? good_face : total_data.totalAssetStatus === 'normal' ? normal_face : bad_face} alt="Total Asset Status" />
                    </div>
                    <div className="report-rating-box">
                        <span>부채총계</span>
                        <img src={total_data.totalLiabilityStatus === 'good' ? good_face : total_data.totalLiabilityStatus === 'normal' ? normal_face : bad_face} alt="Total Liability Status" />
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
                            {selectedData.summary}
                        </div>
                    </div>
                </div>
                <div className="report-card">
                    <div className="venn-diagram">
                        <h1 className="venn-title">TOWS 분석</h1>
                        <svg viewBox="0 0 600 600">
                        <g transform="rotate(45, 300, 300)">
                            <circle cx="150" cy="300" r="150" fill="rgba(140, 213, 237, 0.5)" />
                            <text x="150" y="300" textAnchor="middle" alignmentBaseline="middle" transform="rotate(-45, 150, 300)" className="circle-title">Threat</text>
                            
                            <circle cx="450" cy="300" r="150" fill="rgba(255,200,210, 0.5)" />
                            <text x="450" y="300" textAnchor="middle" alignmentBaseline="middle" transform="rotate(-45, 450, 300)" className="circle-title">Opportunity</text>
                            
                            <circle cx="300" cy="450" r="150" fill="rgba(182, 229, 180, 0.5)" />
                            <text x="300" y="450" textAnchor="middle" alignmentBaseline="middle" transform="rotate(-45, 300, 450)" className="circle-title">Weakness</text>
                            
                            <circle cx="300" cy="150" r="150" fill="rgba(254,226,178,0.5)" />
                            <text x="300" y="150" textAnchor="middle" alignmentBaseline="middle" transform="rotate(-45, 300, 150)" className="circle-title">Strength</text>
                            
                            <circle cx="300" cy="300" r="70" className="white-circle" />
                            <text x="300" y="300" textAnchor="middle" alignmentBaseline="middle" transform="rotate(-45, 300, 300)" className="circle-title">TOWS</text>
                        </g>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Report;
