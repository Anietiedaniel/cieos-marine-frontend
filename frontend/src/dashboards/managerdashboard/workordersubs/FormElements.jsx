import React from "react";
import { ChevronDown } from "lucide-react";

export const Label = ({ children }) => (
  <label className="block text-[13px] font-bold text-[#4A4A4A] mb-2">{children}</label>
);

export const Input = ({ ...props }) => (
  <input
    {...props}
    className="w-full rounded-lg border border-gray-200 bg-[#F9FAFB] px-4 py-2.5 text-[13px] text-gray-600 focus:border-[#708B53] focus:bg-white focus:outline-none transition-all"
  />
);

export const CustomSelect = ({ label, placeholder, onClick }) => (
  <div className="cursor-pointer" onClick={onClick}>
    <Label>{label}</Label>
    <div className="w-full flex justify-between items-center rounded-lg border border-gray-200 bg-[#F9FAFB] px-4 py-2.5 text-[13px] text-gray-500 hover:border-[#708B53] transition-colors">
      {placeholder}
      <ChevronDown size={18} className="text-gray-400" />
    </div>
  </div>
);

export const TimeInput = ({ value, unit }) => (
  <div className="flex flex-col items-center">
    <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-2 py-1 bg-white">
      <span className="text-[13px] font-bold text-gray-700">{value}</span>
      <div className="flex flex-col leading-[0] text-[8px] text-gray-400">
        <button className="hover:text-[#708B53]">▲</button>
        <button className="hover:text-[#708B53]">▼</button>
      </div>
    </div>
    <span className="text-[10px] font-medium text-gray-400 mt-1">{unit}</span>
  </div>
);