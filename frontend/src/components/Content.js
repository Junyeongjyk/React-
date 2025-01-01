import React from 'react';
import Community from './Community';
import './Content.scss';

const Content = () => {
    return (
        <div className="content">
            <Community />
            <div className="additional-content">
                <h2>Other Content</h2>
                <p>Explore more features here!</p>
            </div>
        </div>
    );
};

export default Content;
