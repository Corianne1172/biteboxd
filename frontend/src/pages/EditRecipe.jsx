import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/client";
import RecipeForm from "../components/RecipeForm";
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
    <div style={styles.pageContainer}>
      <div style={styles.contentWrapper}>
        <div style={styles.formCard}>
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
    animation: "spin 2s linear infinite",
  },
  loadingText: {
    fontSize: 16,
    color: "#A94438",
    fontWeight: 600,
    margin: 0,
  },
};
