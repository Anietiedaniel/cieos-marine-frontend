import React from 'react';
import TeamBadge from './TeamBadge';
import StatusBadge from '../../../../components/StatusBadge'; // Reusing your existing badge component

const UserTable = () => {
  // Mock data based on your screenshot
  const users = [
    { id: 1, name: "Capt. James Morrison", role: "Admin", team: "Inspection team", date: "5th march,2026", status: "Expired" },
    { id: 2, name: "Safety Equipment Certificate", role: "Crew member", team: "Maintenance team", date: "5th march,2026", status: "Expiring soon" },
    { id: 3, name: "C/E Robert Chen", role: "Admin", team: "Inspection team", date: "5th march,2026", status: "Valid" },
    { id: 4, name: "C/O Maria Santos", role: "Crew member", team: "Maintenance team", date: "5th march,2026", status: "Expiring soon" },
    { id: 5, name: "AB David Kim", role: "Technician", team: "Repair team", date: "5th march,2026", status: "Valid" },
  ];

  const thStyle = {
    textAlign: 'left',
    padding: '16px',
    color: '#64748b',
    fontSize: '14px',
    fontWeight: '500',
    backgroundColor: '#f8fafc', // Very light gray/blue header
    borderBottom: '1px solid #f1f5f9'
  };

  const tdStyle = {
    padding: '16px',
    fontSize: '14px',
    color: '#334155',
    borderBottom: '1px solid #f1f5f9',
    verticalAlign: 'middle'
  };

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ ...thStyle, borderTopLeftRadius: '12px' }}>Name</th>
            <th style={thStyle}>Role</th>
            <th style={thStyle}>Team</th>
            <th style={thStyle}>Entry Date</th>
            <th style={thStyle}>Compliance</th>
            <th style={{ ...thStyle, textAlign: 'right', borderTopRightRadius: '12px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} style={{ transition: 'background 0.2s' }}>
              <td style={{ ...tdStyle, fontWeight: '500' }}>{user.name}</td>
              <td style={tdStyle}>{user.role}</td>
              <td style={tdStyle}>
                <TeamBadge 
                  teamName={user.team} 
                  color={user.team.includes('Repair') ? '#eff6ff' : '#f0fdf4'} 
                />
              </td>
              <td style={tdStyle}>{user.date}</td>
              <td style={tdStyle}>
                <StatusBadge status={user.status} />
              </td>
              <td style={{ ...tdStyle, textAlign: 'right' }}>
                <button style={{ 
                  background: 'none', border: 'none', cursor: 'pointer', 
                  fontSize: '18px', color: '#94a3b8' 
                }}>⋮</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;