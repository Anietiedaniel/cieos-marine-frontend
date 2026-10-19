import { useState } from "react";
import ComplianceTabs from "./ComplianceTabs";
import ComplianceTable from "./ComplianceTable";
import ComplianceHeader from "./ComplianceHeader";
import Pagination from "./Pagination";
import UploadModal from "./UploadModal"; // Ensure this is imported
import { useCompliance } from "../../../../hooks/useCompliance";

const CompliancePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    search,
    setSearch,
    paginatedDocs,
    filteredDocs,
    page,
    setPage,
    perPage,
    addDocument
  } = useCompliance();

  const containerStyle = {
    padding: "40px",
    backgroundColor: "#f4f7f6",
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif",
  };

  const cardStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "30px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    border: "1px solid #e0e0e0",
    position: "relative"
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <ComplianceHeader 
          search={search} 
          setSearch={setSearch} 
          onUploadClick={() => setIsModalOpen(true)} // Opens the modal
        />
        
        <ComplianceTabs />

        <ComplianceTable documents={paginatedDocs} />

        <div style={{ marginTop: "30px", display: "flex", justifyContent: "center" }}>
          <Pagination
            total={filteredDocs.length}
            page={page}
            setPage={setPage}
            perPage={perPage}
          />
        </div>
      </div>

      {/* Modern Modal Overlay */}
      {isModalOpen && (
        <UploadModal 
          onClose={() => setIsModalOpen(false)} 
          onUpload={(doc) => {
            addDocument(doc);
            setIsModalOpen(false);
          }} 
        />
      )}
    </div>
  );
};

export default CompliancePage;