import { useNavigate } from "react-router-dom";
import AuthShell from "../components/AuthShell";
import RecipeCollage from "../components/RecipeCollage";

export default function Home() {
  const nav = useNavigate();

  return (
    <AuthShell
      left={
        <div style={styles.heroContainer}>
          {/* Brand + Logo */}
          <div style={styles.brandSection}>
            <div style={styles.logoLarge} />
            <h1 style={styles.title}>BiteBoxd</h1>
            <p style={styles.tagline}>Rate recipes like movies. Track macros like a pro.</p>
          </div>

          {/* Pitch */}
          <div style={styles.pitchSection}>
            <p style={styles.pitch}>
              Log your favorite recipes, rate them, track nutritional macros, and share your culinary discoveries with the world.
            </p>
          </div>

          {/* Call-to-Action Buttons */}
          <div style={styles.ctaSection}>
            <button 
              onClick={() => nav("/register")}
              style={styles.primaryButton}
            >
              Create account
            </button>
            
            <button 
              onClick={() => nav("/feed")}
              style={styles.secondaryButton}
            >
              Explore feed
            </button>
          </div>

          {/* Secondary Links */}
          <div style={styles.footerLinks}>
            <button 
              onClick={() => nav("/login")}
              style={styles.textLink}
            >
              Already have an account? <span style={styles.linkUnderline}>Sign in</span>
            </button>
          </div>
        </div>
      }
      right={<RecipeCollage />}
    />
  );
}

const styles = {
  heroContainer: {
    width: "100%",
    maxWidth: 440,
    display: "flex",
    flexDirection: "column",
    gap: 32,
  },
  brandSection: {
    textAlign: "center",
  },
  logoLarge: {
    width: 56,
    height: 56,
    margin: "0 auto 16px",
    borderRadius: 14,
    background: "linear-gradient(135deg, var(--color-olive), var(--color-orange))",
    boxShadow: "0 0 0 4px var(--color-line), 0 8px 24px rgba(0,0,0,0.3)",
  },
  title: {
    fontSize: 42,
    fontWeight: 900,
    margin: 0,
    marginBottom: 8,
    color: "var(--color-cream)",
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 16,
    color: "var(--color-muted)",
    margin: 0,
    fontWeight: 500,
  },
  pitchSection: {
    textAlign: "center",
  },
  pitch: {
    fontSize: 15,
    lineHeight: 1.6,
    color: "var(--color-muted)",
    margin: 0,
  },
  ctaSection: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  primaryButton: {
    padding: "14px 24px",
    fontSize: 16,
    fontWeight: 800,
    borderRadius: "var(--radius-md)",
    border: "none",
    background: "linear-gradient(135deg, var(--color-cream), var(--color-orange))",
    color: "#1a130a",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 4px 12px rgba(243, 207, 122, 0.3)",
  },
  secondaryButton: {
    padding: "14px 24px",
    fontSize: 16,
    fontWeight: 700,
    borderRadius: "var(--radius-md)",
    border: "1px solid var(--color-line)",
    background: "rgba(20,18,15,0.5)",
    color: "var(--color-cream)",
    cursor: "pointer",
    transition: "background 0.2s, border-color 0.2s",
  },
  footerLinks: {
    textAlign: "center",
    marginTop: 8,
  },
  textLink: {
    background: "none",
    border: "none",
    color: "var(--color-muted)",
    fontSize: 14,
    cursor: "pointer",
    padding: 0,
  },
  linkUnderline: {
    color: "var(--color-cream)",
    fontWeight: 700,
    textDecoration: "underline",
    textUnderlineOffset: 2,
  },
};
