import React from 'react';
import './SuggestionBoard.css';

const SuggestionBoard = () => {
    const writePost = () => {
        alert('글쓰기 기능은 아직 구현되지 않았습니다.');
    };

    const editPost = () => {
        alert('수정 기능은 아직 구현되지 않았습니다.');
    };

    return (
        <section className="notice">
            <div className="page-title">
                <div className="container">
                    <h3>건의사항</h3>
                </div>
            </div>

            {/* Board search area */}
            <div id="board-search">
                <div className="container">
                    <div className="search-window">
                        <form action="">
                            <div className="search-wrap">
                                <label htmlFor="search" className="blind">건의사항 내용 검색</label>
                                <input id="search" type="search" placeholder="검색어를 입력해주세요." />
                                <button type="submit" className="btn btn-dark">검색</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="container">
                <div className="buttons">
                    <button className="btn btn-dark" onClick={writePost}>글쓰기</button>
                    <button className="btn btn-dark" onClick={editPost}>수정</button>
                </div>
            </div>

            {/* Board list area */}
            <div id="board-list">
                <div className="container">
                    <table className="board-table">
                        <thead>
                            <tr>
                                <th scope="col" className="th-num">번호</th>
                                <th scope="col" className="th-title">제목</th>
                                <th scope="col" className="th-date">등록일</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>3</td>
                                <th>
                                    <a href="#!">[건의사항] Aivle 기업 추가 건의합니다.</a>
                                    <p>테스트</p>
                                </th>
                                <td>2024.07.12</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <th><a href="#!">[건의사항]Honey 기업 추가 요청드립니다.</a></th>
                                <td>2024.07.09</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <th><a href="#!">[건의사항]FreeSet 기업 추가 부탁드려요.</a></th>
                                <td>2024.07.05</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default SuggestionBoard;
