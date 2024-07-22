import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchNotices, addNotice, updateNotice, deleteNotice } from '../../api'; // Import the API methods
// CSS
import './Notice.css';

const ITEMS_PER_PAGE = 5;

function Notice() {
    const { user } = useSelector((state) => state.auth); // 사용자 정보 가져오기
    const isAdmin = user && user.isAdmin; // 관리자 여부 확인

    const [allNotices, setAllNotices] = useState([]); // 모든 공지사항 상태
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    const [selectedNotice, setSelectedNotice] = useState(null); // 선택된 공지사항 상태
    const [isWriteModalOpen, setIsWriteModalOpen] = useState(false); // 글쓰기 모달 상태
    const [isEditMode, setIsEditMode] = useState(false); // 수정 모드 상태
    const [newTitle, setNewTitle] = useState(''); // 새로운 제목 상태
    const [newContent, setNewContent] = useState(''); // 새로운 내용 상태

    useEffect(() => {
        const loadNotices = async () => {
            try {
                const data = await fetchNotices();
                setAllNotices(data);
            } catch (error) {
                console.error('Error loading notices:', error);
            }
        };
        loadNotices();
    }, []);

    const totalPages = Math.ceil(allNotices.length / ITEMS_PER_PAGE); // 전체 페이지 수 계산
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE; // 현재 페이지의 시작 인덱스
    const selectedNotices = allNotices.slice(startIndex, startIndex + ITEMS_PER_PAGE); // 현재 페이지의 공지사항 목록

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
        setNewTitle(notice.title); // 선택된 공지사항 제목 설정
        setNewContent(notice.content); // 선택된 공지사항 내용 설정
    };

    const closeModal = () => {
        setSelectedNotice(null); // 모달 닫기
        setIsEditMode(false); // 수정 모드 해제
    };

    const handleWriteClick = () => {
        setIsWriteModalOpen(true); // 글쓰기 모달 열기
        setNewTitle(''); // 새로운 제목 초기화
        setNewContent(''); // 새로운 내용 초기화
    };

    const closeWriteModal = () => {
        setIsWriteModalOpen(false); // 글쓰기 모달 닫기
    };

    const handleEditClick = () => {
        setIsEditMode(true); // 수정 모드 활성화
    };

    const handleSaveClick = async () => {
        if (isEditMode) {
            try {
                await updateNotice(selectedNotice.noticeId, newTitle, newContent);
                setAllNotices((prev) =>
                    prev.map((notice) =>
                        notice.noticeId === selectedNotice.noticeId
                            ? { ...notice, title: newTitle, content: newContent }
                            : notice
                    )
                );
                setIsEditMode(false);
                setSelectedNotice(null);
            } catch (error) {
                console.error('Error updating notice:', error);
            }
        } else {
            try {
                const newNotice = await addNotice(newTitle, newContent);
                setAllNotices((prev) => [newNotice, ...prev]);
                setIsWriteModalOpen(false);
            } catch (error) {
                console.error('Error adding notice:', error);
            }
        }
    };

    const handleDeleteClick = async (id) => {
        try {
            await deleteNotice(id);
            setAllNotices((prev) => prev.filter((notice) => notice.noticeId !== id));
            setSelectedNotice(null);
        } catch (error) {
            console.error('Error deleting notice:', error);
        }
    };

    return (
        <div className="notice-container">
            <div className="notice-content">
                <h1 className="notice-title">공지사항</h1>
                {isAdmin && <button onClick={handleWriteClick} className="notice-write-button">글쓰기</button>} {/* 관리자일 경우 글쓰기 버튼 표시 */}
                {selectedNotices.map((notice) => (
                    <div key={notice.noticeId} className="notice-item" onClick={() => handleNoticeClick(notice)}>
                        <h2>{notice.title}</h2>
                        <p>{new Date(notice.createdAt).toLocaleDateString()}</p>
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
                        <span className='notice-modal-title'>{isEditMode ? '공지사항 수정' : selectedNotice.title}</span>
                        <span className='notice-modal-date'>작성일시{'\u00A0'.repeat(5)}{new Date(selectedNotice.createdAt).toLocaleDateString()}</span>
                        {isEditMode ? (
                            <div className='notice-modal-contents'>
                                <span className='notice-modal-label'>제목</span>
                                <input
                                    className='notice-modal-text'
                                    type="text"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                />
                                <span className='notice-modal-label'>내용</span>
                                <textarea
                                    className='notice-modal-text'
                                    value={newContent}
                                    onChange={(e) => setNewContent(e.target.value)}
                                />
                                <div className="button-container">
                                    <button className="notice-modal-save-button" onClick={handleSaveClick}>저장</button>
                                    <button className="notice-modal-close-button" onClick={closeModal}>확인</button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <p>{selectedNotice.content}</p>
                                {isAdmin && (
                                    <div className="button-container">
                                        <button className="notice-modal-edit-button" onClick={handleEditClick}>수정</button>
                                        <button className="notice-modal-delete-button" onClick={() => handleDeleteClick(selectedNotice.noticeId)}>삭제</button>
                                        <button className="notice-modal-close-button" onClick={closeModal}>확인</button>
                                    </div>
                                )}
                                {!isAdmin && <button className="notice-modal-close-button" onClick={closeModal}>확인</button>}
                            </div>
                        )}
                    </div>
                </div>
            )}
            {isWriteModalOpen && (
                <div className="notice-modal-overlay" onClick={closeWriteModal}>
                    <div className="notice-modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className='notice-modal-title'>새 공지사항 작성</span>
                        <span className='notice-modal-label'>제목</span>
                        <input
                            className='notice-modal-text'
                            type="text"
                            placeholder="제목"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                        />
                        <span className='notice-modal-label'>내용</span>
                        <textarea
                            className='notice-modal-text'
                            placeholder="내용"
                            value={newContent}
                            onChange={(e) => setNewContent(e.target.value)}
                        />
                        <div className="button-container">
                            <button className="notice-modal-save-button" onClick={handleSaveClick}>저장</button>
                            <button className="notice-modal-close-button" onClick={closeWriteModal}>확인</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Notice;