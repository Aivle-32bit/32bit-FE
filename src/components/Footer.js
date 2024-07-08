import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom"
import './Footer.css';

const Footer = () => {
    return (
        <div className="footer">
            <Link to="/">FINANCIAL DETECTIVE</Link>
        </div>
    );
}

export default Footer;