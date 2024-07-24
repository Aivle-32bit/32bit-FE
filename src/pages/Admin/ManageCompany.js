import React, { useEffect, useState } from 'react';
import {
  createCompany,
  createCompanyReport,
  deleteCompany,
  get_all_company,
  updateCompanyInfo // 업데이트 함수 추가
} from '../../api';
import './ManageCompany.css';
import NewCompanyModal from './NewCompanyModal';
import CompanyInfoModal from './CompanyInfoModal'; // 모달 컴포넌트 추가

const ManageCompany = () => {
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false); // 정보 모달 상태 추가
  const [selectedCompany, setSelectedCompany] = useState(null); // 선택된 회사 상태 추가
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
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

  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = companies.slice(indexOfFirstCompany, indexOfLastCompany);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = async (companyId) => {
    const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');
    if (confirmDelete) {
      try {
        await deleteCompany(companyId);

        const response = await get_all_company();
        setCompanies(response.companies.content);
        setAlertMessage('회사 삭제 성공!');
        setAlertType('success');
      } catch (error) {
        console.error('회사 삭제 또는 데이터 가져오기 실패:', error);
        setAlertMessage('회사 삭제 실패!');
        setAlertType('error');
      }
    }
  };

  const handleFileChange = async (e, companyId) => {
    const file = e.target.files[0];
    if (file && file.type === 'text/csv') {
      setLoading(true); // 로딩 시작
      await handleFileUpload(file, companyId);
      setLoading(false); // 로딩 종료
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

  const handleFormSubmit = async (companyData) => {
    try {
      const formData = new FormData();
      formData.append('name', companyData.name);
      formData.append('businessType', companyData.businessType);
      formData.append('image', companyData.file);

      await createCompany(formData);
      setAlertMessage('회사 생성 성공!');
      setAlertType('success');
      setShowModal(false);

      const response = await get_all_company();
      setCompanies(response.companies.content);
    } catch (error) {
      setAlertMessage('회사 생성 실패!');
      setAlertType('error');
      console.error('회사 생성 실패:', error);
    }
  };

  const handleInfoSubmit = async (companyData, companyId) => {
    try {
      await updateCompanyInfo(companyId, companyData);
      setAlertMessage('회사 정보 등록 성공!');
      setAlertType('success');
      setShowInfoModal(false);

      const response = await get_all_company();
      setCompanies(response.companies.content);
    } catch (error) {
      setAlertMessage('회사 정보 등록 실패!');
      setAlertType('error');
      console.error('회사 정보 등록 실패:', error);
    }
  };

  return (
      <div className="company-container">
        {alertMessage && (
            <div className={`alert ${alertType === 'success' ? 'alert-success' : 'alert-error'}`}>
              {alertMessage}
            </div>
        )}
        {loading && (
            <div className="loading-overlay">
              <div className="loader"></div>
            </div>
        )}
        <div className="company-card">
          <div className="company-table-title">◾️ 등록 회사 관리</div>
          <div className='company-create-area'>
            <a href="https://drive.usercontent.google.com/u/0/uc?id=1oWNBU_Xx-tFvYo9reNV8dJ2Ebg90ilsF&export=download" download>제출양식다운</a>
            <button className="company-create" onClick={() => setShowModal(true)}>새 회사 추가</button>
          </div>
          <table className="company-table">
            <thead>
            <tr>
              <th>ID</th>
              <th>회사명</th>
              <th>산업군</th>
              <th>파일 업로드</th>
              <th>회사 정보 등록</th>
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
                      <label htmlFor={`file-${company.id}`} className="input-file-trigger">
                        파일 선택
                      </label>
                    </div>
                  </td>
                  <td>
                    <button
                        className="company-info-button"
                        onClick={() => {
                          setSelectedCompany(company);
                          setShowInfoModal(true);
                        }}
                    >
                      회사 정보 등록
                    </button>
                  </td>
                  <td>
                    <button className="delete-button" onClick={() => handleDelete(company.id)}>
                      삭제
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
        <NewCompanyModal
            show={showModal}
            onClose={() => setShowModal(false)}
            onSubmit={handleFormSubmit}
        />
        <CompanyInfoModal
            show={showInfoModal}
            onClose={() => setShowInfoModal(false)}
            onSubmit={handleInfoSubmit}
            company={selectedCompany}
        />
      </div>
  );
};

const Pagination = ({ companiesPerPage, totalCompanies, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCompanies / companiesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
      <nav className="pagination-nav">
        <ul className="pagination">
          {pageNumbers.map(number => (
              <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                <a onClick={() => paginate(number)} className="page-link" href="#!">
                  {number}
                </a>
              </li>
          ))}
        </ul>
      </nav>
  );
};

export default ManageCompany;
