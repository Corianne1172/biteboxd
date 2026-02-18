# BiteBoxd Theme System

This document describes the light/dark theme support implemented in BiteBoxd using CSS variables and `prefers-color-scheme`.

## Overview

BiteBoxd now supports automatic light/dark theme switching based on the user's system preferences. The theme system uses CSS variables defined in `index.css` that automatically adapt to the user's preferred color scheme.

## Theme Variables

### Background Gradients

```css
--theme-bg-gradient          /* Default page background gradient */
--theme-bg-gradient-warm     /* Warm variant (reddish tones) */
--theme-bg-gradient-cool     /* Cool variant (deeper tones) */
```

**Light Mode:**
- Default: `linear-gradient(180deg, #E4DEBE 0%, #E6BAA3 50%, #D24545 100%)`
- Warm: `linear-gradient(180deg, #A94438 0%, #D24545 35%, #E6BAA3 70%, #E4DEBE 100%)`
- Cool: `linear-gradient(180deg, #E4DEBE 0%, #E6BAA3 40%, #D24545 80%, #A94438 100%)`

**Dark Mode:**
- Default: `linear-gradient(180deg, #1a1410 0%, #2a1a16 50%, #3a1f1a 100%)`
- Warm: `linear-gradient(180deg, #2a1410 0%, #3a1f1a 35%, #4a2620 70%, #3d2520 100%)`
- Cool: `linear-gradient(180deg, #1a1410 0%, #2a1f1a 40%, #3a1f1a 80%, #2a1410 100%)`

### Content Colors

```css
--theme-card-bg              /* Card/container backgrounds */
--theme-text                 /* Primary text color */
--theme-text-secondary       /* Secondary/muted text color */
--theme-border               /* Border colors */
--theme-input-bg             /* Input field backgrounds */
--theme-input-border         /* Input field borders */
```

**Light Mode Values:**
- Card BG: `rgba(255, 255, 255, 0.95)` (translucent white)
- Text: `#333333` (dark gray)
- Text Secondary: `#666666` (medium gray)
- Border: `rgba(230, 186, 163, 0.3)` (light peach)
- Input BG: `#F5F5F5` (light gray)
- Input Border: `#E0E0E0` (light gray border)

**Dark Mode Values:**
- Card BG: `rgba(27, 24, 19, 0.95)` (translucent dark brown)
- Text: `#f0f0f0` (light gray)
- Text Secondary: `#cccccc` (lighter gray)
- Border: `rgba(243, 207, 122, 0.22)` (cream tint)
- Input BG: `#2d2520` (dark brown)
- Input Border: `rgba(230, 186, 163, 0.3)` (peach tint)

### Palette Colors (Theme-Independent)

These colors remain consistent across light and dark modes:

```css
--palette-maroon: #A94438
--palette-red: #D24545
--palette-peach: #E6BAA3
--palette-beige: #E4DEBE
```

## Component Usage

### PageShell

The `PageShell` component uses gradient variants:

```jsx
<PageShell gradient="default">  {/* or "warm" or "cool" */}
  {children}
</PageShell>
```

### Card

Cards automatically adapt to the theme:

```jsx
<Card>
  {/* Content uses var(--theme-text) for text color */}
</Card>
```

### Form Inputs

Input fields use theme-aware backgrounds and borders:

```jsx
<Input style={{
  background: "var(--theme-card-bg)",
  border: "2px solid var(--palette-peach)",
  color: "var(--theme-text)"
}} />
```

### Text Colors

For consistent text coloring:

```jsx
// Primary headings/labels
<h2 style={{ color: "var(--palette-maroon)" }}>Title</h2>

// Body text
<p style={{ color: "var(--theme-text)" }}>Content</p>

// Secondary/muted text
<span style={{ color: "var(--theme-text-secondary)" }}>Details</span>
```

## Implementation Details

### How It Works

1. **CSS Variables in `:root`**: Default (light mode) values are defined in the `:root` selector
2. **Media Query Override**: `@media (prefers-color-scheme: dark)` overrides specific variables for dark mode
3. **Automatic Switching**: The browser automatically applies dark mode when the user's system is in dark mode
4. **No JavaScript Required**: This is a pure CSS solution using native browser capabilities

### Browser Support

- Chrome/Edge: ✅ Full support (v76+)
- Firefox: ✅ Full support (v67+)
- Safari: ✅ Full support (v12.1+)
- All modern browsers support `prefers-color-scheme`

## Testing Dark Mode

### macOS
1. System Preferences → General → Appearance → Dark

### Windows
1. Settings → Personalization → Colors → Choose your color → Dark

### Linux (GNOME)
1. Settings → Appearance → Dark

### Browser DevTools
Most browsers allow forcing color scheme in DevTools:
- Chrome: DevTools → Rendering → Emulate CSS media feature `prefers-color-scheme`
- Firefox: DevTools → Inspector → Rules → Toggle color scheme icon

## Adding New Components

When creating new components, follow these patterns:

### Do ✅

```jsx
// Use theme variables for colors that should adapt
const styles = {
  card: {
    background: "var(--theme-card-bg)",
    color: "var(--theme-text)",
    border: "1px solid var(--theme-border)",
  },
  heading: {
    color: "var(--palette-maroon)", // Brand color, consistent across themes
  }
};
```

### Don't ❌

```jsx
// Avoid hardcoded colors for backgrounds and text
const styles = {
  card: {
    background: "#ffffff",  // ❌ Won't adapt to dark mode
    color: "#333333",       // ❌ Won't adapt to dark mode
  }
};
```

## Customization

To adjust theme colors, edit `frontend/src/index.css`:

1. **Light mode**: Edit values in `:root`
2. **Dark mode**: Edit values in `@media (prefers-color-scheme: dark)`

Example:

```css
:root {
  --theme-text: #333333;  /* Light mode text */
}

@media (prefers-color-scheme: dark) {
  :root {
    --theme-text: #f0f0f0;  /* Dark mode text */
  }
}
```

## Benefits

1. **Automatic**: No user toggle needed—respects system preferences
2. **Maintainable**: Change theme colors in one place (`index.css`)
3. **Performance**: Pure CSS, no JavaScript overhead
4. **Accessibility**: Respects user's visual preferences
5. **Future-proof**: Easy to extend with more themes

## Future Enhancements

Possible future improvements:

1. **Manual Toggle**: Add a UI toggle to override system preference
2. **Custom Themes**: Allow users to select from preset color schemes
3. **Per-Component Themes**: Theme-specific variants for special pages
4. **High Contrast Mode**: Support for `prefers-contrast: high`
