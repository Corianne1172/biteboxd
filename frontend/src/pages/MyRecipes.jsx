import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/client";
import { PageShell, Card, Button } from "../components/UI";
import ErrorMessage from "../components/UI/ErrorMessage";
import RecipeCard from "../components/RecipeCard";

export default function MyRecipes() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  const load = async () => {
    setErr("");
    setLoading(true);
    try {
      const res = await api.get("/recipes");
      const data = res.data;
      const recipes = data.items ?? data ?? [];
      const total = data.meta?.total ?? recipes.length;
      
      setItems(recipes);
      
      // Only redirect after loading completes and if user has no recipes
      if (total === 0) {
        nav("/recipes/new");
      }
    } catch {
      setErr("Failed to load your recipes. Are you logged in?");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (id) => {
    if (!confirm("Delete this recipe?")) return;
    try {
      await api.delete(`/recipes/${id}`);
      await load();
    } catch {
      alert("Delete failed.");
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <PageShell maxWidth={1200}>
      {/* Header Card */}
      <Card padding={32} style={{ marginBottom: 32 }}>
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <div style={styles.headerIcon}>📖</div>
            <div>
              <h1 style={styles.title}>My Recipes</h1>
              <p style={styles.subtitle}>Your personal cookbook</p>
            </div>
          </div>
          <Link to="/recipes/new" style={{ textDecoration: "none" }}>
            <Button variant="primary">+ New Recipe</Button>
          </Link>
        </div>
      </Card>

      {/* Loading State */}
      {loading && (
        <Card padding={48} style={{ textAlign: "center" }}>
          <div style={styles.loadingSpinner}>🍽️</div>
          <p style={styles.loadingText}>Loading your recipes...</p>
        </Card>
      )}

      {/* Error Message */}
      <ErrorMessage>{err}</ErrorMessage>

      {/* Recipe Grid */}
      {!loading && items.length > 0 && (
        <div style={styles.recipeGrid}>
          {items.map((r) => (
            <RecipeCard key={r.id} recipe={r} showActions onDelete={onDelete} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && items.length === 0 && (
        <Card padding={64} style={{ textAlign: "center" }}>
          <div style={styles.emptyIcon}>🍽️</div>
          <h3 style={styles.emptyTitle}>No recipes yet</h3>
          <p style={styles.emptyText}>
            Click "New Recipe" to add your first recipe!
          </p>
        </Card>
      )}
    </PageShell>
  );
}

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    flexWrap: "wrap",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  headerIcon: {
    fontSize: 48,
    lineHeight: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 900,
    margin: 0,
    color: "var(--palette-maroon)",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    margin: "4px 0 0 0",
    color: "var(--palette-maroon)",
    opacity: 0.7,
  },
  loadingSpinner: {
    fontSize: 64,
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 16,
    color: "var(--palette-maroon)",
    fontWeight: 600,
    margin: 0,
  },
  recipeGrid: {
    display: "grid",
    gap: 24,
  },
  emptyIcon: {
    fontSize: 72,
    marginBottom: 16,
    opacity: 0.5,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 800,
    color: "var(--palette-maroon)",
    margin: "0 0 8px 0",
  },
  emptyText: {
    fontSize: 16,
    color: "var(--palette-maroon)",
    opacity: 0.7,
    margin: 0,
  },
};
