import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/client";
import RecipeForm from "../components/RecipeForm";
import { PageShell, Card } from "../components/UI";
import ErrorMessage from "../components/UI/ErrorMessage";

export default function EditRecipe() {
  const { id } = useParams();
  const nav = useNavigate();
  const [item, setItem] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/recipes/${id}`);
        setItem(res.data);
      } catch {
        setErr("Failed to load recipe.");
      }
    })();
  }, [id]);

  const save = async (payload) => {
    await api.put(`/recipes/${id}`, payload);
    nav(`/recipes/${id}`);
  };

  return (
    <PageShell maxWidth={800} gradient="warm">
      <Card padding={40}>
        {/* Error State */}
        {err && (
          <div style={styles.errorSection}>
            <ErrorMessage>{err}</ErrorMessage>
          </div>
        )}

        {/* Loading State */}
        {!err && !item && (
          <div style={styles.loadingSection}>
            <div style={styles.loadingSpinner}>🍽️</div>
            <p style={styles.loadingText}>Loading recipe...</p>
          </div>
        )}

        {/* Edit Form */}
        {!err && item && (
          <>
            <div style={styles.header}>
              <div style={styles.icon}>✏️</div>
              <div>
                <h2 style={styles.title}>Edit Recipe</h2>
                <p style={styles.subtitle}>Update your recipe details</p>
              </div>
            </div>
            <RecipeForm initial={item} onSubmit={save} submitLabel="Save Changes" />
          </>
        )}
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
  errorSection: {
    padding: "32px 0",
  },
  loadingSection: {
    padding: "64px 0",
    textAlign: "center",
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
};
