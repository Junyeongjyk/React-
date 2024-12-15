import React from 'react';
import Community from './Community';

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
        <div>
            <h1>Welcome to the Main Page!</h1>
            <Community />
        </div>
    );
};

export default Main;
