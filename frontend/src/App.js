import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login    from './components/Login';
import Register from './components/Register';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem('loggedIn');
  return isLoggedIn ? children : <Navigate to="/login" />;
}

function TasksPage() {
  const [tasks, setTasks] = React.useState([
    { id: 1, title: 'Learn React',        completed: false },
    { id: 2, title: 'Build Task Manager', completed: true  },
  ]);

  const handleAdd    = (title) => setTasks([...tasks, { id: Date.now(), title, completed: false }]);
  const handleDelete = (id)    => setTasks(tasks.filter(t => t.id !== id));
  const handleToggle = (id)    => setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    window.location.href = '/login';
  };

  const total   = tasks.length;
  const done    = tasks.filter(t => t.completed).length;
  const pending = total - done;
  const pct     = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="page-wrapper" style={{ paddingTop: 40 }}>
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <div className="tasks-layout">
        {/* Top Bar */}
        <div className="topbar">
          <div className="topbar-brand">
            <div>
              <div className="topbar-title">Task Manager</div>
            </div>
          </div>
          <button className="btn-logout" onClick={handleLogout}>
            <span>↩</span> Sign out
          </button>
        </div>

        {/* Stats */}
        <div className="stats-row">
          <div className="stat-card total">
            <div className="stat-value">{total}</div>
            <div className="stat-label">Total</div>
          </div>
          <div className="stat-card done">
            <div className="stat-value">{done}</div>
            <div className="stat-label">Completed</div>
          </div>
          <div className="stat-card pending">
            <div className="stat-value">{pending}</div>
            <div className="stat-label">Pending</div>
          </div>
        </div>

        {/* Progress */}
        <div className="progress-bar-wrap">
          <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
        </div>

        {/* Add Task */}
        <TaskForm onAdd={handleAdd} />

        {/* Task List */}
        <TaskList tasks={tasks} onDelete={handleDelete} onToggle={handleToggle} />
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={
          <ProtectedRoute>
            <TasksPage />
          </ProtectedRoute>
        }/>
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;