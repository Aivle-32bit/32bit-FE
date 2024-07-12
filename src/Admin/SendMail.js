import React, { useState, useEffect } from 'react';
import './SendMail.css';

const EmailModal = ({ selectedUsers, onCancel, onSend }) => {
    const [emailContent, setEmailContent] = useState('');

    if (!selectedUsers || selectedUsers.length === 0) return null;

    const handleSend = () => {
        onSend(selectedUsers.map(user => user.email), emailContent);
        setEmailContent('');
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close-button" onClick={onCancel}>&times;</span>
                <h2>메일 작성</h2>
                <div className="email-list">
                    <h4>메일을 보낼 사용자</h4>
                    <ul>
                        {selectedUsers.map(user => (
                            <li key={user.id}>{user.email}</li>
                        ))}
                    </ul>
                </div>
                <textarea className="email-content"
                    value={emailContent}
                    onChange={(e) => setEmailContent(e.target.value)}
                    placeholder="메일 내용을 입력하세요"
                    rows="10"
                />
                <div className="modal-actions">
                    <button onClick={onCancel} className="modal-button">취소</button>
                    <button onClick={handleSend} className="modal-button">보내기</button>
                </div>
            </div>
        </div>
    );
};

const SendMail = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUserIds, setSelectedUserIds] = useState([]);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const usersPerPage = 5;

    useEffect(() => {
        fetch('/users.json')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching user data:', error));
    }, []);

    const handleCheckboxChange = (userId) => {
        setSelectedUserIds((prevSelected) => {
            if (prevSelected.includes(userId)) {
                return prevSelected.filter((id) => id !== userId);
            } else {
                return [...prevSelected, userId];
            }
        });
    };

    const handleSendEmail = (selectedUserEmails, emailContent) => {
        console.log('Sending email to:', selectedUserEmails);
        console.log('Email content:', emailContent);
        // 여기에 실제 메일 전송 로직을 구현하세요
        setShowEmailModal(false);
        setSelectedUserIds([]);
    };

    const startIndex = (currentPage - 1) * usersPerPage;
    const currentUsers = users.slice(startIndex, startIndex + usersPerPage);
    const selectedUsers = users.filter(user => selectedUserIds.includes(user.id));

    return (
      <div className="mail-container">
        <div className="card">
          <h6 className="card-title">회원 목록</h6>
          <table className="mail-table">
              <thead>
                  <tr>
                      <th>체크</th>
                      <th>ID</th>
                      <th>이름</th>
                      <th>소속 회사</th>
                      <th>E-mail</th>
                  </tr>
              </thead>
              <tbody>
                  {currentUsers.map(user => (
                      <tr key={user.id}>
                          <td>
                              <input
                                  type="checkbox"
                                  checked={selectedUserIds.includes(user.id)}
                                  onChange={() => handleCheckboxChange(user.id)}
                              />
                          </td>
                          <td>{user.id}</td>
                          <td>{user.name}</td>
                          <td>{user.company}</td>
                          <td>{user.email}</td>
                      </tr>
                  ))}
              </tbody>
          </table>
          <div>
              <p>선택된 사용자 수: {selectedUserIds.length}</p>
              <button onClick={() => setShowEmailModal(true)} className="modal-button">메일 작성</button>
          </div>
          {showEmailModal && (
              <EmailModal
                  selectedUsers={selectedUsers}
                  onCancel={() => setShowEmailModal(false)}
                  onSend={handleSendEmail}
              />
          )}
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
      </div>
    );
};

export default SendMail;
