import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Plus, MapPin } from "lucide-react";
import AddLocation from "./AddLocation";

/* ===== LOCATIONS (MOCK) ===== */
const locations = [
  { id: "engine-room", name: "Engine Room", count: 4 },
  { id: "deck-area", name: "Deck Area", count: 10 },
  { id: "control-block", name: "Control & Accommodation Block", count: 10 },
  { id: "cargo-hold", name: "Cargo Hold", count: 10 },
  { id: "galley", name: "Galley & Living Quarters", count: 10 },
  { id: "steering-room", name: "Steering Gear Room", count: 10 },
];



const AssetOverviewPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  return (
    <div className="p-4 md:p-8 bg-[#F2F4F7] min-h-screen text-left pb-24 md:pb-8">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Assets</h1>
          <p className="text-xs md:text-sm text-gray-500 mt-1 font-medium">
            Hello there! Here’s an overview of your maintenance operations.
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-row gap-3 w-full lg:w-auto">
          <button 
            onClick={() => navigate("/dashboard/assets/create")}
            className="flex-1 lg:flex-none bg-white border border-gray-200 text-gray-700 px-4 md:px-5 py-3 rounded-2xl text-xs md:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm hover:bg-gray-50 active:scale-95"
          >
            <Plus size={18} className="text-[#708B53]" />
            <span className="whitespace-nowrap">Add Asset</span>
          </button>

          <button className="flex-1 lg:flex-none bg-[#708B53] hover:bg-[#5f7546] text-white px-4 md:px-5 py-3 rounded-2xl text-xs md:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#708B53]/20 active:scale-95"
          onClick={() => setOpen(true)}
          >
            <Plus size={18} />
            <span className="whitespace-nowrap">New Location</span>
          </button>
        </div>
      </div>

      {/* MAIN CARD CONTAINER */}
      <div className="bg-white rounded-[32px] p-5 md:p-8 border border-gray-100 shadow-sm">
        <div className="mb-8 flex items-center gap-4">
          <div className="hidden sm:flex w-12 h-12 bg-[#F8FAF7] rounded-2xl items-center justify-center text-[#708B53]">
            <MapPin size={24} />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-black text-gray-800 tracking-tight">All Locations</h2>
            <p className="text-[11px] md:text-xs text-gray-400 mt-0.5 font-bold uppercase tracking-wider">
              Select a location to manage assets
            </p>
          </div>
        </div>

        {/* GRID OF LOCATIONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {locations.map((loc) => (
            <button
              key={loc.id}
              onClick={() => navigate(`/dashboard/assets/location/${loc.id}`)}
              className="flex justify-between items-center p-5 md:p-6 border border-gray-100 rounded-[24px] hover:border-[#708B53] hover:bg-[#F8FAF7] transition-all group text-left relative overflow-hidden active:bg-gray-50"
            >
              <div className="space-y-2 relative z-10">
                <p className="font-black text-gray-800 group-hover:text-[#708B53] text-sm md:text-base transition-colors leading-tight">
                  {loc.name}
                </p>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#708B53]" />
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                    {loc.count} Assets
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-2.5 rounded-xl group-hover:bg-white group-hover:shadow-md transition-all relative z-10">
                <ChevronRight 
                  className="text-gray-400 group-hover:text-[#708B53] transition-colors" 
                  size={18} 
                />
              </div>

              {/* Subtle background decoration on hover */}
              <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-[#708B53]/5 rounded-full blur-2xl group-hover:bg-[#708B53]/10 transition-all" />
            </button>
          ))}
        </div>
      </div>

      {/* MOBILE FLOATING ACTION (Optional: For even better UX) */}
      <div className="md:hidden fixed bottom-6 right-6 flex flex-col gap-3">
         {/* You can add a floating plus button here if you want quick access when scrolled down */}
      </div>
      {/* ✅ PUT MODAL HERE */}
      {open && (
        <AddLocation
          onClose={() => setOpen(false)}
          onSave={(data) => console.log(data)}
        />
      )}
    </div>
    
  );
};

export default AssetOverviewPage;