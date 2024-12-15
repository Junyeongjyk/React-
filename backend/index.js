const express = require('express');
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

const users = [
    { id: 1, username: 'admin', password: '1234' },
    { id: 2, username: 'testuser', password: 'test123' },
];
// 1. 사용자 등록 API
app.post('/api/register', (req, res) => {
    const { username, password } = req.body;

    // 유효성 검사
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    // 중복 사용자 검사
    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
    }

    const newUser = {
        id: users.length + 1,
        username,
        password,
    };
    users.push(newUser);
    res.status(201).json({ message: 'User registered successfully', user: newUser });
});

// 2. 로그인 API
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // 사용자 인증
    const user = users.find(
        (u) => u.username === username && u.password === password
    );

    if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful', user });
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


// 게시글 데이터를 저장하는 메모리 데이터베이스 (임시)
let posts = [
    { id: 1, title: 'Welcome to the Community!', content: 'Feel free to post anything.', author: 'Admin' },
];

// 1. 게시글 전체 조회 (READ)
app.get('/api/posts', (req, res) => {
    res.json(posts);
});

// 2. 게시글 추가 (CREATE)
app.post('/api/posts', (req, res) => {
    const { title, content, author } = req.body;
    if (!title || !content || !author) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const newPost = {
        id: posts.length + 1,
        title,
        content,
        author,
    };
    posts.push(newPost);
    res.status(201).json(newPost);
});

// 3. 게시글 수정 (UPDATE)
app.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const post = posts.find((p) => p.id === parseInt(id));

    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }

    if (title) post.title = title;
    if (content) post.content = content;

    res.json(post);
});

// 4. 게시글 삭제 (DELETE)
app.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const index = posts.findIndex((p) => p.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ error: 'Post not found' });
    }
    posts.splice(index, 1);
    res.status(204).send();
});