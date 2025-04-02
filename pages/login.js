import { useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export default function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const res = await fetch('http://localhost:8000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      Cookies.set('token', data.access_token, { expires: 1 });
      router.push('/');
    } else {
      setError(data.detail || 'Login failed');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🔐 Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label>Username</label>
            <input
              name="username"
              placeholder="Enter your username"
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>
            🔓 Login
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6f8fa',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    marginBottom: '1.5rem',
    fontSize: '1.5rem',
    textAlign: 'center',
  },
  error: {
    backgroundColor: '#ffe0e0',
    color: '#d8000c',
    padding: '0.75rem',
    marginBottom: '1rem',
    borderRadius: '6px',
    fontSize: '0.9rem',
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: '1.2rem',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    marginTop: '0.25rem',
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background 0.3s ease',
  },
};
