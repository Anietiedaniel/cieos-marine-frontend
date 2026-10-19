const Pagination = ({ total, page, setPage, perPage }) => {
  const totalPages = Math.ceil(total / perPage);

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginTop: "30px",
  };

  const getPageStyle = (isActive) => ({
    padding: "8px 12px",
    border: "none",
    background: "transparent",
    color: isActive ? "#333" : "#999",
    fontWeight: isActive ? "700" : "400",
    fontSize: "14px",
    cursor: "pointer",
  });

  const arrowStyle = {
    background: "none",
    border: "none",
    fontSize: "18px",
    color: "#666",
    cursor: "pointer",
    padding: "0 10px",
  };

  return (
    <div style={containerStyle}>
      <button 
        style={arrowStyle} 
        onClick={() => setPage(Math.max(1, page - 1))}
      >
        ‹
      </button>

      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          onClick={() => setPage(i + 1)}
          style={getPageStyle(page === i + 1)}
        >
          {i + 1}
        </button>
      ))}

      <button 
        style={arrowStyle} 
        onClick={() => setPage(Math.min(totalPages, page + 1))}
      >
        ›
      </button>
    </div>
  );
};

export default Pagination;