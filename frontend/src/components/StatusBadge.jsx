const StatusBadge = ({ status }) => {
  // Mapping styles to match the screenshot exactly
  const styles = {
    Valid: {
      background: "#2d7a45", // Deep forest green
      color: "#ffffff",
    },
    Expired: {
      background: "#b91c1c", // Deep crimson red
      color: "#ffffff",
    },
    "Expiring soon": {
      background: "#fef3c7", // Soft pale yellow
      color: "#d97706",    // Darker orange text for readability
      border: "1px solid #fde68a"
    }
  };

  const currentStyle = styles[status] || styles["Valid"];

  return (
    <span
      style={{
        backgroundColor: currentStyle.background,
        color: currentStyle.color,
        border: currentStyle.border || "none",
        padding: "4px 14px",
        borderRadius: "20px", // Full pill shape
        fontSize: "11px",
        fontWeight: "600",
        display: "inline-block",
        textAlign: "center",
        minWidth: "80px",
        textTransform: "capitalize"
      }}
    >
      {status}
    </span>
  );
};

export default StatusBadge;