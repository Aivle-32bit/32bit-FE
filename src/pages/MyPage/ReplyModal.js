import React from 'react';
import './ReplyModal.css';

const ReplyModal = ({ closeReplyModal, replyContent, handleReplyChange, handleReplySubmit }) => {
  return (
      <div className="suggestion-reply-modal-overlay" onClick={closeReplyModal}>
        <div className="suggestion-reply-modal-content" onClick={(e) => e.stopPropagation()}>
          <span className='suggestion-reply-modal-title'>답글 달기</span>
          <textarea
              className='suggestion-reply-modal-text'
              placeholder="답글을 입력하세요."
              value={replyContent}
              onChange={handleReplyChange}
          ></textarea>
          <div className="button-container">
            <button className='suggestion-reply-modal-save-button' onClick={handleReplySubmit}>저장</button>
            <button className='suggestion-reply-modal-close-button' onClick={closeReplyModal}>확인</button>
          </div>
        </div>
      </div>
  );
};

export default ReplyModal;