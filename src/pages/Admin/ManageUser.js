import React, {useState, useEffect} from 'react';
import {
  get_all_user,
  makeUserDormant,
  withdrawUser,
  unverifyUser,
} from '../../api';
import './ManageUser.css';
import RegistrationDetailsModal from './RegistrationDetailsModal'; // Import the new modal component

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [selectedState, setSelectedState] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const usersPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await get_all_user(
            selectedState !== 'ALL' ? `?state=${selectedState}` : '');
        setUsers(response);
      } catch (error) {
        console.error('사용자 데이터를 가져오는 중 에러 발생:', error);
      }
    };

    fetchUsers();
  }, [selectedState]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDormant = async (userId) => {
    if (window.confirm(`ID가 ${userId}인 사용자를 휴면 처리하시겠습니까?`)) {
      try {
        await makeUserDormant(userId);
        alert(`ID가 ${userId}인 사용자를 휴면 처리했습니다.`);
        setSelectedState(selectedState); // Refresh users
      } catch (error) {
        alert(
            `휴면 처리 중 에러 발생: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  const handleWithdraw = async (userId) => {
    if (window.confirm(`ID가 ${userId}인 사용자를 탈퇴 처리하시겠습니까?`)) {
      try {
        await withdrawUser(userId);
        alert(`ID가 ${userId}인 사용자를 탈퇴 처리했습니다.`);
        setSelectedState(selectedState); // Refresh users
      } catch (error) {
        alert(
            `탈퇴 처리 중 에러 발생: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  const handleUnverify = async (userId) => {
    if (window.confirm(`ID가 ${userId}인 사용자를 미인증 상태로 전환하시겠습니까?`)) {
      try {
        await unverifyUser(userId);
        alert(`ID가 ${userId}인 사용자를 미인증 상태로 전환했습니다.`);
        setSelectedState(selectedState); // Refresh users
      } catch (error) {
        alert(`미인증 상태 전환 중 에러 발생: ${error.response?.data?.message
        || error.message}`);
      }
    }
  };

  const handleDocument = (userId) => {
    setSelectedUser(userId);
  };

  return (
      <div className="user-container">
        <div className="filter-container">
          <label htmlFor="userState">사용자 상태:</label>
          <select id="userState" value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}>
            <option value="ALL">전체</option>
            <option value="UNVERIFIED">미인증</option>
            <option value="USER_DORMANT">휴면</option>
            <option value="VERIFIED">인증됨</option>
          </select>
        </div>
        <div className="user-card">
          <div className="user-table-title">◾️ 사용자 조회</div>
          <table className="user-table">
            <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>이름</th>
              <th>회사명</th>
              <th>상태</th>
              {selectedState === 'VERIFIED' ? <th>미인증</th> : <>
                <th>증빙자료</th>
                <th>휴면</th>
                <th>탈퇴</th>
              </>}
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
                  {selectedState === 'VERIFIED' ? (
                      <td>
                        <button className="unverify-button"
                                onClick={() => handleUnverify(user.id)}>미인증
                        </button>
                      </td>
                  ) : (
                      <>
                        <td>
                          <button className="document-button"
                                  onClick={() => handleDocument(user.id)}>증빙자료
                          </button>
                        </td>
                        <td>
                          <button className="dormant-button"
                                  onClick={() => handleDormant(user.id)}>휴면
                          </button>
                        </td>
                        <td>
                          <button className="withdraw-button"
                                  onClick={() => handleWithdraw(user.id)}>탈퇴
                          </button>
                        </td>
                      </>
                  )}
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
        {selectedUser && (
            <RegistrationDetailsModal
                userId={selectedUser}
                onClose={() => setSelectedUser(null)}
            />
        )}
      </div>
  );
};

const Pagination = ({itemsPerPage, totalItems, paginate, currentPage}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
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

export default ManageUser;
