import React, {useEffect, useState} from 'react';
import {
  createCompany,
  createCompanyReport,
  deleteCompany,
  get_all_company
} from '../../api';
import './ManageCompany.css';
import NewCompanyModal from './NewCompanyModal';

const ManageCompany = () => {
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [showModal, setShowModal] = useState(false);
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
          <button className="company-create"
                  onClick={() => setShowModal(true)}>새 회사 추가
          </button>
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
        <NewCompanyModal
            show={showModal}
            onClose={() => setShowModal(false)}
            onSubmit={handleFormSubmit}
        />
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
