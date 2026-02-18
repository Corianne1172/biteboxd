import { Link } from "react-router-dom";

export default function RecipeCard({ recipe, showActions = false, onDelete }) {
  const { id, title, rating, calories, protein_g, cook_time, review, is_public } = recipe;

  const ratingDisplay = rating ? `${"🍽️".repeat(Math.round(rating))}` : "No rating";

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h3 style={styles.title}>{title}</h3>
          <div style={styles.ratingRow}>
            <span style={styles.rating}>{ratingDisplay}</span>
            {rating && <span style={styles.ratingNumber}>{rating}/5</span>}
          </div>
        </div>
        {is_public !== undefined && (
          <span style={{
            ...styles.badge,
            background: is_public ? "#28a745" : "#666",
          }}>
            {is_public ? "🌍 Public" : "🔒 Private"}
          </span>
        )}
      </div>

      <div style={styles.metaRow}>
        {calories && <span style={styles.metaItem}>🔥 {calories} cal</span>}
        {protein_g && <span style={styles.metaItem}>💪 {protein_g}g protein</span>}
        {cook_time && <span style={styles.metaItem}>⏱️ {cook_time} min</span>}
      </div>

      {review && <p style={styles.review}>{review}</p>}

      {showActions && (
        <div style={styles.actions}>
          <Link to={`/recipes/${id}`} style={styles.viewButton}>
            View Details
          </Link>
          <Link to={`/recipes/${id}/edit`} style={styles.editButton}>
            Edit
          </Link>
          <button onClick={() => onDelete?.(id)} style={styles.deleteButton}>
            Delete
          </button>
        </div>
      )}

      {!showActions && (
        <Link to={`/recipes/${id}`} style={styles.viewOnlyButton}>
          View Recipe →
        </Link>
      )}
    </div>
  );
}

const styles = {
  card: {
    background: "rgba(255, 255, 255, 0.95)",
    padding: 24,
    borderRadius: 16,
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.12)",
    border: "1px solid rgba(230, 186, 163, 0.3)",
    transition: "all 0.3s ease",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
    gap: 16,
  },
  headerLeft: {
    flex: 1,
  },
  title: {
    margin: "0 0 8px 0",
    fontSize: 22,
    fontWeight: 800,
    color: "#A94438",
    lineHeight: 1.3,
  },
  ratingRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  rating: {
    fontSize: 20,
    lineHeight: 1,
  },
  ratingNumber: {
    fontSize: 14,
    fontWeight: 700,
    color: "#A94438",
  },
  badge: {
    fontSize: 12,
    fontWeight: 700,
    color: "white",
    padding: "6px 12px",
    borderRadius: 8,
    flexShrink: 0,
  },
  metaRow: {
    display: "flex",
    gap: 16,
    flexWrap: "wrap",
    marginBottom: 12,
  },
  metaItem: {
    fontSize: 14,
    color: "#A94438",
    fontWeight: 600,
    opacity: 0.8,
  },
  review: {
    margin: "12px 0 0 0",
    fontSize: 15,
    color: "#555",
    lineHeight: 1.6,
    fontStyle: "italic",
  },
  actions: {
    display: "flex",
    gap: 12,
    marginTop: 16,
    paddingTop: 16,
    borderTop: "1px solid #E6BAA3",
  },
  viewButton: {
    textDecoration: "none",
    fontSize: 14,
    fontWeight: 700,
    color: "#A94438",
    padding: "10px 20px",
    border: "2px solid #E6BAA3",
    borderRadius: 10,
    transition: "all 0.2s",
  },
  editButton: {
    textDecoration: "none",
    fontSize: 14,
    fontWeight: 700,
    color: "#A94438",
    padding: "10px 20px",
    border: "2px solid #E6BAA3",
    borderRadius: 10,
    transition: "all 0.2s",
  },
  deleteButton: {
    fontSize: 14,
    fontWeight: 700,
    color: "white",
    padding: "10px 20px",
    background: "#D24545",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    marginLeft: "auto",
    transition: "all 0.2s",
  },
  viewOnlyButton: {
    display: "inline-block",
    textDecoration: "none",
    fontSize: 15,
    fontWeight: 700,
    color: "#A94438",
    marginTop: 16,
    padding: "12px 24px",
    background: "linear-gradient(135deg, #E6BAA3 0%, #E4DEBE 100%)",
    borderRadius: 10,
    transition: "all 0.2s",
    textAlign: "center",
  },
};
