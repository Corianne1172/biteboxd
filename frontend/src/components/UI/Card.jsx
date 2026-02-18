export default function Card({ 
  children, 
  padding = 28,
  noPadding = false,
  style = {},
}) {
  return (
    <div style={{
      background: "rgba(255, 255, 255, 0.95)",
      padding: noPadding ? 0 : padding,
      borderRadius: 20,
      marginBottom: 24,
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.12)",
      border: "1px solid rgba(230, 186, 163, 0.3)",
      ...style,
    }}>
      {children}
    </div>
  );
}
