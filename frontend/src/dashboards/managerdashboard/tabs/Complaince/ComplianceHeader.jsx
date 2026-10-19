const ComplianceHeader = ({ search, setSearch, onUploadClick }) => {
  const headerContainer = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center", // Changed to center for better alignment
    marginBottom: "40px"
  };

  const titleStyle = {
    fontSize: "32px", // Slightly larger
    fontWeight: "600",
    color: "#1a1a1a",
    margin: "0 0 4px 0",
    fontFamily: "inherit"
  };

  const subtitleStyle = {
    color: "#777",
    fontSize: "15px",
    margin: 0
  };

  const buttonGroup = {
    display: "flex",
    gap: "12px",
    alignItems: "center"
  };

  const btnBase = {
    padding: "10px 28px",
    borderRadius: "12px", // More "squircle" than pill, per your img
    border: "1px solid #e0e0e0",
    backgroundColor: "white",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
    transition: "background 0.2s"
  };

  const primaryBtn = {
    ...btnBase,
    backgroundColor: "#fff",
    border: "1.5px solid #222",
    color: "#222"
  };

  return (
    <div style={headerContainer}>
      <div>
        <h1 style={titleStyle}>Document</h1>
        <p style={subtitleStyle}>Hello there! Here's an Overview of your Maintenance Operations</p>
      </div>

      <div style={buttonGroup}>
        {/* Added the Tracker button from the img */}
        <button style={btnBase} onMouseOver={(e) => e.target.style.background = "#f9f9f9"} onMouseOut={(e) => e.target.style.background = "#fff"}>
            Tracker
        </button>
        <button style={primaryBtn} onClick={onUploadClick}>
            Upload
        </button>
      </div>
    </div>
  );
}

export default ComplianceHeader;