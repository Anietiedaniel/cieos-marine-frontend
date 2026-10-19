const RowActions = ({ assetId, onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { 
      label: 'Quick Edit', 
      icon: <Edit3 size={14} />, 
      onClick: () => onEdit(assetId) 
    },
    { 
      label: 'Create Work Order', 
      icon: <PlusSquare size={14} />, 
      onClick: () => navigate(`/dashboard/work-orders/new?assetId=${assetId}`) 
    },
    { 
      label: 'See Details', 
      icon: <FileText size={14} />, 
      onClick: () => navigate(`/dashboard/assets/details/${assetId}`) 
    },
    { 
      label: 'Delete Asset', 
      icon: <Trash2 size={14} />, 
      onClick: () => {
        if (window.confirm("Are you sure you want to delete this asset?")) {
          onDelete(assetId); // THIS TRIGGERS THE REMOVAL
        }
      }, 
      color: 'text-red-500' 
    },
  ];

  return (
    <div className="relative inline-block text-left">
      <button 
        onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <MoreVertical size={18} className="text-gray-400" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-30" onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} />
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-40 py-1 overflow-hidden">
            {menuItems.map((item, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  item.onClick();
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-[11px] font-bold hover:bg-gray-50 transition-colors ${item.color || 'text-gray-600'}`}
              >
                <span className={item.color ? 'text-red-500' : 'text-gray-400'}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};