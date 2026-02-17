import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthShell from "../components/AuthShell";
import RecipeCollage from "../components/RecipeCollage";
import FocusButton from "../components/UI/FocusButton";

export default function Home() {
  const nav = useNavigate();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 420);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 420);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const containerStyles = {
    ...styles.heroContainer,
    maxWidth: isSmallScreen ? "100%" : 440,
    gap: isSmallScreen ? 24 : 32,
    padding: isSmallScreen ? "0 8px" : 0,
  };

  const titleStyles = {
    ...styles.title,
    fontSize: isSmallScreen ? 32 : 42,
  };

  return (
    <AuthShell
      left={
        <div style={containerStyles}>
          {/* Brand + Logo */}
          <div style={styles.brandSection}>
            <div style={styles.logoLarge} />
            <h1 style={titleStyles}>BiteBoxd</h1>
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
            <FocusButton
              variant="primary"
              onClick={() => nav("/register")}
              style={styles.primaryButtonExtra}
            >
              Create account
            </FocusButton>
            
            <FocusButton
              variant="secondary"
              onClick={() => nav("/feed")}
            >
              Explore feed
            </FocusButton>
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
    display: "flex",
    flexDirection: "column",
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
  primaryButtonExtra: {
    boxShadow: "0 4px 12px rgba(243, 207, 122, 0.3)",
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
