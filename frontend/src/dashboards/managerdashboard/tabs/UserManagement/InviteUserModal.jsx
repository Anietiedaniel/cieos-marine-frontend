import React, { useState } from 'react';

const InviteUserModal = ({ onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState('Admin');

  const overlayStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex',
    justifyContent: 'center', alignItems: 'center', zIndex: 1000,
    backdropFilter: 'blur(4px)'
  };

  const modalStyle = {
    backgroundColor: 'white', padding: '32px', borderRadius: '20px',
    width: '850px', maxWidth: '95%', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
  };

  const inputStyle = {
    width: '100%', padding: '14px', borderRadius: '12px',
    border: '1px solid #E2E8F0', fontSize: '14px', outline: 'none',
    marginTop: '8px', boxSizing: 'border-box'
  };

  const categoryBtn = (type) => ({
    flex: 1, padding: '16px', borderRadius: '12px', border: 'none',
    cursor: 'pointer', fontWeight: '600', fontSize: '14px',
    backgroundColor: selectedCategory === type ? '#86a374' : '#f8fafc',
    color: selectedCategory === type ? 'white' : '#64748b',
    transition: 'all 0.2s ease'
  });

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700' }}>Invite user</h2>
          <button style={{
            padding: '10px 24px', borderRadius: '10px', border: '1px solid #E2E8F0',
            background: 'white', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px'
          }}>
            <span style={{ fontSize: '20px' }}>+</span> Invite
          </button>
        </div>

        {/* Form Inputs */}
        <div style={{ display: 'flex', gap: '24px', marginBottom: '24px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '16px', fontWeight: '600' }}>Full name</label>
            <input style={inputStyle} placeholder="Enter name" />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '16px', fontWeight: '600' }}>Email address</label>
            <select style={inputStyle}>
              <option>Select Category</option>
              <option value="">Certificate</option>
              <option value="">Personal document</option>
              <option value="">Equipment document</option>
              <option value="">Part Document</option>
              <option value="">Manual</option>
              <option value="">inspection report</option>
              <option value="">Insurance</option>
              <option value="">Compliance</option>
            </select>
          </div>
        </div>

        {/* Category Picker */}
        <div style={{ marginBottom: '30px' }}>
          <label style={{ fontSize: '16px', fontWeight: '600', display: 'block', marginBottom: '12px' }}>
            Select user category
          </label>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button onClick={() => setSelectedCategory('Admin')} style={categoryBtn('Admin')}>Admin</button>
            <button onClick={() => setSelectedCategory('Technician')} style={categoryBtn('Technician')}>Technician</button>
            <button onClick={() => setSelectedCategory('Crew member')} style={categoryBtn('Crew member')}>Crew member</button>
          </div>
        </div>

        {/* Bulk Invite / Upload Area */}
        <div>
          <label style={{ fontSize: '16px', fontWeight: '600', display: 'block', marginBottom: '12px' }}>Bulk invite</label>
          <div style={{
            border: '2px dashed #CBD5E1', borderRadius: '16px', padding: '40px',
            textAlign: 'center', backgroundColor: '#fff'
          }}>
            <button style={{
              padding: '10px 24px', borderRadius: '10px', border: '1px solid #E2E8F0',
              background: 'white', cursor: 'pointer', fontWeight: '600', marginBottom: '16px'
            }}>Upload</button>
            <p style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '500' }}>Select a file to Upload</p>
            <p style={{ margin: 0, fontSize: '15px', color: '#86a374', fontWeight: '500' }}>Or drag and drop it here</p>
          </div>
        </div>

        <p style={{ marginTop: '20px', fontSize: '13px', color: '#64748b' }}>
          Users would receive invite via email
        </p>

      </div>
    </div>
  );
};

export default InviteUserModal;