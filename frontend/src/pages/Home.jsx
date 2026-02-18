import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RecipeCollage from "../components/RecipeCollage";
import FocusButton from "../components/UI/FocusButton";

export default function Home() {
  const nav = useNavigate();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={styles.pageContainer}>
      {/* Background with RecipeCollage */}
      <div style={styles.backgroundLayer}>
        <RecipeCollage />
      </div>

      {/* Main centered signup box */}
      <div style={styles.contentOverlay}>
        <div style={{
          ...styles.heroCard,
          maxWidth: isSmallScreen ? "90%" : 640,
          padding: isSmallScreen ? 32 : 48,
        }}>
          {/* Brand + Logo */}
          <div style={styles.brandSection}>
            <div style={styles.logoLarge} />
            <h1 style={{
              ...styles.title,
              fontSize: isSmallScreen ? 36 : 52,
            }}>BiteBoxd</h1>
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
              style={styles.primaryButton}
            >
              Create account
            </FocusButton>
            
            <FocusButton
              variant="secondary"
              onClick={() => nav("/feed")}
              style={styles.secondaryButton}
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
    background: "linear-gradient(135deg, #1a1814 0%, #2d2520 100%)",
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
    padding: "32px",
  },
  heroCard: {
    width: "100%",
    background: "rgba(255, 255, 255, 0.98)",
    borderRadius: 24,
    boxShadow: "0 25px 80px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.1)",
    display: "flex",
    flexDirection: "column",
    gap: 28,
  },
  brandSection: {
    textAlign: "center",
  },
  logoLarge: {
    width: 72,
    height: 72,
    margin: "0 auto 20px",
    borderRadius: 18,
    background: "linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)",
    boxShadow: "0 8px 32px rgba(255, 107, 53, 0.4)",
  },
  title: {
    fontWeight: 900,
    margin: 0,
    marginBottom: 12,
    color: "#1a1814",
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 18,
    color: "#666",
    margin: 0,
    fontWeight: 500,
  },
  pitchSection: {
    textAlign: "center",
  },
  pitch: {
    fontSize: 16,
    lineHeight: 1.7,
    color: "#555",
    margin: 0,
  },
  ctaSection: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  primaryButton: {
    fontSize: 18,
    padding: "16px 32px",
    background: "linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)",
    boxShadow: "0 6px 24px rgba(255, 107, 53, 0.4)",
    border: "none",
    color: "white",
  },
  secondaryButton: {
    fontSize: 18,
    padding: "16px 32px",
    background: "white",
    border: "2px solid #ddd",
    color: "#333",
  },
  footerLinks: {
    textAlign: "center",
    marginTop: 8,
  },
  textLink: {
    background: "none",
    border: "none",
    color: "#666",
    fontSize: 15,
    cursor: "pointer",
    padding: 0,
  },
  linkUnderline: {
    color: "#FF6B35",
    fontWeight: 700,
    textDecoration: "underline",
    textUnderlineOffset: 2,
  },
};
