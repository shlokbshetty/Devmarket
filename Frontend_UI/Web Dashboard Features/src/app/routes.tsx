import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { DevDashboard } from "./pages/DevDashboard";
import { AdminPanel } from "./pages/AdminPanel";
import { Profile } from "./pages/Profile";
import { Login } from "./pages/Login";
import { Settings } from "./pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "dev", Component: DevDashboard },
      { path: "admin", Component: AdminPanel },
      { path: "profile", Component: Profile },
      { path: "settings", Component: Settings },
    ],
  },
  {
    path: "/login",
    Component: Login,
  }
]);
