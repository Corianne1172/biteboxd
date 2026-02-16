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
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: "var(--spacing-sm)", maxWidth: 720 }}>
      <ErrorMessage>{err}</ErrorMessage>

      <FormField label="Title *">
        <Input value={form.title} onChange={(e) => set("title", e.target.value)} />
      </FormField>

      <FormField label="Author (optional)">
        <Input value={form.author} onChange={(e) => set("author", e.target.value)} />
      </FormField>

      <FormField label="Description">
        <TextArea value={form.description} onChange={(e) => set("description", e.target.value)} rows={3} />
      </FormField>

      <FormField label="Instructions">
        <TextArea value={form.instructions} onChange={(e) => set("instructions", e.target.value)} rows={6} />
      </FormField>

      <div style={{ display: "grid", gap: "var(--spacing-sm)", gridTemplateColumns: "repeat(3, 1fr)" }}>
        <FormField label="Cook time (min)">
          <Input value={form.cook_time} onChange={(e) => set("cook_time", e.target.value)} />
        </FormField>
        <FormField label="Cuisine">
          <Input value={form.cuisine} onChange={(e) => set("cuisine", e.target.value)} />
        </FormField>
        <FormField label="Difficulty">
          <Input value={form.difficulty} onChange={(e) => set("difficulty", e.target.value)} />
        </FormField>
      </div>

      <label style={{ display: "flex", gap: "var(--spacing-sm)", alignItems: "center" }}>
        <input
          type="checkbox"
          checked={form.is_public}
          onChange={(e) => set("is_public", e.target.checked)}
        />
        Make public (shows in Feed)
      </label>

      <h3 style={{ margin: "var(--spacing-sm) 0 0" }}>Macros</h3>
      <div style={{ display: "grid", gap: "var(--spacing-sm)", gridTemplateColumns: "repeat(4, 1fr)" }}>
        <FormField label="Calories">
          <Input value={form.calories} onChange={(e) => set("calories", e.target.value)} />
        </FormField>
        <FormField label="Protein (g)">
          <Input value={form.protein_g} onChange={(e) => set("protein_g", e.target.value)} />
        </FormField>
        <FormField label="Carbs (g)">
          <Input value={form.carbs_g} onChange={(e) => set("carbs_g", e.target.value)} />
        </FormField>
        <FormField label="Fat (g)">
          <Input value={form.fat_g} onChange={(e) => set("fat_g", e.target.value)} />
        </FormField>
      </div>

      <h3 style={{ margin: "var(--spacing-sm) 0 0" }}>Rating & Review</h3>
      <div style={{ display: "grid", gap: "var(--spacing-sm)", gridTemplateColumns: "1fr 3fr" }}>
        <FormField label="Rating (1–5)">
          <Input value={form.rating} onChange={(e) => set("rating", e.target.value)} />
        </FormField>
        <FormField label="Review">
          <Input value={form.review} onChange={(e) => set("review", e.target.value)} />
        </FormField>
      </div>

      <button type="submit" style={{ width: 140 }}>
        {submitLabel}
      </button>
    </form>
  );
}