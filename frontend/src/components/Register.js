import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');
  const [error, setError]       = useState('');
  const [success, setSuccess]   = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirm) {
      setError('Passwords do not match!');
      return;
    }

    if (password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }

    setError('');
    setSuccess('Account created! Redirecting to login...');
    setTimeout(() => navigate('/login'), 2000);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow">
            <div className="card-body p-4">

              <h2 className="text-center mb-4">📝 Register</h2>

              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-control"
                    placeholder="Enter your name" value={name}
                    onChange={(e) => setName(e.target.value)} required />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input type="email" className="form-control"
                    placeholder="Enter email" value={email}
                    onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control"
                    placeholder="Create password" value={password}
                    onChange={(e) => setPassword(e.target.value)} required />
                </div>

                <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input type="password" className="form-control"
                    placeholder="Repeat password" value={confirm}
                    onChange={(e) => setConfirm(e.target.value)} required />
                </div>

                <button type="submit" className="btn btn-success w-100">
                  Create Account
                </button>
              </form>

              <p className="text-center mt-3">
                Already have an account?{' '}
                <Link to="/login">Login here</Link>
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;