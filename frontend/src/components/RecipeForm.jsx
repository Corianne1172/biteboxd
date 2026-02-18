import { useState } from "react";
import ErrorMessage from "./UI/ErrorMessage";
import { FormField, Input, TextArea } from "./UI/FormField";
import RatingInput from "./UI/RatingInput";

const empty = {
  title: "",
  author: "",
  description: "",
  instructions: "",
  cook_time: "",
  cuisine: "",
  difficulty: "",
  is_public: false,
  calories: "",
  protein_g: "",
  carbs_g: "",
  fat_g: "",
  rating: "",
  review: "",
};

const cuisineOptions = [
  "",
  "Italian",
  "Mexican",
  "Chinese",
  "Japanese",
  "Indian",
  "Thai",
  "French",
  "Greek",
  "Mediterranean",
  "American",
  "Korean",
  "Vietnamese",
  "Spanish",
  "Middle Eastern",
  "Caribbean",
  "African",
  "Latin American",
  "Fusion",
  "Other",
];

function toNumberOrNull(v) {
  if (v === "" || v === null || v === undefined) return null;
  const n = Number(v);
  return Number.isNaN(n) ? null : n;
}

export default function RecipeForm({ initial = empty, onSubmit, submitLabel = "Save" }) {
  const [form, setForm] = useState({ ...empty, ...initial });
  const [err, setErr] = useState("");

  const set = (key, value) => setForm((p) => ({ ...p, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    if (!form.title.trim()) {
      setErr("Title is required.");
      return;
    }

    const payload = {
      title: form.title.trim(),
      author: form.author?.trim() || null,
      description: form.description?.trim() || null,
      instructions: form.instructions?.trim() || null,
      cook_time: toNumberOrNull(form.cook_time),
      cuisine: form.cuisine?.trim() || null,
      difficulty: form.difficulty?.trim() || null,
      is_public: !!form.is_public,
      calories: toNumberOrNull(form.calories),
      protein_g: toNumberOrNull(form.protein_g),
      carbs_g: toNumberOrNull(form.carbs_g),
      fat_g: toNumberOrNull(form.fat_g),
      rating: toNumberOrNull(form.rating),
      review: form.review?.trim() || null,
    };

    try {
      await onSubmit(payload);
    } catch (e2) {
      setErr("Save failed. Check your inputs (rating 1–5, macros >= 0, etc.).");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <ErrorMessage>{err}</ErrorMessage>

      <FormField label="Recipe Title *" style={styles.label}>
        <Input value={form.title} onChange={(e) => set("title", e.target.value)} style={styles.input} />
      </FormField>

      <FormField label="Author (optional)" style={styles.label}>
        <Input value={form.author} onChange={(e) => set("author", e.target.value)} style={styles.input} />
      </FormField>

      <FormField label="Description" style={styles.label}>
        <TextArea value={form.description} onChange={(e) => set("description", e.target.value)} rows={3} style={styles.input} />
      </FormField>

      <FormField label="Instructions" style={styles.label}>
        <TextArea value={form.instructions} onChange={(e) => set("instructions", e.target.value)} rows={6} style={styles.input} />
      </FormField>

      <div style={styles.gridThree}>
        <FormField label="Cook time (minutes)" style={styles.label}>
          <Input 
            value={form.cook_time} 
            onChange={(e) => set("cook_time", e.target.value)} 
            style={styles.input}
            type="number"
            min="0"
            placeholder="e.g., 30"
          />
        </FormField>
        <FormField label="Cuisine" style={styles.label}>
          <select
            value={form.cuisine}
            onChange={(e) => set("cuisine", e.target.value)}
            style={styles.select}
          >
            <option value="">Select cuisine...</option>
            {cuisineOptions.slice(1).map((cuisine) => (
              <option key={cuisine} value={cuisine}>
                {cuisine}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Difficulty (1-5)" style={styles.label}>
          <RatingInput 
            value={form.difficulty ? Number(form.difficulty) : 0} 
            onChange={(difficulty) => set("difficulty", difficulty)}
            emoji="💪"
          />
        </FormField>
      </div>

      <label style={styles.checkbox}>
        <input
          type="checkbox"
          checked={form.is_public}
          onChange={(e) => set("is_public", e.target.checked)}
          style={styles.checkboxInput}
        />
        Make public (shows in Feed)
      </label>

      <h3 style={styles.sectionTitle}>Nutritional Information</h3>
      <div style={styles.gridFour}>
        <FormField label="Calories" style={styles.label}>
          <Input 
            value={form.calories} 
            onChange={(e) => set("calories", e.target.value)} 
            style={styles.input}
            type="number"
            min="0"
            placeholder="e.g., 450"
          />
        </FormField>
        <FormField label="Protein (g)" style={styles.label}>
          <Input 
            value={form.protein_g} 
            onChange={(e) => set("protein_g", e.target.value)} 
            style={styles.input}
            type="number"
            min="0"
            placeholder="e.g., 25"
          />
        </FormField>
        <FormField label="Carbs (g)" style={styles.label}>
          <Input 
            value={form.carbs_g} 
            onChange={(e) => set("carbs_g", e.target.value)} 
            style={styles.input}
            type="number"
            min="0"
            placeholder="e.g., 40"
          />
        </FormField>
        <FormField label="Fat (g)" style={styles.label}>
          <Input 
            value={form.fat_g} 
            onChange={(e) => set("fat_g", e.target.value)} 
            style={styles.input}
            type="number"
            min="0"
            placeholder="e.g., 15"
          />
        </FormField>
      </div>

      <h3 style={styles.sectionTitle}>Your Review</h3>
      <div style={styles.ratingSection}>
        <div style={styles.ratingContainer}>
          <label style={styles.ratingLabel}>Rating</label>
          <RatingInput 
            value={form.rating ? Number(form.rating) : 0} 
            onChange={(rating) => set("rating", rating)} 
          />
        </div>
        <FormField label="Review (optional)" style={styles.label}>
          <TextArea 
            value={form.review} 
            onChange={(e) => set("review", e.target.value)} 
            rows={3}
            style={styles.input}
            placeholder="What did you think of this recipe?"
          />
        </FormField>
      </div>

      <button type="submit" style={styles.submitButton}>
        {submitLabel}
      </button>
    </form>
  );
}

const styles = {
  form: {
    display: "grid",
    gap: 16,
  },
  label: {
    display: "grid",
    gap: 6,
    fontSize: 14,
    fontWeight: 600,
    color: "var(--palette-maroon)",
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
  select: {
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
    cursor: "pointer",
  },
  gridThree: {
    display: "grid",
    gap: 12,
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  },
  gridFour: {
    display: "grid",
    gap: 12,
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
  },
  gridReview: {
    display: "grid",
    gap: 12,
    gridTemplateColumns: "1fr 3fr",
  },
  ratingSection: {
    display: "grid",
    gap: 16,
  },
  ratingContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  ratingLabel: {
    fontSize: 14,
    fontWeight: 600,
    color: "var(--palette-maroon)",
  },
  checkbox: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    fontSize: 15,
    color: "var(--palette-maroon)",
    fontWeight: 500,
    cursor: "pointer",
    padding: "14px 18px",
    background: "var(--theme-card-bg)",
    border: "2px solid var(--palette-peach)",
    borderRadius: 12,
    boxShadow: "0 2px 8px rgba(169, 68, 56, 0.08)",
    transition: "all 0.3s ease",
  },
  checkboxInput: {
    width: 20,
    height: 20,
    cursor: "pointer",
    accentColor: "var(--palette-red)",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 800,
    color: "var(--palette-maroon)",
    margin: "8px 0 4px",
    paddingBottom: 8,
    borderBottom: "2px solid var(--palette-peach)",
  },
  submitButton: {
    marginTop: 16,
    padding: "16px 40px",
    fontSize: 17,
    fontWeight: 700,
    background: "linear-gradient(135deg, var(--palette-red) 0%, var(--palette-maroon) 100%)",
    color: "white",
    border: "none",
    borderRadius: 12,
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 16px rgba(169, 68, 56, 0.4)",
  },
};