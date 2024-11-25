const express = require('express');
const app = express();
const PORT = 5000;

// Middleware to parse JSON
app.use(express.json());

// Sample data (in-memory database)
let todos = [
    { id: 1, task: "Learn Node.js", completed: false },
    { id: 2, task: "Build a REST API", completed: false },
];

// 1. Get all todos (READ)
app.get('/api/todos', (req, res) => {
    res.json(todos);
});

// 2. Add a new todo (CREATE)
app.post('/api/todos', (req, res) => {
    const { task } = req.body;
    if (!task) {
        return res.status(400).json({ error: "Task is required" });
    }
    const newTodo = {
        id: todos.length + 1,
        task,
        completed: false,
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// 3. Update a todo (UPDATE)
app.put('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    const { task, completed } = req.body;
    const todo = todos.find((t) => t.id === parseInt(id));

    if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
    }
    if (task !== undefined) todo.task = task;
    if (completed !== undefined) todo.completed = completed;

    res.json(todo);
});

// 4. Delete a todo (DELETE)
app.delete('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex((t) => t.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ error: "Todo not found" });
    }
    todos.splice(index, 1);
    res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
