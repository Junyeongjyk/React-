import React from 'react';
import './Header.scss';

const Header = () => {
    return (
        <header className="header">
            <h1>Community Platform</h1>
            <nav>
                <ul>
                    <li>Home</li>
                    <li>Community</li>
                    <li>About</li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
