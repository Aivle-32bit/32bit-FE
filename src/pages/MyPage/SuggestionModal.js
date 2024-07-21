import React, {useEffect, useState} from 'react';
import './SuggestionModal.css';

const SuggestionModal = ({
  suggestion,
  closeModal,
  isAdmin,
  handleReplyClick,
  handleUpdateSuggestion,
  handleDeleteSuggestion,
  userId,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(suggestion.title);
  const [updatedContent, setUpdatedContent] = useState(suggestion.content);
  const [isSecret, setIsSecret] = useState(suggestion.isSecret);

  useEffect(() => {

  }, [suggestion]);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleTitleChange = (e) => {
    setUpdatedTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setUpdatedContent(e.target.value);
  };

  const handleIsSecretChange = (e) => {
    setIsSecret(e.target.checked);
  };

  const handleSaveChanges = () => {
    handleUpdateSuggestion(suggestion.boardId,
        {title: updatedTitle, content: updatedContent, isSecret});
    toggleEditMode();
  };

  return (
      <div className="suggestion-modal-overlay" onClick={closeModal}>
        <div className="suggestion-modal-content"
             onClick={(e) => e.stopPropagation()}>
          {editMode ? (
              <>
                <span className='suggetion-modal-edit-title'>건의사항 수정</span>
                <span className='suggetion-modal-edit-label'>제목</span>
                <input className='suggetion-modal-edit-input' type="text" value={updatedTitle}
                       onChange={handleTitleChange}/>
                <span className='suggetion-modal-edit-label'>내용</span>
                <textarea className='suggetion-modal-edit-input' value={updatedContent}
                          onChange={handleContentChange}></textarea>
                <div className='suggetion-modal-edit-action-area'>
                  <div className='suggetion-modal-edit-secret-area'>
                    <label>
                      <input className='suggetion-modal-edit-secret' type="checkbox" checked={isSecret}
                            onChange={handleIsSecretChange}/> 비밀글
                    </label>
                  </div>
                  <div className="suggestion-modal-button-container">
                    <button className="suggestion-modal-edit-save-button" onClick={handleSaveChanges}>저장</button>
                    <button className="suggestion-modal-edit-cancel-button" onClick={toggleEditMode}>취소</button>
                  </div>
                </div>
              </>
          ) : (
              <>
                <span className='suggestion-modal-title'>{suggestion.title}</span>
                <span className='suggestion-modal-writer'>작성자{'\u00A0'.repeat(9)}{suggestion.memberName}</span>
                <span className='suggestion-modal-date'>작성일시{'\u00A0'.repeat(5)}{new Date(suggestion.createdAt).toLocaleString()}</span>
                <span className='suggestion-modal-text'>{suggestion.content}</span>
                <div className="suggestion-modal-button-container">
                  {suggestion.parentId === null && (
                    <button className="suggestion-modal-reply-button" onClick={(e) => {
                      e.stopPropagation();
                      handleReplyClick(suggestion.boardId, false); // Pass false for normal replies
                    }}>답글 달기</button>
                  )}
                  {userId === suggestion.memberId && (
                    <>
                      <button className="suggestion-modal-edit-button" onClick={toggleEditMode}>수정</button>
                      <button className="suggestion-modal-delete-button" onClick={() => handleDeleteSuggestion(
                          suggestion.boardId)}>삭제
                      </button>
                    </>
                  )}
                  {isAdmin && userId !== suggestion.memberId && (
                    <button className="suggestion-modal-delete-button" onClick={() => handleDeleteSuggestion(
                        suggestion.boardId)}>삭제
                    </button>
                  )}
                </div>
              </>
          )}
          <button className="suggestion-modal-close-button" onClick={closeModal}>확인</button>
        </div>
      </div>
  );
};

export default SuggestionModal;