import React, { useState, useRef, useEffect } from "react";
import { 
  X, Calendar, Paperclip, UserPlus, 
  ChevronDown, Upload, Info, Check, Search,
  ChevronLeft, ChevronRight
} from "lucide-react";

const CreateSchedule = ({ onClose, onDone }) => {

  const [title, setTitle] = useState("");
const [priority, setPriority] = useState("");
const [category, setCategory] = useState("");
const [location, setLocation] = useState("");
const [asset, setAsset] = useState("");
  // 1. Core Form State
  const [triggerType, setTriggerType] = useState("Time Based");
  const [status, setStatus] = useState("In Progress");
  const [frequencyUnit, setFrequencyUnit] = useState("Days");
  const [selectedDate, setSelectedDate] = useState(null);
  
  // 2. Interactive States
  const [showMemberSearch, setShowMemberSearch] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const fileInputRef = useRef(null);
  const calendarRef = useRef(null);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const membersList = [
    { id: 1, name: "John Hanks", role: "Captain", img: "https://i.pravatar.cc/150?u=1" },
    { id: 2, name: "Kelvin Onyieugbo", role: "Crew Member", img: "https://i.pravatar.cc/150?u=2" },
    { id: 3, name: "Sarah Jenkins", role: "Engineer", img: "https://i.pravatar.cc/150?u=3" },
  ];

const categories = [
  "Electrical",
  "Mechanical",
  "HVAC",
  "Plumbing",
  "Safety Equipment",
  "Production Machines"
];

const locations = [
  "Production Floor",
  "Warehouse",
  "Generator House",
  "Boiler Room",
  "Electrical Room",
  "Office Building"
];

const assets = [
  "Main Generator",
  "Conveyor Belt A",
  "HVAC Unit 01",
  "Water Pump",
  "Electrical Panel",
  "Air Compressor"
];

 const handleCreatePlan = () => {
  const newPlan = {
    title: title || "Untitled Plan",
    asset: asset || "Not Selected",
    category: category || "General",
    location: location || "Unknown",
    priority: priority || "Medium",
    trigger: triggerType,
    frequency: `Every 1 ${frequencyUnit}`,
    nextDue: selectedDate || "Not set",
    status: status,
    autoAssign: true
  };

  onDone(newPlan);
  onClose();
};

  const frequencyOptions = {
    "Time Based": ["Yearly", "Monthly", "Weekly", "Days"],
    "Usage Based": ["Engine Hour", "Running Hour", "Trips", "Cycles"],
    "Condition Based": []
  };

  // Calendar Logic
  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const onDateSelect = (day) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }));
    setShowCalendar(false);
  };

  const handleTriggerChange = (e) => {
    const newType = e.target.value;
    setTriggerType(newType);
    if (newType !== "Condition Based") {
      setFrequencyUnit(frequencyOptions[newType][0]);
    }
  };

  const toggleMember = (member) => {
    if (selectedMembers.find(m => m.id === member.id)) {
      setSelectedMembers(selectedMembers.filter(m => m.id !== member.id));
    } else {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setAttachments([...attachments, ...files]);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[200] flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-2xl max-h-[92vh] rounded-[40px] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 border border-white/20">
        
        {/* MODAL HEADER */}
        <div className="px-8 py-5 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
              <Calendar size={20} className="text-[#708B53]" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 tracking-tight">Create Plan/Schedule</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-red-50 hover:text-red-500 rounded-full transition-all text-gray-400">
            <X size={24} />
          </button>
        </div>

        {/* SCROLLABLE FORM CONTENT */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar bg-white">
          
          {/* HEADER TITLE SECTION */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-8 bg-[#708B53] rounded-full shadow-sm shadow-[#708B53]/40"></div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">Anchor windlass inspection</h1>
            </div>
            <div className="flex bg-gray-100 p-1.5 rounded-2xl w-fit">
              {["Open", "On Hold", "In Progress", "Done"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${
                    status === s ? "bg-[#708B53] text-white shadow-md scale-105" : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* GRID: PRIORITY & TITLE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest ml-1">Priority</label>
              <div className="relative">
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl font-bold appearance-none outline-none focus:bg-white focus:ring-2 ring-[#708B53]/20 transition-all text-gray-700"
                >
                  <option>Select Priority</option>
                  <option className="text-red-500 font-bold">High</option>
                  <option className="text-orange-500 font-bold">Medium</option>
                  <option className="text-blue-500 font-bold">Low</option>
                </select>
                <ChevronDown size={18} className="absolute right-4 top-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest ml-1">Title</label>
              <input
              type="text"
              placeholder="Fill Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl font-bold outline-none focus:bg-white focus:ring-2 ring-[#708B53]/20 transition-all text-gray-700"
            />
            </div>
          </div>
          {/* GRID: CATEGORY, LOCATION, ASSET */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {["Category", "Location", "Asset Name"].map((label) => (
              <div key={label} className="flex flex-col gap-2 text-left">

                {/* LABEL */}
                <label className="text-[11px] font-extrabold uppercase tracking-widest text-gray-400 ml-1">
                  {label}
                </label>

                {/* SELECT FIELD */}
                <div className="relative group">

                  <select
                      value={
                        label === "Category"
                          ? category
                          : label === "Location"
                          ? location
                          : asset
                      }
                      onChange={(e) => {
                        if (label === "Category") setCategory(e.target.value);
                        if (label === "Location") setLocation(e.target.value);
                        if (label === "Asset Name") setAsset(e.target.value);
                      }}
                      className="
                      w-full
                      px-4 py-3.5
                      bg-gray-50
                      border border-gray-200
                      rounded-xl
                      font-semibold
                      text-gray-700
                      appearance-none
                      outline-none
                      transition-all
                      duration-200
                      hover:border-gray-300
                      focus:bg-white
                      focus:border-[#708B53]
                      focus:ring-2
                      focus:ring-[#708B53]/20
                    "
                    >
                    <option>Select {label}</option>

                    {(label === "Category"
                      ? categories
                      : label === "Location"
                      ? locations
                      : assets
                    ).map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  {/* DROPDOWN ICON */}
                  <ChevronDown
                    size={18}
                    className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                    pointer-events-none
                    transition-colors
                    group-focus-within:text-[#708B53]
                    "
                  />

                </div>
              </div>
            ))}

          </div>

          {/* DESCRIPTION */}
          <div className="space-y-2 text-left">
            <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest ml-1">Description</label>
            <textarea 
              rows="3" 
              placeholder="Inspect windlass brakes, motor, and chain stopper mechanisms..."
              className="w-full p-5 bg-gray-50 border border-transparent rounded-[24px] font-medium outline-none focus:bg-white focus:ring-2 ring-[#708B53]/20 transition-all text-gray-600 italic"
            ></textarea>
          </div>

          {/* DYNAMIC TRIGGER SECTION */}
          <div className="p-7 bg-[#F9FAFB] rounded-[32px] border border-gray-100 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 text-left">
                <label className="text-[11px] font-black uppercase text-[#708B53] tracking-widest ml-1">Trigger Type</label>
                <div className="relative">
                  <select 
                    value={triggerType}
                    onChange={handleTriggerChange}
                    className="w-full p-4 bg-white border border-gray-200 rounded-2xl font-bold appearance-none outline-none shadow-sm focus:ring-2 ring-[#708B53]/20 transition-all"
                  >
                    <option>Time Based</option>
                    <option>Usage Based</option>
                    <option>Condition Based</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-4 text-gray-400" />
                </div>
              </div>

              {triggerType !== "Condition Based" && (
                <div className="space-y-2 text-left animate-in fade-in slide-in-from-right-4 duration-300">
                  <label className="text-[11px] font-black uppercase text-[#708B53] tracking-widest ml-1">Frequency</label>
                  <div className="flex gap-2">
                    <input 
                      type="number" 
                      placeholder="Every" 
                      className="w-24 p-4 bg-white border border-gray-200 rounded-2xl font-bold outline-none shadow-sm focus:ring-2 ring-[#708B53]/20" 
                    />
                    <div className="relative flex-1">
                      <select 
                        value={frequencyUnit}
                        onChange={(e) => setFrequencyUnit(e.target.value)}
                        className="w-full p-4 bg-white border border-gray-200 rounded-2xl font-bold appearance-none outline-none shadow-sm"
                      >
                        {frequencyOptions[triggerType].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                      <ChevronDown size={18} className="absolute right-4 top-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {triggerType === "Condition Based" && (
              <div className="space-y-3 text-left animate-in slide-in-from-top-4 duration-500">
                <label className="text-[11px] font-black uppercase text-[#708B53] tracking-widest ml-1">Trigger Condition</label>
                <textarea 
                   placeholder="Eg: Based on oil analysis results, Sensor readings above the threshold..."
                   className="w-full p-5 bg-white border border-gray-200 rounded-2xl italic text-sm text-gray-700 shadow-sm min-h-[100px] outline-none focus:ring-2 ring-[#708B53]/20"
                />
                <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase ml-1">
                  <Info size={12} /> Describe the condition that triggers this maintenance
                </div>
              </div>
            )}
          </div>

          {/* DATE & ASSIGNEE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            
            {/* Calendar Section */}
            <div className="space-y-2 text-left relative" ref={calendarRef}>
              <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest ml-1">First Scheduled Date</label>
              <div 
                onClick={() => setShowCalendar(!showCalendar)}
                className="relative cursor-pointer group"
              >
                <div className={`w-full p-4 bg-gray-50 border border-transparent rounded-2xl font-bold transition-all ${selectedDate ? 'text-gray-800' : 'text-gray-400'} group-hover:bg-gray-100`}>
                  {selectedDate || "Select Date"}
                </div>
                <Calendar size={18} className={`absolute right-4 top-4 transition-colors ${showCalendar ? 'text-[#708B53]' : 'text-gray-400'}`} />
              </div>

              {showCalendar && (
                <div className="absolute bottom-full md:top-full left-0 mb-2 md:mt-2 z-[100] bg-white border border-gray-100 shadow-2xl rounded-[32px] p-6 w-[320px] animate-in fade-in zoom-in-95 duration-200">
                   <div className="flex items-center justify-between mb-6">
                      <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-50 rounded-xl transition-colors"><ChevronLeft size={20} className="text-gray-400"/></button>
                      <span className="font-black text-xs uppercase bg-black text-white px-5 py-2 rounded-xl tracking-widest shadow-lg shadow-black/10">
                        {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                      </span>
                      <button onClick={handleNextMonth} className="p-2 hover:bg-gray-50 rounded-xl transition-colors"><ChevronRight size={20} className="text-gray-400"/></button>
                   </div>
                   <div className="grid grid-cols-7 gap-1 text-center">
                      {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => (
                        <span key={d} className="text-[10px] font-black text-gray-300 uppercase py-2">{d}</span>
                      ))}
                      {/* Empty spaces for the first week */}
                      {[...Array(firstDayOfMonth(currentMonth.getFullYear(), currentMonth.getMonth()))].map((_, i) => (
                        <div key={`empty-${i}`} className="p-2"></div>
                      ))}
                      {/* Actual Days */}
                      {[...Array(daysInMonth(currentMonth.getFullYear(), currentMonth.getMonth()))].map((_, i) => {
                        const day = i + 1;
                        const isToday = new Date().getDate() === day && new Date().getMonth() === currentMonth.getMonth();
                        return (
                          <button 
                            key={day} 
                            onClick={() => onDateSelect(day)}
                            className={`text-xs p-2.5 rounded-xl font-black transition-all ${
                              isToday ? 'bg-[#708B53] text-white shadow-lg shadow-[#708B53]/30 scale-110' : 'hover:bg-gray-100 text-gray-600 hover:text-[#708B53]'
                            }`}
                          >
                            {day}
                          </button>
                        );
                      })}
                   </div>
                </div>
              )}
            </div>

            {/* Members Section */}
            <div className="space-y-2 text-left relative">
              <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest ml-1">Default Assignee</label>
              
              <div className="flex flex-wrap gap-2 mb-2 min-h-[40px]">
                {selectedMembers.map(m => (
                  <div key={m.id} className="flex items-center gap-2 bg-[#708B53]/10 text-[#708B53] px-3 py-1.5 rounded-xl border border-[#708B53]/20 animate-in zoom-in-75">
                    <img src={m.img} className="w-5 h-5 rounded-full object-cover" alt="" />
                    <span className="text-[10px] font-black uppercase tracking-tight">{m.name}</span>
                    <X size={12} className="cursor-pointer hover:scale-125 transition-transform" onClick={() => toggleMember(m)}/>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setShowMemberSearch(!showMemberSearch)}
                className="w-full p-4 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center gap-2 text-gray-400 font-black text-xs uppercase tracking-widest hover:border-[#708B53] hover:bg-[#708B53]/5 hover:text-[#708B53] transition-all"
              >
                <UserPlus size={18} /> Add members
              </button>

              {showMemberSearch && (
                <div className="absolute top-full right-0 mt-2 z-[100] bg-white border border-gray-100 shadow-2xl rounded-[32px] p-6 w-full animate-in fade-in slide-in-from-top-2">
                  <div className="relative mb-4">
                    <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
                    <input type="text" placeholder="Search members..." className="w-full pl-12 pr-4 py-3.5 bg-gray-50 rounded-2xl outline-none font-bold text-sm focus:ring-2 ring-[#708B53]/20" />
                  </div>
                  <div className="space-y-2 max-h-[200px] overflow-y-auto custom-scrollbar pr-2">
                    {membersList.map(m => (
                      <div 
                        key={m.id} 
                        onClick={() => toggleMember(m)}
                        className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-2xl cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img src={m.img} className="w-10 h-10 rounded-2xl border border-gray-100 object-cover" alt="" />
                          <div>
                            <p className="text-xs font-black text-gray-800">{m.name}</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase">{m.role}</p>
                          </div>
                        </div>
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${selectedMembers.find(sm => sm.id === m.id) ? 'bg-[#708B53] text-white' : 'bg-gray-100 text-transparent'}`}>
                          <Check size={14} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => setShowMemberSearch(false)}
                    className="w-full mt-4 py-4 bg-[#708B53] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-[#708B53]/20 hover:bg-[#5f7546] transition-all"
                  >
                    Confirm Selection
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* FILE UPLOAD SECTION */}
          <div className="space-y-3 text-left">
             <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest ml-1 flex items-center gap-2">
               Add Attachment <Paperclip size={14} className="text-gray-300"/>
             </label>
             <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                multiple 
                onChange={handleFileUpload}
             />
             <div 
                onClick={() => fileInputRef.current.click()}
                className="border-2 border-dashed border-gray-100 rounded-[32px] p-10 flex flex-col items-center justify-center bg-gray-50/30 group hover:border-[#708B53]/30 transition-all cursor-pointer"
             >
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Upload size={28} className="text-gray-300 group-hover:text-[#708B53]" />
                </div>
                <button className="px-8 py-2.5 bg-white border border-gray-200 rounded-xl font-black text-xs uppercase tracking-widest shadow-sm hover:shadow-md transition-all">
                   {attachments.length > 0 ? `${attachments.length} Files Selected` : 'Upload File'}
                </button>
                <p className="mt-3 text-[10px] text-gray-400 font-bold uppercase tracking-tighter">PNG, JPG, PDF up to 10MB</p>
             </div>
             
             {/* List of uploaded files */}
             <div className="flex flex-wrap gap-2 mt-2">
                {attachments.map((file, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl border border-gray-100 animate-in slide-in-from-left-2 group">
                    <Paperclip size={12} className="text-[#708B53]"/>
                    <span className="text-[10px] font-bold text-gray-600 truncate max-w-[120px]">{file.name}</span>
                    <X size={12} className="cursor-pointer hover:text-red-500 transition-colors" onClick={(e) => {
                      e.stopPropagation();
                      setAttachments(attachments.filter((_, i) => i !== idx));
                    }}/>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* MODAL FOOTER */}
        <div className="p-8 bg-white border-t border-gray-50 flex justify-end gap-4 sticky bottom-0">
          <button 
            onClick={onClose}
            className="px-8 py-4 bg-gray-50 text-gray-400 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-100 transition-all"
          >
            Cancel
          </button>
         <button
            onClick={handleCreatePlan}
            className="w-full py-4 bg-[#708B53] text-white rounded-2xl font-bold"
          >
            Create Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSchedule;