import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import {
  Plus, Upload, X, FileText, ChevronDown, Trash2, 
  Search, Check, Download, Package, MapPin, DollarSign,
  Image as ImageIcon, HardDrive
} from "lucide-react";

import { useAssets } from "../../../contexts/AssetContext";

const LOCATIONS = [
  { id: "engine-room", name: "Engine Room" },
  { id: "deck-area", name: "Deck Area" },
  { id: "cargo-hold", name: "Cargo Hold" },
  { id: "control-block", name: "Control & Accommodation Block" },
  { id: "galley", name: "Galley & Living Quarters" },
  { id: "steering-room", name: "Steering Gear Room" },
];

const CreateAssetPage = () => {
  const navigate = useNavigate();
  const { createAsset } = useAssets();

  /* ================= STATE ================= */
  const [assetData, setAssetData] = useState({
    name: "",
    code: "",
    location: "",
    make: "",
    model: "",
    serial: "",
    cost: "",
    life: "",
  });

  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");
  const [files, setFiles] = useState([]);
  const [media, setMedia] = useState([]);
  const [qrGenerated, setQrGenerated] = useState(false);

  /* ================= LOGIC ================= */
  const handleInput = (field, value) => {
    setAssetData(prev => ({ ...prev, [field]: value }));
  };

const filteredLocations = useMemo(() => 
  LOCATIONS.filter(loc => loc.name.toLowerCase().includes(searchLocation.toLowerCase())),
  [searchLocation]
);

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...uploadedFiles]);
  };

  const handleMediaUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files).map(file => {
      file.preview = URL.createObjectURL(file);
      return file;
    });
    setMedia(prev => [...prev, ...uploadedFiles]);
  };

  const qrValue = `${window.location.origin}/asset/${assetData.code || 'pending'}`;

  const downloadQR = () => {
    const canvas = document.getElementById("qr-code");
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = `QR-${assetData.name || "Asset"}.png`;
    link.click();
  };

  const handleSave = () => {
    if (!assetData.name || !assetData.code) {
      alert("Please enter at least the Equipment Name and ID.");
      return;
    }
   createAsset({
    id: Date.now().toString(),
    name: assetData.name,
    code: assetData.code,
    location: assetData.location,
    locationId: assetData.locationId, // ✅ THIS IS THE FIX
    condition: "Operational",
    parts: 0,
    team: [],
    priority: "Low",
    documents: files,
    media: media,
    qr: qrGenerated ? qrValue : null,
  });
    navigate("/dashboard/assets");
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* STICKY HEADER */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Register New Equipment</h1>
            <p className="text-sm text-slate-500">Asset Management & Tracking</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => navigate(-1)}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-lg shadow-sm shadow-emerald-200 transition-all active:scale-95"
            >
              Save Asset
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-8 grid lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: FORM */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* SECTION: GENERAL INFO */}
          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-emerald-700">
              <Package size={20} />
              <h2 className="font-bold">General Information</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <FormInput 
                label="Equipment Name" 
                placeholder="e.g. Propulsion Engine"
                value={assetData.name} 
                onChange={(v) => handleInput("name", v)} 
              />
              <FormInput 
                label="Equipment ID / Code" 
                placeholder="EQ-10024"
                value={assetData.code} 
                onChange={(v) => handleInput("code", v)} 
              />
              <FormInput 
                label="Make" 
                placeholder="Caterpillar"
                onChange={(v) => handleInput("make", v)} 
              />
              <FormInput 
                label="Model" 
                placeholder="C32 ACERT"
                onChange={(v) => handleInput("model", v)} 
              />
            </div>
          </section>

          {/* SECTION: LOGISTICS & SPECS */}
          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-blue-700">
              <MapPin size={20} />
              <h2 className="font-bold">Logistics & Specs</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="relative">
                <label className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-1 block">Location</label>
                <button
                  onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                  className="w-full flex justify-between items-center p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 hover:border-emerald-300 transition-colors"
                >
                  {assetData.location || "Select Location"}
                  <ChevronDown size={16} className={`transition-transform ${showLocationDropdown ? 'rotate-180' : ''}`} />
                </button>

                {showLocationDropdown && (
                  <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl border border-slate-100 p-2 animate-in fade-in zoom-in duration-150">
                    <div className="relative mb-2">
                      <Search className="absolute left-3 top-2.5 text-slate-400" size={14} />
                      <input
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 ring-emerald-500"
                        placeholder="Filter locations..."
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                      />
                    </div>
                    <div className="max-h-48 overflow-y-auto">
                      {filteredLocations.map(loc => (
                        <button
                          key={loc.id}
                          onClick={() => {
                            handleInput("location", loc.name);
                            handleInput("locationId", loc.id);
                            setShowLocationDropdown(false);
                          }}
                          className="w-full text-left p-2.5 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg text-sm transition-colors"
                        >
                          {loc.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <FormInput label="Serial Number" placeholder="SN-8829-X" onChange={(v) => handleInput("serial", v)} />
            </div>
          </section>

          {/* SECTION: FINANCIAL */}
          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-amber-700">
              <DollarSign size={20} />
              <h2 className="font-bold">Financials</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <FormInput label="Acquisition Cost ($)" type="number" onChange={(v) => handleInput("cost", v)} />
              <FormInput label="Life Expectancy (Years)" type="number" onChange={(v) => handleInput("life", v)} />
            </div>
          </section>

          {/* SECTION: ASSETS */}
          <div className="grid md:grid-cols-2 gap-6">
            <UploadZone
              title="Technical Documents"
              icon={<FileText size={20} />}
              files={files}
              onUpload={handleFileUpload}
              onRemove={(i) => setFiles(files.filter((_, idx) => idx !== i))}
            />
            <UploadZone
              title="Media & Photos"
              icon={<ImageIcon size={20} />}
              files={media}
              onUpload={handleMediaUpload}
              onRemove={(i) => setMedia(media.filter((_, idx) => idx !== i))}
              isPreview
            />
          </div>
        </div>

        {/* RIGHT COLUMN: PREVIEW/QR */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-28 text-center">
            <h3 className="font-bold text-slate-800 mb-2">Asset QR Identifier</h3>
            <p className="text-xs text-slate-500 mb-6">Scan to view maintenance history instantly</p>
            
            <div className="bg-slate-50 p-6 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center">
              {qrGenerated ? (
                <div className="space-y-4 animate-in fade-in duration-500">
                  <div className="bg-white p-3 rounded-xl shadow-sm inline-block">
                    <QRCodeCanvas id="qr-code" value={qrValue} size={160} level="H" />
                  </div>
                  <button 
                    onClick={downloadQR}
                    className="flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors mx-auto"
                  >
                    <Download size={16} /> Download Tag
                  </button>
                </div>
              ) : (
                <div className="py-8">
                  <button 
                    onClick={() => setQrGenerated(true)}
                    className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-semibold shadow-sm hover:bg-slate-50 transition-all"
                  >
                    Generate QR Code
                  </button>
                </div>
              )}
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100 text-left">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                <HardDrive size={12} />
                Real-time Preview
              </div>
              <div className="text-sm">
                <p className="text-slate-400 italic">{assetData.name || "Unnamed Asset"}</p>
                <p className="font-mono text-emerald-600 mt-1">{assetData.code || "NO-ID"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================= REUSABLE SUB-COMPONENTS ================= */

const FormInput = ({ label, placeholder, value, onChange, type = "text" }) => (
  <div>
    <label className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-1 block">
      {label}
    </label>
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange && onChange(e.target.value)}
      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
    />
  </div>
);

const UploadZone = ({ title, icon, files, onUpload, onRemove, isPreview }) => (
  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
    <div className="flex items-center gap-2 mb-4 text-slate-700">
      {icon}
      <h3 className="font-bold text-sm">{title}</h3>
    </div>
    
    <div className="relative group border-2 border-dashed border-slate-200 hover:border-emerald-400 rounded-xl p-6 transition-colors">
      <input 
        type="file" 
        multiple
        onChange={onUpload}
        className="absolute inset-0 opacity-0 cursor-pointer" 
      />
      <div className="text-center">
        <Upload className="mx-auto mb-2 text-slate-400 group-hover:text-emerald-500 transition-colors" size={24} />
        <p className="text-xs font-medium text-slate-500">Drop files or click to browse</p>
      </div>
    </div>

    {files.length > 0 && (
      <div className="mt-4 space-y-2">
        {files.map((file, idx) => (
          <div key={idx} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-100">
            <div className="flex items-center gap-3 overflow-hidden">
              {isPreview && file.preview ? (
                <img src={file.preview} alt="preview" className="w-8 h-8 rounded object-cover flex-shrink-0" />
              ) : (
                <FileText size={16} className="text-slate-400 flex-shrink-0" />
              )}
              <span className="text-xs text-slate-600 truncate">{file.name}</span>
            </div>
            <button onClick={() => onRemove(idx)} className="text-slate-400 hover:text-red-500 transition-colors">
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default CreateAssetPage;