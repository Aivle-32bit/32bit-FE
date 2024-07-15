import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// CSS
import './Suggestion.css';

const suggestions = [
    { id: 1, title: '서버 개선 요청', writer: '사용자A', date: '2024-07-14', content: '서버 속도를 개선해 주세요.', secret: false, password: '' },
    { id: 2, title: 'UI 개선 요청', writer: '사용자B', date: '2024-07-12', content: 'UI를 좀 더 직관적으로 만들어 주세요.', secret: true, password: '1234' },
    { id: 3, title: '기능 추가 요청', writer: '사용자C', date: '2024-07-10', content: '새로운 기능을 추가해 주세요.', secret: false, password: '' },
    { id: 4, title: '버그 제보', writer: '사용자D', date: '2024-07-08', content: '앱에서 버그가 발생합니다. 수정 부탁드립니다.', secret: true, password: '5678' },
    { id: 5, title: '이벤트 건의', writer: '사용자E', date: '2024-07-05', content: '이벤트를 더 자주 열어주세요.', secret: false, password: '' },
    { id: 6, title: '고객센터 운영 시간 연장 요청', writer: '사용자F', date: '2024-07-03', content: '고객센터 운영 시간을 연장해 주세요.', secret: false, password: '' },
    { id: 7, title: '새로운 결제 방법 추가 요청', writer: '사용자G', date: '2024-06-30', content: '새로운 결제 방법을 추가해 주세요.', secret: true, password: '9101' },
    { id: 8, title: '서비스 안정성 개선 요청', writer: '사용자H', date: '2024-06-25', content: '서비스가 자주 다운됩니다. 안정성을 개선해 주세요.', secret: false, password: '' },
    { id: 9, title: '사용자 가이드 요청', writer: '사용자I', date: '2024-06-20', content: '초보자를 위한 사용 가이드를 만들어 주세요.', secret: true, password: '1122' },
    { id: 10, title: '보안 강화 요청', writer: '사용자J', date: '2024-06-15', content: '보안을 강화해 주세요.', secret: false, password: '' },
    { id: 11, title: '다국어 지원 요청', writer: '사용자K', date: '2024-06-10', content: '다국어 지원을 추가해 주세요.', secret: true, password: '3344' },
    { id: 12, title: '알림 기능 개선 요청', writer: '사용자L', date: '2024-06-05', content: '알림 기능을 더 편리하게 개선해 주세요.', secret: false, password: '' },
    { id: 13, title: '모바일 앱 최적화 요청', writer: '사용자M', date: '2024-06-01', content: '모바일 앱의 최적화를 부탁드립니다.', secret: true, password: '5566' },
    { id: 14, title: '프로필 사진 기능 추가 요청', writer: '사용자N', date: '2024-05-25', content: '프로필 사진을 업로드할 수 있는 기능을 추가해 주세요.', secret: false, password: '' },
    { id: 15, title: '커뮤니티 기능 개선 요청', writer: '사용자O', date: '2024-05-20', content: '커뮤니티 기능을 개선해 주세요.', secret: true, password: '7788' },
];

const ITEMS_PER_PAGE = 5;

function Suggestion() {
    const { user } = useSelector((state) => state.auth); // 사용자 정보 가져오기
    const isAdmin = user && user.isAdmin; // 관리자 여부 확인

    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    const [selectedSuggestion, setSelectedSuggestion] = useState(null); // 선택된 건의사항 상태
    const [isWriteModalOpen, setIsWriteModalOpen] = useState(false); // 글쓰기 모달 상태
    const [password, setPassword] = useState(''); // 비밀번호 상태
    const [comments, setComments] = useState(''); // 댓글 상태

    const totalPages = Math.ceil(suggestions.length / ITEMS_PER_PAGE); // 전체 페이지 수 계산
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE; // 현재 페이지의 시작 인덱스
    const selectedSuggestions = suggestions.slice(startIndex, startIndex + ITEMS_PER_PAGE); // 현재 페이지의 건의사항 목록

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        if (suggestion.secret && !isAdmin) {
            const inputPassword = prompt('비밀번호를 입력하세요:');
            if (inputPassword !== suggestion.password) {
                alert('비밀번호가 틀렸습니다.');
                return;
            }
        }
        setSelectedSuggestion(suggestion); // 건의사항 클릭 시 선택된 건의사항 설정
    };

    const closeModal = () => {
        setSelectedSuggestion(null); // 모달 닫기
    };

    const handleWriteClick = () => {
        setIsWriteModalOpen(true); // 글쓰기 모달 열기
    };

    const closeWriteModal = () => {
        setIsWriteModalOpen(false); // 글쓰기 모달 닫기
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value); // 비밀번호 입력 상태 업데이트
    };

    const handleCommentsChange = (e) => {
        setComments(e.target.value); // 댓글 입력 상태 업데이트
    };

    return (
        <div className="suggestion-container">
            <div className="suggestion-content">
                <h1 className="suggestion-title">건의사항</h1>
                <button onClick={handleWriteClick} className="suggestion-write-button">글쓰기</button> {/* 모든 사용자가 글쓰기 버튼 사용 가능 */}
                {selectedSuggestions.map((suggestion) => (
                    <div key={suggestion.id} className="suggestion-item" onClick={() => handleSuggestionClick(suggestion)}>
                        <h2>{suggestion.secret ? `(비밀글) ${suggestion.title}` : suggestion.title}</h2>
                        <p>{suggestion.date}</p>
                    </div>
                ))}
                <div className="pagination">
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>← Prev</button>
                    <span>{currentPage} / {totalPages}</span>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages}>→ Next</button>
                </div>
            </div>
            {selectedSuggestion && (
                <div className="suggestion-modal-overlay" onClick={closeModal}>
                    <div className="suggestion-modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>{selectedSuggestion.title}</h2>
                        <p>작성자: {selectedSuggestion.writer}</p>
                        <p>{selectedSuggestion.date}</p>
                        <p>{selectedSuggestion.content}</p>
                        <button onClick={closeModal}>Close</button>
                        {isAdmin && (
                            <div className="comment-section">
                                <textarea
                                    placeholder="댓글을 입력하세요."
                                    value={comments}
                                    onChange={handleCommentsChange}
                                ></textarea>
                                <button>댓글 달기</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {isWriteModalOpen && (
                <div className="suggestion-modal-overlay" onClick={closeWriteModal}>
                    <div className="suggestion-modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>새 건의사항 작성</h2>
                        {/* 글쓰기 폼 */}
                        <input type="text" placeholder="제목" />
                        <textarea placeholder="내용"></textarea>
                        <div className="button-container">
                            <button>저장</button>
                            <button onClick={closeWriteModal}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Suggestion;