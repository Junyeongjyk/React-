import React, { useState, useEffect } from 'react';
import './Community.scss';

const Community = () => {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api/posts')
            .then((response) => response.json())
            .then((data) => setPosts(data));
    }, []);

    // 게시글 등록
    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = { title, content, author };

        fetch('http://localhost:5000/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPost),
        })
            .then((response) => response.json())
            .then((data) => {
                setPosts([...posts, data]); // 새 게시글 추가
                setTitle(''); // 입력 필드 초기화
                setContent('');
                setAuthor('');
            });
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Community Board</h1>
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={{ marginBottom: '10px', display: 'block' }}
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    style={{ marginBottom: '10px', display: 'block' }}
                ></textarea>
                <input
                    type="text"
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                    style={{ marginBottom: '10px', display: 'block' }}
                />
                <button type="submit">Post</button>
            </form>

            <h2>Posts</h2>
            <ul>
                {posts.map((post) => (
                    <li key={post.id} style={{ marginBottom: '10px' }}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <small>By: {post.author}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Community;

<style lang='scss'>
    @import from "./Community.scss";
</style>