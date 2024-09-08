import Dashboard from "./components/Dashboard/Dashboard";
import Home, { loader as listJobs } from "./routes/home";
import ShareView, { loader as shareLoader } from "./routes/share";
import JobView, { loader as jobLoader } from "./routes/job";
import CreateView, { action as createJob } from "./routes/create";

export const MainRoutes = [
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <Home />,
        loader: listJobs,
      },
      {
        path: "create",
        element: <CreateView />,
        action: createJob,
      },
      {
        path: "job/:jobId",
        element: <JobView />,
        loader: jobLoader,
      },
      {
        path: "shared/:shareId",
        element: <ShareView />,
        loader: shareLoader,
      },
    ],
  },
];
