import { useState } from "react";
import Page from "./components/Page";
import { getTokenPayload } from "./api/auth";

function App() {
  const [username, setUsername] = useState<string | null>(
    () => getTokenPayload()?.username ?? null,
  );

  const handleLogin = (token: string) => {
    const payload = JSON.parse(atob(token.split(".")[1]));
    setUsername(payload.username);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <Page
      username={username}
      onLoginSuccess={handleLogin}
      onLogout={handleLogout}
    />
  );
}

export default App;
