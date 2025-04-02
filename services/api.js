import Cookies from 'js-cookie';

const BASE_URL = 'http://localhost:8000/api/products';

export const fetchProducts = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const createProduct = async (product) => {
  const token = Cookies.get('token');
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });
  return res.json();
};

export const deleteProduct = async (id) => {
  const token = Cookies.get('token');
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};
