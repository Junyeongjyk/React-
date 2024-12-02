const express = require('express');
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// Sample in-memory user data
let users = [
    { id: 1, username: 'testuser', password: 'password123' },
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
