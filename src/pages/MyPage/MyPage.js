import { Route, Routes } from 'react-router-dom';
// CSS
import './MyPage.css';
import MyPageMenuList from './MyPageMenuList';
// Pages
import Profile from './Profile';
import Suggestion from './Suggestion';

function MyPage() {
    return (
        <div className="mypage-container">
            <div className="mypage-menu-list">
                <MyPageMenuList />
            </div>
            <div className="mypage-content">
                <Routes>
                    <Route path='profile' element={<Profile />} />
                    <Route path='suggestion' element={<Suggestion />} />
                </Routes>
            </div>
        </div>
    );
}

export default MyPage;
