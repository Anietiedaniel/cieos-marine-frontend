import React, { useState, useRef } from 'react';

const UploadModal = ({ onClose, onUpload }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    type: "",
    date: ""
  });
  
  // State for interactivity
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Drag and Drop Logic
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setIsDragging(true);
    else if (e.type === "dragleave") setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const onFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Styles
  const overlayStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.6)', // Darker, more modern blue-tint
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    zIndex: 1000, backdropFilter: 'blur(8px)', // heavier blur for focus
    transition: 'all 0.3s ease'
  };

  const modalStyle = {
    backgroundColor: 'white', padding: '40px', borderRadius: '24px',
    width: '720px', maxWidth: '95%', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    animation: 'modalSlideIn 0.4s ease-out'
  };

  const inputStyle = {
    padding: '12px 16px', borderRadius: '12px', border: '1px solid #E2E8F0',
    fontSize: '14px', outline: 'none', transition: 'border-color 0.2s',
    width: '100%', boxSizing: 'border-box'
  };

  const dropZoneStyle = {
    border: isDragging ? '2px dashed #86a374' : '2px dashed #CBD5E1',
    backgroundColor: isDragging ? '#f7f9f7' : '#fcfcfc',
    borderRadius: '16px', padding: '40px', textAlign: 'center',
    marginTop: '24px', transition: 'all 0.2s ease', cursor: 'pointer'
  };

  const primaryBtn = {
    background: '#1a1a1a', color: 'white', padding: '12px 32px', 
    borderRadius: '12px', border: 'none', cursor: 'pointer', 
    fontWeight: '600', transition: 'transform 0.1s active'
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <style>
        {`
          @keyframes modalSlideIn {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          input:focus, select:focus { border-color: #86a374 !important; }
        `}
      </style>
      
      <div style={modalStyle} onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px', alignItems: 'center' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#1e293b' }}>Upload Doc</h2>
            <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '14px' }}>Fill in the details to add a new document</p>
          </div>
          <button style={{
            padding: '10px 16px', borderRadius: '10px', border: '1px solid #E2E8F0',
            background: 'white', cursor: 'pointer', fontWeight: '600', color: '#475569'
          }}>+ Add More</button>
        </div>

        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Document Title</label>
              <input 
                name="title"
                style={inputStyle} 
                placeholder="e.g. Insurance Certificate" 
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Category</label>
              <select name="category" style={inputStyle} value={formData.category} onChange={handleChange}>
                <option value="">Select Category</option>
                <option value="Certificate">Certificate</option>
                <option value="Personnel">Personnel document</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Related Record Type</label>
              <select name="type" style={inputStyle} value={formData.type} onChange={handleChange}>
                <option value="">Select Type</option>
                <option value="Vessel">Vessel</option>
                <option value="Personnel">Personnel</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Issue Date</label>
              <input 
                type="date" 
                name="date"
                style={inputStyle} 
                value={formData.date}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Interactive Drop Zone */}
        <div 
          style={dropZoneStyle}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={onFileSelect} 
            style={{ display: 'none' }} 
          />
          
          <div style={{
            width: '48px', height: '48px', backgroundColor: '#f1f5f9', 
            borderRadius: '50%', display: 'flex', alignItems: 'center', 
            justifyContent: 'center', margin: '0 auto 16px'
          }}>
            <span style={{ fontSize: '20px' }}>{selectedFile ? '📄' : '📤'}</span>
          </div>

          <p style={{ margin: '4px 0', fontSize: '16px', fontWeight: '600', color: '#1e293b' }}>
            {selectedFile ? selectedFile.name : 'Select a file to Upload'}
          </p>
          <p style={{ margin: 0, fontSize: '14px', color: '#86a374' }}>
            {selectedFile ? `${(selectedFile.size / 1024).toFixed(1)} KB` : 'Or drag and drop it here'}
          </p>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '40px' }}>
          <button 
            onClick={onClose} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', fontWeight: '600' }}
          >
            Cancel
          </button>
          <button 
            style={primaryBtn}
            onClick={() => onUpload({ ...formData, file: selectedFile })}
          >
            Save Document
          </button>
        </div>

      </div>
    </div>
  );
};

export default UploadModal;