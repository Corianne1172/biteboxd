import { useMemo, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import RecipeCollage from "../components/RecipeCollage";
import PasswordRules from "../components/Auth/PasswordRules";
import { FormField } from "../components/UI/FormField";
import FocusInput from "../components/UI/FocusInput";
import FocusButton from "../components/UI/FocusButton";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 420);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 420);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const rules = useMemo(() => {
    return {
      length: password.length >= 8,
      letter: /[A-Za-z]/.test(password),
      number: /\d/.test(password),
    };
  }, [password]);

  const passwordOk = rules.length && rules.letter && rules.number;

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    if (!passwordOk) {
      setErr("Password must be at least 8 characters and include a letter + a number.");
      return;
    }

    try {
      await register(username, email, password);
      nav("/login");
    } catch (e) {
      const msg =
        e?.response?.data?.error?.message ||
        e?.response?.data?.detail ||
        "Register failed.";
      setErr(typeof msg === "string" ? msg : "Register failed.");
    }
  };

  const containerStyles = {
    ...styles.formCard,
    maxWidth: isSmallScreen ? "100%" : 400,
    padding: isSmallScreen ? 24 : 32,
  };

  const formStyles = {
    ...styles.form,
    gap: isSmallScreen ? "var(--spacing-sm)" : "var(--spacing-md)",
  };

  return (
    <div style={styles.pageContainer}>
      {/* Background with RecipeCollage */}
      <div style={styles.backgroundLayer}>
        <RecipeCollage />
      </div>

      {/* Foreground content overlay */}
      <div style={styles.contentOverlay}>
        <div style={containerStyles}>
          {/* Brand + Welcome */}
          <div style={styles.brandRow}>
            <div style={styles.logoDot} />
            <div>
              <div style={styles.brand}>BiteBoxd</div>
              <div style={styles.tagline}>Rate recipes like movies. Track macros like a pro.</div>
            </div>
          </div>

          <div style={{ marginTop: 18 }}>
            <div style={styles.welcome}>Welcome 👋</div>
            <div style={styles.pitch}>
              Build your cookbook, share your hits, and see what's trending in the feed.
            </div>
          </div>

          {/* Error Display */}
          {err && <div style={styles.error}>{err}</div>}

          {/* Registration Form */}
          <form onSubmit={onSubmit} style={formStyles}>
            <FormField label="Username" style={styles.label}>
              <FocusInput
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="corianne1172"
                autoComplete="username"
                required
              />
            </FormField>

            <FormField label="Email" style={styles.label}>
              <FocusInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </FormField>

            <FormField label="Password" style={styles.label}>
              <FocusInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                type="password"
                autoComplete="new-password"
                required
              />
            </FormField>

            <PasswordRules rules={rules} />

            <FocusButton
              type="submit"
              variant="primary"
              disabled={!passwordOk}
              style={{ opacity: passwordOk ? 1 : 0.55 }}
            >
              Create account
            </FocusButton>
          </form>

          <div style={styles.footer}>
            Already have an account? <Link to="/login" style={styles.link}>Log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    position: "relative",
    minHeight: "100vh",
    width: "100%",
    overflow: "hidden",
  },
  backgroundLayer: {
    position: "fixed",
    inset: 0,
    zIndex: 0,
  },
  contentOverlay: {
    position: "relative",
    zIndex: 1,
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "var(--spacing-lg)",
  },
  formCard: {
    width: "100%",
    background: "rgba(27, 24, 19, 0.92)",
    border: "1px solid var(--color-line)",
    borderRadius: "var(--radius-lg)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
    backdropFilter: "blur(12px)",
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
    flexShrink: 0,
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
    marginTop: 16,
  },
  label: { 
    display: "grid", 
    gap: "var(--spacing-xs)", 
    fontSize: 13, 
    color: "var(--color-muted)",
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
