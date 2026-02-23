import { useState } from "react";
import AuthShell from "./AuthShell";
import RecipeCollage from "./RecipeCollage";

/**
 * Complete example showing AuthShell + RecipeCollage together
 * This is the recommended pattern for authentication pages
 */

export function LoginPageWithCollage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", { email, password });
  };

  return (
    <AuthShell
      left={
        <div style={{ width: "100%", maxWidth: 400 }}>
          <div style={{ marginBottom: 32, textAlign: "center" }}>
            <div style={styles.logo} />
            <h1 style={styles.title}>Welcome back</h1>
            <p style={styles.subtitle}>Sign in to continue to BiteBoxd</p>
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            <label style={styles.label}>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={styles.input}
                required
              />
            </label>

            <label style={styles.label}>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={styles.input}
                required
              />
            </label>

            <button type="submit" style={styles.button}>
              Sign In
            </button>
          </form>

          <p style={styles.footer}>
            Don't have an account?{" "}
            <a href="/register" style={styles.link}>
              Sign up
            </a>
          </p>
        </div>
      }
      right={<RecipeCollage />}
    />
  );
}

export function RegisterPageWithCollage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register:", formData);
  };

  return (
    <AuthShell
      left={
        <div style={{ width: "100%", maxWidth: 400 }}>
          <div style={{ marginBottom: 32, textAlign: "center" }}>
            <div style={styles.logo} />
            <h1 style={styles.title}>Create your account</h1>
            <p style={styles.subtitle}>Join BiteBoxd and start tracking recipes</p>
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            <label style={styles.label}>
              Username
              <input
                type="text"
                value={formData.username}
                onChange={handleChange("username")}
                placeholder="corianne1172"
                style={styles.input}
                required
              />
            </label>

            <label style={styles.label}>
              Email
              <input
                type="email"
                value={formData.email}
                onChange={handleChange("email")}
                placeholder="you@example.com"
                style={styles.input}
                required
              />
            </label>

            <label style={styles.label}>
              Password
              <input
                type="password"
                value={formData.password}
                onChange={handleChange("password")}
                placeholder="At least 8 characters"
                style={styles.input}
                required
              />
            </label>

            <button type="submit" style={styles.button}>
              Create Account
            </button>
          </form>

          <p style={styles.footer}>
            Already have an account?{" "}
            <a href="/login" style={styles.link}>
              Sign in
            </a>
          </p>
        </div>
      }
      right={<RecipeCollage />}
    />
  );
}

const styles = {
  logo: {
    width: 48,
    height: 48,
    margin: "0 auto 16px",
    borderRadius: 12,
    background: "linear-gradient(135deg, var(--olive), var(--orange))",
    boxShadow: "0 0 0 4px var(--border)",
  },
  title: {
    fontSize: 28,
    fontWeight: 800,
    margin: 0,
    marginBottom: 8,
    color: "var(--cream)",
  },
  subtitle: {
    fontSize: 14,
    color: "var(--muted)",
    margin: 0,
  },
  form: {
    display: "grid",
    gap: 16,
  },
  label: {
    display: "grid",
    gap: 6,
    fontSize: 13,
    fontWeight: 500,
    color: "var(--cream)",
  },
  input: {
    padding: "12px 14px",
    borderRadius: 10,
    border: "1px solid var(--border)",
    background: "rgba(20,18,15,0.5)",
    color: "var(--cream)",
    fontSize: 14,
    outline: "none",
  },
  button: {
    marginTop: 8,
    padding: "12px 16px",
    borderRadius: 10,
    border: "none",
    background: "linear-gradient(135deg, var(--cream), var(--orange))",
    color: "#1a130a",
    fontSize: 15,
    fontWeight: 800,
    cursor: "pointer",
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 14,
    color: "var(--muted)",
  },
  link: {
    color: "var(--cream)",
    fontWeight: 700,
    textDecoration: "none",
  },
};
