import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "react-oidc-context";

export default function Dashboard() {
  const auth = useAuth();
  return (
    <div className="min-h-full">
      <Navbar />
      <main>
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
