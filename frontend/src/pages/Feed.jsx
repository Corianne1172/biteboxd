import { useEffect, useState } from "react";
import api from "../api/client";
import { PageShell, Card, Button } from "../components/UI";
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
    <PageShell maxWidth={1200}>
      {/* Header Card */}
      <Card padding={32} style={{ marginBottom: 32 }}>
        <div style={styles.header}>
          <div style={styles.headerIcon}>🍴</div>
          <div>
            <h1 style={styles.title}>Public Feed</h1>
            <p style={styles.subtitle}>Discover recipes from the community</p>
          </div>
        </div>
      </Card>

      {/* Filter Card */}
      <Card padding={24} style={{ marginBottom: 32 }}>
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
          <Button onClick={load} variant="primary">
            Apply Filters
          </Button>
        </div>
      </Card>

      {/* Error Message */}
      <ErrorMessage>{err}</ErrorMessage>

      {/* Loading State */}
      {loading && (
        <Card padding={48} style={{ textAlign: "center" }}>
          <div style={styles.loadingSpinner}>🍽️</div>
          <p style={styles.loadingText}>Loading delicious recipes...</p>
        </Card>
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
        <Card padding={64} style={{ textAlign: "center" }}>
          <div style={styles.emptyIcon}>🍽️</div>
          <h3 style={styles.emptyTitle}>No recipes found</h3>
          <p style={styles.emptyText}>
            Try adjusting your filters or be the first to share a recipe!
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
    color: "var(--palette-maroon)",
  },
  filterGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 12,
  },
  input: {
    background: "var(--theme-card-bg)",
    border: "2px solid var(--palette-peach)",
    borderRadius: 12,
    padding: "12px 16px",
    fontSize: 15,
    color: "var(--theme-text)",
    width: "100%",
    boxSizing: "border-box",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 8px rgba(169, 68, 56, 0.08)",
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
