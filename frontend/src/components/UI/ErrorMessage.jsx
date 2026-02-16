export default function ErrorMessage({ children }) {
  if (!children) return null;
  return <p style={{ color: "var(--color-error-text)", backgroundColor: "var(--color-error-bg)", border: `1px solid var(--color-error-border)`, padding: "var(--spacing-sm) var(--spacing-md)", borderRadius: "var(--radius-md)" }}>{children}</p>;
}
