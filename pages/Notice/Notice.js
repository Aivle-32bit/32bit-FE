import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// CSS
import './Notice.css';

const notices = [
    { id: 1, title: '서버 점검 안내', date: '2024-07-14', content: '서버 점검이 2024년 7월 14일에 있을 예정입니다. 점검 시간 동안 서비스 이용이 제한될 수 있습니다.' },
    { id: 2, title: '신규 기능 업데이트', date: '2024-07-12', content: '새로운 기능이 업데이트되었습니다. 이제 더 나은 사용자 경험을 제공합니다.' },
    { id: 3, title: '서비스 이용 약관 변경', date: '2024-07-10', content: '서비스 이용 약관이 변경되었습니다. 자세한 내용은 홈페이지를 참조하세요.' },
    { id: 4, title: '정기 점검 일정 안내', date: '2024-07-08', content: '정기 점검이 예정되어 있습니다. 점검 시간 동안 서비스 이용이 제한될 수 있습니다.' },
    { id: 5, title: '이벤트 당첨자 발표', date: '2024-07-05', content: '이벤트 당첨자가 발표되었습니다. 당첨된 사용자에게 축하드립니다.' },
    { id: 6, title: '시스템 개선 작업', date: '2024-07-02', content: '시스템 개선 작업이 완료되었습니다. 이제 더 안정적인 서비스를 이용할 수 있습니다.' },
    { id: 7, title: '사용자 의견 반영 업데이트', date: '2024-06-30', content: '사용자 의견을 반영한 업데이트가 있었습니다. 많은 관심 부탁드립니다.' },
    { id: 8, title: '앱 성능 최적화', date: '2024-06-25', content: '앱의 성능이 최적화되었습니다. 더 빠른 속도로 이용할 수 있습니다.' },
    { id: 9, title: '새로운 보안 패치', date: '2024-06-20', content: '새로운 보안 패치가 적용되었습니다. 보안 강화에 만전을 기하고 있습니다.' },
    { id: 10, title: '고객센터 운영 시간 변경', date: '2024-06-15', content: '고객센터 운영 시간이 변경되었습니다. 새로운 운영 시간을 확인해 주세요.' },
];

const ITEMS_PER_PAGE = 5;

function Notice() {
    const { user } = useSelector((state) => state.auth); // 사용자 정보 가져오기
    const isAdmin = user && user.isAdmin; // 관리자 여부 확인

    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    const [selectedNotice, setSelectedNotice] = useState(null); // 선택된 공지사항 상태
    const [isWriteModalOpen, setIsWriteModalOpen] = useState(false); // 글쓰기 모달 상태
    const [isEditMode, setIsEditMode] = useState(false); // 수정 모드 상태

    const totalPages = Math.ceil(notices.length / ITEMS_PER_PAGE); // 전체 페이지 수 계산
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE; // 현재 페이지의 시작 인덱스
    const selectedNotices = notices.slice(startIndex, startIndex + ITEMS_PER_PAGE); // 현재 페이지의 공지사항 목록

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

    const handleNoticeClick = (notice) => {
        setSelectedNotice(notice); // 공지사항 클릭 시 선택된 공지사항 설정
    };

    const closeModal = () => {
        setSelectedNotice(null); // 모달 닫기
        setIsEditMode(false); // 수정 모드 해제
    };

    const handleWriteClick = () => {
        setIsWriteModalOpen(true); // 글쓰기 모달 열기
    };

    const closeWriteModal = () => {
        setIsWriteModalOpen(false); // 글쓰기 모달 닫기
    };

    const handleEditClick = () => {
        setIsEditMode(true); // 수정 모드 활성화
    };

    return (
        <div className="notice-container">
            <div className="notice-content">
                <h1 className="notice-title">공지사항</h1>
                {isAdmin && <button onClick={handleWriteClick} className="notice-write-button">글쓰기</button>} {/* 관리자일 경우 글쓰기 버튼 표시 */}
                {selectedNotices.map((notice) => (
                    <div key={notice.id} className="notice-item" onClick={() => handleNoticeClick(notice)}>
                        <h2>{notice.title}</h2>
                        <p>{notice.date}</p>
                    </div>
                ))}
                <div className="pagination">
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>← Prev</button>
                    <span>{currentPage} / {totalPages}</span>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages}>→ Next</button>
                </div>
            </div>
            {selectedNotice && (
                <div className="notice-modal-overlay" onClick={closeModal}>
                    <div className="notice-modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>{selectedNotice.title}</h2>
                        <p>{selectedNotice.date}</p>
                        <p>{selectedNotice.content}</p>
                        {isAdmin && !isEditMode && <button onClick={handleEditClick}>수정</button>} {/* 관리자일 경우 수정 버튼 표시 */}
                        {isEditMode && (
                            <div>
                                {/* 수정 폼 */}
                                <textarea defaultValue={selectedNotice.content}></textarea>
                                <div className="button-container">
                                    <button>저장</button>
                                    <button onClick={closeModal}>Close</button>
                                </div>
                            </div>
                        )}
                        {!isEditMode && <button onClick={closeModal}>Close</button>}
                    </div>
                </div>
            )}
            {isWriteModalOpen && (
                <div className="notice-modal-overlay" onClick={closeWriteModal}>
                    <div className="notice-modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>새 공지사항 작성</h2>
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

export default Notice;