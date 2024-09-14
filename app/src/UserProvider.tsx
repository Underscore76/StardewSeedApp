import { useEffect, useState, createContext, useContext } from "react";
import { useAuth } from "react-oidc-context";
import Loading from "./components/Loading";
import { updateCookies } from "./api";

const UserContext = createContext<User | undefined>(undefined);

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useAuth();
  const [user, setUser] = useState<User | undefined>(undefined);
  useEffect(() => {
    if (auth.user) {
      const fetchData = async (token: string) => {
        // go get user details for ui
        const response = await fetch("https://discord.com/api/users/@me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        // ensure the session cookie is valid
        await updateCookies(token).then(() => {
          setUser({
            id: data.id,
            username: data.username,
            avatar: `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`,
          } as User);
        });
      };
      fetchData(auth.user.access_token);
    }
  }, [auth.user]);
  if (user === undefined) {
    return <Loading />;
  }
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
