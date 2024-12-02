import React, { useEffect, useState } from 'react';

const TodoApp = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/todos')
            .then((response) => response.json())
            .then((data) => setTodos(data))
            .catch((error) => console.error('Error fetching todos:', error));
    }, []);

    return (
        <div>
            <h1>Todo List</h1>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {todo.task} - {todo.completed ? 'Completed' : 'Not Completed'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoApp;
