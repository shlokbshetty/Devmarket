// Test setup file for Vitest
import { vi } from 'vitest'
import '@testing-library/jest-dom'

// Mock environment variables for testing
vi.stubEnv('VITE_FIREBASE_API_KEY', 'mock-key')

// Mock Firebase auth functions
vi.mock('../config/firebase', () => ({
  auth: {},
  googleProvider: {}
}))

// Mock API client
vi.mock('../api/client.js', () => ({
  apiGet: vi.fn(),
  apiPost: vi.fn(),
  apiPut: vi.fn(),
  apiUpload: vi.fn()
}))

// Mock Firebase auth functions
vi.mock('firebase/auth', () => ({
  signInWithPopup: vi.fn(),
  signInWithRedirect: vi.fn(),
  getRedirectResult: vi.fn(),
  signOut: vi.fn()
}))