import React, { useState } from 'react';
import { 
  Search, Bell, PackagePlus, List, Table, 
  Download, QrCode, ArrowDownToLine, 
  History, ClipboardList, X, Camera, Upload, ChevronDown, Share2,
  ArrowUpRight, ArrowDownLeft, ArrowLeft
} from 'lucide-react';

import VendorList from './VendorList';

const InventoryPage = () => {
  const [selectedItem, setSelectedItem] = useState(inventoryData[0]);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs', 'usage', 'history'
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState('list');
  const [isAutoRestock, setIsAutoRestock] = useState(true);
  const [currentView, setCurrentView] = useState('inventory');
  
  // Mobile specific state: Handle the detail view overlay on small screens
  const [showMobileDetail, setShowMobileDetail] = useState(false);

  const handleVendorRedirect = () => {
    setCurrentView('vendors');
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setActiveTab('specs');
    if (window.innerWidth < 1024) {
      setShowMobileDetail(true);
    }
  };

  if (currentView === 'vendors') {
    return <VendorList onBack={() => setCurrentView('inventory')} />;
  }

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col font-sans overflow-hidden">
      
      {/* --- TOP NAVIGATION BAR --- */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-3 sm:py-4 flex justify-between items-center sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <h1 className="text-xl sm:text-2xl font-black text-slate-800">Inventory</h1>
          {/* Remove 'hidden md:flex' and replace with 'flex' */}
        <div className="flex bg-white rounded-lg p-1 border border-slate-200 shadow-sm">
          <button 
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-md text-[10px] sm:text-xs font-black transition-all ${
              viewMode === 'list' ? 'bg-[#F8FAFB] border border-slate-200 text-slate-700 shadow-sm' : 'text-slate-400'
            }`}
          >
            <List size={14} /> <span className="hidden xs:inline">List View</span>
          </button>
          <button 
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-md text-[10px] sm:text-xs font-black transition-all ${
              viewMode === 'table' ? 'bg-[#F8FAFB] border border-slate-200 text-slate-700 shadow-sm' : 'text-slate-400'
            }`}
          >
            <Table size={14} /> <span className="hidden xs:inline">Table View</span>
          </button>
        </div>
        </div>
        
        <div className="flex items-center gap-3 sm:gap-6">
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-[#84A962] hover:bg-[#749654] text-white px-3 sm:px-5 py-2 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md active:scale-95 text-sm"
          >
            <PackagePlus size={18} /> <span className="hidden sm:inline">Add new parts</span><span className="sm:hidden">Add</span>
          </button>
        </div>
      </header>

      {/* --- SUB HEADER (Scrollable on mobile) --- */}
      <div className="px-4 sm:px-8 py-3 flex items-center overflow-x-auto no-scrollbar scroll-smooth">
        <div className="flex items-center gap-2 sm:gap-3 whitespace-nowrap w-full sm:justify-end">
          <ActionButton icon={<History size={16}/>} label="Request" onClick={() => setShowRequestModal(true)} />
          <ActionButton icon={<ClipboardList size={16}/>} label="Vendors" onClick={handleVendorRedirect} />
          <ActionButton icon={<Download size={16}/>} label="Export" />
        </div>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 px-4 sm:px-8 pb-4 sm:pb-8 flex gap-6 overflow-hidden relative">
        {viewMode === 'list' ? (
          <>
            {/* LEFT: LIST (Full width on mobile, 350px on desktop) */}
            <div className={`w-full lg:w-[350px] space-y-3 overflow-y-auto pr-1 custom-scrollbar ${showMobileDetail ? 'hidden lg:block' : 'block'}`}>
              {inventoryData.map((item, idx) => (
                <div 
                  key={idx}
                  onClick={() => handleItemClick(item)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer group bg-white ${
                    selectedItem.id === item.id ? 'border-[#84A962] shadow-md' : 'border-white hover:border-slate-200 shadow-sm'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <QrCode size={12} /> {item.id}
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                  <div className="flex gap-4 items-center">
                    <div className="w-14 h-14 rounded-xl bg-slate-100 overflow-hidden border border-slate-200 shrink-0">
                      <img src={item.image} className="w-full h-full object-cover" alt="part" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-black text-slate-800 leading-tight truncate">{item.name}</h3>
                      <p className="text-xs text-slate-400 font-bold truncate">{item.subtext}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-[10px] text-slate-400 font-bold italic">Last Used: {item.lastUsed}</p>
                    <div className={`px-3 py-1 rounded-lg text-[10px] font-black border ${
                      item.status === 'In Stock' ? 'bg-[#f1f6ee] text-[#84A962] border-[#84A962]/20' : 'bg-red-50 text-red-500 border-red-100'
                    }`}>
                      {item.quantity} Units
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT: DETAIL VIEW (Responsive Overlay on Mobile, Integrated on LG) */}
            <div className={`
              fixed inset-0 z-40 bg-white lg:relative lg:inset-auto lg:flex lg:flex-1 lg:bg-white lg:rounded-[32px] lg:shadow-sm lg:border lg:border-slate-200 overflow-hidden flex-col transition-transform duration-300
              ${showMobileDetail ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
            `}>
              {/* Mobile Back Header */}
              <div className="lg:hidden p-4 border-b flex items-center gap-4 bg-white sticky top-0">
                <button onClick={() => setShowMobileDetail(false)} className="p-2 hover:bg-slate-100 rounded-full">
                  <ArrowLeft size={20} />
                </button>
                <span className="font-black text-slate-800">Part Details</span>
              </div>

              <div className="p-6 sm:p-8 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start gap-6 bg-slate-50/30">
                <div className="flex gap-4 sm:gap-6">
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center shrink-0">
                    <PackagePlus size={20} className="text-[#84A962]" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">{selectedItem.name}</h2>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                       <DetailTag label="ID" value={selectedItem.id} />
                       <DetailTag label="Location" value={selectedItem.location} />
                    </div>
                  </div>
                </div>
                
                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
                  <label className="flex items-center gap-2 text-xs font-black text-slate-400 order-2 sm:order-1">
                    Auto Restock
                    <div className="w-10 h-5 bg-[#84A962] rounded-full relative p-1">
                      <div className="absolute right-1 w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </label>
                  <div className="p-2 bg-white border rounded-xl shadow-sm flex items-center gap-2 sm:flex-col order-1 sm:order-2">
                    <img src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${selectedItem.id}`} className="w-12 h-12 sm:w-16 sm:h-16" alt="qr" />
                    <p className="text-[8px] font-black text-slate-400 uppercase">QR Code</p>
                  </div>
                </div>
              </div>

              {/* TABS (Scrollable on small mobile) */}
              <div className="px-6 sm:px-8 pt-4 flex gap-4 sm:gap-6 border-b border-slate-100 overflow-x-auto no-scrollbar">
                <TabBtn label="Specifications" active={activeTab === 'specs'} onClick={() => setActiveTab('specs')} />
                <TabBtn label="Usage Log" active={activeTab === 'usage'} onClick={() => setActiveTab('usage')} />
                <TabBtn label="Stock History" active={activeTab === 'history'} onClick={() => setActiveTab('history')} />
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {activeTab === 'specs' && (
                  <div className="animate-in fade-in duration-300">
                    <div className="p-6 sm:p-8 grid grid-cols-2 sm:grid-cols-3 gap-y-6 border-b border-slate-100">
                      <SpecItem label="Current Quantity" value={`${selectedItem.quantity} units`} />
                      <SpecItem label="Minimum Quantity" value="2 units" />
                      <SpecItem label="Unit Cost" value={`$ ${selectedItem.cost}`} />
                      <SpecItem label="Warranty" value="Standard" />
                      <SpecItem label="Model" value="Standard" />
                      <SpecItem label="Criticality" value="Important" />
                    </div>
                    <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-8">
                      <div className="flex-1">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Description</h4>
                        <p className="text-sm text-slate-500 leading-relaxed font-medium">
                          Diesel Generator Alternator Rated Output: 30 kVA. Marine and industrial generator systems.
                        </p>
                        <img src={selectedItem.image} className="mt-6 w-full h-40 sm:h-48 object-cover rounded-2xl border-4 border-white shadow-lg" alt="engine" />
                      </div>
                      <div className="w-full md:w-1/3">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Documents</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-3">
                          <DocCard title="Parts Manual" size="3.2mb" />
                          <DocCard title="Safety Guide" size="1.8mb" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* --- USAGE HISTORY TAB --- */}
      {activeTab === 'usage' && (
        <div className="animate-in fade-in duration-500">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[800px] border-collapse">
              <thead>
                <tr className="bg-[#f8faf7] text-slate-500 text-sm font-medium">
                  <th className="px-6 py-4">Last Used</th>
                  <th className="px-6 py-4">Used by</th>
                  <th className="px-6 py-4">Work order</th>
                  <th className="px-6 py-4">Quantity used</th>
                  <th className="px-6 py-4">Asset/Location</th>
                  <th className="px-6 py-4">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {usageData.map((log, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-5 text-xs font-semibold text-slate-600">{log.date}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-slate-200 overflow-hidden">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${log.user}`} alt="avatar" />
                        </div>
                        <span className="text-xs font-bold text-slate-700">{log.user}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-xs font-bold text-slate-600">{log.ref}</td>
                    <td className="px-6 py-5 text-xs font-bold text-slate-600">{log.qty}</td>
                    <td className="px-6 py-5 text-xs font-bold text-slate-600">{log.location}</td>
                    <td className="px-6 py-5 text-xs font-bold text-slate-600">{log.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- STOCK HISTORY TAB --- */}
      {activeTab === 'history' && (
        <div className="animate-in fade-in duration-500">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[900px] border-collapse">
              <thead>
                <tr className="bg-[#f8faf7] text-slate-500 text-sm font-medium">
                  <th className="px-6 py-4">Date Used</th>
                  <th className="px-6 py-4">Performed by</th>
                  <th className="px-6 py-4">Reference</th>
                  <th className="px-6 py-4">Quantity</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Transaction Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {stockHistoryData.map((history, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-5 text-xs font-semibold text-slate-600">{history.date}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-slate-200 overflow-hidden">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${history.performer}`} alt="avatar" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-slate-400 uppercase leading-tight">{history.role}</span>
                          <span className="text-xs font-bold text-slate-700">{history.performer}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-xs font-bold text-slate-600">{history.ref}</td>
                    <td className={`px-6 py-5 text-xs font-bold ${history.qty.includes('+') ? 'text-slate-600' : 'text-slate-600'}`}>
                      {history.qty}
                    </td>
                    <td className="px-6 py-5 text-xs font-bold text-slate-600">{history.loc}</td>
                    <td className="px-6 py-5">
                      <span className="text-xs font-bold text-slate-700">{history.type}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
              </div>
            </div>
          </>
        ) : (
          /* --- FULL TABLE VIEW (Now with horizontal scroll) --- */
          <div className="flex-1 bg-white rounded-[24px] sm:rounded-[32px] shadow-sm border border-slate-200 overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-[#f1f6ee]/50 text-[10px] uppercase font-black text-slate-400 tracking-widest border-b border-slate-100">
                    <th className="px-6 py-5">ID</th>
                    <th className="px-6 py-5">Stock Item</th>
                    <th className="px-6 py-5">Location</th>
                    <th className="px-6 py-5">Quantity</th>
                    <th className="px-6 py-5">Status</th>
                    <th className="px-6 py-5 text-center">QR Code</th>
                    <th className="px-6 py-5">Unit Cost</th>
                    <th className="px-6 py-5">Last Restocked</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {inventoryData.map((item, idx) => (
                    <tr 
                      key={idx} 
                      onClick={() => {setSelectedItem(item); setViewMode('list'); setActiveTab('specs');}} 
                      className="group hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4 text-xs font-bold text-slate-400">{item.id}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={item.image} className="w-10 h-10 rounded-lg object-cover border border-slate-100" alt="" />
                          <span className="text-sm font-black text-slate-800">{item.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-bold text-slate-500">{item.location}</td>
                      <td className="px-6 py-4 text-xs font-black text-slate-700">{item.quantity} Units</td>
                      <td className="px-6 py-4">
                        <StatusBadge status={item.status} />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <QrCode size={18} className="mx-auto text-slate-300 group-hover:text-[#84A962] transition-colors" />
                      </td>
                      <td className="px-6 py-4 text-sm font-black text-slate-800">$ {item.cost}</td>
                      <td className="px-6 py-4 text-xs font-bold text-slate-400">{item.lastUsed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* --- ADD NEW PART MODAL (Responsive Bottom Sheet on Mobile) --- */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 transition-all">
          <div className="bg-white rounded-t-[32px] sm:rounded-[40px] w-full max-w-2xl max-h-[95vh] shadow-2xl animate-in slide-in-from-bottom sm:zoom-in-95 duration-300 overflow-hidden flex flex-col">
            <div className="p-5 sm:p-8 border-b border-slate-100 flex justify-between items-center bg-[#f1f6ee]/30 shrink-0">
               <div>
                 <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">Add New Part</h2>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Create inventory entry</p>
               </div>
               <button onClick={() => setShowAddModal(false)} className="p-2 sm:p-3 hover:bg-white hover:shadow-md rounded-full transition-all text-slate-400 active:scale-90">
                 <X size={24}/>
               </button>
            </div>
            
            <div className="p-6 sm:p-10 overflow-y-auto custom-scrollbar">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  <div className="space-y-5">
                    <InputField label="Part Name" placeholder="e.g. Diesel Alternator" />
                    <InputField label="Part ID" placeholder="STC-XXXX" />
                    <div className="grid grid-cols-2 gap-4">
                      <InputField label="Quantity" placeholder="0" type="number" />
                      <InputField label="Unit Cost ($)" placeholder="0.00" type="number" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                      <div className="relative">
                        <select className="w-full bg-slate-50 border border-slate-200 p-3 sm:p-4 rounded-xl sm:rounded-2xl outline-none font-bold text-slate-700 appearance-none focus:border-[#84A962]">
                          <option>Mechanical</option>
                          <option>Electrical</option>
                          <option>Tools</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-1.5">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Part Image</label>
                       <div className="border-2 border-dashed border-slate-200 bg-slate-50 rounded-[24px] sm:rounded-[32px] h-36 sm:h-48 flex flex-col items-center justify-center gap-3 group hover:border-[#84A962] hover:bg-white transition-all cursor-pointer">
                          <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110">
                            <Camera size={24} className="text-[#84A962]" />
                          </div>
                          <p className="text-[9px] font-black text-slate-400 uppercase">Click to upload photo</p>
                       </div>
                    </div>
                    <InputField label="Storage Location" placeholder="Warehouse A, Shelf 4" />
                    <div onClick={() => setIsAutoRestock(!isAutoRestock)} className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-6 rounded-full relative p-1 transition-colors ${isAutoRestock ? 'bg-[#84A962]' : 'bg-slate-300'}`}>
                          <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${isAutoRestock ? 'translate-x-4' : 'translate-x-0'}`} />
                        </div>
                        <span className="text-xs font-bold text-slate-600">Auto Restock</span>
                      </div>
                    </div>
                  </div>
               </div>
            </div>

            <div className="p-6 sm:p-10 bg-slate-50 flex flex-col sm:flex-row gap-3 sm:gap-4 shrink-0 pb-10 sm:pb-10">
               <button onClick={() => setShowAddModal(false)} className="order-2 sm:order-1 flex-1 py-4 bg-white border border-slate-200 rounded-2xl font-black text-slate-500 transition-all">Discard</button>
               <button onClick={() => setShowAddModal(false)} className="order-1 sm:order-2 flex-[1.5] py-4 bg-[#84A962] text-white rounded-2xl font-black shadow-lg">Save Part Entry</button>
            </div>
          </div>
        </div>
      )}

      {/* --- REQUEST PARTS MODAL (Responsive) --- */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white rounded-t-[32px] sm:rounded-[32px] w-full max-w-lg shadow-2xl animate-in slide-in-from-bottom sm:zoom-in-95 duration-300 overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-slate-100 flex justify-between items-center">
               <h2 className="text-xl font-black text-slate-800 tracking-tight">Request Parts</h2>
               <button onClick={() => setShowRequestModal(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400"><X size={20}/></button>
            </div>
            <div className="p-6 sm:p-8 space-y-6">
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Parts Number</label>
                 <div className="relative">
                   <input className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl outline-none font-bold text-slate-700" placeholder="Type or select parts number" />
                   <span className="hidden sm:block absolute right-4 top-4 text-[10px] font-black text-[#84A962] bg-[#f1f6ee] px-2 py-1 rounded-lg">350 Units available</span>
                 </div>
               </div>
               <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Message</label>
                 <textarea className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl h-28 sm:h-32 outline-none font-bold text-slate-700 resize-none" placeholder="Reason for request..."></textarea>
               </div>
            </div>
            <div className="p-6 sm:p-8 bg-slate-50 flex flex-col sm:flex-row gap-3 sm:gap-4 pb-10 sm:pb-8">
               <button onClick={() => setShowRequestModal(false)} className="order-2 sm:order-1 flex-1 py-4 bg-white border border-slate-200 rounded-2xl font-black text-slate-500">Cancel</button>
               <button onClick={() => setShowRequestModal(false)} className="order-1 sm:order-2 flex-1 py-4 bg-[#84A962] text-white rounded-2xl font-black shadow-lg">Request</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* --- REUSABLE SUB COMPONENTS (Preserved) --- */
const InputField = ({ label, placeholder, type = "text" }) => (
  <div className="space-y-1.5 w-full">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
    <input type={type} className="w-full bg-slate-50 border border-slate-200 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl outline-none focus:border-[#84A962] font-bold text-slate-700 transition-all placeholder:text-slate-300" placeholder={placeholder} />
  </div>
);

const ActionButton = ({ icon, label, onClick }) => (
  <button onClick={onClick} className="flex items-center gap-2 bg-white px-3 sm:px-4 py-2 rounded-xl border border-slate-200 text-xs font-black text-slate-500 shadow-sm hover:border-[#84A962] hover:text-[#84A962] transition-all active:scale-95 shrink-0">
    {icon} {label}
  </button>
);

const DetailTag = ({ label, value }) => (
  <div className="flex items-center gap-1.5">
    <span className="text-[9px] sm:text-[10px] font-black text-slate-300 uppercase tracking-widest">{label}:</span>
    <span className="text-xs font-bold text-slate-600">{value}</span>
  </div>
);

const SpecItem = ({ label, value }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
    <span className="text-xs sm:text-sm font-black text-slate-700 tracking-tight">{value}</span>
  </div>
);

const StatusBadge = ({ status }) => (
  <div className={`px-2 py-1 rounded-md text-[8px] font-black uppercase tracking-widest inline-block shrink-0 ${
    status === 'In Stock' ? 'bg-[#f1f6ee] text-[#84A962]' : 'bg-red-50 text-red-400'
  }`}>
    {status}
  </div>
);

const DocCard = ({ title, size }) => (
  <div className="flex items-center justify-between p-4 bg-[#F8FAFB] border border-slate-100 rounded-2xl hover:border-[#84A962] cursor-pointer group transition-all">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-white rounded-lg shadow-sm group-hover:bg-[#84A962] group-hover:text-white transition-all text-red-500">
        <ArrowDownToLine size={16} />
      </div>
      <div>
        <p className="text-xs font-black text-slate-700">{title}</p>
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{size}</p>
      </div>
    </div>
    <Download size={14} className="text-slate-300" />
  </div>
);

const TabBtn = ({ label, active, onClick }) => (
  <button onClick={onClick} className={`pb-3 text-[10px] font-black uppercase tracking-widest transition-all relative whitespace-nowrap ${active ? 'text-[#84A962]' : 'text-slate-400 hover:text-slate-600'}`}>
    {label}
    {active && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#84A962] rounded-full" />}
  </button>
);

/* --- DATA (Preserved) --- */
const inventoryData = Array(8).fill({
  id: 'STC-001',
  name: 'Generator Engine',
  subtext: 'storage 009',
  lastUsed: '5th march, 2026',
  quantity: 6,
  cost: '20,000',
  location: 'Storage 009 line 2',
  status: 'In Stock',
  image: 'https://images.unsplash.com/photo-1609872209699-3e55dc7d90b9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fEdlbmVyYXRvciUyMEVuZ2luZXxlbnwwfHwwfHx8MA%3D%3D'
}).map((item, i) => ({...item, status: i === 2 ? 'Out of Stock' : 'In Stock', quantity: i === 2 ? 0 : 6}));

// Data updated to match the image content exactly
  const stockHistoryData = [
    { date: '5th march, 2026 2:00pm', performer: 'J. Morrison', role: 'Fleet Manager', ref: 'Purchase Order: PO-7783', qty: '+12 units', loc: 'storage 009', type: 'Stock in' },
    { date: '5th march, 2026 2:00pm', performer: 'J. Morrison', role: 'Fleet Manager', ref: 'Work Order: W-013', qty: '-2 units', loc: 'storage 009', type: 'Stock Out' },
    { date: '5th march, 2026 2:00pm', performer: 'J. Morrison', role: 'Fleet Manager', ref: 'Purchase Order: PO-7783', qty: '+12 units', loc: 'storage 009', type: 'Stock in' },
    { date: '5th march, 2026 2:00pm', performer: 'J. Morrison', role: 'Fleet Manager', ref: 'Work Order: W-013', qty: '-2 units', loc: 'storage 009', type: 'Stock Out' },
  ];

  const usageData = [
    { date: '5th march, 2026 2:00pm', user: 'John Hanks', ref: 'Used for W-013', qty: '2 units', location: 'Generator Unit A', cost: '$ 20,000' },
    { date: '5th march, 2026 2:00pm', user: 'John Hanks', ref: 'Used for W-013', qty: '2 units', location: 'Generator Unit A', cost: '$ 20,000' },
    { date: '5th march, 2026 2:00pm', user: 'John Hanks', ref: 'Used for W-013', qty: '2 units', location: 'Generator Unit A', cost: '$ 20,000' },
    { date: '5th march, 2026 2:00pm', user: 'John Hanks', ref: 'Used for W-013', qty: '2 units', location: 'Generator Unit A', cost: '$ 20,000' },
  ];
export default InventoryPage;