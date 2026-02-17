# RecipeCollage Component

A purely decorative visual component that displays floating recipe preview cards with a subtle background grid. Designed for use on the right side of `AuthShell` to create an engaging authentication experience.

## Features

- **Non-interactive** - `pointer-events: none` ensures it doesn't block interactions
- **Floating cards** - 3 recipe preview cards positioned at different angles
- **Animated background** - Subtle glows and grid pattern
- **Theme-aware** - Uses CSS variables with fallbacks for light/dark themes
- **No data required** - All content is mock/static
- **Responsive-friendly** - Works with AuthShell's responsive layout

## Usage

### Basic usage with AuthShell

```jsx
import AuthShell from "./components/AuthShell";
import RecipeCollage from "./components/RecipeCollage";

function LoginPage() {
  return (
    <AuthShell
      left={<LoginForm />}
      right={<RecipeCollage />}
    />
  );
}
```

### Standalone usage

```jsx
import RecipeCollage from "./components/RecipeCollage";

function MarketingSection() {
  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <RecipeCollage />
    </div>
  );
}
```

## Visual Elements

### Background Layers
1. **Gradient glows** - Orange (top-left) and deep red (bottom-right)
2. **Grid pattern** - Subtle 60×60px grid
3. **Radial fade** - Blends edges into background

### Recipe Cards
Each card displays:
- Recipe thumbnail (gradient placeholder)
- Title and metadata (time, category)
- Star rating
- Tags/categories
- Macro information (calories, protein)
- Mock review quote

### Card Positioning
- **Card 1**: Top-left, rotated -5deg
- **Card 2**: Middle-right, rotated 4deg
- **Card 3**: Bottom-left, rotated 3deg

## CSS Variables Used

The component uses the following CSS variables with fallback values:

| Variable | Fallback | Usage |
|----------|----------|-------|
| `--olive` | `#8A8635` | Card thumbnails |
| `--deepRed` | `#AA2B1D` | Background glow |
| `--orange` | `#CC561E` | Background glow, gradients |
| `--cream` | `#F3CF7A` | Text, titles |
| `--bg` | `#242424` | Fade overlay |
| `--border` | `rgba(243,207,122,0.22)` | Card borders |
| `--muted` | `rgba(243,207,122,0.75)` | Secondary text |

All variables are defined in `src/index.css`.

## Customization

### Changing Mock Content

Edit the `RecipePreviewCard` instances in `RecipeCollage.jsx`:

```jsx
<RecipePreviewCard
  style={{ top: "12%", left: "8%", transform: "rotate(-5deg)" }}
  title="Your Recipe Title"
  time="30 min"
  tag="Your Tag"
  rating="5.0★"
  calories="600 kcal"
  protein="40g"
  tags={["Tag1", "Tag2", "Tag3"]}
/>
```

### Adjusting Card Count

Add or remove `<RecipePreviewCard>` components as needed. Recommended: 2-4 cards for optimal visual balance.

### Positioning

Modify the `style` prop on each card:
- `top` / `bottom` / `left` / `right` - Position (%, px, etc.)
- `transform: rotate(Xdeg)` - Rotation angle

## Performance

- **Lightweight** - Pure CSS with minimal DOM nodes
- **No animations** - Static positioning (add CSS transitions if desired)
- **No external dependencies** - Vanilla React + inline styles

## Accessibility

- Non-interactive (no keyboard/screen reader issues)
- Purely decorative - no semantic meaning
- Consider adding `aria-hidden="true"` to the container if used in production

## Design Notes

- Card opacity and backdrop-filter create depth
- Slight rotations add dynamism without chaos
- Grid + glows provide subtle texture
- Works in both light and dark color schemes
- Mock content chosen to represent variety (seafood, chicken, vegetarian)
