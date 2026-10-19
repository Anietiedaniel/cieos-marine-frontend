import React, { useState } from 'react';
import { 
  MoreVertical, Mail, Phone, Plus, Filter, Download, Star, 
  ExternalLink, Edit2, Trash2, ArrowLeft, Upload,
  TrendingUp, DownloadCloud, FileText, ChevronRight
} from 'lucide-react';

const VendorList = ({ onBackToInventory }) => {
  const [currentPage, setCurrentPage] = useState('list'); // 'list', 'detail', 'add'
  const [activeMenu, setActiveMenu] = useState(null);
  const [modalType, setModalType] = useState(null);

  const vendors = [
    { id: 'VND-001', name: 'Marine Tech Solutions', location: 'Lagos, Nigeria', type: 'Parts', status: 'Active', orders: 3, reliability: 94, contact: 'John Adam', preferred: true },
    { id: 'VND-002', name: 'Nordic Marine Supply', location: 'Bergen, Norway', type: 'Services', status: 'Active', orders: 15, reliability: 94, contact: 'John Anderson', preferred: true },
    { id: 'VND-003', name: 'Pacific Engine Works', location: 'Singapore, Singapore', type: 'Parts', status: 'On Hold', orders: 24, reliability: 94, contact: 'John Anderson', preferred: false },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'On Hold': return 'bg-yellow-100 text-yellow-700';
      case 'Archive': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100';
    }
  };

  // --- SUB-PAGE: ADD VENDOR ---
  if (currentPage === 'add') {
    return (
      <div className="p-4 md:p-8 bg-gray-50 min-h-screen font-sans animate-in fade-in duration-300">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-4">
              <button onClick={() => setCurrentPage('list')} className="p-2 hover:bg-white rounded-full transition-all border border-transparent hover:border-gray-200">
                <ArrowLeft size={20} className="text-gray-600"/>
              </button>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Add New Vendor</h1>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <button onClick={() => setCurrentPage('list')} className="flex-1 sm:flex-none px-6 py-2 text-sm font-bold text-gray-500 hover:bg-gray-100 rounded-lg transition-colors border sm:border-transparent">Cancel</button>
              <button onClick={() => setCurrentPage('list')} className="flex-1 sm:flex-none px-6 py-2 bg-[#769c59] hover:bg-[#65854c] text-white rounded-lg text-sm font-bold shadow-md transition-all active:scale-95">Save Vendor</button>
            </div>
          </div>

          <div className="space-y-6 pb-20">
            <div className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Vendor Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">Vendor Name</label>
                  <input className="border border-gray-200 p-2.5 rounded-xl bg-gray-50 focus:bg-white outline-none" placeholder="Fill Name" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">Vendor ID</label>
                  <input className="border border-gray-200 p-2.5 rounded-xl bg-gray-50 focus:bg-white outline-none" placeholder="VND-001" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">Vendor Type</label>
                  <select className="border border-gray-200 p-2.5 rounded-xl bg-gray-50 outline-none cursor-pointer">
                    <option>Parts</option><option>Services</option><option>Parts & Service</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">Status</label>
                  <select className="border border-gray-200 p-2.5 rounded-xl bg-gray-50 outline-none cursor-pointer">
                    <option>Active</option><option>On Hold</option><option>Archived</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">Associated Assets</label>
                  <select className="border border-gray-200 p-2.5 rounded-xl bg-gray-50 outline-none cursor-pointer">
                    <option>Generator</option><option>Hull</option><option>HVAC</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">Lead Time (days)</label>
                  <input type="number" className="border border-gray-200 p-2.5 rounded-xl bg-gray-50 outline-none" placeholder="14" />
                </div>
              </div>
            </div>

            <div className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2"><label className="text-sm font-semibold text-gray-700">Primary Contact Name</label><input className="border border-gray-200 p-2.5 rounded-xl bg-gray-50 outline-none" placeholder="Fill Name" /></div>
                <div className="flex flex-col gap-2"><label className="text-sm font-semibold text-gray-700">Role/Title</label><input className="border border-gray-200 p-2.5 rounded-xl bg-gray-50 outline-none" placeholder="e.g. Sales Manager" /></div>
                <div className="flex flex-col gap-2"><label className="text-sm font-semibold text-gray-700">Phone</label><input className="border border-gray-200 p-2.5 rounded-xl bg-gray-50 outline-none" placeholder="Fill Number" /></div>
                <div className="flex flex-col gap-2"><label className="text-sm font-semibold text-gray-700">Email</label><input className="border border-gray-200 p-2.5 rounded-xl bg-gray-50 outline-none" placeholder="Fill Email" /></div>
                <div className="flex flex-col gap-2 col-span-full"><label className="text-sm font-semibold text-gray-700">Full Address</label><textarea className="border border-gray-200 p-2.5 rounded-xl bg-gray-50 outline-none h-24 resize-none" placeholder="Fill Full Address" /></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-100">
                <h3 className="text-xs font-bold text-gray-400 uppercase mb-4">Documents</h3>
                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center bg-gray-50 cursor-pointer">
                  <Upload size={24} className="text-gray-400 mb-2"/>
                  <p className="text-sm font-bold text-gray-700">Upload PDF</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100">
                <h3 className="text-xs font-bold text-gray-400 uppercase mb-4">Media/Photos</h3>
                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center bg-gray-50 cursor-pointer">
                  <Upload size={24} className="text-gray-400 mb-2"/>
                  <p className="text-sm font-bold text-gray-700">Upload Image</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- SUB-PAGE: VENDOR DETAIL ---
  if (currentPage === 'detail') {
    return (
      <div className="p-4 md:p-8 bg-gray-50 min-h-screen font-sans">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-4">
              <button onClick={() => setCurrentPage('list')} className="p-2 hover:bg-white rounded-full border border-transparent hover:border-gray-200">
                <ArrowLeft size={20} className="text-gray-600"/>
              </button>
              <div className="flex flex-wrap items-center gap-2 md:gap-3">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">Marine Tech Solutions</h1>
                <span className="flex items-center gap-1 text-[10px] font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded border border-orange-100 uppercase">
                  <Star size={10} fill="currentColor"/> Preferred
                </span>
              </div>
            </div>
            <span className="self-start px-4 py-1.5 bg-[#769c59] text-white rounded-lg text-sm font-bold">Active</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Vendor Summary</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
                  <div><p className="text-gray-400 text-xs mb-1">Vendor Name</p><p className="font-semibold text-gray-800 text-sm">Marine Tech Solutions</p></div>
                  <div><p className="text-gray-400 text-xs mb-1">Vendor ID</p><p className="font-semibold text-gray-800 text-sm">VND-001</p></div>
                  <div><p className="text-gray-400 text-xs mb-1">Location</p><p className="font-semibold text-gray-800 text-sm">Houston, USA</p></div>
                  <div><p className="text-gray-400 text-xs mb-1">Lead Time</p><p className="font-semibold text-gray-800 text-sm">14 days</p></div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-0"><span className="text-sm text-gray-500">Name</span><span className="text-sm font-semibold">John Anderson</span></div>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-0"><span className="text-sm text-gray-500">Phone</span><span className="text-sm font-semibold text-[#769c59]">+1 (555) 234-5678</span></div>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1 sm:gap-0"><span className="text-sm text-gray-500">Email</span><span className="text-sm font-semibold text-[#769c59] break-all">j.anderson@marinetech.com</span></div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Performance Metrics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center"><span className="text-sm text-gray-500">Reliability Score</span><span className="text-[#769c59] font-bold text-sm flex items-center gap-1">94 <TrendingUp size={14}/></span></div>
                <div className="flex justify-between items-center border-t pt-4"><span className="text-sm text-gray-500">Open Orders</span><span className="text-sm font-bold">3</span></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
            <div className="p-4 bg-[#f8fcf3] border-b border-gray-100"><h3 className="font-bold text-gray-800 text-sm">Parts Supplied</h3></div>
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[700px]">
                <thead className="bg-gray-50 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                  <tr><th className="px-6 py-4">Parts Name</th><th className="px-6 py-4">Parts NO.</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Lead Time</th><th className="px-6 py-4 text-right">Cost</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-sm">
                  {[1, 2].map(i => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-gray-800">Generator Control Module</td>
                      <td className="px-6 py-4 text-gray-500 text-xs">VDN 001</td>
                      <td className="px-6 py-4"><span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-[10px] font-bold">In Stock</span></td>
                      <td className="px-6 py-4 text-right font-bold text-gray-900">2-3 Days</td>
                      <td className="px-6 py-4 text-right font-bold text-gray-900">$ 20,000</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- MAIN PAGE: VENDOR LIST ---
  return (
    <div className="p-4 md:p-8 bg-[#f9fafb] min-h-screen font-sans text-gray-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBackToInventory} 
            className="p-2 hover:bg-gray-100 rounded-lg border border-gray-200 bg-white shadow-sm"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Vendor List</h1>
        </div>
        <div className="flex items-center gap-2 md:gap-3 overflow-x-auto pb-1 sm:pb-0">
          <button className="flex items-center gap-2 px-3 md:px-4 py-2 border rounded-lg bg-white text-xs md:text-sm font-medium whitespace-nowrap"><Filter size={16}/> Filter</button>
          <button onClick={() => setCurrentPage('add')} className="flex items-center gap-2 px-3 md:px-4 py-2 bg-[#769c59] text-white rounded-lg text-xs md:text-sm font-medium hover:bg-[#65854c] whitespace-nowrap">
            <Plus size={16}/> Add Vendor
          </button>
          <button className="p-2 border rounded-lg bg-white shadow-sm hover:bg-gray-50"><Download size={16}/></button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[#f8fcf3] text-gray-500 text-[11px] uppercase tracking-widest border-b border-gray-100">
                <th className="px-6 py-5 font-bold">Vendor ID</th>
                <th className="px-6 py-5 font-bold">Vendor</th>
                <th className="px-6 py-5 font-bold">Location</th>
                <th className="px-6 py-5 font-bold">Status</th>
                <th className="px-6 py-5 font-bold">Reliability</th>
                <th className="px-6 py-5 font-bold">Contact</th>
                <th className="px-6 py-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {vendors.map((vendor, idx) => (
                <tr key={idx} className="hover:bg-[#fcfdfa] group">
                  <td className="px-6 py-4 text-xs font-medium text-gray-400">{vendor.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800 text-sm">{vendor.name}</span>
                      {vendor.preferred && (
                        <span className="flex items-center gap-1 text-[9px] font-black text-orange-500 mt-1 uppercase">
                          <Star size={10} fill="currentColor"/> Preferred
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{vendor.location}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusStyle(vendor.status)}`}>
                      {vendor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-[#769c59] font-bold text-sm">
                      {vendor.reliability} <TrendingUp size={14}/>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-bold text-gray-800">{vendor.contact}</span>
                      <div className="flex gap-3 text-gray-300">
                        <Mail size={14} className="cursor-pointer hover:text-[#769c59]"/>
                        <Phone size={14} className="cursor-pointer hover:text-[#769c59]"/>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right relative">
                    <button 
                      onClick={() => setActiveMenu(activeMenu === idx ? null : idx)}
                      className="p-2 hover:bg-gray-50 rounded-lg"
                    >
                      <MoreVertical size={18} className="text-gray-400" />
                    </button>
                    {activeMenu === idx && (
                      <div className="absolute right-10 top-12 w-48 bg-white border rounded-xl shadow-xl z-50 py-2 text-sm text-left">
                        <button onClick={() => {setCurrentPage('detail'); setActiveMenu(null);}} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-[#f8fcf3] text-[#769c59] font-bold">
                          <ExternalLink size={14}/> See Detail
                        </button>
                        <button onClick={() => setModalType('archive')} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 text-red-600">
                          <Trash2 size={14}/> Archive
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalType && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4" onClick={() => setModalType(null)}>
           <div className="bg-white p-6 rounded-2xl max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
              <h2 className="text-lg font-bold mb-2">Confirm Action</h2>
              <p className="text-gray-500 text-sm mb-6">Are you sure you want to perform this action on the selected vendor?</p>
              <div className="flex gap-3">
                <button onClick={() => setModalType(null)} className="flex-1 px-4 py-2 bg-gray-100 rounded-lg font-bold text-sm">Cancel</button>
                <button onClick={() => setModalType(null)} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-bold text-sm">Confirm</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default VendorList;