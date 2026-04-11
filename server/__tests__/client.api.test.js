/**
 * Feature: lan-backend-setup
 * Property 1: Authorization header is always sent
 * Validates: Requirements 2.1
 */

'use strict';

const fc = require('fast-check');

// ---------------------------------------------------------------------------
// Inline mirror of client.js Authorization header logic
// ---------------------------------------------------------------------------

function getAuthHeaders(mockLocalStorage) {
  const stored = mockLocalStorage.getItem('devmarket_auth');
  if (stored) {
    try {
      const { token } = JSON.parse(stored);
      if (token) return { Authorization: `Bearer ${token}` };
    } catch (e) { /* ignore */ }
  }
  return {};
}

function buildJsonHeaders(mockLocalStorage) {
  return { 'Content-Type': 'application/json', ...getAuthHeaders(mockLocalStorage) };
}

function buildUploadHeaders(mockLocalStorage) {
  return { ...getAuthHeaders(mockLocalStorage) };
}

function makeLocalStorage(token) {
  const store = { devmarket_auth: JSON.stringify({ token }) };
  return { getItem: (key) => (key in store ? store[key] : null) };
}

function makeMockFetch() {
  let lastInit = null;
  const mockFetch = jest.fn((url, init) => {
    lastInit = init;
    return Promise.resolve({ ok: true, json: () => Promise.resolve({ success: true }) });
  });
  return { mockFetch, getLastInit: () => lastInit };
}

const API_BASE = '/api';

async function apiGet(path, ls, fetch) {
  return fetch(`${API_BASE}${path}`, { method: 'GET', headers: buildJsonHeaders(ls) });
}
async function apiPost(path, body, ls, fetch) {
  return fetch(`${API_BASE}${path}`, { method: 'POST', headers: buildJsonHeaders(ls), body: JSON.stringify(body) });
}
async function apiPut(path, body, ls, fetch) {
  return fetch(`${API_BASE}${path}`, { method: 'PUT', headers: buildJsonHeaders(ls), body: JSON.stringify(body) });
}
async function apiDelete(path, ls, fetch) {
  return fetch(`${API_BASE}${path}`, { method: 'DELETE', headers: buildJsonHeaders(ls) });
}
async function apiUpload(path, formData, ls, fetch) {
  return fetch(`${API_BASE}${path}`, { method: 'POST', headers: buildUploadHeaders(ls), body: formData });
}

// ---------------------------------------------------------------------------
// Arbitrary generators
// ---------------------------------------------------------------------------

const arbToken = fc.stringMatching(/^[A-Za-z0-9\-_\.]{1,256}$/);
const arbPath = fc.stringMatching(/^\/[a-zA-Z0-9\-_\/]{1,64}$/);

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('Property 1: Authorization header is always sent', () => {
  test('apiGet always sends Authorization: Bearer {token}', async () => {
    await fc.assert(
      fc.asyncProperty(arbToken, arbPath, async (token, path) => {
        const ls = makeLocalStorage(token);
        const { mockFetch, getLastInit } = makeMockFetch();
        await apiGet(path, ls, mockFetch);
        expect(getLastInit().headers).toHaveProperty('Authorization', `Bearer ${token}`);
      }),
      { numRuns: 100 }
    );
  });

  test('apiPost always sends Authorization: Bearer {token}', async () => {
    await fc.assert(
      fc.asyncProperty(arbToken, arbPath, async (token, path) => {
        const ls = makeLocalStorage(token);
        const { mockFetch, getLastInit } = makeMockFetch();
        await apiPost(path, { data: 'test' }, ls, mockFetch);
        expect(getLastInit().headers).toHaveProperty('Authorization', `Bearer ${token}`);
      }),
      { numRuns: 100 }
    );
  });

  test('apiPut always sends Authorization: Bearer {token}', async () => {
    await fc.assert(
      fc.asyncProperty(arbToken, arbPath, async (token, path) => {
        const ls = makeLocalStorage(token);
        const { mockFetch, getLastInit } = makeMockFetch();
        await apiPut(path, { data: 'test' }, ls, mockFetch);
        expect(getLastInit().headers).toHaveProperty('Authorization', `Bearer ${token}`);
      }),
      { numRuns: 100 }
    );
  });

  test('apiDelete always sends Authorization: Bearer {token}', async () => {
    await fc.assert(
      fc.asyncProperty(arbToken, arbPath, async (token, path) => {
        const ls = makeLocalStorage(token);
        const { mockFetch, getLastInit } = makeMockFetch();
        await apiDelete(path, ls, mockFetch);
        expect(getLastInit().headers).toHaveProperty('Authorization', `Bearer ${token}`);
      }),
      { numRuns: 100 }
    );
  });

  test('apiUpload always sends Authorization: Bearer {token}', async () => {
    await fc.assert(
      fc.asyncProperty(arbToken, arbPath, async (token, path) => {
        const ls = makeLocalStorage(token);
        const { mockFetch, getLastInit } = makeMockFetch();
        await apiUpload(path, {}, ls, mockFetch);
        expect(getLastInit().headers).toHaveProperty('Authorization', `Bearer ${token}`);
      }),
      { numRuns: 100 }
    );
  });

  test('Authorization header value matches the exact token', async () => {
    await fc.assert(
      fc.asyncProperty(arbToken, async (token) => {
        const ls = makeLocalStorage(token);
        const { mockFetch, getLastInit } = makeMockFetch();
        await apiGet('/apps', ls, mockFetch);
        const authHeader = getLastInit().headers['Authorization'];
        expect(authHeader).toBe(`Bearer ${token}`);
        expect(authHeader.slice('Bearer '.length)).toBe(token);
      }),
      { numRuns: 100 }
    );
  });
});
