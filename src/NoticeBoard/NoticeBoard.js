import React, { useState } from "react";
import './NoticeBoard.css';

const NoticeBoard = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [posts, setPosts] = useState([
        { id: 3, title: "[공지사항] 개인정보 처리방침 변경안내", date: "2017.07.13", content: "테스트" },
        { id: 2, title: "공지사항 안내입니다. 이용해주셔서 감사합니다", date: "2017.06.15", content: "" },
        { id: 1, title: "공지사항 안내입니다. 이용해주셔서 감사합니다", date: "2017.06.15", content: "" }
    ]);
    const [showWriteForm, setShowWriteForm] = useState(false);
    const [newPost, setNewPost] = useState({ title: "", content: "" });

    const handleSearch = (event) => {
        event.preventDefault();
        // 검색 기능 구현
        const filteredPosts = posts.filter(post =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setPosts(filteredPosts);
    };

    const handleWritePost = () => {
        setShowWriteForm(true);
    };

    const handleEditPost = () => {
        alert('수정 버튼이 클릭되었습니다.');
        // 수정 기능 추가
    };

    const handleSubmitPost = (event) => {
        event.preventDefault();
        const date = new Date().toISOString().split('T')[0];
        const newPostWithId = { ...newPost, id: posts.length + 1, date };
        setPosts([newPostWithId, ...posts]);
        setNewPost({ title: "", content: "" });
        setShowWriteForm(false);
    };

    return (
        <div className="notice-board">
            <div className="line"></div>
            <div className="page-title">
                <div className="container">
                    <h3>공지사항</h3>
                </div>
            </div>

            {/* Board search area */}
            <div id="board-search">
                <div className="container">
                    <div className="search-window">
                        <form onSubmit={handleSearch}>
                            <div className="search-wrap">
                                <label htmlFor="search" className="blind">공지사항 내용 검색</label>
                                <input
                                    id="search"
                                    type="search"
                                    placeholder="검색어를 입력해주세요."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button type="submit" className="btn btn-dark">검색</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="container">
                <div className="buttons">
                    <button className="btn btn-dark" onClick={handleWritePost}>글쓰기</button>
                    <button className="btn btn-dark" onClick={handleEditPost}>수정</button>
                </div>
            </div>

            {/* Write post form */}
            {showWriteForm && (
                <div id="write-post-form" className="container">
                    <form onSubmit={handleSubmitPost}>
                        <div>
                            <label htmlFor="post-title">제목:</label>
                            <input
                                type="text"
                                id="post-title"
                                value={newPost.title}
                                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="post-content">내용:</label>
                            <textarea
                                id="post-content"
                                value={newPost.content}
                                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-dark">작성</button>
                    </form>
                </div>
            )}

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
                            {posts.map(post => (
                                <tr key={post.id}>
                                    <td>{post.id}</td>
                                    <th>
                                        <a href="#!">{post.title}</a>
                                        {post.content && <p>{post.content}</p>}
                                    </th>
                                    <td>{post.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default NoticeBoard;
