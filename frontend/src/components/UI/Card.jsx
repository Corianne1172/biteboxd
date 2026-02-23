export default function Card({ 
  children, 
  padding = 28,
  noPadding = false,
  style = {},
}) {
  return (
    <div style={{
      background: "var(--theme-card-bg)",
      color: "var(--theme-text)",
      padding: noPadding ? 0 : padding,
      borderRadius: 20,
      marginBottom: 24,
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.12)",
      border: "1px solid var(--theme-border)",
      ...style,
    }}>
      {children}
    </div>
  );
}
