import React from 'react';
import logo from './logo_2.png';
import './Header.css';
import { Link } from "react-router-dom";

const linkStyle = {
    textDecoration: "none",
    color: "#2A2F66"
  };

const Header = () => {
    return (
        <header className='Header'>
            <img src={logo} />
            <p>
                <Link to="/test" style={linkStyle}>Тест</Link>
            </p>
        </header>
    )
}
export default Header;
