import { useUser } from "../UserProvider";

export function Home() {
  const user = useUser();

  return (
    <>
      <h1>Hello {user.username}</h1>
    </>
  );
}
