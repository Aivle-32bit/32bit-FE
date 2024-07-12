import React from 'react';
import './ManageCompanies.css';
import CompanyList from './CompanyList';

const ManageCompanies = () => {
  return (
      <div className="companies-container">
          <div className="card">
              <CompanyList />
          </div>
      </div>
  );
};

export default ManageCompanies;