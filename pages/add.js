import { useState } from 'react';
import { useRouter } from 'next/router';
import { createProduct } from '../services/api';

export default function AddProduct() {
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createProduct(form);
      router.push('/');
    } catch (err) {
      setError('❌ Failed to create product.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>➕ Add New Product</h2>

      {error && <p style={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
          value={form.name}
          required
          style={styles.input}
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          onChange={handleChange}
          value={form.price}
          required
          style={styles.input}
        />
        <input
          name="description"
          placeholder="Description"
          onChange={handleChange}
          value={form.description}
          style={styles.input}
        />
        <input
          name="category"
          placeholder="Category"
          onChange={handleChange}
          value={form.category}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>📦 Create Product</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '500px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '1.8rem',
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  button: {
    background: '#0070f3',
    color: 'white',
    border: 'none',
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '1rem',
  },
  error: {
    color: 'red',
    marginBottom: '1rem',
  },
};
