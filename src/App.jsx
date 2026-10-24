

import { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const addTask = () => {
    if (task.trim() === "") {
      alert("Please enter a task!");
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: task.trim(),
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setTask("");
  };

  const toggleTask = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const deleteTask = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearAll = () => {
    setTodos([]);
  };

  const completedCount = todos.filter(
    (todo) => todo.completed
  ).length;

  return (
    <div className="app">
      <div className="todo-container">
        <div className="header">
          <div className="logo">✓</div>
          <h1>My Todo App</h1>
          <p>Plan your day. Get things done!</p>
        </div>

        <div className="input-section">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTask();
            }}
          />

          <button className="add-btn" onClick={addTask}>
            + Add
          </button>
        </div>

        <div className="stats">
          <div className="stat-card">
            <span>Total Tasks</span>
            <strong>{todos.length}</strong>
          </div>

          <div className="stat-card">
            <span>Completed</span>
            <strong>{completedCount}</strong>
          </div>

          <div className="stat-card">
            <span>Pending</span>
            <strong>{todos.length - completedCount}</strong>
          </div>
        </div>

        <div className="list-header">
          <h2>My Tasks</h2>
          {todos.length > 0 && (
            <button className="clear-btn" onClick={clearAll}>
              Clear All
            </button>
          )}
        </div>

        <div className="task-list">
          {todos.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3>No tasks yet!</h3>
              <p>Add your first task to get started.</p>
            </div>
          ) : (
            todos.map((todo) => (
              <div className="task-item" key={todo.id}>
                <label className="task-label">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTask(todo.id)}
                  />

                  <span
                    className={
                      todo.completed ? "completed" : ""
                    }
                  >
                    {todo.text}
                  </span>
                </label>

                <button
                  className="delete-btn"
                  onClick={() => deleteTask(todo.id)}
                  aria-label={`Delete ${todo.text}`}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        <footer>
          Made with React 
        </footer>
      </div>
    </div>
  );
}

export default App;
