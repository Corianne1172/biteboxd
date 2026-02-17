# Full-Screen Pages Guide

Complete guide for all pages using `AuthShell` and `RecipeCollage` in BiteBoxd.

## Overview

Three pages now use the full-screen `AuthShell` + `RecipeCollage` pattern for a unified, immersive experience:

1. **Home** (Landing page)
2. **Login** (Authentication)
3. **Register** (Sign up)

## Common Architecture

All three pages share:

```jsx
<AuthShell
  left={/* Content */}
  right={<RecipeCollage />}
/>
```

### Benefits
- ✅ Consistent visual design
- ✅ Full viewport utilization
- ✅ Engaging visual background
- ✅ Professional appearance
- ✅ Responsive (desktop/mobile)
- ✅ No TopNav distraction

## TopNav Behavior

```jsx
// App.jsx
function TopNav() {
  const location = useLocation();
  
  // Hide on full-screen pages
  const hideNav = ['/', '/login', '/register'].includes(location.pathname);
  
  if (hideNav) return null;
  
  return <nav>...</nav>;
}
```

**Hidden on:**
- `/` - Home/Landing
- `/login` - Login page
- `/register` - Register page

**Visible on:**
- `/feed` - Feed
- `/recipes` - My Recipes
- `/recipes/new` - New Recipe
- `/recipes/:id` - Recipe Detail
- `/recipes/:id/edit` - Edit Recipe

## Page Comparison

### 1. Home Page (Landing)

**Purpose**: Convert visitors to users

**Left Column:**
```
┌─────────────────┐
│   Large Logo    │
│                 │
│   "BiteBoxd"    │
│   (42px title)  │
│                 │
│    Tagline      │
│                 │
│   Pitch text    │
│   (1-2 lines)   │
│                 │
│ ┌─────────────┐ │
│ │Create acc.  │ │ ← Primary CTA
│ └─────────────┘ │
│ ┌─────────────┐ │
│ │Explore feed │ │ ← Secondary CTA
│ └─────────────┘ │
│                 │
│  "Sign in" link │
└─────────────────┘
```

**User Actions:**
- Create account → `/register`
- Explore feed → `/feed`
- Sign in → `/login`

**Target Audience:**
- First-time visitors
- Evaluating the product
- Need to be convinced

---

### 2. Login Page

**Purpose**: Return existing users to their account

**Left Column:**
```
┌─────────────────┐
│   Small Logo    │
│  "BiteBoxd"     │
│   Tagline       │
│                 │
│ "Welcome back"  │
│  Helper text    │
│                 │
│  [Error box]    │
│                 │
│ ┌─────────────┐ │
│ │   Email     │ │
│ └─────────────┘ │
│ ┌─────────────┐ │
│ │  Password   │ │
│ └─────────────┘ │
│ ┌─────────────┐ │
│ │  Sign In    │ │
│ └─────────────┘ │
│                 │
│ "Sign up" link  │
└─────────────────┘
```

**User Actions:**
- Submit form → `/recipes`
- Sign up → `/register`

**Target Audience:**
- Existing users
- Returning visitors
- Already convinced

---

### 3. Register Page

**Purpose**: Onboard new users

**Left Column:**
```
┌─────────────────┐
│   Small Logo    │
│  "BiteBoxd"     │
│   Tagline       │
│                 │
│  "Welcome 👋"   │
│  Helper text    │
│                 │
│  [Error box]    │
│                 │
│ ┌─────────────┐ │
│ │  Username   │ │
│ └─────────────┘ │
│ ┌─────────────┐ │
│ │   Email     │ │
│ └─────────────┘ │
│ ┌─────────────┐ │
│ │  Password   │ │
│ └─────────────┘ │
│                 │
│ Password Rules  │
│ ✓ 8+ chars      │
│ ✓ Letter        │
│ ✓ Number        │
│                 │
│ ┌─────────────┐ │
│ │   Create    │ │ ← Disabled until valid
│ └─────────────┘ │
│                 │
│ "Log in" link   │
└─────────────────┘
```

**User Actions:**
- Submit form → `/login`
- Log in → `/login`

**Target Audience:**
- New users
- First-time sign up
- Need guidance

---

## Design Patterns

### Logo Sizing

| Page | Size | Style |
|------|------|-------|
| Home | 56×56px | Large, prominent |
| Login | 14×14px | Small, minimal |
| Register | 14×14px | Small, minimal |

**Rationale**: Home emphasizes brand, auth pages minimize distraction

### Title Sizing

| Page | Size | Weight | Purpose |
|------|------|--------|---------|
| Home | 42px | 900 | Maximum impact |
| Login | 22px | 800 | Clear heading |
| Register | 22px | 800 | Clear heading |

### CTA Strategy

| Page | Primary CTA | Secondary CTA |
|------|-------------|---------------|
| Home | Create account | Explore feed |
| Login | Sign In | n/a (always enabled) |
| Register | Create account | n/a (validation required) |

### Welcome Messages

| Page | Message | Tone |
|------|---------|------|
| Home | Brand pitch | Marketing |
| Login | "Welcome back" | Returning |
| Register | "Welcome 👋" | Onboarding |

## Responsive Breakpoint: 900px

### Desktop (>900px)

```
┌─────────────────────────────────────────┐
│  Left (360-520px)  │  Right (flex: 1)   │
│                    │                     │
│     Content        │   RecipeCollage    │
│                    │                     │
└─────────────────────────────────────────┘
```

### Mobile (≤900px)

```
┌─────────────────┐
│   Left Content  │
│  (Full Width)   │
│                 │
│   min-h: 100vh  │
├─────────────────┤
│ RecipeCollage   │
│  (Full Width)   │
│                 │
│   min-h: 50vh   │
└─────────────────┘
```

## Style Consistency

All three pages use identical styling for common elements:

### Brand Section
```jsx
brandRow: { display: "flex", gap: "var(--spacing-md)", alignItems: "center" }
logoDot: { gradient, ring shadow }
brand: { 18px, bold 800, cream (auth) / 42px (home) }
tagline: { 13px, muted }
```

### Welcome Section
```jsx
welcome: { 22px, bold 800, cream }
pitch: { 14-15px, muted, line-height: 1.4-1.6 }
```

### Error Display
```jsx
error: {
  padding: "var(--spacing-sm) var(--spacing-md)",
  borderRadius: "var(--radius-md)",
  background: "var(--color-error-bg)",
  border: "1px solid var(--color-error-border)",
  color: "var(--color-error-text)"
}
```

### Form Fields
```jsx
label: { 13px, muted, grid layout }
input: { 11px padding, rounded, dark bg, cream text }
```

### Buttons
```jsx
button: {
  padding: "12-14px",
  borderRadius: "var(--radius-md)",
  gradient: "linear-gradient(135deg, var(--color-cream), var(--color-orange))",
  fontWeight: 800
}
```

### Footer Links
```jsx
footer: { 14px, muted }
link: { cream, bold 800, no underline }
```

## Component Reuse

### Shared Components
- `AuthShell` - Layout container (all 3 pages)
- `RecipeCollage` - Visual background (all 3 pages)
- `FormField` - Form labels (Login, Register)
- `PasswordRules` - Validation UI (Register only)

### Not Shared (Intentionally)
Each page has inline styles for:
- Page-specific content (Home pitch, form fields)
- Button variations (Home CTAs different)
- Layout containers (maxWidth values)

**Rationale**: Balance between reuse and flexibility

## User Flow Map

```
┌──────────┐
│  Home /  │ ← Landing (no TopNav)
└─────┬────┘
      │
      ├─→ "Create account" ──┐
      │                      ↓
      │            ┌──────────────────┐
      │            │ Register         │ ← Sign up (no TopNav)
      │            │ /register        │
      │            └────────┬─────────┘
      │                     │
      │                     ↓ Success
      │            ┌──────────────────┐
      ├─→ "Sign in" ──→│ Login           │ ← Auth (no TopNav)
      │            │ /login          │
      │            └────────┬─────────┘
      │                     │
      │                     ↓ Success
      │            ┌──────────────────┐
      │            │ My Recipes       │ ← App (TopNav visible)
      │            │ /recipes        │
      │            └──────────────────┘
      │
      └─→ "Explore feed" ──────────────┐
                                       ↓
                              ┌──────────────────┐
                              │ Feed             │ ← Browse (TopNav visible)
                              │ /feed           │
                              └──────────────────┘
```

## Development Notes

### Adding a New Full-Screen Page

1. Create page with `AuthShell`:
```jsx
export default function NewPage() {
  return (
    <AuthShell
      left={<YourContent />}
      right={<RecipeCollage />}
    />
  );
}
```

2. Add route to App.jsx
3. Add path to `hideNav` array in TopNav:
```jsx
const hideNav = ['/', '/login', '/register', '/new-page'].includes(location.pathname);
```

### Removing RecipeCollage

If you want a page with AuthShell but different right content:

```jsx
<AuthShell
  left={<Form />}
  right={<YourCustomContent />}
/>
```

### Single Column Layout

If you only need the left column:

```jsx
<AuthShell>
  <YourContent />
</AuthShell>
```

## Testing Checklist

When modifying these pages:

- [ ] Check responsive behavior at 900px breakpoint
- [ ] Verify TopNav hidden on full-screen pages
- [ ] Test navigation between pages
- [ ] Confirm CTAs route correctly
- [ ] Check form validation (Register)
- [ ] Test error message display
- [ ] Verify CSS variables work
- [ ] Check mobile layout (stacked)
- [ ] Test button interactions
- [ ] Validate accessibility (keyboard nav)

## Summary

Three pages (`/`, `/login`, `/register`) now use the same architecture:
- ✅ `AuthShell` for layout
- ✅ `RecipeCollage` for visuals
- ✅ No TopNav distraction
- ✅ Full-screen experience
- ✅ Consistent styling
- ✅ Responsive design

This creates a cohesive, professional authentication and onboarding journey that:
- Engages visitors visually
- Guides users clearly
- Maintains consistency
- Optimizes for conversions
- Provides excellent UX

All three pages work together to create a complete, polished product experience! 🎨✨
