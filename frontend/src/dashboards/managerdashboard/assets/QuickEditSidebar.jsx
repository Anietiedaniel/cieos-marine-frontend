import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Share2, QrCode, MoreVertical, 
  Edit3, PlusSquare, FileText, Trash2, X, Save
} from "lucide-react"; 

/* ===== STYLED PRIORITY BADGES ===== */
const priorityStyles = {
  High: "border-red-500 text-red-500 bg-white",
  Medium: "border-blue-500 text-blue-500 bg-white",
  Low: "border-green-500 text-green-500 bg-white",
};

/* ===== INITIAL MOCK DATA ===== */
const initialAssets = [
  { 
    id: "1", name: "Main Engine", code: "#12345", location: "engine-room", 
    parts: 5, condition: "Brand new", priority: "High", criticality: "Important",
    team: [{name: "DJ", color: "bg-purple-500"}, {name: "SS", color: "bg-blue-500"}]
  },
  { 
    id: "2", name: "Generator Set", code: "#22345", location: "engine-room", 
    parts: 6, condition: "Spare", priority: "Low", criticality: "Normal",
    team: [{name: "MR", color: "bg-orange-500"}, {name: "EB", color: "bg-green-500"}]
  },
  { 
    id: "3", name: "Fuel System", code: "#22345", location: "engine-room", 
    parts: 2, condition: "Fairly Used", priority: "Medium", criticality: "Critical",
    team: [{name: "DJ", color: "bg-purple-500"}]
  },
  { 
    id: "4", name: "Cooling Water System", code: "#12389", location: "engine-room", 
    parts: 4, condition: "Brand new", priority: "High", criticality: "Critical",
    team: [{name: "SS", color: "bg-blue-500"}, {name: "DM", color: "bg-pink-500"}]
  },
];

/* ===== QUICK EDIT SIDEBAR COMPONENT ===== */
const QuickEditSidebar = ({ asset, isOpen, onClose }) => {
  if (!asset) return null;
  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-[80] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
        onClick={onClose}
      />
      <div className={`fixed right-0 top-0 h-full w-[400px] bg-white shadow-2xl z-[90] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
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
          <div className="flex-1 space-y-6 overflow-y-auto">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase">Asset Name</label>
              <input type="text" defaultValue={asset.name} className="w-full p-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-400 uppercase">Condition</label>
              <select className="w-full p-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold outline-none">
                <option>{asset.condition}</option>
                <option>Brand new</option>
                <option>Spare</option>
                <option>Repair Required</option>
              </select>
            </div>
          </div>
          <div className="pt-6 border-t border-gray-50 flex gap-3">
            <button onClick={onClose} className="flex-1 py-3 text-sm font-bold text-gray-500">Discard</button>
            <button className="flex-2 px-8 py-3 bg-[#708B53] text-white text-sm font-bold rounded-2xl flex items-center gap-2">
              <Save size={18} /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

/* ===== ROW ACTIONS COMPONENT ===== */
const RowActions = ({ assetId, assetName, onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Quick Edit', icon: <Edit3 size={14} />, onClick: () => onEdit(assetId) },
    { label: 'Create Work Order', icon: <PlusSquare size={14} />, onClick: () => navigate(`/dashboard/work-orders/new?assetId=${assetId}`) },
    { label: 'See Details', icon: <FileText size={14} />, onClick: () => navigate(`/dashboard/assets/details/${assetId}`) },
    { 
      label: 'Delete Asset', 
      icon: <Trash2 size={14} />, 
      onClick: () => onDelete(assetId, assetName), // Trigger delete function
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
                onClick={(e) => { e.stopPropagation(); item.onClick(); setIsOpen(false); }}
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

/* ===== MAIN PAGE COMPONENT ===== */
const AssetListPage = () => {
  const { locationId } = useParams();
  const navigate = useNavigate();
  
  // States
  const [assets, setAssets] = useState(initialAssets);
  const [editingAsset, setEditingAsset] = useState(null);

  const filteredAssets = assets.filter((asset) => asset.location === locationId);

  // Handlers
  const handleOpenEdit = (id) => {
    const asset = assets.find(a => a.id === id);
    setEditingAsset(asset);
  };

  const handleDeleteAsset = (id, name) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${name}? This action cannot be undone.`);
    if (confirmDelete) {
      setAssets(prevAssets => prevAssets.filter(asset => asset.id !== id));
      // You could also add a toast notification here
      console.log(`Deleted asset: ${id}`);
    }
  };

  return (
    <div className="p-8 bg-[#F2F4F7] min-h-screen font-sans text-left relative overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/dashboard/assets")} className="p-2 bg-white rounded-full border border-gray-100 hover:bg-gray-50 shadow-sm">
            <ArrowLeft size={18} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 capitalize">{locationId?.replace(/-/g, " ")}</h1>
            <p className="text-sm text-gray-500 mt-1">Review and manage assets in this location</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50">
          Export <Share2 size={16} />
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-visible">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#F9FAFB] border-b border-gray-100">
            <tr className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
              <th className="px-6 py-5">No</th>
              <th className="px-6 py-5">Name</th>
              <th className="px-6 py-5">ID</th>
              <th className="px-6 py-5 text-center">Team</th>
              <th className="px-6 py-5">Parts</th>
              <th className="px-6 py-5">Condition</th>
              <th className="px-6 py-5">Priority</th>
              <th className="px-6 py-5">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {filteredAssets.map((asset, index) => (
              <tr key={asset.id} className="group hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-bold text-gray-900">{index + 1}</td>
                <td className="px-6 py-4 text-sm font-bold text-gray-700">{asset.name}</td>
                <td className="px-6 py-4 text-xs font-bold text-gray-400">{asset.code}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-center -space-x-2 overflow-hidden">
                    {asset.team.map((member, i) => (
                      <div key={i} className={`inline-block h-7 w-7 rounded-full ring-2 ring-white ${member.color} flex items-center justify-center text-[8px] font-bold text-white`} title={member.name}>
                        {member.name}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{asset.parts} Parts</td>
                <td className="px-6 py-4 text-sm text-gray-500">{asset.condition}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black border ${priorityStyles[asset.priority]}`}>
                    {asset.priority.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <QrCode size={18} className="text-gray-300 hover:text-gray-900 cursor-pointer" />
                    <RowActions 
                       assetId={asset.id} 
                       assetName={asset.name}
                       onEdit={handleOpenEdit} 
                       onDelete={handleDeleteAsset}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredAssets.length === 0 && (
          <div className="py-20 text-center text-gray-400">
            <p className="font-bold">No assets found in this category.</p>
          </div>
        )}
      </div>

      <QuickEditSidebar asset={editingAsset} isOpen={!!editingAsset} onClose={() => setEditingAsset(null)} />
    </div>
  );
};

export default AssetListPage;