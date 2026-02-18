import { useNavigate } from "react-router-dom";
import FocusButton from "../components/UI/FocusButton";

export default function Home() {
  const nav = useNavigate();

  return (
    <div style={styles.pageContainer}>
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <div style={styles.logoLarge} />
          <h1 style={styles.heroTitle}>BiteBoxd</h1>
          <p style={styles.heroTagline}>
            Rate recipes like movies. Track macros like a pro.
          </p>
          <p style={styles.heroParagraph}>
            Ever tried a recipe that deserved 5 stars? Or one that was a total flop? 
            BiteBoxd lets you rate, review, and track every recipe you cook. Build your 
            personal cookbook, share your culinary hits, and discover what's trending in 
            the food world.
          </p>
          <div style={styles.heroButtons}>
            <FocusButton
              variant="primary"
              onClick={() => nav("/register")}
              style={styles.heroPrimaryButton}
            >
              Get Started Free
            </FocusButton>
            <FocusButton
              variant="secondary"
              onClick={() => nav("/feed")}
              style={styles.heroSecondaryButton}
            >
              Explore Recipes
            </FocusButton>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section style={styles.examplesSection}>
        <h2 style={styles.sectionTitle}>Track Your Culinary Journey</h2>
        <p style={styles.sectionSubtitle}>
          Every recipe tells a story. Rate them, track macros, and build your perfect cookbook.
        </p>
        
        <div style={styles.cardsGrid}>
          <RecipeCard
            title="Honey Garlic Salmon"
            rating="4.8★"
            time="22 min"
            calories="485 kcal"
            protein="42g protein"
            tags={["Seafood", "High Protein", "Quick"]}
            color="primary"
          />
          <RecipeCard
            title="Spicy Chicken Tacos"
            rating="4.6★"
            time="18 min"
            calories="520 kcal"
            protein="38g protein"
            tags={["Mexican", "Spicy", "Dinner"]}
            color="secondary"
          />
          <RecipeCard
            title="Greek Yogurt Bowl"
            rating="4.9★"
            time="5 min"
            calories="320 kcal"
            protein="28g protein"
            tags={["Breakfast", "Healthy", "Quick"]}
            color="accent"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Ready to start cooking smarter?</h2>
          <p style={styles.ctaSubtitle}>
            Join thousands of home cooks tracking their recipes and hitting their macro goals.
          </p>
          <div style={styles.ctaButtons}>
            <FocusButton
              variant="primary"
              onClick={() => nav("/register")}
              style={styles.ctaPrimaryButton}
            >
              Create Free Account
            </FocusButton>
            <FocusButton
              variant="secondary"
              onClick={() => nav("/feed")}
              style={styles.ctaSecondaryButton}
            >
              Browse Recipes
            </FocusButton>
          </div>
          <p style={styles.ctaFooter}>
            Already have an account?{" "}
            <button onClick={() => nav("/login")} style={styles.ctaLink}>
              Sign in
            </button>
          </p>
        </div>
      </section>
    </div>
  );
}

function RecipeCard({ title, rating, time, calories, protein, tags, color }) {
  const colorSchemes = {
    primary: {
      bg: "linear-gradient(135deg, #A94438 0%, #D24545 100%)",
      accent: "#E6BAA3",
    },
    secondary: {
      bg: "linear-gradient(135deg, #D24545 0%, #A94438 100%)",
      accent: "#E4DEBE",
    },
    accent: {
      bg: "linear-gradient(135deg, #E6BAA3 0%, #E4DEBE 100%)",
      text: "#A94438",
      accent: "#D24545",
    },
  };

  const scheme = colorSchemes[color];
  const isLight = color === "accent";

  return (
    <div style={{
      ...cardStyles.base,
      background: scheme.bg,
      color: isLight ? scheme.text : "white",
    }}>
      <div style={cardStyles.header}>
        <div style={{
          ...cardStyles.thumb,
          background: scheme.accent,
        }} />
        <div style={cardStyles.info}>
          <h3 style={cardStyles.title}>{title}</h3>
          <p style={cardStyles.time}>{time}</p>
        </div>
        <div style={cardStyles.rating}>{rating}</div>
      </div>
      
      <div style={cardStyles.tags}>
        {tags.map((tag) => (
          <span key={tag} style={{
            ...cardStyles.tag,
            background: isLight ? "rgba(169, 68, 56, 0.1)" : "rgba(255, 255, 255, 0.2)",
          }}>
            {tag}
          </span>
        ))}
      </div>
      
      <div style={cardStyles.macros}>
        {calories} • {protein}
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    width: "100vw",
    minHeight: "100vh",
    background: "linear-gradient(180deg, #A94438 0%, #D24545 35%, #E6BAA3 70%, #E4DEBE 100%)",
    paddingBottom: 80,
    margin: 0,
    overflowX: "hidden",
  },
  
  // Hero Section
  heroSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 24px 80px",
  },
  heroContent: {
    maxWidth: 680,
    textAlign: "center",
    color: "white",
  },
  logoLarge: {
    width: 70,
    height: 70,
    margin: "0 auto 20px",
    borderRadius: 18,
    background: "linear-gradient(135deg, #E6BAA3 0%, #E4DEBE 100%)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
  },
  heroTitle: {
    fontSize: 56,
    fontWeight: 900,
    margin: 0,
    marginBottom: 12,
    letterSpacing: -1,
  },
  heroTagline: {
    fontSize: 22,
    fontWeight: 600,
    margin: "0 0 20px 0",
    opacity: 0.95,
  },
  heroParagraph: {
    fontSize: 17,
    lineHeight: 1.7,
    margin: "0 0 32px 0",
    opacity: 0.9,
    maxWidth: 560,
    marginLeft: "auto",
    marginRight: "auto",
  },
  heroButtons: {
    display: "flex",
    gap: 12,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  heroPrimaryButton: {
    fontSize: 17,
    padding: "14px 28px",
    background: "linear-gradient(135deg, #E6BAA3 0%, #E4DEBE 100%)",
    color: "#A94438",
    fontWeight: 700,
    border: "none",
  },
  heroSecondaryButton: {
    fontSize: 17,
    padding: "14px 28px",
    background: "transparent",
    color: "white",
    fontWeight: 600,
    border: "2px solid rgba(255, 255, 255, 0.8)",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "all 0.3s",
  },
  
  // Examples Section
  examplesSection: {
    padding: "60px 24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 38,
    fontWeight: 800,
    color: "white",
    margin: "0 0 12px 0",
    textAlign: "center",
    textShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
  },
  sectionSubtitle: {
    fontSize: 18,
    color: "white",
    margin: "0 0 48px 0",
    textAlign: "center",
    opacity: 0.95,
    maxWidth: 560,
    textShadow: "0 1px 4px rgba(0, 0, 0, 0.2)",
  },
  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 24,
    maxWidth: 1100,
    width: "100%",
  },
  
  // CTA Section
  ctaSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 24px",
  },
  ctaContent: {
    maxWidth: 600,
    textAlign: "center",
    color: "#A94438",
  },
  ctaTitle: {
    fontSize: 42,
    fontWeight: 900,
    margin: "0 0 12px 0",
  },
  ctaSubtitle: {
    fontSize: 18,
    margin: "0 0 32px 0",
    opacity: 0.9,
    lineHeight: 1.6,
  },
  ctaButtons: {
    display: "flex",
    gap: 12,
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  ctaPrimaryButton: {
    fontSize: 17,
    padding: "14px 28px",
    background: "linear-gradient(135deg, #A94438 0%, #D24545 100%)",
    color: "white",
    fontWeight: 700,
    border: "none",
  },
  ctaSecondaryButton: {
    fontSize: 17,
    padding: "14px 28px",
    background: "transparent",
    color: "#A94438",
    fontWeight: 600,
    border: "2px solid #A94438",
  },
  ctaFooter: {
    fontSize: 15,
    opacity: 0.9,
    margin: 0,
  },
  ctaLink: {
    background: "none",
    border: "none",
    color: "#A94438",
    fontWeight: 700,
    textDecoration: "underline",
    cursor: "pointer",
    fontSize: 15,
  },
};

const cardStyles = {
  base: {
    padding: 24,
    borderRadius: 20,
    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
    transition: "transform 0.3s, box-shadow 0.3s",
    cursor: "pointer",
  },
  header: {
    display: "flex",
    gap: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  thumb: {
    width: 60,
    height: 60,
    borderRadius: 12,
    flexShrink: 0,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    margin: "0 0 4px 0",
  },
  time: {
    fontSize: 14,
    margin: 0,
    opacity: 0.9,
  },
  rating: {
    fontSize: 18,
    fontWeight: 700,
    padding: "8px 12px",
    borderRadius: 12,
    background: "rgba(255, 255, 255, 0.2)",
  },
  tags: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    marginBottom: 16,
  },
  tag: {
    fontSize: 13,
    padding: "6px 12px",
    borderRadius: 16,
    fontWeight: 600,
  },
  macros: {
    fontSize: 16,
    fontWeight: 600,
    opacity: 0.95,
  },
};
