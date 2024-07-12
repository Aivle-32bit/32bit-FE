import React from 'react';
import './Statistics.css';
import UserStats from './UserStats';
import SignUpStats from './SignUpStats';
import LoginStats from './LoginStats.js';
import VisitStats from './VisitStats';

const Statistics = () => {
  return (
      <div className="stats-container">
          <div className="card">
              <UserStats />
          </div>
          <div className="card">
              <SignUpStats />
          </div>
          <div className="card">
              <LoginStats />
          </div>
          <div className="card">
              <VisitStats />
          </div>
      </div>
  );
};

export default Statistics;