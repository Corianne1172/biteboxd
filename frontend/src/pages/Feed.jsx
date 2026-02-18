import { useEffect, useState } from "react";
import api from "../api/client";
import ErrorMessage from "../components/UI/ErrorMessage";
import RecipeCard from "../components/RecipeCard";

export default function Feed() {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [minProtein, setMinProtein] = useState("");
  const [maxCalories, setMaxCalories] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setErr("");
    setLoading(true);
    try {
      const params = {
        limit: 20,
        offset: 0,
        q: q || undefined,
        min_protein: minProtein ? Number(minProtein) : undefined,
        max_calories: maxCalories ? Number(maxCalories) : undefined,
      };
      const res = await api.get("/feed", { params });
      setItems(res.data.items ?? res.data ?? []);
    } catch {
      setErr("Failed to load feed. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentWrapper}>
        <div style={styles.content}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.headerIcon}>🍴</div>
            <div>
              <h1 style={styles.title}>Public Feed</h1>
              <p style={styles.subtitle}>Discover recipes from the community</p>
            </div>
          </div>

          {/* Filter Section */}
          <div style={styles.filterCard}>
            <div style={styles.filterHeader}>
              <span style={styles.filterIcon}>🔍</span>
              <span style={styles.filterTitle}>Filter Recipes</span>
            </div>
            <div style={styles.filterGrid}>
              <input
                placeholder="Search recipes..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
                style={styles.input}
              />
              <input
                placeholder="Min protein (g)"
                value={minProtein}
                onChange={(e) => setMinProtein(e.target.value)}
                style={styles.input}
                type="number"
              />
              <input
                placeholder="Max calories"
                value={maxCalories}
                onChange={(e) => setMaxCalories(e.target.value)}
                style={styles.input}
                type="number"
              />
              <button onClick={load} style={styles.applyButton}>
                Apply Filters
              </button>
            </div>
          </div>

          {/* Error Message */}
          <ErrorMessage>{err}</ErrorMessage>

          {/* Loading State */}
          {loading && (
            <div style={styles.loadingCard}>
              <div style={styles.loadingSpinner}>🍽️</div>
              <p style={styles.loadingText}>Loading delicious recipes...</p>
            </div>
          )}

          {/* Recipe Grid */}
          {!loading && items.length > 0 && (
            <div style={styles.recipeGrid}>
              {items.map((r) => (
                <RecipeCard key={r.id} recipe={r} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && items.length === 0 && !err && (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>🍽️</div>
              <h3 style={styles.emptyTitle}>No recipes found</h3>
              <p style={styles.emptyText}>
                Try adjusting your filters or be the first to share a recipe!
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
    gap: 16,
    marginBottom: 32,
    background: "rgba(255, 255, 255, 0.95)",
    padding: 32,
    borderRadius: 20,
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
    border: "1px solid rgba(230, 186, 163, 0.3)",
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
  filterCard: {
    background: "rgba(255, 255, 255, 0.95)",
    padding: 24,
    borderRadius: 20,
    marginBottom: 32,
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
    border: "1px solid rgba(230, 186, 163, 0.3)",
  },
  filterHeader: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },
  filterIcon: {
    fontSize: 20,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: "#A94438",
  },
  filterGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 12,
  },
  input: {
    background: "white",
    border: "2px solid #E6BAA3",
    borderRadius: 12,
    padding: "12px 16px",
    fontSize: 15,
    color: "#333333",
    width: "100%",
    boxSizing: "border-box",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 8px rgba(169, 68, 56, 0.08)",
  },
  applyButton: {
    padding: "12px 24px",
    fontSize: 15,
    fontWeight: 700,
    background: "linear-gradient(135deg, #D24545 0%, #A94438 100%)",
    color: "white",
    border: "none",
    borderRadius: 12,
    cursor: "pointer",
    transition: "all 0.3s ease",
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
    animation: "spin 2s linear infinite",
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