// src/components/UserList.js

import React, { useEffect, useState } from 'react';
import './UserList.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsersAsync, updateUserStatus, removeUser } from '../actions/userActions';

const UserList = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.user.users);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalAction, setModalAction] = useState('');
    const usersPerPage = 5;

    useEffect(() => {
        dispatch(fetchUsersAsync());
    }, [dispatch]);

    const renderAdminStatus = (isAdmin) => {
        return isAdmin ? '관리자회원' : '일반회원';
    };

    const handleDormantUser = (userId) => {
        try {
            dispatch(updateUserStatus({ id: userId, status: 'dormant' }));
            alert('유저가 휴면 상태로 전환되었습니다.');
        } catch (error) {
            alert('유저를 휴면 상태로 전환하는데 실패했습니다.');
        }
        setSelectedUser(null);
    };

    const handleDeleteUser = (userId) => {
        try {
            dispatch(removeUser(userId));
            alert('유저가 탈퇴되었습니다.');
        } catch (error) {
            alert('유저 탈퇴에 실패했습니다.');
        }
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
                        <th>유저 상태</th>
                        <th>휴면</th>  {/* 추후 슈퍼 관리자에게만 보이도록 설정 */}
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
                    modalAction === 'delete' ? handleDeleteUser : 
                    modalAction === 'register' ? handleAdminRegister : 
                    modalAction === 'deregister' ? handleAdminDeregister : 
                    handleDormantUser
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
