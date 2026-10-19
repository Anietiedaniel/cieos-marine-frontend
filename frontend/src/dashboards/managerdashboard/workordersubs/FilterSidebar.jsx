import React from 'react';
import { X } from 'lucide-react';

const FilterSidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[150] transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar Panel */}
      <div className={`
        fixed top-0 right-0 h-full bg-white z-[160] w-full sm:w-[350px] shadow-2xl
        transition-transform duration-300 ease-in-out border-l border-gray-100
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-50">
            <h2 className="text-xl font-bold text-gray-800">Filter</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-xl text-gray-400">
              <X size={20} />
            </button>
          </div>
          
          <div className="flex-grow p-6 overflow-y-auto">
            {/* Filter Content goes here - Status, Category, Priority */}
            <p className="text-sm text-gray-400 italic">Select criteria to filter work orders...</p>
          </div>

          <div className="p-6 border-t border-gray-50 grid grid-cols-2 gap-4">
            <button className="py-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
              Reset
            </button>
            <button className="py-3 rounded-xl bg-[#708B53] text-white text-sm font-bold hover:bg-[#5d7445] transition-colors shadow-md shadow-green-100">
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;