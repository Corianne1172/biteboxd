import { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import BgRecipeCard from "../components/Auth/BgRecipeCard";
import PasswordRules from "../components/Auth/PasswordRules";
import { FormField, Input } from "../components/UI/FormField";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

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

  return (
    <div style={styles.page}>
      {/* Background collage */}
      <div style={styles.bg}>
        <div style={styles.bgGlow1} />
        <div style={styles.bgGlow2} />
        <div style={styles.bgGrid} />

        <BgRecipeCard
          style={{ top: 60, left: 70, transform: "rotate(-6deg)" }}
          title="Honey Harissa Chicken Bowl"
          meta="25 min • High Protein"
          pills={["Spicy", "Dinner", "Meal Prep"]}
          rating="4.5★"
          macros="520 kcal • 42g protein"
        />
        <BgRecipeCard
          style={{ top: 220, right: 110, transform: "rotate(7deg)" }}
          title="Creamy Pesto Pasta"
          meta="18 min • Comfort"
          pills={["Vegetarian", "Quick", "Italian"]}
          rating="4.2★"
          macros="610 kcal • 18g protein"
        />
        <BgRecipeCard
          style={{ bottom: 90, left: 140, transform: "rotate(4deg)" }}
          title="Crispy Salmon Tacos"
          meta="30 min • Fresh"
          pills={["Seafood", "Citrus", "Street Food"]}
          rating="4.7★"
          macros="480 kcal • 35g protein"
        />

        <div style={styles.bgFade} />
      </div>

      {/* Foreground auth card */}
      <div style={styles.card}>
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

        {err && <div style={styles.error}>{err}</div>}

        <form onSubmit={onSubmit} style={styles.form}>
          <FormField label="Username" style={styles.label}>
            <input
              style={styles.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="corianne1172"
              autoComplete="username"
            />
          </FormField>

          <FormField label="Email" style={styles.label}>
            <input
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </FormField>

          <FormField label="Password" style={styles.label}>
            <input
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              type="password"
              autoComplete="new-password"
            />
          </FormField>

          <PasswordRules rules={rules} />

          <button style={{ ...styles.button, opacity: passwordOk ? 1 : 0.55 }} disabled={!passwordOk}>
            Create account
          </button>
        </form>

        <div style={styles.footer}>
          Already have an account? <Link to="/login" style={styles.link}>Log in</Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    position: "relative",
    overflow: "hidden",
    background: "var(--color-ink)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "var(--spacing-lg)",
    color: "var(--color-cream)",
  },
  bg: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
  },
  bgGlow1: {
    position: "absolute",
    width: 560,
    height: 560,
    left: -160,
    top: -180,
    borderRadius: "50%",
    background: "radial-gradient(circle, var(--color-orange) 0%, transparent 60%)",
    filter: "blur(6px)",
    opacity: 0.35,
  },
  bgGlow2: {
    position: "absolute",
    width: 620,
    height: 620,
    right: -220,
    bottom: -240,
    borderRadius: "50%",
    background: "radial-gradient(circle, var(--color-deep-red) 0%, transparent 60%)",
    filter: "blur(6px)",
    opacity: 0.35,
  },
  bgGrid: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(var(--color-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-line) 1px, transparent 1px)",
    backgroundSize: "48px 48px",
    maskImage: "radial-gradient(circle at 50% 40%, black 0%, transparent 70%)",
  },
  bgFade: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(circle at 50% 45%, rgba(20,18,15,0.2) 0%, rgba(20,18,15,0.92) 62%, rgba(20,18,15,1) 100%)",
  },
  card: {
    position: "relative",
    width: "min(460px, 92vw)",
    background: "rgba(27, 24, 19, 0.92)",
    border: "1px solid var(--color-line)",
    borderRadius: "var(--radius-lg)",
    padding: 26,
    boxShadow: "0 18px 60px rgba(0,0,0,0.55)",
    backdropFilter: "blur(8px)",
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
  brand: { fontSize: 18, fontWeight: 800, letterSpacing: 0.2 },
  tagline: { fontSize: 13, color: "var(--color-muted)", marginTop: 2 },
  welcome: { fontSize: 22, fontWeight: 800, marginBottom: "var(--spacing-xs)" },
  pitch: { color: "var(--color-muted)", fontSize: 14, lineHeight: 1.4 },
  error: {
    marginTop: 14,
    padding: "var(--spacing-sm) var(--spacing-md)",
    borderRadius: "var(--radius-md)",
    background: "var(--color-error-bg)",
    border: "1px solid var(--color-error-border)",
    color: "var(--color-error-text)",
    fontSize: 14,
  },
  form: { display: "grid", gap: "var(--spacing-md)", marginTop: 16 },
  label: { display: "grid", gap: "var(--spacing-xs)", fontSize: 13, color: "var(--color-muted)" },
  input: {
    padding: "11px 12px",
    borderRadius: "var(--radius-md)",
    border: "1px solid var(--color-line)",
    background: "rgba(20,18,15,0.65)",
    color: "var(--color-cream)",
    outline: "none",
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
  },
  footer: { marginTop: 14, fontSize: 14, color: "var(--color-muted)" },
  link: { color: "var(--color-cream)", fontWeight: 800, textDecoration: "none" },
};
