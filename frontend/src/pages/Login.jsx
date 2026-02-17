import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthShell from "../components/AuthShell";
import RecipeCollage from "../components/RecipeCollage";
import { FormField } from "../components/UI/FormField";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await login(email, password);
      nav("/recipes");
    } catch (e) {
      const msg =
        e?.response?.data?.error?.message ||
        e?.response?.data?.detail ||
        "Login failed. Check your credentials.";
      setErr(typeof msg === "string" ? msg : "Login failed. Check your credentials.");
    }
  };

  return (
    <AuthShell
      left={
        <div style={styles.formContainer}>
          {/* Brand + Welcome */}
          <div style={styles.brandRow}>
            <div style={styles.logoDot} />
            <div>
              <div style={styles.brand}>BiteBoxd</div>
              <div style={styles.tagline}>Rate recipes like movies. Track macros like a pro.</div>
            </div>
          </div>

          <div style={{ marginTop: 18 }}>
            <div style={styles.welcome}>Welcome back 👋</div>
            <div style={styles.pitch}>
              Sign in to access your recipes and continue tracking your favorites.
            </div>
          </div>

          {/* Error Display */}
          {err && <div style={styles.error}>{err}</div>}

          {/* Login Form */}
          <form onSubmit={onSubmit} style={styles.form}>
            <FormField label="Email" style={styles.label}>
              <input
                style={styles.input}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </FormField>

            <FormField label="Password" style={styles.label}>
              <input
                style={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                type="password"
                autoComplete="current-password"
                required
              />
            </FormField>

            <button type="submit" style={styles.button}>
              Sign In
            </button>
          </form>

          <div style={styles.footer}>
            Don't have an account? <Link to="/register" style={styles.link}>Sign up</Link>
          </div>
        </div>
      }
      right={<RecipeCollage />}
    />
  );
}

const styles = {
  formContainer: {
    width: "100%",
    maxWidth: 400,
  },
  brandRow: {
    display: "flex",
    gap: "var(--spacing-md)",
    alignItems: "center",
  },
  logoDot: {
    width: 14,
    height: 14,
    borderRadius: 6,
    background: "linear-gradient(135deg, var(--color-olive), var(--color-orange))",
    boxShadow: "0 0 0 3px var(--color-line)",
  },
  brand: { 
    fontSize: 18, 
    fontWeight: 800, 
    letterSpacing: 0.2,
    color: "var(--color-cream)",
  },
  tagline: { 
    fontSize: 13, 
    color: "var(--color-muted)", 
    marginTop: 2,
  },
  welcome: { 
    fontSize: 22, 
    fontWeight: 800, 
    marginBottom: "var(--spacing-xs)",
    color: "var(--color-cream)",
  },
  pitch: { 
    color: "var(--color-muted)", 
    fontSize: 14, 
    lineHeight: 1.4,
  },
  error: {
    marginTop: 14,
    padding: "var(--spacing-sm) var(--spacing-md)",
    borderRadius: "var(--radius-md)",
    background: "var(--color-error-bg)",
    border: "1px solid var(--color-error-border)",
    color: "var(--color-error-text)",
    fontSize: 14,
  },
  form: { 
    display: "grid", 
    gap: "var(--spacing-md)", 
    marginTop: 16,
  },
  label: { 
    display: "grid", 
    gap: "var(--spacing-xs)", 
    fontSize: 13, 
    color: "var(--color-muted)",
  },
  input: {
    padding: "11px 12px",
    borderRadius: "var(--radius-md)",
    border: "1px solid var(--color-line)",
    background: "rgba(20,18,15,0.65)",
    color: "var(--color-cream)",
    outline: "none",
    fontSize: 14,
  },
  button: {
    marginTop: 4,
    padding: "12px 14px",
    borderRadius: "var(--radius-md)",
    border: "none",
    color: "#1a130a",
    fontWeight: 800,
    cursor: "pointer",
    background: "linear-gradient(135deg, var(--color-cream), var(--color-orange))",
    transition: "opacity 0.2s",
  },
  footer: { 
    marginTop: 14, 
    fontSize: 14, 
    color: "var(--color-muted)",
  },
  link: { 
    color: "var(--color-cream)", 
    fontWeight: 800, 
    textDecoration: "none",
  },
};
