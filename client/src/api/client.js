const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

console.log('🌐 API Client initialized with base URL:', API_BASE);

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
  const url = `${API_BASE}${path}`;
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeaders(),
  };
  const config = { method, headers };
  if (body) config.body = JSON.stringify(body);

  console.log(`🔄 API Request: ${method} ${url}`);
  console.log('📋 Headers:', headers);
  if (body) console.log('📦 Body:', body);

  try {
    const res = await fetch(url, config);
    console.log(`📡 Response status: ${res.status}`);
    
    const data = await res.json();
    console.log('📥 Response data:', data);

    if (!res.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    return data;
  } catch (error) {
    console.error('❌ API Request failed:', error);
    throw error;
  }
}

export const apiGet = (path) => request('GET', path);
export const apiPost = (path, body) => request('POST', path, body);
export const apiPut = (path, body) => request('PUT', path, body);
export const apiDelete = (path) => request('DELETE', path);

export const apiUpload = async (path, formData) => {
  const headers = { ...getAuthHeaders() };
  const res = await fetch(`${API_BASE}${path}`, { method: 'POST', headers, body: formData });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Something went wrong');
  return data;
};
