export default function PageShell({ children, maxWidth = 1200, gradient = "default" }) {
  const gradientMap = {
    default: "var(--theme-bg-gradient)",
    warm: "var(--theme-bg-gradient-warm)",
    cool: "var(--theme-bg-gradient-cool)",
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: gradientMap[gradient] || gradientMap.default,
      width: "100vw",
      margin: 0,
      overflowX: "hidden",
    }}>
      <div style={{
        minHeight: "100vh",
        padding: "40px 24px",
      }}>
        <div style={{
          maxWidth,
          margin: "0 auto",
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}
