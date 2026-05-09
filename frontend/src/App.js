import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login    from './components/Login';
import Register from './components/Register';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import api      from './api';
import './App.css';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

function TasksPage() {
  const [tasks, setTasks]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  const userName = localStorage.getItem('userName') || 'there';

  // Load tasks from backend when the page mounts
  useEffect(() => {
    api.get('/tasks')
      .then(res => setTasks(res.data))
      .catch(() => setError('Failed to load tasks.'))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async (title) => {
    try {
      const res = await api.post('/tasks', { title });
      setTasks(prev => [...prev, res.data]); // add to local state instantly
    } catch {
      setError('Failed to add task.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch {
      setError('Failed to delete task.');
    }
  };

  const handleToggle = async (id) => {
    const task = tasks.find(t => t.id === id);
    try {
      const res = await api.put(`/tasks/${id}`, {
        title: task.title,
        completed: !task.completed,
      });
      setTasks(prev => prev.map(t => t.id === id ? res.data : t));
    } catch {
      setError('Failed to update task.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
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
        <div className="topbar">
          <div className="topbar-brand">
            <div>
              <div className="topbar-title">
                Hey, <span>{userName}</span> 👋
              </div>
            </div>
          </div>
          <button className="btn-logout" onClick={handleLogout}>
            <span>↩</span> Sign out
          </button>
        </div>

        {error && (
          <div className="alert-custom alert-danger-custom" style={{ marginBottom: 16 }}>
            <span>⚠️</span> {error}
          </div>
        )}

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

        <div className="progress-bar-wrap">
          <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
        </div>

        {loading ? (
          <p style={{ color: 'var(--text-2)', textAlign: 'center', padding: 40 }}>
            Loading tasks…
          </p>
        ) : (
          <>
            <TaskForm onAdd={handleAdd} />
            <TaskList tasks={tasks} onDelete={handleDelete} onToggle={handleToggle} />
          </>
        )}
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