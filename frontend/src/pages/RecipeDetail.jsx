import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/client";
import { PageShell, Card, Button } from "../components/UI";
import ErrorMessage from "../components/UI/ErrorMessage";

export default function RecipeDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [err, setErr] = useState("");
  const [uploadErr, setUploadErr] = useState("");
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    setErr("");
    try {
      const res = await api.get(`/recipes/${id}`);
      setItem(res.data);
    } catch {
      setErr("Failed to load recipe.");
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  const onUpload = async (file) => {
    setUploadErr("");
    if (!file) return;
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);

      await api.post(`/recipes/${id}/photo`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await load();
    } catch {
      setUploadErr("Upload failed. Make sure it's an image file.");
    } finally {
      setUploading(false);
    }
  };

  const photoPath = item?.photo_url;
  const ratingDisplay = item?.rating ? `${"🍽️".repeat(Math.round(item.rating))}` : "No rating yet";

  return (
    <PageShell maxWidth={900} gradient="cool">
      {/* Error State */}
      {err && (
        <Card padding={48} style={{ textAlign: "center" }}>
          <ErrorMessage>{err}</ErrorMessage>
          <Link to="/recipes" style={styles.backLink}>← Back to My Recipes</Link>
        </Card>
      )}

      {/* Loading State */}
      {!err && !item && (
        <Card padding={64} style={{ textAlign: "center" }}>
          <div style={styles.loadingSpinner}>🍽️</div>
          <p style={styles.loadingText}>Loading recipe...</p>
        </Card>
      )}

      {/* Recipe Content */}
      {!err && item && (
        <>
          {/* Header Card */}
          <Card padding={32} style={{ marginBottom: 24 }}>
            <div style={styles.header}>
              <div style={styles.headerContent}>
                <h1 style={styles.title}>{item.title}</h1>
                <div style={styles.ratingRow}>
                  <span style={styles.rating}>{ratingDisplay}</span>
                  {item.rating && <span style={styles.ratingNumber}>{item.rating}/5</span>}
                </div>
              </div>
              <span style={{
                ...styles.badge,
                background: item.is_public ? "#28a745" : "#666",
              }}>
                {item.is_public ? "🌍 Public" : "🔒 Private"}
              </span>
            </div>
          </Card>

          {/* Navigation Buttons */}
          <div style={styles.navButtons}>
            <Link to="/recipes" style={{ textDecoration: "none" }}>
              <Button variant="secondary">← Back to My Recipes</Button>
            </Link>
            <Link to={`/recipes/${id}/edit`} style={{ textDecoration: "none" }}>
              <Button variant="primary">✏️ Edit Recipe</Button>
            </Link>
          </div>

          {/* Basic Info Card */}
          <Card>
            <h3 style={styles.cardTitle}>Recipe Info</h3>
            <div style={styles.infoGrid}>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>Author:</span>
                <span style={styles.infoValue}>{item.author || "—"}</span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>Cook time:</span>
                <span style={styles.infoValue}>{item.cook_time ? `${item.cook_time} min` : "—"}</span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>Cuisine:</span>
                <span style={styles.infoValue}>{item.cuisine || "—"}</span>
              </div>
              <div style={styles.infoItem}>
                <span style={styles.infoLabel}>Difficulty:</span>
                <span style={styles.infoValue}>
                  {item.difficulty ? `${"💪".repeat(Number(item.difficulty))} (${item.difficulty}/5)` : "—"}
                </span>
              </div>
            </div>
          </Card>

          {/* Description */}
          {item.description && (
            <Card>
              <h3 style={styles.cardTitle}>Description</h3>
              <p style={styles.text}>{item.description}</p>
            </Card>
          )}

          {/* Instructions */}
          {item.instructions && (
            <Card>
              <h3 style={styles.cardTitle}>Instructions</h3>
              <pre style={styles.instructions}>{item.instructions}</pre>
            </Card>
          )}

          {/* Macros */}
          <Card>
            <h3 style={styles.cardTitle}>Nutritional Information</h3>
            <div style={styles.macrosGrid}>
              <div style={styles.macroItem}>
                <span style={styles.macroIcon}>🔥</span>
                <div>
                  <div style={styles.macroValue}>{item.calories || "—"}</div>
                  <div style={styles.macroLabel}>Calories</div>
                </div>
              </div>
              <div style={styles.macroItem}>
                <span style={styles.macroIcon}>💪</span>
                <div>
                  <div style={styles.macroValue}>{item.protein_g || "—"}g</div>
                  <div style={styles.macroLabel}>Protein</div>
                </div>
              </div>
              <div style={styles.macroItem}>
                <span style={styles.macroIcon}>🌾</span>
                <div>
                  <div style={styles.macroValue}>{item.carbs_g || "—"}g</div>
                  <div style={styles.macroLabel}>Carbs</div>
                </div>
              </div>
              <div style={styles.macroItem}>
                <span style={styles.macroIcon}>🥑</span>
                <div>
                  <div style={styles.macroValue}>{item.fat_g || "—"}g</div>
                  <div style={styles.macroLabel}>Fat</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Review */}
          {item.review && (
            <Card>
              <h3 style={styles.cardTitle}>My Review</h3>
              <p style={styles.review}>{item.review}</p>
            </Card>
          )}

          {/* Photo Upload */}
          <Card>
            <h3 style={styles.cardTitle}>Recipe Photo</h3>
            
            {photoPath ? (
              <div style={styles.photoInfo}>
                <p style={styles.photoPath}>📁 {photoPath}</p>
              </div>
            ) : (
              <p style={styles.noPhoto}>No photo uploaded yet.</p>
            )}

            <ErrorMessage>{uploadErr}</ErrorMessage>

            <div style={styles.uploadSection}>
              <label style={styles.uploadLabel}>
                <Button variant="light" style={{ cursor: "pointer" }}>
                  {uploading ? "Uploading..." : "📷 Upload Photo"}
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  disabled={uploading}
                  onChange={(e) => onUpload(e.target.files?.[0])}
                  style={styles.fileInput}
                />
              </label>
              {uploading && <span style={styles.uploadingText}>Processing...</span>}
            </div>
          </Card>
        </>
      )}
    </PageShell>
  );
}

const styles = {
  backLink: {
    display: "inline-block",
    marginTop: 16,
    textDecoration: "none",
    fontSize: 15,
    fontWeight: 600,
    color: "var(--palette-maroon)",
  },
  loadingSpinner: {
    fontSize: 72,
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 18,
    color: "var(--palette-maroon)",
    fontWeight: 600,
    margin: 0,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 36,
    fontWeight: 900,
    margin: "0 0 12px 0",
    color: "var(--palette-maroon)",
    letterSpacing: -0.5,
    lineHeight: 1.2,
  },
  ratingRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  rating: {
    fontSize: 24,
    lineHeight: 1,
  },
  ratingNumber: {
    fontSize: 18,
    fontWeight: 700,
    color: "var(--palette-maroon)",
  },
  badge: {
    fontSize: 13,
    fontWeight: 700,
    color: "white",
    padding: "8px 16px",
    borderRadius: 10,
    flexShrink: 0,
  },
  navButtons: {
    display: "flex",
    gap: 12,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 800,
    color: "var(--palette-maroon)",
    margin: "0 0 20px 0",
    paddingBottom: 12,
    borderBottom: "2px solid var(--palette-peach)",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 16,
  },
  infoItem: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  infoLabel: {
    fontSize: 13,
    fontWeight: 700,
    color: "var(--palette-maroon)",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 16,
    color: "var(--theme-text)",
    fontWeight: 600,
  },
  text: {
    fontSize: 16,
    color: "var(--theme-text)",
    lineHeight: 1.7,
    margin: 0,
  },
  instructions: {
    whiteSpace: "pre-wrap",
    fontFamily: "inherit",
    fontSize: 15,
    color: "var(--theme-text)",
    lineHeight: 1.8,
    margin: 0,
  },
  macrosGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: 20,
  },
  macroItem: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  macroIcon: {
    fontSize: 32,
  },
  macroValue: {
    fontSize: 24,
    fontWeight: 800,
    color: "var(--palette-maroon)",
  },
  macroLabel: {
    fontSize: 13,
    color: "var(--theme-text-secondary)",
    fontWeight: 600,
  },
  review: {
    fontSize: 16,
    color: "var(--theme-text-secondary)",
    lineHeight: 1.7,
    fontStyle: "italic",
    margin: 0,
  },
  photoInfo: {
    marginBottom: 16,
  },
  photoPath: {
    fontSize: 14,
    color: "var(--theme-text-secondary)",
    fontFamily: "monospace",
    background: "var(--theme-input-bg)",
    padding: "12px 16px",
    borderRadius: 8,
    border: "1px solid var(--theme-input-border)",
  },
  noPhoto: {
    fontSize: 15,
    color: "var(--theme-text-secondary)",
    margin: "0 0 16px 0",
  },
  uploadSection: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  uploadLabel: {
    cursor: "pointer",
  },
  fileInput: {
    display: "none",
  },
  uploadingText: {
    fontSize: 14,
    color: "var(--palette-maroon)",
    fontWeight: 600,
  },
};
