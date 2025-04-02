import { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct } from '../services/api';
import Link from 'next/link';
import Cookies from 'js-cookie';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');

  useEffect(() => {
    const t = Cookies.get('token');
    if (t) setToken(t);
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
      setProducts(products.filter((p) => p._id !== id));
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🛵 Product List</h1>
        <div>
          {!token ? (
            <>
              <Link href="/login">
                <button style={styles.button}>🔐 Login</button>
              </Link>{' '}
              <Link href="/register">
                <button style={styles.button}>📝 Register</button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/add">
                <button style={styles.addButton}>➕ Add Product</button>
              </Link>{' '}
              <button
                onClick={() => {
                  Cookies.remove('token');
                  location.reload();
                }}
                style={styles.logoutButton}
              >
                🚪 Logout
              </button>
            </>
          )}
        </div>
      </div>

      {loading ? (
        <p style={{ marginTop: '2rem' }}>Loading...</p>
      ) : products.length > 0 ? (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead style={styles.thead}>
              <tr>
                <th style={styles.cell}>Name</th>
                <th style={styles.cell}>Price</th>
                <th style={styles.cell}>Description</th>
                <th style={styles.cell}>Category</th>
                {token && <th style={styles.cell}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {products.map((p, index) => (
                <tr
                  key={p._id}
                  style={{
                    backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9',
                    transition: 'background 0.2s ease',
                  }}
                >
                  <td style={styles.cell}>{p.name}</td>
                  <td style={styles.cell}>${p.price}</td>
                  <td style={styles.cell}>{p.description || '-'}</td>
                  <td style={styles.cell}>{p.category || '-'}</td>
                  {token && (
                    <td style={styles.cell}>
                      <Link href={`/edit/${p._id}`}>
                        <button style={styles.editBtn}>✏️ Edit</button>
                      </Link>{' '}
                      <button
                        onClick={() => handleDelete(p._id)}
                        style={styles.deleteBtn}
                      >
                        🚮 Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2rem',
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    padding: '0.5rem 1rem',
    marginRight: '0.5rem',
    border: '1px solid #888',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: 'white',
    transition: 'background 0.3s ease, color 0.3s ease',
  },
  addButton: {
    padding: '0.5rem 1rem',
    background: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  logoutButton: {
    padding: '0.5rem 1rem',
    background: '#ff6961',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    marginLeft: '0.5rem',
    cursor: 'pointer',
  },
  editBtn: {
    backgroundColor: '#ffd966',
    border: 'none',
    borderRadius: '5px',
    padding: '0.4rem 0.8rem',
    cursor: 'pointer',
  },
  deleteBtn: {
    backgroundColor: '#ff4d4d',
    border: 'none',
    borderRadius: '5px',
    padding: '0.4rem 0.8rem',
    marginLeft: '0.5rem',
    color: '#fff',
    cursor: 'pointer',
  },
  tableWrapper: {
    overflowX: 'auto',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    background: '#fff',
    fontSize: '1rem',
  },
  thead: {
    backgroundColor: '#f3f3f3',
  },
  cell: {
    padding: '1rem',
    textAlign: 'left',
    borderBottom: '1px solid #eee',
  },
};
