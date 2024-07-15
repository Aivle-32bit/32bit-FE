import React, { useState, useEffect } from 'react';
import { get_all_user, get_unverified_user } from '../../api';
import './ManageUser.css';

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [unverifiedUsers, setUnverifiedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentUnverifiedPage, setCurrentUnverifiedPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await get_all_user();
        setUsers(response);
      } catch (error) {
        console.error('사용자 데이터를 가져오는 중 에러 발생:', error);
      }
    };

    const fetchUnverifiedUsers = async () => {
      try {
        const response = await get_unverified_user();
        setUnverifiedUsers(response);
      } catch (error) {
        console.error('미인증 사용자 데이터를 가져오는 중 에러 발생:', error);
      }
    };

    fetchUsers();
    fetchUnverifiedUsers();
  }, []);

  // 전체 사용자 페이지네이션 로직
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // 미인증 사용자 페이지네이션 로직
  const indexOfLastUnverifiedUser = currentUnverifiedPage * usersPerPage;
  const indexOfFirstUnverifiedUser = indexOfLastUnverifiedUser - usersPerPage;
  const currentUnverifiedUsers = unverifiedUsers.slice(indexOfFirstUnverifiedUser, indexOfLastUnverifiedUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const paginateUnverified = (pageNumber) => setCurrentUnverifiedPage(pageNumber);

  const handleDormant = (userId) => {
    // 휴면 기능 구현
    console.log(`ID가 ${userId}인 사용자를 휴면 처리합니다.`);
  };

  const handleWithdraw = (userId) => {
    // 탈퇴 기능 구현
    console.log(`ID가 ${userId}인 사용자를 탈퇴 처리합니다.`);
  };

  const handleDocument = (userId) => {
    // 증빙자료 기능 구현
    console.log(`ID가 ${userId}인 사용자의 증빙자료를 확인합니다.`);
  };

  const handleApprove = (userId) => {
    // 승인 기능 구현
    console.log(`ID가 ${userId}인 사용자를 승인합니다.`);
  };

  return (
      <div className="user-container">
        <div className="user-card">
          <div className="user-table-title">◾️ 전체 사용자 조회</div>
          <table className="user-table">
            <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>이름</th>
              <th>회사명</th>
              <th>상태</th>
              <th>휴면</th>
              <th>탈퇴</th>
            </tr>
            </thead>
            <tbody>
            {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td>{user.companyName}</td>
                  <td>{user.state}</td>
                  <td>
                    <button className="dormant-button" onClick={() => handleDormant(user.id)}>휴면</button>
                  </td>
                  <td>
                    <button className="withdraw-button" onClick={() => handleWithdraw(user.id)}>탈퇴</button>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
          <Pagination
              itemsPerPage={usersPerPage}
              totalItems={users.length}
              paginate={paginate}
              currentPage={currentPage}
          />
        </div>
        <div className="user-card">
          <div className="user-table-title">◾️ 미인증 사용자 조회</div>
          <table className="user-table">
            <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>이름</th>
              <th>증빙자료</th>
              <th>승인</th>
            </tr>
            </thead>
            <tbody>
            {currentUnverifiedUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td>
                    <button className="document-button" onClick={() => handleDocument(user.id)}>증빙자료</button>
                  </td>
                  <td>
                    <button className="approve-button" onClick={() => handleApprove(user.id)}>승인</button>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
          <Pagination
              itemsPerPage={usersPerPage}
              totalItems={unverifiedUsers.length}
              paginate={paginateUnverified}
              currentPage={currentUnverifiedPage}
          />
        </div>
      </div>
  );
};

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
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

export default ManageUser;