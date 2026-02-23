export default function Button({ 
  children, 
  variant = "primary", 
  onClick, 
  type = "button",
  disabled = false,
  style = {},
  ...props 
}) {
  const variants = {
    primary: {
      background: "linear-gradient(135deg, #D24545 0%, #A94438 100%)",
      color: "white",
      border: "none",
      boxShadow: "0 4px 16px rgba(169, 68, 56, 0.4)",
    },
    secondary: {
      background: "transparent",
      color: "#A94438",
      border: "2px solid #E6BAA3",
      boxShadow: "none",
    },
    danger: {
      background: "#D24545",
      color: "white",
      border: "none",
      boxShadow: "0 2px 8px rgba(210, 69, 69, 0.3)",
    },
    light: {
      background: "linear-gradient(135deg, #E6BAA3 0%, #E4DEBE 100%)",
      color: "#A94438",
      border: "none",
      boxShadow: "0 2px 8px rgba(169, 68, 56, 0.2)",
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...variants[variant],
        padding: "12px 24px",
        fontSize: 15,
        fontWeight: 700,
        borderRadius: 12,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "all 0.2s ease",
        fontFamily: "inherit",
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}
