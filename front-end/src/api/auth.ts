const API_URL = "http://localhost:3001";

export interface AuthResponse {
  status: string;
  message: string;
  token?: string;
}

export const loginRequest = async (
  username: string,
  password: string,
): Promise<AuthResponse> => {
  const res = await fetch(`${API_URL}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
};

export const registerRequest = async (
  username: string,
  password: string,
  email: string,
  gender?: string,
): Promise<AuthResponse> => {
  const res = await fetch(`${API_URL}/user/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, email, gender }),
  });
  return res.json();
};

export const getTokenPayload = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return null;
    }
    return payload as { username: string; role: string };
  } catch {
    localStorage.removeItem("token");
    return null;
  }
};
