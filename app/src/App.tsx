import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { MainRoutes } from "./MainRoutes";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider, AuthProviderProps, useAuth } from "react-oidc-context";
import Loading from "./components/Loading";
import { User, WebStorageStateStore } from "oidc-client-ts";
import UserProvider from "./UserProvider";
import LoginPage from "./components/LoginPage";

const onSigninCallback = (_user: User | void): void => {
  window.history.replaceState({}, document.title, window.location.pathname);
};

const onSignoutCallback = (): void => {
  // go to home after logout
  window.location.pathname = "";
};

const oidcConfig = {
  authority: "https://discord.com",
  client_id: "1282098818669613139",
  redirect_uri: "http://localhost:5173",
  scope: "identify",
  metadata: {
    issuer: "https://discord.com",
    authorization_endpoint: "https://discord.com/oauth2/authorize",
    token_endpoint: "https://discord.com/api/oauth2/token",
    userinfo_endpoint: "https://discord.com/api/users/@me",
    revocation_endpoint: "https://discord.com/api/oauth2/token/revoke",
  },
} as AuthProviderProps;

function AuthApp() {
  const auth = useAuth();
  useEffect(() => {
    return auth.events.addAccessTokenExpiring(() => {
      auth.signinSilent();
    });
  }, [auth.events, auth.signinSilent]);

  if (auth.isLoading) {
    return <Loading />;
  }
  if (auth.error) {
    return <div>Oops... {auth.error.message}</div>;
  }
  if (auth.isAuthenticated) {
    return (
      <UserProvider>
        <RouterProvider router={createBrowserRouter(MainRoutes)} />
      </UserProvider>
    );
  }

  return <LoginPage />;
}

export default function App() {
  return (
    <AuthProvider
      {...oidcConfig}
      onSigninCallback={onSigninCallback}
      onSignoutCallback={onSignoutCallback}
      userStore={new WebStorageStateStore({ store: window.localStorage })}
    >
      <AuthApp />
    </AuthProvider>
  );
}
