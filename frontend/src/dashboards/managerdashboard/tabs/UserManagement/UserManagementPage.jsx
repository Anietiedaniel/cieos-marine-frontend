import React, { useState } from 'react';
import UserStatsHeader from './UserStatsHeader';
import UserTable from './UserTable';
import InviteUserModal from './InviteUserModal'; 

const UserManagementPage = () => {
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  const pageContainer = {
    padding: "30px",
    backgroundColor: "#f4f7f6",
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif"
  };

  const topHeader = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px"
  };

  const whiteBtn = {
    padding: "10px 20px",
    borderRadius: "10px",
    border: "1px solid #e0e0e0",
    backgroundColor: "#fff",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.2s ease"
  };

  return (
    <div style={pageContainer}>
      <div style={topHeader}>
        <h1 style={{ fontSize: "28px", margin: 0, fontWeight: "700", color: "#1a1a1a" }}>User Management</h1>
        <div style={{ display: "flex", gap: "12px" }}>
          <button style={whiteBtn} onClick={() => setIsInviteOpen(true)}>
            invite user
          </button>
          <button style={whiteBtn}>
            <span style={{ fontSize: '18px' }}>⊞</span> Create Team
          </button>
          <button style={whiteBtn}>
            <span>⇪</span> Import
          </button>
        </div>
      </div>

      <UserStatsHeader />
      
      <div style={{ 
        backgroundColor: "#fff", 
        borderRadius: "16px", 
        padding: "24px",
        marginTop: "24px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
        border: "1px solid #edf2f7"
      }}>
        <UserTable />
      </div>

      {/* Invite User Modal Trigger */}
      {isInviteOpen && (
        <InviteUserModal onClose={() => setIsInviteOpen(false)} />
      )}
    </div>
  );
};

export default UserManagementPage;