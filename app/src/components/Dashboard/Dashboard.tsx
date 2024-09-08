import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "react-oidc-context";
import { useState } from "react";

export default function Dashboard() {
  const auth = useAuth();
  const [pageName, setPageName] = useState("Dashboard");
  return (
    <div className="max-h-screen">
      <Navbar />
      <div className="h-[calc(100vh-64px)] overflow-y-auto py-4">
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
              {pageName}
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <Outlet context={setPageName} />
          </div>
        </main>
      </div>
    </div>
  );
}
