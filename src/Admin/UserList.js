import React, { useState, useEffect } from 'react';
import './UserList.css';

const ConfirmModal = ({ user, onCancel, onConfirm, action }) => {
    if (!user) return null;

    const actionText = action === 'delete' ? '탈퇴 처리' : action === 'register' ? '관리자로 등록' : '관리자 해제';

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close-button" onClick={onCancel}>&times;</span>
                <div className="warning-container">
                    <span className="warning">해당 사용자를 {actionText}하시겠습니까?</span>
                </div>
                <div className="modal-table-container">
                    <table className="modal-table">
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <td>{user.id}</td>
                            </tr>
                            <tr>
                                <th>이름</th>
                                <td>{user.name}</td>
                            </tr>
                            <tr>
                                <th>소속 회사</th>
                                <td>{user.company}</td>
                            </tr>
                            <tr>
                                <th>E-mail</th>
                                <td>{user.email}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="modal-actions">
                    <button onClick={onCancel} className="modal-button">취소</button>
                    <button onClick={() => onConfirm(user.id)} className="modal-button">{actionText}</button>
                </div>
            </div>
        </div>
    );
};

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalAction, setModalAction] = useState('');
    const usersPerPage = 5;

    useEffect(() => {
        fetch('/users.json')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching user data:', error));
    }, []);

    const renderAdminStatus = (isAdmin) => {
        return isAdmin ? '관리자회원' : '일반회원';
    };

    const handleDelete = (userId) => {
        console.log(`User with ID ${userId} has been deleted`);
        // 여기서 실제 삭제 로직을 구현하세요
        setSelectedUser(null);
    };

    const handleAdminRegister = (userId) => {
        console.log(`User with ID ${userId} has been registered as admin`);
        // 여기서 실제 등록 로직을 구현하세요
        setSelectedUser(null);
    };

    const handleAdminDeregister = (userId) => {
        console.log(`User with ID ${userId} has been deregistered as admin`);
        // 여기서 실제 해제 로직을 구현하세요
        setSelectedUser(null);
    };

    const startIndex = (currentPage - 1) * usersPerPage;
    const currentUsers = users.slice(startIndex, startIndex + usersPerPage);

    return (
        <div>
            <h6 className="card-title">회원 목록</h6>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>이름</th>
                        <th>소속 회사</th>
                        <th>E-mail</th>
                        <th>관리자 여부</th>
                        <th>관리자 등록/해제</th>  {/* 추후 슈퍼 관리자에게만 보이도록 설정 */}
                        <th>탈퇴</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.company}</td>
                            <td>{user.email}</td>
                            <td>{renderAdminStatus(user.is_admin)}</td>
                            {/* 추후 슈퍼 관리자에게만 보이도록 설정 */}
                            <td>
                                {user.is_admin ? (
                                    <button onClick={() => { setSelectedUser(user); setModalAction('deregister'); }} className="action-button">해제</button>
                                ) : (
                                    <button onClick={() => { setSelectedUser(user); setModalAction('register'); }} className="action-button">등록</button>
                                )}
                            </td>
                            <td>
                                <button onClick={() => { setSelectedUser(user); setModalAction('delete'); }} className="action-button">탈퇴</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ConfirmModal 
                user={selectedUser}
                onCancel={() => setSelectedUser(null)}
                onConfirm={
                    modalAction === 'delete' ? handleDelete : 
                    modalAction === 'register' ? handleAdminRegister : 
                    handleAdminDeregister
                }
                action={modalAction}
            />
            <div className="pagination">
                {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, index) => (
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

export default UserList;
