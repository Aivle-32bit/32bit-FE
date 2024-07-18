import React from 'react';
import './ReplyModal.css';

const ReplyModal = ({ closeReplyModal, replyContent, handleReplyChange, handleReplySubmit }) => {
  return (
      <div className="reply-modal-overlay" onClick={closeReplyModal}>
        <div className="reply-modal-content" onClick={(e) => e.stopPropagation()}>
          <h2>답글 달기</h2>
          <textarea
              placeholder="답글을 입력하세요."
              value={replyContent}
              onChange={handleReplyChange}
          ></textarea>
          <div className="button-container">
            <button onClick={handleReplySubmit}>저장</button>
            <button onClick={closeReplyModal}>Close</button>
          </div>
        </div>
      </div>
  );
};

export default ReplyModal;