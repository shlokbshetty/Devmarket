/*
 * Assigned Member: Frontend Member 1 & 2
 * Required Functions: Basic React Router paths
 */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MobileHome from './pages/MobileHome';
import Login from './pages/Login';
import DevDashboard from './pages/DevDashboard';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MobileHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dev-dashboard" element={<DevDashboard />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
