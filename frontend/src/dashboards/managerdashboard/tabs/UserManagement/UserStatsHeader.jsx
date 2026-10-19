const UserStatsHeader = () => {
  const stats = [
    { label: "Total user", count: 6 },
    { label: "Active user", count: 3 },
    { label: "Administrator", count: 1 },
    { label: "Crew members", count: 60 },
  ];

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px"
  };

  const cardStyle = {
    backgroundColor: "#fff",
    padding: "24px",
    borderRadius: "12px",
    textAlign: "center",
    border: "1px solid #f0f0f0"
  };

  return (
    <div style={gridStyle}>
      {stats.map((stat, i) => (
        <div key={i} style={cardStyle}>
          <div style={{ fontSize: "32px", fontWeight: "700", marginBottom: "8px" }}>{stat.count}</div>
          <div style={{ color: "#666", fontSize: "14px" }}>{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default UserStatsHeader;