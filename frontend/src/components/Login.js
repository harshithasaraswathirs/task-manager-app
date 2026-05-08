import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate async check
    await new Promise(r => setTimeout(r, 600));

    if (email === 'test@test.com' && password === '1234') {
      localStorage.setItem('loggedIn', 'true');
      navigate('/tasks');
    } else {
      setError('Invalid email or password. Try test@test.com / 1234');
    }
    setLoading(false);
  };

  return (
    <div className="page-wrapper">
      {/* Ambient orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <div className="auth-card">
        <h1 className="auth-title">Task Manager</h1>
        <p className="auth-subtitle">Sign in to manage your tasks</p>

        {error && (
          <div className="alert-custom alert-danger-custom">
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="field-group">
            <label className="field-label">Email address</label>
            <input
              type="email"
              className="field-input"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="field-group">
            <label className="field-label">Password</label>
            <input
              type="password"
              className="field-input"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary-custom"
            disabled={loading}
            style={{ opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Signing in…' : 'Sign In →'}
          </button>
        </form>

        <div className="divider">or</div>

        <p className="auth-footer">
          Don't have an account?{' '}
          <Link to="/register">Create one free</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;