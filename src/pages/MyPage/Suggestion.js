import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {
  createReply,
  createSuggestion,
  deleteSuggestion,
  fetchMySuggestions,
  fetchSuggestionById,
  fetchSuggestions,
  searchSuggestions,
  updateSuggestion
} from '../../api'; // Importing API methods
import './Suggestion.css';
import SuggestionTable from './SuggestionTable';
import SuggestionModal from './SuggestionModal';
import ErrorModal from './ErrorModal';
import ReplyModal from './ReplyModal';

const ITEMS_PER_PAGE = 10;

function Suggestion() {
  const {user} = useSelector((state) => state.auth); // 사용자 정보 가져오기
  const isAdmin = user && user.isAdmin; // 관리자 여부 확인
  const [suggestions, setSuggestions] = useState([]); // Suggestions state
  const [totalItems, setTotalItems] = useState(0); // Total number of items
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [selectedSuggestion, setSelectedSuggestion] = useState(null); // 선택된 건의사항 상태
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false); // 글쓰기 모달 상태
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false); // 답글 모달 상태
  const [replyContent, setReplyContent] = useState(''); // 답글 상태
  const [replyParentId, setReplyParentId] = useState(null); // 답글 부모 ID
  const [newSuggestionTitle, setNewSuggestionTitle] = useState(''); // 새로운 건의사항 제목
  const [newSuggestionContent, setNewSuggestionContent] = useState(''); // 새로운 건의사항 내용
  const [isSecret, setIsSecret] = useState(false); // 비밀글 여부
  const [searchTitle, setSearchTitle] = useState(''); // 검색어 상태
  const [error, setError] = useState(null); // Error 상태
  const [showMySuggestions, setShowMySuggestions] = useState(false); // 내 글 보기 여부

  const loadSuggestions = useCallback(async () => {
    try {
      const data = showMySuggestions
          ? await fetchMySuggestions(currentPage, ITEMS_PER_PAGE)
          : await fetchSuggestions(currentPage, ITEMS_PER_PAGE);
      const organizedData = organizeSuggestions(data.content);
      setSuggestions(organizedData);
      setTotalItems(data.totalElements);
    } catch (error) {
      setError(error.message);
    }
  }, [currentPage, showMySuggestions]);

  useEffect(() => {
    loadSuggestions();
  }, [loadSuggestions]);

  const organizeSuggestions = (suggestions) => {
    const map = {};
    const result = [];

    suggestions.forEach((suggestion) => {
      map[suggestion.boardId] = {...suggestion, replies: []};
    });

    suggestions.forEach((suggestion) => {
      if (suggestion.parentId === null) {
        result.push(map[suggestion.boardId]);
      } else {
        if (map[suggestion.parentId]) {
          map[suggestion.parentId].replies.push(map[suggestion.boardId]);
        }
      }
    });

    return result;
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalItems / ITEMS_PER_PAGE)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSuggestionClick = async (suggestion) => {
    try {
      const fetchedSuggestion = await fetchSuggestionById(suggestion.boardId);
      setSelectedSuggestion(fetchedSuggestion);
    } catch (error) {
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  const closeModal = () => {
    setSelectedSuggestion(null); // 모달 닫기
    setError(null); // Error 메시지 초기화
  };

  const handleWriteClick = () => {
    setIsWriteModalOpen(true); // 글쓰기 모달 열기
  };

  const closeWriteModal = () => {
    setIsWriteModalOpen(false); // 글쓰기 모달 닫기
  };

  const handleReplyClick = (parentId, isReply) => {
    if (isReply) {
      alert('답글에 대한 답글은 작성할 수 없습니다.');
      return;
    }
    setReplyParentId(parentId);
    setIsReplyModalOpen(true); // 답글 모달 열기
  };

  const closeReplyModal = () => {
    setIsReplyModalOpen(false); // 답글 모달 닫기
  };

  const handleReplyChange = (e) => {
    setReplyContent(e.target.value); // 답글 입력 상태 업데이트
  };

  const handleReplySubmit = async () => {
    try {
      await createReply(replyParentId, {content: replyContent});
      setReplyContent(''); // Clear the reply content after submission
      setReplyParentId(null); // Reset the parent ID
      closeReplyModal(); // Close the reply modal after submission
      await loadSuggestions(); // Reload suggestions
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTitle(e.target.value); // 검색어 상태 업데이트
  };

  const handleSearchClick = async () => {
    if (searchTitle.trim() === '') {
      alert('검색어를 입력하세요.');
      return;
    }
    try {
      const data = await searchSuggestions(searchTitle, currentPage,
          ITEMS_PER_PAGE);
      const organizedData = organizeSuggestions(data.content);
      setSuggestions(organizedData);
      setTotalItems(data.totalElements);
      setCurrentPage(1);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCreateSuggestion = async () => {
    try {
      await createSuggestion({
        title: newSuggestionTitle,
        content: newSuggestionContent,
        isSecret
      });
      await loadSuggestions(); // Reload suggestions
      closeWriteModal(); // Close the write modal after submission
    } catch (error) {
      setError(error.message);
    }
  };

  const handleNewSuggestionTitleChange = (e) => {
    setNewSuggestionTitle(e.target.value);
  };

  const handleNewSuggestionContentChange = (e) => {
    setNewSuggestionContent(e.target.value);
  };

  const handleIsSecretChange = (e) => {
    setIsSecret(e.target.checked);
  };

  const handleUpdateSuggestion = async (boardId, updatedSuggestion) => {
    try {
      await updateSuggestion(boardId, updatedSuggestion);
      await loadSuggestions(); // Reload suggestions after updating
      closeModal(); // Close the suggestion modal
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteSuggestion = async (boardId) => {
    try {
      await deleteSuggestion(boardId);
      await loadSuggestions(); // Reload suggestions after deleting
      closeModal(); // Close the suggestion modal
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleMySuggestions = () => {
    setShowMySuggestions(!showMySuggestions);
    setCurrentPage(1); // Reset to first page
  };

  return (
      <div className="suggestion-container">
        <div className="suggestion-content">
          <div className="suggestion-search">
            <input
                type="text"
                placeholder="제목을 입력하세요"
                className="search-input"
                value={searchTitle}
                onChange={handleSearchChange}
            />
            <button className="search-button" onClick={handleSearchClick}>검색</button>
          </div>
          <button onClick={handleWriteClick}
                  className="suggestion-write-button">글쓰기
          </button>
          <button className="suggestion-toggle-button" onClick={toggleMySuggestions}>
            {showMySuggestions ? '전체 글 보기' : '내 글 보기'}
          </button>
          <SuggestionTable
              suggestions={suggestions}
              currentPage={currentPage}
              itemsPerPage={ITEMS_PER_PAGE}
              handleSuggestionClick={handleSuggestionClick}
              handleReplyClick={handleReplyClick}
              selectedSuggestion={selectedSuggestion}
          />
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>←
              Prev
            </button>
            <span>{currentPage} / {Math.ceil(
                totalItems / ITEMS_PER_PAGE)}</span>
            <button onClick={handleNextPage}
                    disabled={currentPage === Math.ceil(
                        totalItems / ITEMS_PER_PAGE)}>→ Next
            </button>
          </div>
        </div>
        {error && <ErrorModal error={error} setError={setError}/>}
        {selectedSuggestion && (
            <SuggestionModal
                suggestion={selectedSuggestion}
                closeModal={closeModal}
                isAdmin={isAdmin}
                handleReplyClick={handleReplyClick}
                handleUpdateSuggestion={handleUpdateSuggestion}
                handleDeleteSuggestion={handleDeleteSuggestion}
                userId={user.id}
            />
        )}
        {isWriteModalOpen && (
            <div className="suggestion-modal-overlay" onClick={closeWriteModal}>
              <div className="suggestion-modal-content"
                   onClick={(e) => e.stopPropagation()}>
                <span className='suggetion-modal-new-title'>새 건의사항 작성</span>
                <span className='suggetion-modal-new-label'>제목</span>
                <input className='suggetion-modal-new-input' type="text" placeholder="제목" value={newSuggestionTitle}
                       onChange={handleNewSuggestionTitleChange}/>
                <span className='suggetion-modal-new-label'>내용</span>
                <textarea className='suggetion-modal-new-input' placeholder="내용" value={newSuggestionContent}
                          onChange={handleNewSuggestionContentChange}></textarea>
                <div className='suggetion-modal-new-action-area'>
                  <div className='suggetion-modal-new-secret-area'>
                    <div>
                      <label>
                        <input className='suggetion-modal-new-secret' type="checkbox" checked={isSecret}
                              onChange={handleIsSecretChange}/> 비밀글
                      </label>
                    </div>
                  </div>
                  <button className="suggestion-modal-new-save-button" onClick={handleCreateSuggestion}>저장</button>
                </div>
                <button className="suggestion-modal-new-close-button" onClick={closeWriteModal}>확인</button>
              </div>
            </div>
        )}
        {isReplyModalOpen && (
            <ReplyModal
                closeReplyModal={closeReplyModal}
                replyContent={replyContent}
                handleReplyChange={handleReplyChange}
                handleReplySubmit={handleReplySubmit}
            />
        )}
      </div>
  );
}

export default Suggestion;