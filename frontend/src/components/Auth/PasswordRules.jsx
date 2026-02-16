export default function PasswordRules({ rules }) {
  const ruleLine = (ok, text) => (
    <div style={{ color: ok ? "var(--color-cream)" : "rgba(255, 120, 120, 0.95)" }}>
      {ok ? "✓" : "•"} {text}
    </div>
  );

  return (
    <div
      style={{
        padding: "var(--spacing-md)",
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--color-line)",
        background: "rgba(20,18,15,0.35)",
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: "var(--spacing-xs)", color: "var(--color-cream)" }}>
        Password requirements
      </div>
      <div style={{ fontSize: 13, lineHeight: 1.5 }}>
        {ruleLine(rules.length, "At least 8 characters")}
        {ruleLine(rules.letter, "Contains a letter (A–Z)")}
        {ruleLine(rules.number, "Contains a number (0–9)")}
      </div>
    </div>
  );
}
