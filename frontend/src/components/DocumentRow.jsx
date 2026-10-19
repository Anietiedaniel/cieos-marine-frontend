import { getStatus } from "../utils/expiryChecker";
import StatusBadge from "./StatusBadge";

const DocumentRow = ({ doc }) => {
  const status = getStatus(doc.expiry);

  const cellStyle = {
    padding: "16px 12px",
    fontSize: "14px",
    color: "#4a4a4a", // Soft charcoal
    borderBottom: "1px solid #f0f0f0",
    verticalAlign: "middle"
  };

  const actionBtnStyle = {
    background: "none",
    border: "none",
    fontSize: "20px",
    color: "#999",
    cursor: "pointer",
    padding: "0 10px"
  };

  return (
    <tr>
      <td style={{ ...cellStyle, fontWeight: "500", color: "#333" }}>{doc.title}</td>
      <td style={cellStyle}>{doc.category}</td>
      <td style={cellStyle}>{doc.type}</td>
      <td style={cellStyle}>{doc.issue}</td>
      <td style={cellStyle}>{doc.expiry}</td>
      <td style={cellStyle}>{doc.docId}</td>
      <td style={cellStyle}>
        <StatusBadge status={status} />
      </td>
      <td style={{ ...cellStyle, textAlign: "right" }}>
        <button style={actionBtnStyle}>⋮</button>
      </td>
    </tr>
  );
};

export default DocumentRow;