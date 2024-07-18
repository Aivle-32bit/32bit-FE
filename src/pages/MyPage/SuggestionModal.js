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
                <h2>건의사항 수정</h2>
                <input type="text" value={updatedTitle}
                       onChange={handleTitleChange}/>
                <textarea value={updatedContent}
                          onChange={handleContentChange}></textarea>
                <div>
                  <label>
                    <input type="checkbox" checked={isSecret}
                           onChange={handleIsSecretChange}/> 비밀글
                  </label>
                </div>
                <div className="button-container">
                  <button onClick={handleSaveChanges}>저장</button>
                  <button onClick={toggleEditMode}>취소</button>
                </div>
              </>
          ) : (
              <>
                <h2>{suggestion.title}</h2>
                <p>작성자: {suggestion.memberName}</p>
                <p>{new Date(suggestion.createdAt).toLocaleString()}</p>
                <p>{suggestion.content}</p>
                {userId === suggestion.memberId && (
                    <div className="button-container">
                      <button onClick={toggleEditMode}>수정</button>
                      <button onClick={() => handleDeleteSuggestion(
                          suggestion.boardId)}>삭제
                      </button>
                    </div>
                )}
                {isAdmin && userId !== suggestion.memberId && (
                    <div className="button-container">
                      <button onClick={() => handleDeleteSuggestion(
                          suggestion.boardId)}>삭제
                      </button>
                    </div>
                )}
              </>
          )}
          <button onClick={closeModal}>Close</button>
          {suggestion.parentId === null && (
              <button onClick={(e) => {
                e.stopPropagation();
                handleReplyClick(suggestion.boardId, false); // Pass false for normal replies
              }}>답글 달기</button>
          )}
        </div>
      </div>
  );
};

export default SuggestionModal;