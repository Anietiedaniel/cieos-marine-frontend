import { useState } from "react";

const tabs = ["General", "Personnel", "Equipment", "Parts", "Vessel"];

const ComplianceTabs = () => {
  const [active, setActive] = useState("General");

  const containerStyle = {
    display: "flex",
    gap: "12px",
    marginBottom: "30px",
  };

  const getTabStyle = (isActive) => ({
    padding: "8px 24px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    borderRadius: "25px", // Pill shape
    transition: "all 0.2s ease",
    border: isActive ? "1px solid #86a374" : "1px solid #d1d1d1",
    background: isActive ? "#86a374" : "#e5e7eb", // Sage green for active
    color: isActive ? "#ffffff" : "#4b5563",
  });

  return (
    <div style={containerStyle}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          style={getTabStyle(active === tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default ComplianceTabs;