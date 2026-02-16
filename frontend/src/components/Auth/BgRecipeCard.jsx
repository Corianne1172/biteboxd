const bgCard = {
  base: {
    position: "absolute",
    width: 310,
    padding: 14,
    borderRadius: "var(--radius-lg)",
    background: "rgba(27, 24, 19, 0.70)",
    border: "1px solid var(--color-line)",
    boxShadow: "0 14px 50px rgba(0,0,0,0.35)",
    backdropFilter: "blur(6px)",
    filter: "saturate(0.95)",
    opacity: 0.9,
  },
  header: { display: "flex", gap: "var(--spacing-sm)", alignItems: "center" },
  thumb: {
    width: 46,
    height: 46,
    borderRadius: "var(--radius-md)",
    background: "linear-gradient(135deg, var(--color-olive), var(--color-orange))",
    border: "1px solid var(--color-line)",
  },
  title: { fontWeight: 800, color: "var(--color-cream)", fontSize: 14 },
  meta: { fontSize: 12, color: "var(--color-muted)", marginTop: 2 },
  rating: {
    fontWeight: 900,
    color: "var(--color-cream)",
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid var(--color-line)",
    background: "rgba(20,18,15,0.45)",
    fontSize: 12,
  },
  pillsRow: { display: "flex", gap: "var(--spacing-xs)", flexWrap: "wrap", marginTop: "var(--spacing-sm)" },
  pill: {
    fontSize: 11,
    padding: "4px 8px",
    borderRadius: 999,
    border: "1px solid var(--color-line)",
    color: "var(--color-muted)",
    background: "rgba(20,18,15,0.25)",
  },
  macros: { marginTop: "var(--spacing-sm)", fontSize: 12, color: "var(--color-muted)" },
  review: { marginTop: 8, fontSize: 12, color: "var(--color-muted)", lineHeight: 1.35 },
};

export default function BgRecipeCard({ style, title, meta, pills = [], rating, macros }) {
  return (
    <div style={{ ...bgCard.base, ...style }}>
      <div style={bgCard.header}>
        <div style={bgCard.thumb} />
        <div style={{ flex: 1 }}>
          <div style={bgCard.title}>{title}</div>
          <div style={bgCard.meta}>{meta}</div>
        </div>
        <div style={bgCard.rating}>{rating}</div>
      </div>

      <div style={bgCard.pillsRow}>
        {pills.map((p) => (
          <span key={p} style={bgCard.pill}>
            {p}
          </span>
        ))}
      </div>

      <div style={bgCard.macros}>{macros}</div>
      <div style={bgCard.review}>
        "Easy weeknight win. The sauce is 🔥 and the macros are actually solid."
      </div>
    </div>
  );
}
