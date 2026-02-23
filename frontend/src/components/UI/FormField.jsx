export function FormField({ label, children, style }) {
  return (
    <label style={{ display: "grid", gap: "var(--spacing-xs)", ...style }}>
      {label}
      {children}
    </label>
  );
}

export function Input({ ...props }) {
  return <input {...props} />;
}

export function TextArea({ rows = 3, ...props }) {
  return <textarea rows={rows} {...props} />;
}
