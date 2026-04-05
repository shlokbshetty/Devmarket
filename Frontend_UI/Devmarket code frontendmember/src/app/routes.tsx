import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage";
import AppDetailsPage from "./pages/AppDetailsPage";
import SearchPage from "./pages/SearchPage";
import LibraryPage from "./pages/LibraryPage";
import DownloadsPage from "./pages/DownloadsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/app/:id",
    Component: AppDetailsPage,
  },
  {
    path: "/search",
    Component: SearchPage,
  },
  {
    path: "/library",
    Component: LibraryPage,
  },
  {
    path: "/downloads",
    Component: DownloadsPage,
  },
]);
