import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { stats_state, stats_signup, stats_login, stats_visit } from '../../api';
import './AdminStats.css';
import 'chart.js/auto';

const AdminStats = () => {
  const [stateStats, setStateStats] = useState({});
  const [signupStats, setSignupStats] = useState({});
  const [loginStats, setLoginStats] = useState({});
  const [visitStats, setVisitStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const stateData = await stats_state();
        const signupData = await stats_signup();
        const loginData = await stats_login();
        const visitData = await stats_visit();

        // 데이터를 한국어로 변환
        const translatedStateData = {
          '미인증': stateData.unverified,
          '인증됨': stateData.verified,
          '휴면': stateData.dormant,
        };

        const translatedSignupData = {
          '일일 가입': signupData.dailyRegistrations,
          '주간 가입': signupData.weeklyRegistrations,
          '월간 가입': signupData.monthlyRegistrations,
        };

        const translatedLoginData = {
          '총 로그인 시도': loginData.totalLoginAttempts,
          '성공한 로그인 시도': loginData.successfulLoginAttempts,
          '실패한 로그인 시도': loginData.failedLoginAttempts,
        };

        setStateStats(translatedStateData);
        setSignupStats(translatedSignupData);
        setLoginStats(translatedLoginData);
        setVisitStats(visitData.visitCountResponses);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const createChartData = (labels, data) => ({
    labels,
    datasets: [
      {
        label: '수량',
        data,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  });

  const stateChartData = createChartData(Object.keys(stateStats), Object.values(stateStats));
  const signupChartData = createChartData(Object.keys(signupStats), Object.values(signupStats));
  const loginChartData = createChartData(Object.keys(loginStats), Object.values(loginStats));
  const visitChartData = createChartData(
      visitStats.map(item => item.visitDate),
      visitStats.map(item => item.visitCount)
  );

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0, // 정수로 표현
        },
      },
    },
    plugins: {
      legend: {
        display: false, // 범례를 숨김
      },
    },
    maintainAspectRatio: false, // 그래프 비율을 유지하지 않음
  };

  return (
      <div className="admin-stats-container">
        <div className="admin-stats-card">
          <h2 className="admin-stats-title">사용자 상태별 통계</h2>
          <div className="chart-container">
            <Bar data={stateChartData} options={options} />
          </div>
        </div>
        <div className="admin-stats-card">
          <h2 className="admin-stats-title">회원가입 통계</h2>
          <div className="chart-container">
            <Bar data={signupChartData} options={options} />
          </div>
        </div>
        <div className="admin-stats-card">
          <h2 className="admin-stats-title">로그인 통계</h2>
          <div className="chart-container">
            <Bar data={loginChartData} options={options} />
          </div>
        </div>
        <div className="admin-stats-card">
          <h2 className="admin-stats-title">방문자 수 통계</h2>
          <div className="chart-container">
            <Bar data={visitChartData} options={options} />
          </div>
        </div>
      </div>
  );
};

export default AdminStats;