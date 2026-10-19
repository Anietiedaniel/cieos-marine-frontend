import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom"; // Required for the fix
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Share2, QrCode, MoreVertical, 
  Edit3, PlusSquare, FileText, Trash2, X, Save
} from "lucide-react"; 

// --- 1. IMPORT THE CONTEXT ---
import { useAssets } from "../../../contexts/AssetContext";

/* ===== STYLED PRIORITY BADGES ===== */
const priorityStyles = {
  High: "border-red-500 text-red-500 bg-white",
  Medium: "border-blue-500 text-blue-500 bg-white",
  Low: "border-green-500 text-green-500 bg-white",
};

/* ===== QUICK EDIT SIDEBAR COMPONENT ===== */
const QuickEditSidebar = ({ asset, isOpen, onClose }) => {
  const { updateAsset } = useAssets();
  const [formData, setFormData] = useState({});

  // Reset local state when asset changes
  useEffect(() => {
    if (asset) setFormData({ name: asset.name, condition: asset.condition });
  }, [asset]);

  if (!asset) return null;

  const handleSave = () => {
    updateAsset(asset.id, formData);
    onClose();
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[80] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={onClose}
      />

      <div className={`fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-[90] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col text-left">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Quick Edit</h2>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{asset.code}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X size={20} className="text-gray-400" />
            </button>
          </div>

          <div className="flex-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter">Asset Name</label>
              <input 
                type="text" 
                value={formData.name || ""} 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-[#708B53]/20" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter">Condition</label>
              <select 
                value={formData.condition || ""} 
                onChange={(e) => setFormData({...formData, condition: e.target.value})}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-[#708B53]/20"
              >
                <option value="Brand new">Brand new</option>
                <option value="Spare">Spare</option>
                <option value="Repair Required">Repair Required</option>
                <option value="Operational">Operational</option>
              </select>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex gap-3">
            <button onClick={onClose} className="flex-1 py-4 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors">Discard</button>
            <button 
              onClick={handleSave}
              className="flex-[2] px-8 py-4 bg-[#708B53] text-white text-sm font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-[#708B53]/20"
            >
              <Save size={18} /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

/* ===== ROW ACTIONS COMPONENT ===== */
const RowActions = ({ assetId, onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  // Close menu when clicking outside or scrolling
  useEffect(() => {
    const handleOutsideInteraction = () => {
      if (isOpen) setIsOpen(false);
    };

    if (isOpen) {
      window.addEventListener('click', handleOutsideInteraction);
      window.addEventListener('scroll', handleOutsideInteraction, true);
    }

    return () => {
      window.removeEventListener('click', handleOutsideInteraction);
      window.removeEventListener('scroll', handleOutsideInteraction, true);
    };
  }, [isOpen]);

  const handleToggle = (e) => {
    e.stopPropagation();
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY,
        left: rect.right + window.scrollX
      });
    }
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { label: 'Quick Edit', icon: <Edit3 size={14} />, onClick: () => onEdit(assetId) },
    { label: 'Create Work Order', icon: <PlusSquare size={14} />, onClick: () => navigate(`/dashboard/work-orders/new?assetId=${assetId}`) },
    { label: 'See Details', icon: <FileText size={14} />, onClick: () => navigate(`/dashboard/assets/${assetId}`) },
    { label: 'Delete Asset', icon: <Trash2 size={14} />, onClick: () => onDelete(assetId), color: 'text-red-500' },
  ];

  return (
    <div className="relative inline-block text-left">
      <button 
        ref={buttonRef}
        onClick={handleToggle}
        className="p-2 hover:bg-gray-100 rounded-xl transition-colors active:scale-90"
      >
        <MoreVertical size={18} className="text-gray-400" />
      </button>

      {isOpen && createPortal(
        <div 
          style={{ 
            position: 'absolute', 
            top: `${coords.top}px`, 
            left: `${coords.left}px`,
            transform: 'translateX(-100%)' // Aligns right edge of menu to button
          }}
          className="mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-2xl z-[9999] py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-100"
          onClick={(e) => e.stopPropagation()}
        >
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                item.onClick();
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-[12px] font-bold hover:bg-gray-50 transition-colors ${item.color || 'text-gray-600'}`}
            >
              <span className={item.color ? 'text-red-500' : 'text-gray-400'}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>,
        document.body
      )}
    </div>
  );
};

/* ===== MAIN PAGE COMPONENT ===== */
const AssetListPage = () => {
  const { locationId } = useParams();
  const navigate = useNavigate();
  const { assets, deleteAsset } = useAssets();
  const [editingAsset, setEditingAsset] = useState(null);

const filteredAssets = locationId
  ? assets.filter((asset) => asset.locationId === locationId)
  : assets;

  const handleOpenEdit = (id) => {
    const asset = assets.find(a => a.id === id);
    setEditingAsset(asset);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this asset?")) {
      deleteAsset(id);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-[#F2F4F7] min-h-screen font-sans text-left relative overflow-x-hidden">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/dashboard/assets")} className="p-3 bg-white rounded-2xl border border-gray-100 hover:bg-gray-50 shadow-sm active:scale-90 transition-transform">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 capitalize tracking-tight">{locationId?.replace(/-/g, " ")}</h1>
            <p className="text-xs md:text-sm text-gray-500 font-medium">Manage and monitor your assets efficiently</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => navigate("/dashboard/assets/new")}
            className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold bg-[#708B53] rounded-2xl text-white hover:bg-[#5f7546] transition-all shadow-sm active:scale-95"
          >
            Add Asset <PlusSquare size={18} />
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold bg-white border border-gray-200 rounded-2xl text-gray-700 hover:bg-gray-50 transition-all shadow-sm active:scale-95">
            Export <Share2 size={18} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#F9FAFB] border-b border-gray-100">
              <tr className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
                <th className="px-6 py-6 text-center">#</th>
                <th className="px-6 py-6">Asset Information</th>
                <th className="px-6 py-6">ID Code</th>
                <th className="px-6 py-6">Assigned Team</th>
                <th className="px-6 py-6">Inventory</th>
                <th className="px-6 py-6">Condition</th>
                <th className="px-6 py-6">Priority</th>
                <th className="px-6 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredAssets.length > 0 ? filteredAssets.map((asset, index) => (
                <tr 
                  key={asset.id} 
                  className="group hover:bg-[#F8FAF7] transition-colors cursor-pointer"
                  onClick={() => navigate(`/dashboard/assets/${asset.id}`)}
                >
                  <td className="px-6 py-5 text-sm font-bold text-gray-400 text-center">{index + 1}</td>
                  <td className="px-6 py-5 text-sm font-black text-gray-800">{asset.name}</td>
                  <td className="px-6 py-5 text-[11px] font-bold text-gray-400 tracking-wider uppercase">{asset.code}</td>
                  <td className="px-6 py-5">
                    <div className="flex -space-x-2">
                      {asset.team?.map((member, i) => (
                        <div key={i} className="w-8 h-8 rounded-xl bg-[#708B53]/10 border-2 border-white flex items-center justify-center text-[10px] font-black text-[#708B53] shadow-sm">
                          {typeof member === 'object' ? member.avatar : member}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-xs font-bold text-gray-500">{asset.parts || 0} Parts</td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-bold text-gray-600 bg-gray-100 px-3 py-1 rounded-lg">{asset.condition}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1.5 rounded-full text-[9px] font-black border ${priorityStyles[asset.priority] || priorityStyles.Low}`}>
                      {(asset.priority || 'Low').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-3">
                      <QrCode size={18} className="text-gray-300 hover:text-gray-900 cursor-pointer transition-colors" />
                      <RowActions assetId={asset.id} onEdit={handleOpenEdit} onDelete={handleDelete} />
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="8" className="px-6 py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">
                    No Assets Found in this Location
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARD VIEW */}
        <div className="lg:hidden divide-y divide-gray-50">
          {filteredAssets.map((asset) => (
            <div 
              key={asset.id} 
              className="p-5 active:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => navigate(`/dashboard/assets/${asset.id}`)}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-black text-gray-900 text-base">{asset.name}</h3>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{asset.code}</p>
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                    <RowActions assetId={asset.id} onEdit={handleOpenEdit} onDelete={handleDelete} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">Condition</p>
                  <p className="text-xs font-bold text-gray-600">{asset.condition}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">Parts</p>
                  <p className="text-xs font-bold text-gray-600">{asset.parts || 0} Total</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {asset.team?.slice(0, 2).map((member, i) => (
                      <div key={i} className="w-7 h-7 rounded-lg bg-gray-100 border-2 border-white flex items-center justify-center text-[9px] font-black text-gray-600">
                         {typeof member === 'object' ? member.avatar : member}
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-gray-400">Team Assigned</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-[9px] font-black border ${priorityStyles[asset.priority] || priorityStyles.Low}`}>
                  {asset.priority || 'Low'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <QuickEditSidebar 
        asset={editingAsset} 
        isOpen={!!editingAsset} 
        onClose={() => setEditingAsset(null)} 
      />
    </div>
  );
};

export default AssetListPage;