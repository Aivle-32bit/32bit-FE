import React from 'react';
import './Reply.css';

const Reply = ({ replies, handleSuggestionClick }) => {
  return (
      <>
        {replies.map((reply) => (
            <tr key={reply.boardId} className="reply-row" onClick={() => handleSuggestionClick(reply)}>
              <td></td>
              <td>
                {reply.isSecret ? <span className="secret-tag">🔒</span> : null}
                ↪️{reply.title}
              </td>
              <td>{reply.memberName}</td>
              <td>{new Date(reply.createdAt).toLocaleDateString()}</td>
              <td>{reply.viewCount}</td>
            </tr>
        ))}
      </>
  );
};

export default Reply;