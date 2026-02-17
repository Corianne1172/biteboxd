# BiteBoxd Authentication Components Guide

Complete guide for using `AuthShell` and `RecipeCollage` together for beautiful authentication pages.

## Overview

Two components work together to create engaging auth experiences:

1. **AuthShell** - Responsive 2-column layout container
2. **RecipeCollage** - Decorative floating recipe cards background

## Quick Start

```jsx
import { AuthShell, RecipeCollage } from "./components/UI";

function LoginPage() {
  return (
    <AuthShell
      left={<YourLoginForm />}
      right={<RecipeCollage />}
    />
  );
}
```

## Component Details

### AuthShell

**Purpose**: Responsive layout container for auth pages

**Props**:
- `left` (ReactNode) - Main content column (form, etc.)
- `right` (ReactNode) - Secondary column (branding, collage, etc.)
- `children` (ReactNode) - Alternative to `left` for single-column layout

**Layout Behavior**:
- **Desktop (>900px)**: Side-by-side columns
  - Left: 360-520px, centered content
  - Right: Fills remaining space
- **Mobile (≤900px)**: Stacked vertically
  - Left: Full width, 100vh min
  - Right: Full width, 50vh min, below left

**Key Features**:
- Full viewport (100vh × 100vw)
- Smooth responsive transitions
- Independent scroll for each column
- CSS variable integration

### RecipeCollage

**Purpose**: Visual decoration with floating recipe cards

**Features**:
- 3 floating recipe preview cards with mock content
- Subtle gradient glows (orange, deep red)
- Background grid pattern
- Non-interactive (`pointer-events: none`)
- Theme-aware (uses CSS variables)
- No data required

**Visual Elements**:
- Card positioning: Staggered with slight rotations
- Each card shows: title, time, rating, tags, macros, review
- Background layers: glows → grid → cards → fade

## Usage Patterns

### Pattern 1: Login Page

```jsx
import { AuthShell, RecipeCollage } from "./components/UI";

export default function Login() {
  return (
    <AuthShell
      left={
        <div style={{ width: "100%", maxWidth: 400 }}>
          <h2>Welcome Back</h2>
          <form>{/* Login form */}</form>
        </div>
      }
      right={<RecipeCollage />}
    />
  );
}
```

### Pattern 2: Register Page

```jsx
import { AuthShell, RecipeCollage } from "./components/UI";

export default function Register() {
  return (
    <AuthShell
      left={
        <div style={{ width: "100%", maxWidth: 400 }}>
          <h2>Create Account</h2>
          <form>{/* Register form */}</form>
        </div>
      }
      right={<RecipeCollage />}
    />
  );
}
```

### Pattern 3: Simple Auth (No Collage)

```jsx
import { AuthShell } from "./components/UI";

export default function ResetPassword() {
  return (
    <AuthShell>
      <div style={{ maxWidth: 400 }}>
        <h2>Reset Password</h2>
        <form>{/* Reset form */}</form>
      </div>
    </AuthShell>
  );
}
```

### Pattern 4: Custom Right Content

```jsx
import { AuthShell } from "./components/UI";

export default function CustomAuth() {
  return (
    <AuthShell
      left={<YourForm />}
      right={
        <div style={{ textAlign: "center" }}>
          <h1>Your Branding</h1>
          <p>Custom marketing copy</p>
        </div>
      }
    />
  );
}
```

## CSS Variables Reference

These components use the following CSS variables (all defined in `src/index.css`):

### Core Variables
- `--bg` - Main background (#242424)
- `--ink` - Dark text/background (#14120f)
- `--card` - Card background (#1b1813)
- `--border` - Border color (rgba cream)
- `--muted` - Muted text (rgba cream)

### Palette Variables
- `--olive` - #8A8635
- `--deepRed` - #AA2B1D
- `--orange` - #CC561E
- `--cream` - #F3CF7A

### Spacing
- `--spacing-xs` - 6px
- `--spacing-sm` - 10px
- `--spacing-md` - 12px
- `--spacing-lg` - 24px

### Border Radius
- `--radius-sm` - 8px
- `--radius-md` - 10px
- `--radius-lg` - 16px

## Styling Tips

### Form Inputs

Use CSS variables for consistency:

```jsx
const inputStyle = {
  padding: "12px 14px",
  borderRadius: "var(--radius-md)",
  border: "1px solid var(--border)",
  background: "rgba(20,18,15,0.5)",
  color: "var(--cream)",
  outline: "none",
};
```

### Buttons

Gradient buttons match the design system:

```jsx
const buttonStyle = {
  padding: "12px 16px",
  borderRadius: "var(--radius-md)",
  border: "none",
  background: "linear-gradient(135deg, var(--cream), var(--orange))",
  color: "#1a130a",
  fontWeight: 800,
  cursor: "pointer",
};
```

### Logo/Brand Element

```jsx
const logoStyle = {
  width: 48,
  height: 48,
  borderRadius: 12,
  background: "linear-gradient(135deg, var(--olive), var(--orange))",
  boxShadow: "0 0 0 4px var(--border)",
};
```

## Responsive Considerations

### Desktop Experience
- Left column is comfortable reading width (360-520px)
- Right column shows full collage with all 3 cards
- Cards float with subtle rotations
- Background glows create depth

### Mobile Experience
- Form takes priority (full viewport height)
- Collage moves below form (50vh minimum)
- Cards remain visible but may stack differently
- Touch-friendly form spacing

### Breakpoint: 900px
- Chosen to balance form readability and collage visibility
- Adjust in `AuthShell.jsx` if needed: `window.innerWidth <= 900`

## Performance

- **Lightweight**: ~2KB total for both components
- **No animations**: Static positioning (add CSS transitions if desired)
- **No images**: Pure CSS gradients and backgrounds
- **SSR-friendly**: Works with server-side rendering

## Accessibility

- Use semantic HTML inside `left` prop (`<form>`, `<label>`, etc.)
- Collage is decorative (`pointer-events: none`)
- Consider adding `aria-hidden="true"` to RecipeCollage
- Ensure proper color contrast for form elements
- Test with screen readers and keyboard navigation

## File Locations

```
frontend/src/
├── components/
│   ├── AuthShell.jsx
│   ├── AuthShell.README.md
│   ├── AuthShell.example.jsx
│   ├── RecipeCollage.jsx
│   ├── RecipeCollage.README.md
│   ├── RecipeCollage.example.jsx
│   ├── AuthShell+RecipeCollage.example.jsx
│   └── UI/
│       └── index.js (exports both components)
└── index.css (CSS variables)
```

## Example Projects

See `AuthShell+RecipeCollage.example.jsx` for complete working examples:
- `LoginPageWithCollage` - Full login page
- `RegisterPageWithCollage` - Full registration page

## Customization

### Changing Collage Content

Edit `RecipeCollage.jsx` to modify:
- Recipe titles and metadata
- Card positions and rotations
- Number of cards (2-4 recommended)
- Background glow colors

### Changing Layout Breakpoint

Edit `AuthShell.jsx`:

```jsx
const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
//                                                           ^^^ Change this
```

### Adding Animations

Add CSS transitions to AuthShell or RecipeCollage styles:

```jsx
const cardStyles = {
  base: {
    // ... existing styles
    transition: "transform 0.3s ease",
  },
};
```

## Testing

Both components have been tested for:
- ✅ No linter errors
- ✅ Successful Vite build
- ✅ CSS variable fallbacks
- ✅ Responsive behavior
- ✅ Non-blocking interactions

## Questions & Support

For issues or customization help:
1. Check individual component READMEs
2. Review example files
3. Inspect CSS variables in `index.css`
4. Test responsiveness at various viewport sizes
