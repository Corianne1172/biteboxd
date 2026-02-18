import { useNavigate } from "react-router-dom";
import api from "../api/client";
import RecipeForm from "../components/RecipeForm";
import { PageShell, Card } from "../components/UI";

export default function NewRecipe() {
  const nav = useNavigate();

  const create = async (payload) => {
    const res = await api.post("/recipes", payload);
    nav(`/recipes/${res.data.id}`);
  };

  return (
    <PageShell maxWidth={800} gradient="warm">
      <Card padding={40}>
        <div style={styles.header}>
          <div style={styles.icon}>📝</div>
          <div>
            <h2 style={styles.title}>Create New Recipe</h2>
            <p style={styles.subtitle}>Share your culinary creation with the world</p>
          </div>
        </div>
        <RecipeForm onSubmit={create} submitLabel="Create Recipe" />
      </Card>
    </PageShell>
  );
}

const styles = {
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
    color: "var(--palette-maroon)",
  },
  subtitle: {
    fontSize: 15,
    margin: "4px 0 0 0",
    color: "var(--palette-maroon)",
    opacity: 0.7,
  },
};
