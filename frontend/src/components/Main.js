import React from 'react';
import Header from './Header';
import UserInfo from './UserInfo';
import Content from './Content';
import './Main.scss';

const Main = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (!isLoggedIn) {
        return (
            <div>
                <h1>Access Denied</h1>
                <p>Please log in to access the community page.</p>
            </div>
        );
    }

    return (
        <div className="main-layout">
            <Header />
            <div className="main-content">
                <aside>
                    <UserInfo />
                </aside>
                <main>
                    <Content />
                </main>
            </div>
        </div>
    );
};

export default Main;
