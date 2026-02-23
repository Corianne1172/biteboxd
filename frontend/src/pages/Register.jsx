import { useMemo, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PasswordRules from "../components/Auth/PasswordRules";
import { FormField } from "../components/UI/FormField";
import FocusInput from "../components/UI/FocusInput";
import FocusButton from "../components/UI/FocusButton";

export default function Register() {
  const { register, login } = useAuth();
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

  // Email validation: must contain @ and a dot after @
  const isValidEmail = (email) => {
    const atIndex = email.indexOf("@");
    if (atIndex === -1) return false;
    const afterAt = email.slice(atIndex + 1);
    return afterAt.includes(".");
  };

  const rules = useMemo(() => {
    return {
      length: password.length >= 8,
      letter: /[A-Za-z]/.test(password),
      number: /\d/.test(password),
    };
  }, [password]);

  const passwordOk = rules.length && rules.letter && rules.number;
  
  // Form is valid if all fields are filled, email is valid, and password passes rules
  const isFormValid = username.trim() && email.trim() && isValidEmail(email) && passwordOk;

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    if (!username.trim() || !email.trim()) {
      setErr("Please fill in all fields.");
      return;
    }

    if (!isValidEmail(email)) {
      setErr("Please enter a valid email address.");
      return;
    }

    if (!passwordOk) {
      setErr("Password must be at least 8 characters and include a letter + a number.");
      return;
    }

    try {
      // Register the user
      await register(username, email, password);
      
      // Auto-login after successful registration
      await login(email, password);
      
      // Redirect to create first recipe
      nav("/recipes/new");
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
    maxWidth: isSmallScreen ? "100%" : 460,
    padding: isSmallScreen ? 32 : 40,
  };

  const formStyles = {
    ...styles.form,
    gap: isSmallScreen ? 12 : 16,
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentWrapper}>
        <div style={containerStyles}>
          {/* Brand + Logo */}
          <div style={styles.brandRow}>
            <div style={styles.logo} />
            <div>
              <div style={styles.brand}>BiteBoxd</div>
              <div style={styles.tagline}>Rate recipes like movies. Track macros like a pro.</div>
            </div>
          </div>

          <div style={{ marginTop: 24 }}>
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
                style={styles.input}
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
                style={styles.input}
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
                style={styles.input}
              />
            </FormField>

            <PasswordRules rules={rules} />

            <FocusButton
              type="submit"
              variant="primary"
              disabled={!isFormValid}
              style={{ 
                ...styles.submitButton,
                opacity: isFormValid ? 1 : 0.5,
                cursor: isFormValid ? "pointer" : "not-allowed",
              }}
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
    width: "100vw",
    minHeight: "100vh",
    background: "linear-gradient(180deg, #E4DEBE 0%, #E6BAA3 40%, #D24545 80%, #A94438 100%)",
    margin: 0,
    overflowX: "hidden",
  },
  contentWrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  formCard: {
    width: "100%",
    background: "rgba(255, 255, 255, 0.95)",
    borderRadius: 20,
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.25)",
    border: "1px solid rgba(230, 186, 163, 0.3)",
  },
  brandRow: {
    display: "flex",
    gap: 16,
    alignItems: "center",
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 14,
    background: "linear-gradient(135deg, #D24545 0%, #A94438 100%)",
    flexShrink: 0,
  },
  brand: { 
    fontSize: 22, 
    fontWeight: 900, 
    letterSpacing: -0.5,
    color: "#A94438",
  },
  tagline: { 
    fontSize: 13, 
    color: "#A94438", 
    opacity: 0.7,
    marginTop: 2,
  },
  welcome: { 
    fontSize: 26, 
    fontWeight: 900, 
    marginBottom: 8,
    color: "#A94438",
  },
  pitch: { 
    color: "#A94438", 
    opacity: 0.8,
    fontSize: 15, 
    lineHeight: 1.5,
  },
  error: {
    marginTop: 20,
    padding: "12px 16px",
    borderRadius: 10,
    background: "rgba(210, 69, 69, 0.1)",
    border: "1px solid rgba(210, 69, 69, 0.3)",
    color: "#D24545",
    fontSize: 14,
  },
  form: { 
    display: "grid", 
    marginTop: 24,
  },
  label: { 
    display: "grid", 
    gap: 6, 
    fontSize: 14, 
    fontWeight: 600,
    color: "#A94438",
  },
  input: {
    background: "#F5F5F5",
    border: "1px solid #E0E0E0",
    color: "#333333",
    fontSize: 15,
  },
  submitButton: {
    fontSize: 16,
    fontWeight: 700,
    padding: "14px 24px",
    background: "linear-gradient(135deg, #D24545 0%, #A94438 100%)",
    color: "white",
    marginTop: 8,
  },
  footer: { 
    marginTop: 20, 
    fontSize: 14, 
    color: "#A94438",
    opacity: 0.8,
    textAlign: "center",
  },
  link: { 
    color: "#D24545", 
    fontWeight: 700, 
    textDecoration: "underline",
  },
};
