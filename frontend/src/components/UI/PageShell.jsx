export default function PageShell({ children, maxWidth = 1200, gradient = "default" }) {
  const gradients = {
    default: "linear-gradient(180deg, #E4DEBE 0%, #E6BAA3 50%, #D24545 100%)",
    warm: "linear-gradient(180deg, #A94438 0%, #D24545 35%, #E6BAA3 70%, #E4DEBE 100%)",
    cool: "linear-gradient(180deg, #E4DEBE 0%, #E6BAA3 40%, #D24545 80%, #A94438 100%)",
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: gradients[gradient] || gradients.default,
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
