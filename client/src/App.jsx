import { createBrowserRouter, RouterProvider } from 'react-router';
import { ThemeProvider } from 'next-themes';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext.jsx';
import { Layout } from './components/Layout.jsx';
import { Login } from './pages/Login.jsx';
import HomePage from './pages/HomePage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import AppDetailsPage from './pages/AppDetailsPage.jsx';
import SharePage from './pages/SharePage.jsx';
import DownloadsPage from './pages/DownloadsPage.jsx';
import LibraryPage from './pages/LibraryPage.jsx';
import { DevDashboard } from './pages/DevDashboard.jsx';
import { AdminPanel } from './pages/AdminPanel.jsx';
import { Profile } from './pages/Profile.jsx';
import { Settings } from './pages/Settings.jsx';
import { Security } from './pages/Security.jsx';
import { Notifications } from './pages/Notifications.jsx';
import { Privacy } from './pages/Privacy.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: 'search', Component: SearchPage },
      { path: 'app/:id', Component: AppDetailsPage },
      { path: 'app/:id/share', Component: SharePage },
      { path: 'downloads', Component: DownloadsPage },
      { path: 'library', Component: LibraryPage },
      { path: 'dev', Component: DevDashboard },
      { path: 'admin', Component: AdminPanel },
      { path: 'profile', Component: Profile },
      { path: 'settings', Component: Settings },
      { path: 'settings/security', Component: Security },
      { path: 'settings/notifications', Component: Notifications },
      { path: 'settings/privacy', Component: Privacy },
    ],
  },
  { path: '/login', Component: Login },
]);

export default function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || "placeholder_client_id"}>
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
