import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/client";
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
    <div style={styles.pageContainer}>
      <div style={styles.contentWrapper}>
        <div style={styles.content}>
          {/* Error State */}
          {err && (
            <div style={styles.errorCard}>
              <ErrorMessage>{err}</ErrorMessage>
              <Link to="/recipes" style={styles.backLink}>← Back to My Recipes</Link>
            </div>
          )}

          {/* Loading State */}
          {!err && !item && (
            <div style={styles.loadingCard}>
              <div style={styles.loadingSpinner}>🍽️</div>
              <p style={styles.loadingText}>Loading recipe...</p>
            </div>
          )}

          {/* Recipe Content */}
          {!err && item && (
            <>
              {/* Header */}
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

              {/* Navigation */}
              <div style={styles.navButtons}>
                <Link to="/recipes" style={styles.backButton}>
                  ← Back to My Recipes
                </Link>
                <Link to={`/recipes/${id}/edit`} style={styles.editButton}>
                  ✏️ Edit Recipe
                </Link>
              </div>

              {/* Basic Info Card */}
              <div style={styles.card}>
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
              </div>

              {/* Description */}
              {item.description && (
                <div style={styles.card}>
                  <h3 style={styles.cardTitle}>Description</h3>
                  <p style={styles.text}>{item.description}</p>
                </div>
              )}

              {/* Instructions */}
              {item.instructions && (
                <div style={styles.card}>
                  <h3 style={styles.cardTitle}>Instructions</h3>
                  <pre style={styles.instructions}>{item.instructions}</pre>
                </div>
              )}

              {/* Macros */}
              <div style={styles.card}>
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
              </div>

              {/* Review */}
              {item.review && (
                <div style={styles.card}>
                  <h3 style={styles.cardTitle}>My Review</h3>
                  <p style={styles.review}>{item.review}</p>
                </div>
              )}

              {/* Photo Upload */}
              <div style={styles.card}>
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
                  <label style={styles.uploadButton}>
                    {uploading ? "Uploading..." : "📷 Upload Photo"}
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
              </div>
            </>
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
    maxWidth: 900,
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
    marginBottom: 24,
    background: "rgba(255, 255, 255, 0.95)",
    padding: 32,
    borderRadius: 20,
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
    border: "1px solid rgba(230, 186, 163, 0.3)",
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 36,
    fontWeight: 900,
    margin: "0 0 12px 0",
    color: "#A94438",
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
    color: "#A94438",
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
  backButton: {
    textDecoration: "none",
    fontSize: 15,
    fontWeight: 600,
    color: "#A94438",
    padding: "12px 20px",
    background: "rgba(255, 255, 255, 0.95)",
    border: "2px solid #E6BAA3",
    borderRadius: 12,
    transition: "all 0.2s",
  },
  editButton: {
    textDecoration: "none",
    fontSize: 15,
    fontWeight: 700,
    color: "white",
    padding: "12px 24px",
    background: "linear-gradient(135deg, #D24545 0%, #A94438 100%)",
    border: "none",
    borderRadius: 12,
    transition: "all 0.2s",
    boxShadow: "0 4px 16px rgba(169, 68, 56, 0.4)",
  },
  card: {
    background: "rgba(255, 255, 255, 0.95)",
    padding: 28,
    borderRadius: 20,
    marginBottom: 24,
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.12)",
    border: "1px solid rgba(230, 186, 163, 0.3)",
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 800,
    color: "#A94438",
    margin: "0 0 20px 0",
    paddingBottom: 12,
    borderBottom: "2px solid #E6BAA3",
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
    color: "#A94438",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 16,
    color: "#333",
    fontWeight: 600,
  },
  text: {
    fontSize: 16,
    color: "#333",
    lineHeight: 1.7,
    margin: 0,
  },
  instructions: {
    whiteSpace: "pre-wrap",
    fontFamily: "inherit",
    fontSize: 15,
    color: "#333",
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
    color: "#A94438",
  },
  macroLabel: {
    fontSize: 13,
    color: "#666",
    fontWeight: 600,
  },
  review: {
    fontSize: 16,
    color: "#555",
    lineHeight: 1.7,
    fontStyle: "italic",
    margin: 0,
  },
  photoInfo: {
    marginBottom: 16,
  },
  photoPath: {
    fontSize: 14,
    color: "#666",
    fontFamily: "monospace",
    background: "#F5F5F5",
    padding: "12px 16px",
    borderRadius: 8,
    border: "1px solid #E0E0E0",
  },
  noPhoto: {
    fontSize: 15,
    color: "#999",
    margin: "0 0 16px 0",
  },
  uploadSection: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  uploadButton: {
    display: "inline-block",
    fontSize: 15,
    fontWeight: 700,
    color: "#A94438",
    padding: "12px 24px",
    background: "linear-gradient(135deg, #E6BAA3 0%, #E4DEBE 100%)",
    border: "none",
    borderRadius: 12,
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 2px 8px rgba(169, 68, 56, 0.2)",
  },
  fileInput: {
    display: "none",
  },
  uploadingText: {
    fontSize: 14,
    color: "#A94438",
    fontWeight: 600,
  },
  errorCard: {
    background: "rgba(255, 255, 255, 0.95)",
    padding: 48,
    borderRadius: 20,
    textAlign: "center",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
    border: "1px solid rgba(230, 186, 163, 0.3)",
  },
  loadingCard: {
    background: "rgba(255, 255, 255, 0.95)",
    padding: 64,
    borderRadius: 20,
    textAlign: "center",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
    border: "1px solid rgba(230, 186, 163, 0.3)",
  },
  loadingSpinner: {
    fontSize: 72,
    marginBottom: 16,
    animation: "spin 2s linear infinite",
  },
  loadingText: {
    fontSize: 18,
    color: "#A94438",
    fontWeight: 600,
    margin: 0,
  },
  backLink: {
    display: "inline-block",
    marginTop: 16,
    textDecoration: "none",
    fontSize: 15,
    fontWeight: 600,
    color: "#A94438",
  },
};
