# BiteBoxd Design System

## Overview

Reusable UI components for consistent styling across the application.

---

## Components

### PageShell

Full-viewport wrapper with gradient background and responsive max-width container.

**Props:**
- `children` (node, required): Content to render
- `maxWidth` (number, default: 1200): Max width of content container in px
- `gradient` (string, default: "default"): Gradient variant
  - `"default"`: Beige → Peach → Red (feed/recipes pages)
  - `"warm"`: Maroon → Red → Peach → Beige (form pages)
  - `"cool"`: Beige → Peach → Red → Maroon (detail pages)

**Example:**
```jsx
<PageShell maxWidth={900} gradient="warm">
  <h1>My Content</h1>
</PageShell>
```

---

### Card

White card container with shadow, rounded corners, and peach border.

**Props:**
- `children` (node, required): Content to render
- `padding` (number, default: 28): Padding in px
- `noPadding` (boolean, default: false): Remove padding completely
- `style` (object, default: {}): Additional inline styles

**Example:**
```jsx
<Card padding={32}>
  <h2>Card Title</h2>
  <p>Card content</p>
</Card>
```

---

### Button

Styled button with multiple variants and disabled state support.

**Props:**
- `children` (node, required): Button text/content
- `variant` (string, default: "primary"): Button style
  - `"primary"`: Red gradient with shadow (main actions)
  - `"secondary"`: Transparent with peach border (secondary actions)
  - `"danger"`: Solid red (destructive actions)
  - `"light"`: Peach gradient (tertiary actions)
- `onClick` (function): Click handler
- `type` (string, default: "button"): HTML button type
- `disabled` (boolean, default: false): Disable button
- `style` (object, default: {}): Additional inline styles
- `...props`: Other HTML button props

**Examples:**
```jsx
<Button onClick={handleSubmit}>Save</Button>
<Button variant="secondary" onClick={handleCancel}>Cancel</Button>
<Button variant="danger" onClick={handleDelete}>Delete</Button>
<Button disabled={!isValid}>Submit</Button>
```

---

## Usage Pattern

### Before (inline styles):
```jsx
export default function MyPage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #E4DEBE 0%, #E6BAA3 50%, #D24545 100%)",
      width: "100vw",
      padding: "40px 24px",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{
          background: "rgba(255, 255, 255, 0.95)",
          padding: 32,
          borderRadius: 20,
        }}>
          <h1>My Title</h1>
        </div>
        <button style={{
          background: "linear-gradient(135deg, #D24545 0%, #A94438 100%)",
          color: "white",
          padding: "12px 24px",
        }}>
          Click Me
        </button>
      </div>
    </div>
  );
}
```

### After (design system):
```jsx
import { PageShell, Card, Button } from "../components/UI";

export default function MyPage() {
  return (
    <PageShell maxWidth={1200}>
      <Card padding={32}>
        <h1>My Title</h1>
      </Card>
      <Button>Click Me</Button>
    </PageShell>
  );
}
```

---

## Benefits

✅ **Consistency**: Unified styles across all pages  
✅ **Maintainability**: Update one component to change everywhere  
✅ **Readability**: Less visual clutter in page components  
✅ **Reusability**: Import and use anywhere  
✅ **Performance**: No duplicate style calculations  

---

## Migration Guide

### Step 1: Import components
```jsx
import { PageShell, Card, Button } from "../components/UI";
```

### Step 2: Replace page wrapper
```jsx
// Before
<div style={{ minHeight: "100vh", background: "...", padding: "..." }}>

// After
<PageShell>
```

### Step 3: Replace card divs
```jsx
// Before
<div style={{ background: "rgba(255, 255, 255, 0.95)", padding: 32, ... }}>

// After
<Card padding={32}>
```

### Step 4: Replace buttons
```jsx
// Before
<button onClick={handler} style={{ background: "...", ... }}>Text</button>

// After
<Button onClick={handler}>Text</Button>
```

---

## Refactored Pages

✅ Feed.jsx  
✅ MyRecipes.jsx  

🔄 To Do:
- RecipeDetail.jsx
- NewRecipe.jsx (partially refactored)
- EditRecipe.jsx
