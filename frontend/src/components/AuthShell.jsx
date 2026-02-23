import { useState, useEffect } from "react";

export default function AuthShell({ left, right, children }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth <= 420);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
      setIsSmallMobile(window.innerWidth <= 420);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const leftContent = left || children;

  return (
    <div style={styles.container}>
      <div style={{
        ...(isMobile ? styles.leftMobile : styles.leftDesktop),
        ...(isSmallMobile && styles.leftSmallMobile)
      }}>
        {leftContent}
      </div>
      
      {right && (
        <div style={{
          ...(isMobile ? styles.rightMobile : styles.rightDesktop),
          ...(isSmallMobile && styles.rightSmallMobile)
        }}>
          {right}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    width: "100%",
    maxWidth: "100vw",
    background: "var(--bg)",
    color: "var(--ink)",
    overflowX: "hidden",
  },
  leftDesktop: {
    minWidth: 360,
    maxWidth: 520,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "var(--spacing-lg)",
    background: "var(--card)",
    borderRight: "1px solid var(--border)",
    overflowY: "auto",
  },
  leftMobile: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "var(--spacing-lg)",
    background: "var(--card)",
    minHeight: "100vh",
  },
  leftSmallMobile: {
    padding: 16,
  },
  rightDesktop: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "var(--spacing-lg)",
    overflowY: "auto",
    overflowX: "hidden",
  },
  rightMobile: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "var(--spacing-lg)",
    background: "var(--ink)",
    color: "var(--muted)",
    minHeight: "50vh",
    overflowX: "hidden",
  },
  rightSmallMobile: {
    padding: 16,
    minHeight: "40vh",
  },
};
