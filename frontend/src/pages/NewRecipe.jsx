import { useNavigate } from "react-router-dom";
import api from "../api/client";
import RecipeForm from "../components/RecipeForm";

export default function NewRecipe() {
  const nav = useNavigate();

  const create = async (payload) => {
    const res = await api.post("/recipes", payload);
    nav(`/recipes/${res.data.id}`);
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentWrapper}>
        <div style={styles.formCard}>
          <div style={styles.header}>
            <div style={styles.icon}>📝</div>
            <div>
              <h2 style={styles.title}>Create New Recipe</h2>
              <p style={styles.subtitle}>Share your culinary creation with the world</p>
            </div>
          </div>
          <RecipeForm onSubmit={create} submitLabel="Create Recipe" />
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    width: "100vw",
    minHeight: "100vh",
    background: "linear-gradient(180deg, #A94438 0%, #D24545 35%, #E6BAA3 70%, #E4DEBE 100%)",
    margin: 0,
    overflowX: "hidden",
  },
  contentWrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "40px 24px",
  },
  formCard: {
    width: "100%",
    maxWidth: 800,
    background: "rgba(255, 255, 255, 0.95)",
    borderRadius: 20,
    padding: 40,
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.25)",
    border: "1px solid rgba(230, 186, 163, 0.3)",
  },
  header: {
    display: "flex",
    gap: 16,
    alignItems: "center",
    marginBottom: 32,
  },
  icon: {
    fontSize: 48,
    lineHeight: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 900,
    margin: 0,
    color: "#A94438",
  },
  subtitle: {
    fontSize: 15,
    margin: "4px 0 0 0",
    color: "#A94438",
    opacity: 0.7,
  },
};