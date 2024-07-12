import React, { useState, useEffect } from 'react';
import './CompanyList.css';

const CompanyModal = ({ company, onCancel, onConfirm, action, onFileChange, selectedFileName }) => {
    if (!company) return null;

    const actionText = action === 'delete' ? '삭제' : '파일 등록';

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close-button" onClick={onCancel}>&times;</span>
                <div className="warning-container">
                    <span className="warning">해당 회사를 {actionText}하시겠습니까?</span>
                </div>
                <div className="modal-table-container">
                    <table className="modal-table">
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <td>{company.id}</td>
                            </tr>
                            <tr>
                                <th>이름</th>
                                <td>{company.name}</td>
                            </tr>
                            <tr>
                                <th>산업군</th>
                                <td>{company.industry}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {action === 'register' && (
                    <div className="file-upload-container">
                        <input type="file" accept=".xlsx,.csv" id="fileInput" onChange={onFileChange} style={{ display: 'none' }} />
                        <label htmlFor="fileInput" className="action-button">파일 선택</label>
                        <span className="file-name">{selectedFileName || '파일을 선택하세요 (xlsx, csv)'}</span>
                    </div>
                )}
                <div className="modal-actions">
                    <button onClick={onCancel} className="modal-button">취소</button>
                    <button onClick={onConfirm} className="modal-button">{actionText}</button>
                </div>
            </div>
        </div>
    );
};

const CompanyList = () => {
    const [companies, setCompanies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [modalAction, setModalAction] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState('');
    const companiesPerPage = 5;

    useEffect(() => {
        fetch('/companies.json')
            .then(response => response.json())
            .then(data => setCompanies(data))
            .catch(error => console.error('Error fetching company data:', error));
    }, []);

    const handleDelete = (companyId) => {
        console.log(`Company with ID ${companyId} has been deleted`);
        // 여기서 실제 삭제 로직을 구현하세요
        setSelectedCompany(null);
    };

    const handleFileRegister = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('companyId', selectedCompany.id);

            fetch('/upload', {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    console.log('File uploaded successfully:', data);
                    // 파일 업로드 성공 후 로직을 구현하세요
                    setSelectedCompany(null);
                    setSelectedFile(null);
                    setSelectedFileName('');
                })
                .catch(error => {
                    console.error('Error uploading file:', error);
                });
        } else {
            console.error('No file selected');
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setSelectedFileName(file ? file.name : '');
    };

    const startIndex = (currentPage - 1) * companiesPerPage;
    const currentCompanies = companies.slice(startIndex, startIndex + companiesPerPage);

    return (
        <div>
            <h6 className="card-title">등록 회사 목록</h6>
            <table className="company-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Industry</th>
                        <th>파일 등록</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {currentCompanies.map(company => (
                        <tr key={company.id}>
                            <td>{company.id}</td>
                            <td>{company.name}</td>
                            <td>{company.industry}</td>
                            <td>
                                <button onClick={() => { setSelectedCompany(company); setModalAction('register'); }} className="action-button">파일 등록</button>
                            </td>
                            <td>
                                <button onClick={() => { setSelectedCompany(company); setModalAction('delete'); }} className="action-button">삭제</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <CompanyModal 
                company={selectedCompany}
                onCancel={() => setSelectedCompany(null)}
                onConfirm={modalAction === 'delete' ? () => handleDelete(selectedCompany.id) : handleFileRegister}
                action={modalAction}
                onFileChange={handleFileChange}
                selectedFileName={selectedFileName}
            />
            <div className="pagination">
                {Array.from({ length: Math.ceil(companies.length / companiesPerPage) }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => setCurrentPage(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CompanyList;
