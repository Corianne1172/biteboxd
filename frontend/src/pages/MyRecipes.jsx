import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/client";
import PageContainer from "../components/UI/PageContainer";
import ErrorMessage from "../components/UI/ErrorMessage";
import LoadingMessage from "../components/UI/LoadingMessage";
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
    <div style={styles.pageContainer}>
      <div style={styles.contentWrapper}>
        <div style={styles.content}>
          <div style={styles.header}>
            <div style={styles.headerLeft}>
              <div style={styles.headerIcon}>📖</div>
              <div>
                <h1 style={styles.title}>My Recipes</h1>
                <p style={styles.subtitle}>Your personal cookbook</p>
              </div>
            </div>
            <Link to="/recipes/new" style={styles.newButton}>
              + New Recipe
            </Link>
          </div>

          {loading && (
            <div style={styles.loadingCard}>
              <div style={styles.loadingSpinner}>🍽️</div>
              <p style={styles.loadingText}>Loading your recipes...</p>
            </div>
          )}

          <ErrorMessage>{err}</ErrorMessage>

          {!loading && items.length > 0 && (
            <div style={styles.recipeGrid}>
              {items.map((r) => (
                <RecipeCard key={r.id} recipe={r} showActions onDelete={onDelete} />
              ))}
            </div>
          )}

          {!loading && items.length === 0 && (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>🍽️</div>
              <h3 style={styles.emptyTitle}>No recipes yet</h3>
              <p style={styles.emptyText}>
                Click "New Recipe" to add your first recipe!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #E4DEBE 0%, #E6BAA3 50%, #D24545 100%)",
    width: "100vw",
    margin: 0,
    overflowX: "hidden",
  },
  contentWrapper: {
    minHeight: "100vh",
    padding: "40px 24px",
  },
  content: {
    maxWidth: 1200,
    margin: "0 auto",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 32,
    background: "rgba(255, 255, 255, 0.95)",
    padding: 32,
    borderRadius: 20,
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
    border: "1px solid rgba(230, 186, 163, 0.3)",
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
    color: "#A94438",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    margin: "4px 0 0 0",
    color: "#A94438",
    opacity: 0.7,
  },
  newButton: {
    textDecoration: "none",
    fontSize: 15,
    fontWeight: 700,
    color: "white",
    padding: "14px 28px",
    background: "linear-gradient(135deg, #D24545 0%, #A94438 100%)",
    borderRadius: 12,
    transition: "all 0.2s",
    boxShadow: "0 4px 16px rgba(169, 68, 56, 0.4)",
  },
  loadingCard: {
    background: "rgba(255, 255, 255, 0.95)",
    padding: 48,
    borderRadius: 20,
    textAlign: "center",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
    border: "1px solid rgba(230, 186, 163, 0.3)",
  },
  loadingSpinner: {
    fontSize: 64,
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 16,
    color: "#A94438",
    fontWeight: 600,
    margin: 0,
  },
  recipeGrid: {
    display: "grid",
    gap: 24,
  },
  emptyState: {
    background: "rgba(255, 255, 255, 0.95)",
    padding: 64,
    borderRadius: 20,
    textAlign: "center",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
    border: "1px solid rgba(230, 186, 163, 0.3)",
  },
  emptyIcon: {
    fontSize: 72,
    marginBottom: 16,
    opacity: 0.5,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 800,
    color: "#A94438",
    margin: "0 0 8px 0",
  },
  emptyText: {
    fontSize: 16,
    color: "#A94438",
    opacity: 0.7,
    margin: 0,
  },
};
