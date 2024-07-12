import React, { useState, useEffect } from 'react';
import './UserPendingList.css';

const ApproveModal = ({ user, onCancel, onConfirm }) => {
    if (!user) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close-button" onClick={onCancel}>&times;</span>
                <div className="warning-container">
                    <span className="warning">해당 사용자의 가입을 승인하시겠습니까?</span>
                </div>
                <div className="modal-table-container">
                    <table className="modal-table">
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <td>{user.id}</td>
                            </tr>
                            <tr>
                                <th>Name</th>
                                <td>{user.name}</td>
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
                    <button onClick={() => onConfirm(user.id)} className="modal-button">승인</button>
                </div>
            </div>
        </div>
    );
};

const RejectModal = ({ user, onCancel, onConfirm }) => {
    const [reason, setReason] = useState('');

    if (!user) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close-button" onClick={onCancel}>&times;</span>
                <div className="warning-container">
                    <span className="warning">해당 사용자의 가입을 거부하시겠습니까?</span>
                </div>
                <div className="modal-table-container">
                    <table className="modal-table">
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <td>{user.id}</td>
                            </tr>
                            <tr>
                                <th>Name</th>
                                <td>{user.name}</td>
                            </tr>
                            <tr>
                                <th>E-mail</th>
                                <td>{user.email}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="modal-reason-container">
                    <span>거부 사유</span>
                    <textarea 
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="거부 사유를 입력하세요."
                    />
                </div>
                <div className="modal-actions">
                    <button onClick={onCancel} className="modal-button">취소</button>
                    <button onClick={() => onConfirm(user.id, reason)} className="modal-button">거부</button>
                </div>
            </div>
        </div>
    );
};

const UserPendingList = () => {
    const [users, setUsers] = useState([]);
    const [pendingCurrentPage, setPendingCurrentPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalType, setModalType] = useState('');
    const usersPerPage = 5;

    useEffect(() => {
        fetch('/users.json')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching user data:', error));
    }, []);

    const handleApprove = (user) => {
        setSelectedUser(user);
        setModalType('approve');
    };

    const handleReject = (user) => {
        setSelectedUser(user);
        setModalType('reject');
    };

    const handleConfirmApprove = (userId) => {
        console.log(`User with ID ${userId} has been approved`);
        // 승인 로직을 구현하세요
        setSelectedUser(null);
    };

    const handleConfirmReject = (userId, reason) => {
        console.log(`User with ID ${userId} has been rejected. Reason: ${reason}`);
        // 거부 로직을 구현하세요
        setSelectedUser(null);
    };

    const handleCancel = () => {
        setSelectedUser(null);
    };

    const pendingUsers = users.filter(user => user.verification_status === 'pending');
    const totalPendingPages = Math.ceil(pendingUsers.length / usersPerPage);
    const pendingStartIndex = (pendingCurrentPage - 1) * usersPerPage;
    const currentPendingUsers = pendingUsers.slice(pendingStartIndex, pendingStartIndex + usersPerPage);

    return (
        <div>
            <h6 className="card-title">회사 인증 대기 회원 목록</h6>
            <table className="pending-user-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>이름</th>
                        <th>E-mail</th>
                        <th>회사 인증정보</th>
                        <th>승인 / 거부</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPendingUsers.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button className="action-button">조회</button>
                            </td>
                            <td>
                                <button onClick={() => handleApprove(user)} className="action-button">승인</button>
                                <button onClick={() => handleReject(user)} className="action-button">거부</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                {Array.from({ length: totalPendingPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => setPendingCurrentPage(index + 1)}
                        className={pendingCurrentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            {modalType === 'approve' && (
                <ApproveModal 
                    user={selectedUser} 
                    onCancel={handleCancel} 
                    onConfirm={handleConfirmApprove} 
                />
            )}
            {modalType === 'reject' && (
                <RejectModal 
                    user={selectedUser} 
                    onCancel={handleCancel} 
                    onConfirm={handleConfirmReject} 
                />
            )}
        </div>
    );
};

export default UserPendingList;
