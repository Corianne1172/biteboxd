import { useState } from "react";

export default function RatingInput({ value, onChange, max = 5, emoji = "🍽️" }) {
  const [hoverValue, setHoverValue] = useState(0);

  const handleClick = (rating) => {
    onChange(rating);
  };

  const handleMouseEnter = (rating) => {
    setHoverValue(rating);
  };

  const handleMouseLeave = () => {
    setHoverValue(0);
  };

  return (
    <div style={styles.container}>
      {[...Array(max)].map((_, index) => {
        const rating = index + 1;
        const isActive = rating <= (hoverValue || value);
        
        return (
          <button
            key={rating}
            type="button"
            onClick={() => handleClick(rating)}
            onMouseEnter={() => handleMouseEnter(rating)}
            onMouseLeave={handleMouseLeave}
            style={{
              ...styles.plate,
              opacity: isActive ? 1 : 0.3,
              transform: isActive ? "scale(1.15)" : "scale(1)",
            }}
            aria-label={`Rate ${rating} out of ${max}`}
          >
            {emoji}
          </button>
        );
      })}
      {value > 0 && (
        <span style={styles.ratingText}>{value}/{max}</span>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  plate: {
    fontSize: 32,
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 4,
    transition: "all 0.2s ease",
    filter: "grayscale(0)",
  },
  ratingText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 700,
    color: "#A94438",
  },
};
