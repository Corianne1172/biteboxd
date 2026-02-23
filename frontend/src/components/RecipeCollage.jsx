import { useState, useEffect } from "react";

export default function RecipeCollage() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowSize.width <= 768;

  return (
    <div style={styles.container}>
      {/* Subtle background gradient */}
      <div style={styles.bgGradient} />

      {/* Floating recipe cards - spread evenly across screen */}
      <RecipePreviewCard
        style={{ 
          top: isMobile ? "5%" : "8%", 
          left: isMobile ? "5%" : "6%",
          transform: "rotate(-4deg)" 
        }}
        title="Honey Garlic Salmon"
        time="22 min"
        rating="4.8★"
        calories="485"
        protein="42g"
        color="coral"
        tags={["Seafood", "High Protein"]}
      />
      
      <RecipePreviewCard
        style={{ 
          top: isMobile ? "8%" : "12%", 
          right: isMobile ? "5%" : "8%",
          transform: "rotate(5deg)" 
        }}
        title="Spicy Chicken Tacos"
        time="18 min"
        rating="4.6★"
        calories="520"
        protein="38g"
        color="red"
        tags={["Mexican", "Spicy"]}
      />

      <RecipePreviewCard
        style={{ 
          top: isMobile ? "40%" : "50%", 
          left: isMobile ? "3%" : "4%",
          transform: "rotate(3deg)" 
        }}
        title="Greek Yogurt Bowl"
        time="5 min"
        rating="4.9★"
        calories="320"
        protein="28g"
        color="purple"
        tags={["Breakfast", "Healthy"]}
      />

      <RecipePreviewCard
        style={{ 
          bottom: isMobile ? "25%" : "15%", 
          right: isMobile ? "5%" : "10%",
          transform: "rotate(-5deg)" 
        }}
        title="Green Smoothie"
        time="3 min"
        rating="4.7★"
        calories="180"
        protein="12g"
        color="green"
        tags={["Vegan", "Quick"]}
      />

      <RecipePreviewCard
        style={{ 
          bottom: isMobile ? "5%" : "8%", 
          left: isMobile ? "50%" : "50%",
          transform: "translate(-50%, 0) rotate(2deg)" 
        }}
        title="Protein Pancakes"
        time="15 min"
        rating="4.8★"
        calories="350"
        protein="25g"
        color="yellow"
        tags={["Breakfast", "Gains"]}
      />

      {isMobile && (
        <RecipePreviewCard
          style={{ 
            top: "65%", 
            right: "8%",
            transform: "rotate(-3deg)" 
          }}
          title="Avocado Toast"
          time="5 min"
          rating="4.5★"
          calories="280"
          protein="10g"
          color="teal"
          tags={["Brunch", "Fresh"]}
        />
      )}
    </div>
  );
}

function RecipePreviewCard({ style, title, time, rating, calories, protein, color, tags }) {
  const colorSchemes = {
    coral: {
      bg: "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)",
      text: "#fff",
      thumb: "#FF9A8B",
    },
    red: {
      bg: "linear-gradient(135deg, #D32F2F 0%, #F06292 100%)",
      text: "#fff",
      thumb: "#E57373",
    },
    purple: {
      bg: "linear-gradient(135deg, #7B1FA2 0%, #BA68C8 100%)",
      text: "#fff",
      thumb: "#9C27B0",
    },
    green: {
      bg: "linear-gradient(135deg, #388E3C 0%, #66BB6A 100%)",
      text: "#fff",
      thumb: "#4CAF50",
    },
    yellow: {
      bg: "linear-gradient(135deg, #F9A825 0%, #FBC02D 100%)",
      text: "#fff",
      thumb: "#FFD54F",
    },
    teal: {
      bg: "linear-gradient(135deg, #00897B 0%, #26A69A 100%)",
      text: "#fff",
      thumb: "#4DB6AC",
    },
  };

  const scheme = colorSchemes[color] || colorSchemes.coral;

  return (
    <div style={{ ...cardStyles.base, background: scheme.bg, ...style }}>
      <div style={cardStyles.header}>
        <div style={{ ...cardStyles.thumb, background: scheme.thumb }} />
        <div style={{ flex: 1 }}>
          <div style={{ ...cardStyles.title, color: scheme.text }}>{title}</div>
          <div style={{ ...cardStyles.meta, color: scheme.text }}>{time}</div>
        </div>
        <div style={{ ...cardStyles.rating, color: scheme.text }}>{rating}</div>
      </div>

      <div style={cardStyles.tags}>
        {tags.map((t) => (
          <span key={t} style={{ ...cardStyles.tag, color: scheme.text }}>
            {t}
          </span>
        ))}
      </div>

      <div style={{ ...cardStyles.macros, color: scheme.text }}>
        {calories} kcal • {protein} protein
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
  bgGradient: {
    position: "absolute",
    inset: 0,
    background: "radial-gradient(circle at 30% 50%, rgba(255, 107, 53, 0.08) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(139, 69, 19, 0.06) 0%, transparent 50%)",
  },
};

const cardStyles = {
  base: {
    position: "absolute",
    width: 280,
    maxWidth: "calc(100% - 40px)",
    padding: 18,
    borderRadius: 18,
    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.25)",
    pointerEvents: "none",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
  header: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    marginBottom: 14,
  },
  thumb: {
    width: 50,
    height: 50,
    borderRadius: 12,
    border: "2px solid rgba(255, 255, 255, 0.3)",
    flexShrink: 0,
  },
  title: {
    fontWeight: 800,
    fontSize: 16,
    lineHeight: 1.3,
  },
  meta: {
    fontSize: 13,
    marginTop: 3,
    opacity: 0.9,
  },
  rating: {
    fontWeight: 900,
    padding: "6px 11px",
    borderRadius: 20,
    background: "rgba(255, 255, 255, 0.25)",
    fontSize: 13,
    flexShrink: 0,
  },
  tags: {
    display: "flex",
    gap: 6,
    flexWrap: "wrap",
    marginBottom: 12,
  },
  tag: {
    fontSize: 12,
    padding: "5px 10px",
    borderRadius: 16,
    background: "rgba(255, 255, 255, 0.25)",
    fontWeight: 600,
  },
  macros: {
    fontSize: 14,
    fontWeight: 600,
    opacity: 0.95,
  },
};
