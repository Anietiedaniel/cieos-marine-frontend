const TeamBadge = ({ teamName, color }) => {
  const container = {
    display: "flex",
    alignItems: "center",
    backgroundColor: color || "#f0f7f0", // light green or light red
    padding: "4px 12px",
    borderRadius: "20px",
    width: "fit-content"
  };

  const avatarStack = {
    display: "flex",
    marginRight: "8px"
  };

  const avatar = {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    border: "2px solid #fff",
    marginLeft: "-8px",
    backgroundColor: "#ccc"
  };

  return (
    <div style={container}>
      <div style={avatarStack}>
        <div style={{...avatar, marginLeft: 0}}></div>
        <div style={avatar}></div>
        <div style={avatar}></div>
      </div>
      <span style={{ fontSize: "12px", fontWeight: "500" }}>{teamName}</span>
      <span style={{ color: "#888", fontSize: "10px", marginLeft: "6px" }}>+5more</span>
    </div>
  );
};

export default TeamBadge;