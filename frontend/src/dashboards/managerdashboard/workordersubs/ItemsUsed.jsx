import React, { useState, useEffect } from "react";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { Label, Input } from "./FormElements";

export default function ItemsUsed({ onBack, onNext }) {
  // 1. INITIALIZE STATE FROM LOCALSTORAGE
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("cieos_workorder_items");
    return savedItems ? JSON.parse(savedItems) : [{ 
      id: Date.now(), 
      partName: "", 
      partId: "", 
      status: "Available", 
      category: "Spare part", 
      quantity: "1", 
      unit: "Pcs", 
      remarks: "", 
      condition: "" 
    }];
  });

  // 2. PERSIST TO LOCALSTORAGE ON EVERY CHANGE
  useEffect(() => {
    localStorage.setItem("cieos_workorder_items", JSON.stringify(items));
  }, [items]);

  const unitOptions = ["Pcs", "Liter", "Meters", "Kg", "Boxes", "Set", "Bottles", "Gallons"];
  const categories = ["Spare part", "Consumable", "Tools"];

  // HANDLER: Update specific field in an item
  const updateItem = (id, field, value) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  // HANDLER: Add new item block
  const addItem = () => {
    setItems([...items, { 
      id: Date.now(), 
      partName: "", 
      partId: "", 
      status: "Available", 
      category: "Spare part", 
      quantity: "1", 
      unit: "Pcs", 
      remarks: "", 
      condition: "" 
    }]);
  };

  // HANDLER: Remove item block
  const removeItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans text-left pb-40 md:pb-28">
      <div className="p-4 md:p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6 md:mb-8">
          <button onClick={onBack} className="p-2.5 bg-white border border-gray-100 shadow-sm hover:bg-gray-100 rounded-full transition active:scale-90">
            <ArrowLeft size={22} className="text-gray-700" />
          </button>
          <h1 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">New work order</h1>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-[24px] md:rounded-[32px] shadow-sm border border-gray-100 p-5 md:p-10 relative overflow-hidden">
          {/* Decorative background accent - Hidden on very small screens to save space */}
          <div className="hidden sm:block absolute top-0 right-0 w-32 h-32 bg-[#708B53]/5 rounded-bl-full -z-0"></div>

          <div className="flex justify-between items-center mb-8 relative z-10">
            <h2 className="text-lg font-black text-gray-800 uppercase tracking-widest">Items used</h2>
            <span className="bg-[#F1F4F0] text-[#708B53] px-3 py-1 rounded-lg text-xs font-black">
              {items.length} {items.length === 1 ? 'Item' : 'Items'}
            </span>
          </div>

          {items.map((item, idx) => (
            <div key={item.id} className={`relative z-10 animate-in fade-in slide-in-from-top-4 duration-300 ${idx > 0 ? "mt-12 pt-10 border-t border-dashed border-gray-200" : ""}`}>
              
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-[#708B53] flex items-center justify-center text-[10px] text-white font-black">
                    {idx + 1}
                  </div>
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Part Specifications</span>
                </div>
                {items.length > 1 && (
                  <button onClick={() => removeItem(item.id)} className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all active:scale-90">
                    <Trash2 size={20} />
                  </button>
                )}
              </div>

              {/* Responsive Grid: 1 col on mobile, 3 on desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6 mb-6">
                <div className="sm:col-span-2 md:col-span-1">
                  <Label>Parts Name</Label>
                  <Input 
                    placeholder="e.g. Hydraulic Filter" 
                    value={item.partName} 
                    onChange={(e) => updateItem(item.id, 'partName', e.target.value)} 
                  />
                </div>
                <div>
                  <Label>Parts ID</Label>
                  <Input 
                    placeholder="#ID-0000" 
                    value={item.partId} 
                    onChange={(e) => updateItem(item.id, 'partId', e.target.value)} 
                  />
                </div>
                <div>
                  <Label>Status</Label>
                  <select 
                    value={item.status}
                    onChange={(e) => updateItem(item.id, 'status', e.target.value)}
                    className="w-full h-[48px] rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#708B53] focus:ring-4 focus:ring-[#708B53]/5 bg-white font-bold text-gray-700 appearance-none shadow-sm transition-all"
                  >
                    <option>Available</option>
                    <option>Out of Stock</option>
                    <option>Ordered</option>
                  </select>
                </div>

                <div>
                  <Label>Category</Label>
                  <select 
                    value={item.category}
                    onChange={(e) => updateItem(item.id, 'category', e.target.value)}
                    className="w-full h-[48px] rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#708B53] focus:ring-4 focus:ring-[#708B53]/5 bg-white font-bold text-gray-700 appearance-none shadow-sm transition-all"
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Quantity</Label>
                    <Input 
                      type="number" 
                      value={item.quantity} 
                      onChange={(e) => updateItem(item.id, 'quantity', e.target.value)} 
                    />
                  </div>
                  <div>
                    <Label>Unit</Label>
                    <select 
                      value={item.unit}
                      onChange={(e) => updateItem(item.id, 'unit', e.target.value)}
                      className="w-full h-[48px] rounded-xl border border-gray-200 px-3 text-sm outline-none focus:border-[#708B53] bg-white font-bold text-gray-700 shadow-sm transition-all"
                    >
                      {unitOptions.map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <Label>Condition</Label>
                  <Input 
                    placeholder="New / Replaced" 
                    value={item.condition} 
                    onChange={(e) => updateItem(item.id, 'condition', e.target.value)} 
                  />
                </div>
              </div>

              <div className="w-full">
                <Label>Remarks</Label>
                <Input 
                  placeholder="Notes about this part..." 
                  value={item.remarks} 
                  onChange={(e) => updateItem(item.id, 'remarks', e.target.value)} 
                />
              </div>
            </div>
          ))}

          {/* Add More Button - Full width on mobile */}
          <div className="mt-10 pt-8 border-t border-gray-50">
            <button 
              onClick={addItem} 
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 border-2 border-dashed border-gray-200 rounded-2xl font-black text-sm text-gray-500 hover:bg-[#F1F4F0] hover:border-[#708B53] hover:text-[#708B53] transition-all active:scale-95"
            >
              <Plus size={20} className="text-[#708B53]"/> Add More Items
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER NAVIGATION - Mobile Stacked, Desktop Row */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-100 p-4 md:p-6 px-4 md:px-8 z-50">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-end gap-3">
          <div className="flex gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none px-6 md:px-8 py-3.5 md:py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl font-black text-sm hover:bg-gray-50 active:scale-95 transition-all">
              Draft
            </button>
            <button 
              onClick={onBack} 
              className="flex-1 sm:flex-none px-6 md:px-8 py-3.5 md:py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl font-black text-sm hover:bg-gray-50 active:scale-95 transition-all"
            >
              Previous
            </button>
          </div>
          <button 
            onClick={onNext} 
            className="w-full sm:w-auto px-12 md:px-16 py-4 md:py-2.5 bg-[#708B53] text-white rounded-xl font-black text-sm shadow-xl shadow-[#708B53]/20 hover:bg-[#5f7546] active:scale-95 transition-all"
          >
            Confirm & Next
          </button>
        </div>
      </div>
    </div>
  );
}