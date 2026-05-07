import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login    from './components/Login';
import Register from './components/Register';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem('loggedIn');
  return isLoggedIn ? children : <Navigate to="/login" />;
}

function TasksPage() {
  const [tasks, setTasks] = React.useState([
    { id: 1, title: 'Learn React',        completed: false },
    { id: 2, title: 'Build Task Manager', completed: false },
  ]);

  const handleAdd = (title) => {
    setTasks([...tasks, { id: Date.now(), title, completed: false }]);
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleToggle = (id) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    window.location.href = '/login';
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">

          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>📝 Task Manager</h1>
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>

          <TaskForm onAdd={handleAdd} />

          <div className="mb-3">
            <span className="badge bg-primary me-2">Total: {tasks.length}</span>
            <span className="badge bg-success">
              Done: {tasks.filter(t => t.completed).length}
            </span>
          </div>

          <TaskList tasks={tasks} onDelete={handleDelete} onToggle={handleToggle} />

        </div>
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