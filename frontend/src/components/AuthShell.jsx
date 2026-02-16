import { useState, useEffect } from "react";

export default function AuthShell({ left, right, children }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const leftContent = left || children;

  return (
    <div style={styles.container}>
      <div style={isMobile ? styles.leftMobile : styles.leftDesktop}>
        {leftContent}
      </div>
      
      {right && (
        <div style={isMobile ? styles.rightMobile : styles.rightDesktop}>
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
    width: "100vw",
    background: "var(--bg)",
    color: "var(--ink)",
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
  rightDesktop: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "var(--spacing-lg)",
    overflowY: "auto",
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
  },
};
