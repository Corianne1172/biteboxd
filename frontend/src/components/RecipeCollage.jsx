import { useState, useEffect } from "react";

export default function RecipeCollage() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={styles.container}>
      {/* Background elements */}
      <div style={styles.bgGlow1} />
      <div style={styles.bgGlow2} />
      <div style={styles.bgGrid} />

      {/* Floating recipe cards */}
      <RecipePreviewCard
        isSmall={isSmallScreen}
        style={{ top: "12%", left: isSmallScreen ? "5%" : "8%", transform: "rotate(-5deg)" }}
        title="Honey Garlic Salmon"
        time="22 min"
        tag="High Protein"
        rating="4.8★"
        calories="485 kcal"
        protein="42g"
        tags={["Seafood", "Quick", "Healthy"]}
      />
      
      <RecipePreviewCard
        isSmall={isSmallScreen}
        style={{ top: "35%", right: isSmallScreen ? "5%" : "10%", transform: "rotate(4deg)" }}
        title="Spicy Chicken Tacos"
        time="18 min"
        tag="Crowd Pleaser"
        rating="4.6★"
        calories="520 kcal"
        protein="38g"
        tags={["Mexican", "Spicy", "Dinner"]}
      />
      
      <RecipePreviewCard
        isSmall={isSmallScreen}
        style={{ bottom: "15%", left: isSmallScreen ? "5%" : "15%", transform: "rotate(3deg)" }}
        title="Greek Yogurt Bowl"
        time="5 min"
        tag="Breakfast"
        rating="4.9★"
        calories="320 kcal"
        protein="28g"
        tags={["Vegetarian", "Fresh", "Easy"]}
      />

      {/* Fade overlay for blending */}
      <div style={styles.fade} />
    </div>
  );
}

function RecipePreviewCard({ style, title, time, tag, rating, calories, protein, tags, isSmall }) {
  return (
    <div style={{ ...cardStyles.base, ...(isSmall && cardStyles.baseSmall), ...style }}>
      <div style={cardStyles.header}>
        <div style={cardStyles.thumb} />
        <div style={{ flex: 1 }}>
          <div style={cardStyles.title}>{title}</div>
          <div style={cardStyles.meta}>
            {time} • {tag}
          </div>
        </div>
        <div style={cardStyles.rating}>{rating}</div>
      </div>

      <div style={cardStyles.tags}>
        {tags.map((t) => (
          <span key={t} style={cardStyles.tag}>
            {t}
          </span>
        ))}
      </div>

      <div style={cardStyles.macros}>
        {calories} • {protein} protein
      </div>

      <div style={cardStyles.review}>
        "Absolutely amazing! Made this 3 times already. Easy and delicious."
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    pointerEvents: "none",
  },
  bgGlow1: {
    position: "absolute",
    width: 500,
    height: 500,
    left: -100,
    top: -120,
    borderRadius: "50%",
    background: "radial-gradient(circle, var(--orange, #CC561E) 0%, transparent 70%)",
    opacity: 0.15,
    filter: "blur(60px)",
  },
  bgGlow2: {
    position: "absolute",
    width: 600,
    height: 600,
    right: -150,
    bottom: -180,
    borderRadius: "50%",
    background: "radial-gradient(circle, var(--deepRed, #AA2B1D) 0%, transparent 70%)",
    opacity: 0.12,
    filter: "blur(60px)",
  },
  bgGrid: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(243,207,122,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(243,207,122,0.03) 1px, transparent 1px)",
    backgroundSize: "60px 60px",
    opacity: 0.6,
  },
  fade: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(circle at 50% 50%, transparent 0%, var(--bg, #242424) 100%)",
    opacity: 0.4,
  },
};

const cardStyles = {
  base: {
    position: "absolute",
    width: 320,
    maxWidth: "calc(100% - 40px)",
    padding: 16,
    borderRadius: 16,
    background: "rgba(27, 24, 19, 0.85)",
    border: "1px solid var(--border, rgba(243, 207, 122, 0.22))",
    boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
    backdropFilter: "blur(10px)",
    pointerEvents: "none",
  },
  baseSmall: {
    width: 280,
    maxWidth: "calc(100% - 20px)",
    padding: 12,
    fontSize: 13,
  },
  header: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  thumb: {
    width: 52,
    height: 52,
    borderRadius: 12,
    background: "linear-gradient(135deg, var(--olive, #8A8635), var(--orange, #CC561E))",
    border: "1px solid var(--border, rgba(243, 207, 122, 0.25))",
    opacity: 0.9,
  },
  title: {
    fontWeight: 800,
    color: "var(--cream, #F3CF7A)",
    fontSize: 15,
    lineHeight: 1.3,
  },
  meta: {
    fontSize: 12,
    color: "var(--muted, rgba(243, 207, 122, 0.75))",
    marginTop: 3,
  },
  rating: {
    fontWeight: 900,
    color: "var(--cream, #F3CF7A)",
    padding: "6px 11px",
    borderRadius: 999,
    border: "1px solid var(--border, rgba(243,207,122,0.2))",
    background: "rgba(20,18,15,0.5)",
    fontSize: 13,
  },
  tags: {
    display: "flex",
    gap: 6,
    flexWrap: "wrap",
    marginBottom: 10,
  },
  tag: {
    fontSize: 11,
    padding: "5px 9px",
    borderRadius: 999,
    border: "1px solid var(--border, rgba(243,207,122,0.15))",
    color: "var(--muted, rgba(243,207,122,0.85))",
    background: "rgba(20,18,15,0.3)",
  },
  macros: {
    fontSize: 13,
    color: "var(--muted, rgba(243,207,122,0.85))",
    marginBottom: 10,
    fontWeight: 500,
  },
  review: {
    fontSize: 12,
    color: "var(--muted, rgba(243,207,122,0.7))",
    lineHeight: 1.4,
    fontStyle: "italic",
  },
};
