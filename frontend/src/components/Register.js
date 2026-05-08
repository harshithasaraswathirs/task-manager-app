import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

function Register() {
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');
  const [error, setError]       = useState('');
  const [success, setSuccess]   = useState('');
  const [loading, setLoading]   = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    await new Promise(r => setTimeout(r, 500));

    if (password !== confirm) {
      setError('Passwords do not match!');
      setLoading(false);
      return;
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters.');
      setLoading(false);
      return;
    }

    setSuccess('Account created! Redirecting to login…');
    setTimeout(() => navigate('/login'), 2000);
    setLoading(false);
  };

  return (
    <div className="page-wrapper">
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <div className="auth-card">
        <h1 className="auth-title">Task Manager</h1>
        <p className="auth-subtitle">Get started — it's free</p>

        {error   && <div className="alert-custom alert-danger-custom"><span>⚠️</span> {error}</div>}
        {success && <div className="alert-custom alert-success-custom"><span>✅</span> {success}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="field-group">
            <label className="field-label">Full Name</label>
            <input type="text" className="field-input"
              placeholder="Jane Doe"
              value={name} onChange={e => setName(e.target.value)} required autoFocus />
          </div>

          <div className="field-group">
            <label className="field-label">Email address</label>
            <input type="email" className="field-input"
              placeholder="you@example.com"
              value={email} onChange={e => setEmail(e.target.value)} required />
          </div>

          <div className="field-group">
            <label className="field-label">Password</label>
            <input type="password" className="field-input"
              placeholder="Min. 4 characters"
              value={password} onChange={e => setPassword(e.target.value)} required />
          </div>

          <div className="field-group">
            <label className="field-label">Confirm Password</label>
            <input type="password" className="field-input"
              placeholder="Repeat password"
              value={confirm} onChange={e => setConfirm(e.target.value)} required />
          </div>

          <button
            type="submit"
            className="btn-success-custom"
            disabled={loading}
            style={{ opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Creating account…' : 'Create Account →'}
          </button>
        </form>

        <div className="divider">or</div>

        <p className="auth-footer">
          Already have an account?{' '}
          <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;