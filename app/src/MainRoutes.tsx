import Dashboard from "./components/Dashboard/Dashboard";
import { Home } from "./routes/home";

export const MainRoutes = [
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
];
