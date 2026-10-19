import React, { useState } from 'react';
import { 
  Search, 
  LayoutList, 
  Plus, 
  Calendar, 
  Share2, 
  QrCode,
  MoreVertical,
  MapPin,
  Box,
  DollarSign
} from 'lucide-react';

const InventoryTable = () => {
  const [inventory] = useState([
    { id: 'STC-001', name: 'Generator Engine', location: 'storage 009', qty: 10, status: 'In Stock', cost: 20000, date: '5th march, 2026', img: 'https://images.unsplash.com/photo-1609872209699-3e55dc7d90b9?w=100' },
    { id: 'STC-002', name: 'Control Panel', location: 'storage 004', qty: 0, status: 'Out of Stock', cost: 5400, date: '12th march, 2026', img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=100' },
    { id: 'STC-003', name: 'Fuel Filter', location: 'storage 009', qty: 2, status: 'Low on Stock', cost: 150, date: '8th march, 2026', img: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=100' },
  ]);

  const handleVendorRedirect = () => {
    window.location.href = '/vendor-list'; 
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'In Stock': return 'bg-[#DEF7EC] text-[#03543F]';
      case 'Out of Stock': return 'bg-[#FDE8E8] text-[#9B1C1C]';
      case 'Low on Stock': return 'bg-[#FEF3C7] text-[#92400E]';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-3 md:p-8 font-sans">
      <div className="max-w-[1400px] mx-auto space-y-4">
        
        {/* --- DYNAMIC HEADER --- */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex flex-col gap-6">
            {/* Top Row: Title & Table Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h1 className="text-xl md:text-2xl font-black text-gray-900">Inventory</h1>
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-gray-600">
                  <LayoutList size={14} /> Table View
                </div>
              </div>
              <button className="lg:hidden p-2 hover:bg-gray-100 rounded-full">
                <MoreVertical size={20} className="text-gray-400" />
              </button>
            </div>

            {/* Bottom Row: Search & Actions */}
            <div className="flex flex-col lg:flex-row gap-4 justify-between">
              <div className="relative w-full lg:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search Assets, Parts..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#84A358]/20 outline-none transition-all text-sm"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
                <button className="whitespace-nowrap bg-[#84A358] text-white px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-sm active:scale-95 transition-all">
                  <Plus size={18} /> Add Part
                </button>
                <button onClick={handleVendorRedirect} className="whitespace-nowrap px-4 py-2.5 border border-gray-200 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2 transition-all">
                  <Calendar size={18} /> Vendors
                </button>
                <button className="whitespace-nowrap px-4 py-2.5 border border-gray-200 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-50 flex items-center gap-2 transition-all">
                  <Share2 size={18} /> Export
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* --- CONTENT AREA --- */}
        
        {/* MOBILE VIEW: Card Layout (Visible only on small screens) */}
        <div className="grid grid-cols-1 gap-4 lg:hidden">
          {inventory.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm active:bg-gray-50 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3">
                  <img src={item.img} className="w-12 h-12 rounded-xl object-cover border border-gray-100" alt="" />
                  <div>
                    <h3 className="font-bold text-gray-900 leading-tight">{item.name}</h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.id}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-wider ${getStatusStyles(item.status)}`}>
                  {item.status}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-y-4 border-t border-gray-50 pt-4">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-gray-300" />
                  <span className="text-xs font-medium text-gray-500">{item.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Box size={14} className="text-gray-300" />
                  <span className="text-xs font-bold text-gray-700">{item.qty} Units</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign size={14} className="text-gray-300" />
                  <span className="text-xs font-bold text-gray-900">${item.cost.toLocaleString()}</span>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-400 font-medium italic">Ref: {item.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP VIEW: Table Layout (Hidden on mobile) */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F7F9F3]/50 border-b border-gray-100">
                  <th className="p-5 font-black text-gray-400 text-[10px] uppercase tracking-widest">ID</th>
                  <th className="p-5 font-black text-gray-400 text-[10px] uppercase tracking-widest">Stock Item</th>
                  <th className="p-5 font-black text-gray-400 text-[10px] uppercase tracking-widest">Location</th>
                  <th className="p-5 font-black text-gray-400 text-[10px] uppercase tracking-widest">Quantity</th>
                  <th className="p-5 font-black text-gray-400 text-[10px] uppercase tracking-widest">Status</th>
                  <th className="p-5 font-black text-gray-400 text-[10px] uppercase tracking-widest text-center">QR</th>
                  <th className="p-5 font-black text-gray-400 text-[10px] uppercase tracking-widest">Unit Cost</th>
                  <th className="p-5 font-black text-gray-400 text-[10px] uppercase tracking-widest">Last Restocked</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {inventory.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50/80 transition-all cursor-pointer group">
                    <td className="p-5 text-xs font-bold text-gray-400">{item.id}</td>
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <img src={item.img} className="w-10 h-10 rounded-lg object-cover border border-gray-100 group-hover:scale-105 transition-transform" alt="" />
                        <span className="font-bold text-gray-800">{item.name}</span>
                      </div>
                    </td>
                    <td className="p-5 text-sm font-medium text-gray-500">{item.location}</td>
                    <td className="p-5 text-sm font-black text-gray-700">{item.qty} Units</td>
                    <td className="p-5">
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${getStatusStyles(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-5 text-center">
                      <QrCode size={18} className="mx-auto text-gray-300 group-hover:text-[#84A358] transition-colors" />
                    </td>
                    <td className="p-5 text-sm font-black text-gray-900">${item.cost.toLocaleString()}</td>
                    <td className="p-5 text-xs font-bold text-gray-400 italic">{item.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InventoryTable;