import DocumentRow from "../../../../components/DocumentRow"

const ComplianceTable = ({ documents }) => {
  
  const tableContainerStyle = {
    width: "100%",
    overflowX: "auto",
    marginTop: "10px",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    fontFamily: "'Inter', sans-serif",
  };

  const headerRowStyle = {
    backgroundColor: "#f7f9f7", // The soft sage/off-white header from the image
    textAlign: "left",
  };

  const thStyle = {
    padding: "16px 12px",
    fontSize: "15px",
    fontWeight: "500",
    color: "#6b7280", // Muted gray text for headers
    borderBottom: "1px solid #edf2ed",
  };

  return (
    <div style={tableContainerStyle}>
      <table style={tableStyle}>
        <thead>
          <tr style={headerRowStyle}>
            <th style={thStyle}>Tittle</th>
            <th style={thStyle}>Category</th>
            <th style={thStyle}>Type</th>
            <th style={thStyle}>Issue</th>
            <th style={thStyle}>Expiry</th>
            <th style={thStyle}>Doc ID</th>
            <th style={thStyle}>Status</th>
            <th style={{ ...thStyle, textAlign: "right" }}>Action</th>
          </tr>
        </thead>

        <tbody>
          {documents.length > 0 ? (
            documents.map((doc) => (
              <DocumentRow key={doc.id} doc={doc} />
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ padding: "40px", textAlign: "center", color: "#999" }}>
                No documents found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ComplianceTable