const API_BASE = '/api';

function getAuthHeaders() {
  const stored = localStorage.getItem('devmarket_auth');
  if (stored) {
    try {
      const { token } = JSON.parse(stored);
      if (token) return { Authorization: `Bearer ${token}` };
    } catch (e) { /* ignore */ }
  }
  return {};
}

async function request(method, path, body = null) {
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeaders(),
  };
  const config = { method, headers };
  if (body) config.body = JSON.stringify(body);

  const res = await fetch(`${API_BASE}${path}`, config);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
}

export const apiGet = (path) => request('GET', path);
export const apiPost = (path, body) => request('POST', path, body);
export const apiPut = (path, body) => request('PUT', path, body);
export const apiDelete = (path) => request('DELETE', path);
