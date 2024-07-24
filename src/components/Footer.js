import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-section footer-links">
                    <ul>
                        <li><a href="../">홈</a></li>
                        <li><a href="/about-us">회사소개</a></li>
                        <li><a href="/Terms">이용약관</a></li>
                        <li><a href="/Privacy">개인정보취급방침</a></li>
                        <li><a href="/Call">문의/연락처</a></li>
                    </ul>
                </div>
                
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Your Company. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
