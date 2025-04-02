import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export default function EditProductPage() {
  const router = useRouter();
  const { id } = router.query;

  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    const token = Cookies.get('token');

    fetch(`http://localhost:8000/api/products/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Invalid token or failed to fetch');
        return res.json();
      })
      .then((data) => {
        setForm({
          name: data.name || '',
          price: data.price || '',
          category: data.category || '',
          description: data.description || '',
        });
        setLoading(false);
      })
      .catch(() => {
        setError('Invalid token');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('token');

    const res = await fetch(`http://localhost:8000/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push('/');
    } else {
      const data = await res.json();
      setError(data.detail || 'Update failed');
    }
  };

  if (loading) return <p style={styles.loading}>Loading product...</p>;
  if (error) return <p style={styles.error}>{error}</p>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>✏️ Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Category</label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Price</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              style={styles.textarea}
            ></textarea>
          </div>
          <button type="submit" style={styles.button}>
            💾 Update Product
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
    padding: '2rem',
  },
  card: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '500px',
  },
  heading: {
    fontSize: '1.8rem',
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: '1.2rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  textarea: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '1rem',
    transition: 'background 0.3s ease',
  },
  error: {
    color: '#d8000c',
    backgroundColor: '#ffe0e0',
    padding: '1rem',
    borderRadius: '6px',
    textAlign: 'center',
    maxWidth: '500px',
    margin: '2rem auto',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.2rem',
    marginTop: '3rem',
  },
};
