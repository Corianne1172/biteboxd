import { useState } from "react";

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
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10, maxWidth: 720 }}>
      {err && <p style={{ color: "red" }}>{err}</p>}

      <label>
        Title *
        <input value={form.title} onChange={(e) => set("title", e.target.value)} />
      </label>

      <label>
        Author (optional)
        <input value={form.author} onChange={(e) => set("author", e.target.value)} />
      </label>

      <label>
        Description
        <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={3} />
      </label>

      <label>
        Instructions
        <textarea value={form.instructions} onChange={(e) => set("instructions", e.target.value)} rows={6} />
      </label>

      <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(3, 1fr)" }}>
        <label>
          Cook time (min)
          <input value={form.cook_time} onChange={(e) => set("cook_time", e.target.value)} />
        </label>
        <label>
          Cuisine
          <input value={form.cuisine} onChange={(e) => set("cuisine", e.target.value)} />
        </label>
        <label>
          Difficulty
          <input value={form.difficulty} onChange={(e) => set("difficulty", e.target.value)} />
        </label>
      </div>

      <label style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <input
          type="checkbox"
          checked={form.is_public}
          onChange={(e) => set("is_public", e.target.checked)}
        />
        Make public (shows in Feed)
      </label>

      <h3 style={{ margin: "10px 0 0" }}>Macros</h3>
      <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(4, 1fr)" }}>
        <label>
          Calories
          <input value={form.calories} onChange={(e) => set("calories", e.target.value)} />
        </label>
        <label>
          Protein (g)
          <input value={form.protein_g} onChange={(e) => set("protein_g", e.target.value)} />
        </label>
        <label>
          Carbs (g)
          <input value={form.carbs_g} onChange={(e) => set("carbs_g", e.target.value)} />
        </label>
        <label>
          Fat (g)
          <input value={form.fat_g} onChange={(e) => set("fat_g", e.target.value)} />
        </label>
      </div>

      <h3 style={{ margin: "10px 0 0" }}>Rating & Review</h3>
      <div style={{ display: "grid", gap: 10, gridTemplateColumns: "1fr 3fr" }}>
        <label>
          Rating (1–5)
          <input value={form.rating} onChange={(e) => set("rating", e.target.value)} />
        </label>
        <label>
          Review
          <input value={form.review} onChange={(e) => set("review", e.target.value)} />
        </label>
      </div>

      <button type="submit" style={{ width: 140 }}>
        {submitLabel}
      </button>
    </form>
  );
}