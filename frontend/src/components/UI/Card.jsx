export default function Card({ children, style }) {
  return (
    <div
      style={{
        border: "var(--border-dark)",
        padding: "var(--spacing-md)",
        borderRadius: "var(--radius-md)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
