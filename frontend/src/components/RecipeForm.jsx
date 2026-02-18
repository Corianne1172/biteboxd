import { useState } from "react";
import ErrorMessage from "./UI/ErrorMessage";
import { FormField, Input, TextArea } from "./UI/FormField";

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
        <FormField label="Cook time (min)" style={styles.label}>
          <Input value={form.cook_time} onChange={(e) => set("cook_time", e.target.value)} style={styles.input} />
        </FormField>
        <FormField label="Cuisine" style={styles.label}>
          <Input value={form.cuisine} onChange={(e) => set("cuisine", e.target.value)} style={styles.input} />
        </FormField>
        <FormField label="Difficulty" style={styles.label}>
          <Input value={form.difficulty} onChange={(e) => set("difficulty", e.target.value)} style={styles.input} />
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
          <Input value={form.calories} onChange={(e) => set("calories", e.target.value)} style={styles.input} />
        </FormField>
        <FormField label="Protein (g)" style={styles.label}>
          <Input value={form.protein_g} onChange={(e) => set("protein_g", e.target.value)} style={styles.input} />
        </FormField>
        <FormField label="Carbs (g)" style={styles.label}>
          <Input value={form.carbs_g} onChange={(e) => set("carbs_g", e.target.value)} style={styles.input} />
        </FormField>
        <FormField label="Fat (g)" style={styles.label}>
          <Input value={form.fat_g} onChange={(e) => set("fat_g", e.target.value)} style={styles.input} />
        </FormField>
      </div>

      <h3 style={styles.sectionTitle}>Your Review</h3>
      <div style={styles.gridReview}>
        <FormField label="Rating (1–5)" style={styles.label}>
          <Input value={form.rating} onChange={(e) => set("rating", e.target.value)} style={styles.input} />
        </FormField>
        <FormField label="Review" style={styles.label}>
          <Input value={form.review} onChange={(e) => set("review", e.target.value)} style={styles.input} />
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
    color: "#A94438",
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
  checkbox: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    fontSize: 15,
    color: "#A94438",
    fontWeight: 500,
    cursor: "pointer",
    padding: "14px 18px",
    background: "white",
    border: "2px solid #E6BAA3",
    borderRadius: 12,
    boxShadow: "0 2px 8px rgba(169, 68, 56, 0.08)",
    transition: "all 0.3s ease",
  },
  checkboxInput: {
    width: 20,
    height: 20,
    cursor: "pointer",
    accentColor: "#D24545",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 800,
    color: "#A94438",
    margin: "16px 0 0 0",
    paddingBottom: 8,
    borderBottom: "2px solid #E6BAA3",
  },
  submitButton: {
    marginTop: 16,
    padding: "16px 40px",
    fontSize: 17,
    fontWeight: 700,
    background: "linear-gradient(135deg, #D24545 0%, #A94438 100%)",
    color: "white",
    border: "none",
    borderRadius: 12,
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 16px rgba(169, 68, 56, 0.4)",
  },
};