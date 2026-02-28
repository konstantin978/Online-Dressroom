import { type FormEvent, useState } from "react";
import { loginRequest, registerRequest } from "../../api/auth";
import useStyles from "./styles";

type Tab = "login" | "register";

interface AuthModalProps {
  onClose: () => void;
  onLoginSuccess: (token: string) => void;
}

const AuthModal = ({ onClose, onLoginSuccess }: AuthModalProps) => {
  const classes = useStyles();
  const [tab, setTab] = useState<Tab>("login");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setEmail("");
    setGender("");
    setError("");
    setSuccess("");
  };

  const switchTab = (newTab: Tab) => {
    resetForm();
    setTab(newTab);
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginRequest(username, password);
      if (data.status === "Success" && data.token) {
        localStorage.setItem("token", data.token);
        onLoginSuccess(data.token);
      } else {
        setError(data.message);
      }
    } catch {
      setError("Server is unavailable. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const data = await registerRequest(username, password, email, gender || undefined);
      if (data.status === "Success") {
        setSuccess("Account created! You can now sign in.");
        setTimeout(() => switchTab("login"), 1500);
      } else {
        setError(data.message);
      }
    } catch {
      setError("Server is unavailable. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.overlay} onClick={onClose}>
      <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
        <div className={classes.header}>
          <h2 className={classes.title}>
            {tab === "login" ? "Welcome Back" : "Create Account"}
          </h2>
          <button className={classes.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={classes.tabs}>
          <button
            className={`${classes.tab} ${tab === "login" ? classes.tabActive : ""}`}
            onClick={() => switchTab("login")}
          >
            Sign In
          </button>
          <button
            className={`${classes.tab} ${tab === "register" ? classes.tabActive : ""}`}
            onClick={() => switchTab("register")}
          >
            Sign Up
          </button>
        </div>

        <div className={classes.body}>
          {error && <div className={classes.error}>{error}</div>}
          {success && <div className={classes.success}>{success}</div>}

          {tab === "login" ? (
            <form className={classes.form} onSubmit={handleLogin}>
              <div className={classes.inputGroup}>
                <label className={classes.label}>Username</label>
                <input
                  className={classes.input}
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className={classes.inputGroup}>
                <label className={classes.label}>Password</label>
                <input
                  className={classes.input}
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                className={classes.submitButton}
                type="submit"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          ) : (
            <form className={classes.form} onSubmit={handleRegister}>
              <div className={classes.inputGroup}>
                <label className={classes.label}>Username</label>
                <input
                  className={classes.input}
                  type="text"
                  placeholder="3-30 characters"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  minLength={3}
                  maxLength={30}
                />
              </div>
              <div className={classes.inputGroup}>
                <label className={classes.label}>Email</label>
                <input
                  className={classes.input}
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={classes.inputGroup}>
                <label className={classes.label}>Password</label>
                <input
                  className={classes.input}
                  type="password"
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
              <div className={classes.inputGroup}>
                <label className={classes.label}>Gender (optional)</label>
                <select
                  className={classes.select}
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Prefer not to say</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <button
                className={classes.submitButton}
                type="submit"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Sign Up"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
