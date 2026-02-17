/**
 * Shared responsive styles and focus states for auth pages
 * Used by Login, Register, and Home pages
 */

// Check if screen is small mobile
export const isSmallMobile = () => window.innerWidth <= 420;

// Base input styles with proper focus states
export const inputStyles = {
  padding: "11px 12px",
  borderRadius: "var(--radius-md)",
  border: "1px solid var(--color-line)",
  background: "rgba(20,18,15,0.65)",
  color: "var(--color-cream)",
  fontSize: 14,
  width: "100%",
  boxSizing: "border-box",
};

// Focus state for inputs (works in light and dark themes)
export const inputFocusStyles = {
  outline: "2px solid var(--color-cream)",
  outlineOffset: "2px",
  borderColor: "var(--color-cream)",
};

// Base button styles
export const buttonBaseStyles = {
  padding: "12px 14px",
  borderRadius: "var(--radius-md)",
  fontWeight: 800,
  cursor: "pointer",
  transition: "opacity 0.2s, transform 0.2s",
  fontSize: 16,
  width: "100%",
  boxSizing: "border-box",
};

// Primary button (gradient)
export const primaryButtonStyles = {
  ...buttonBaseStyles,
  border: "none",
  background: "linear-gradient(135deg, var(--color-cream), var(--color-orange))",
  color: "#1a130a",
};

// Primary button focus state
export const primaryButtonFocusStyles = {
  outline: "3px solid var(--color-cream)",
  outlineOffset: "2px",
  transform: "scale(1.02)",
};

// Secondary button (outlined)
export const secondaryButtonStyles = {
  ...buttonBaseStyles,
  border: "1px solid var(--color-line)",
  background: "rgba(20,18,15,0.5)",
  color: "var(--color-cream)",
};

// Secondary button focus state
export const secondaryButtonFocusStyles = {
  outline: "2px solid var(--color-cream)",
  outlineOffset: "2px",
  borderColor: "var(--color-cream)",
};

// Responsive container styles
export const getContainerStyles = (isSmall) => ({
  width: "100%",
  maxWidth: isSmall ? "100%" : 400,
  padding: isSmall ? "0 8px" : 0,
});

// Responsive form styles
export const getFormStyles = (isSmall) => ({
  display: "grid",
  gap: isSmall ? "var(--spacing-sm)" : "var(--spacing-md)",
  marginTop: 16,
});
