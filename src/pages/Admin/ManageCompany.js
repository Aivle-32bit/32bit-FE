import React, {useEffect, useState} from 'react';
import {createCompanyReport, get_all_company} from '../../api';
import './ManageCompany.css';

const ManageCompany = () => {
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const companiesPerPage = 5;

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await get_all_company();
        setCompanies(response.companies.content);
      } catch (error) {
        console.error('회사 데이터를 가져오는 중 에러 발생:', error);
      }
    };
    fetchCompanies();
  }, []);

  // 페이지네이션 로직
  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = companies.slice(indexOfFirstCompany,
      indexOfLastCompany);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (companyId) => {
    // 삭제 기능 구현
    console.log(`ID가 ${companyId}인 회사를 삭제합니다.`);
  };

  const handleFileChange = async (e, companyId) => {
    const file = e.target.files[0];
    if (file && file.type === 'text/csv') {
      await handleFileUpload(file, companyId);
    } else {
      setAlertMessage('CSV 파일만 업로드할 수 있습니다.');
      setAlertType('error');
    }
  };

  const handleFileUpload = async (file, companyId) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await createCompanyReport(companyId, formData);
      setAlertMessage('파일 업로드 성공!');
      setAlertType('success');
      console.log('파일 업로드 성공:', response);
    } catch (error) {
      setAlertMessage('파일 업로드 실패!');
      setAlertType('error');
      console.error('파일 업로드 실패:', error);
    }
  };

  return (
      <div className="company-container">
        {alertMessage && (
            <div className={`alert ${alertType === 'success' ? 'alert-success'
                : 'alert-error'}`}>
              {alertMessage}
            </div>
        )}
        <div className="company-card">
          <div className="company-table-title">◾️ 등록 회사 관리</div>
          <table className="company-table">
            <thead>
            <tr>
              <th>ID</th>
              <th>회사명</th>
              <th>산업군</th>
              <th>파일 업로드</th>
              <th>삭제</th>
            </tr>
            </thead>
            <tbody>
            {currentCompanies.map((company) => (
                <tr key={company.id}>
                  <td>{company.id}</td>
                  <td>{company.name}</td>
                  <td>{company.businessType}</td>
                  <td>
                    <div className="input-file-container">
                      <input
                          type="file"
                          id={`file-${company.id}`}
                          className="input-file"
                          onChange={(e) => handleFileChange(e, company.id)}
                      />
                      <label htmlFor={`file-${company.id}`}
                             className="input-file-trigger">
                        파일 선택
                      </label>
                    </div>
                  </td>
                  <td>
                    <button className="delete-button"
                            onClick={() => handleDelete(company.id)}>삭제
                    </button>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
          <Pagination
              companiesPerPage={companiesPerPage}
              totalCompanies={companies.length}
              paginate={paginate}
              currentPage={currentPage}
          />
        </div>
      </div>
  );
};

const Pagination = ({
  companiesPerPage,
  totalCompanies,
  paginate,
  currentPage
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCompanies / companiesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
      <nav className="pagination-nav">
        <ul className="pagination">
          {pageNumbers.map(number => (
              <li key={number}
                  className={`page-item ${currentPage === number ? 'active'
                      : ''}`}>
                <a onClick={() => paginate(number)} className="page-link"
                   href="#!">
                  {number}
                </a>
              </li>
          ))}
        </ul>
      </nav>
  );
};

export default ManageCompany;