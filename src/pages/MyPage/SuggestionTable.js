import React from 'react';
import './SuggestionTable.css';
import Reply from './Reply';

const SuggestionTable = ({ suggestions, currentPage, itemsPerPage, handleSuggestionClick, selectedSuggestion }) => {
  const renderSuggestions = (suggestions) => (
      suggestions.map((suggestion, index) => (
          <React.Fragment key={suggestion.boardId}>
            <tr className={`suggestion-row ${suggestion === selectedSuggestion ? 'selected' : ''}`} onClick={() => handleSuggestionClick(suggestion)}>
              <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
              <td>{suggestion.isSecret ? <span className="secret-tag">🔒</span> : null}{suggestion.title}</td>
              <td>{suggestion.memberName}</td>
              <td>{new Date(suggestion.createdAt).toLocaleDateString()}</td>
              <td>{suggestion.viewCount}</td>
            </tr>
            {suggestion.replies.length > 0 && (
                <Reply
                    replies={suggestion.replies}
                    handleSuggestionClick={handleSuggestionClick}
                />
            )}
          </React.Fragment>
      ))
  );

  return (
      <div className="suggestion-list">
        <table className="suggestion-table">
          <thead>
          <tr>
            <th>NO.</th>
            <th>제목</th>
            <th>작성자</th>
            <th>등록일</th>
            <th>조회</th>
          </tr>
          </thead>
          <tbody>
          {renderSuggestions(suggestions)}
          </tbody>
        </table>
      </div>
  );
};

export default SuggestionTable;