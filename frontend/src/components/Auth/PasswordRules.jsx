export default function PasswordRules({ rules }) {
  const ruleLine = (ok, text) => (
    <div style={{ color: ok ? "#28a745" : "#A94438", fontWeight: ok ? 600 : 400 }}>
      {ok ? "✓" : "•"} {text}
    </div>
  );

  return (
    <div
      style={{
        padding: "12px 16px",
        borderRadius: "10px",
        border: "1px solid #E0E0E0",
        background: "#F9F9F9",
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6, color: "#A94438" }}>
        Password requirements
      </div>
      <div style={{ fontSize: 13, lineHeight: 1.6 }}>
        {ruleLine(rules.length, "At least 8 characters")}
        {ruleLine(rules.letter, "Contains a letter (A–Z)")}
        {ruleLine(rules.number, "Contains a number (0–9)")}
      </div>
    </div>
  );
}
