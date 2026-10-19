import React, { useState, useRef, useEffect } from "react";
import { ArrowLeft, FileText, X, Trash2, Image as ImageIcon, Loader2 } from "lucide-react";

export default function UploadAssets({ onBack, onNext }) {
  // 1. INITIALIZE STATE
  const [images, setImages] = useState(() => {
    const saved = localStorage.getItem("cieos_upload_images");
    return saved ? JSON.parse(saved) : [];
  });
  const [docs, setDocs] = useState(() => {
    const saved = localStorage.getItem("cieos_upload_docs");
    return saved ? JSON.parse(saved) : [];
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const imgInputRef = useRef(null);
  const docInputRef = useRef(null);

  // 2. SAFE STORAGE HELPER (Prevents Crashing)
  const safeSave = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      if (e.name === 'QuotaExceededError') {
        alert("Browser storage is full. Please remove some images before adding more.");
      }
      console.error("Storage Error:", e);
    }
  };

  useEffect(() => {
    safeSave("cieos_upload_images", images);
  }, [images]);

  useEffect(() => {
    safeSave("cieos_upload_docs", docs);
  }, [docs]);

  // 3. IMAGE COMPRESSION LOGIC (The Fix)
  const compressAndEncode = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          // Target a reasonable resolution (e.g., max 1000px)
          const MAX_WIDTH = 1000;
          const scaleSize = MAX_WIDTH / img.width;
          
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          // Convert to JPEG with 0.6 (60%) quality to save massive space
          const dataUrl = canvas.toDataURL('image/jpeg', 0.6); 
          resolve(dataUrl);
        };
      };
    });
  };

  // --- Image Logic ---
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setIsProcessing(true);
    try {
      const newImgs = await Promise.all(
        files.map(async (file) => ({
          id: Math.random() + Date.now(),
          url: await compressAndEncode(file), 
          name: file.name
        }))
      );
      
      setImages(prev => [...prev, ...newImgs]);
    } catch (err) {
      alert("Failed to process images.");
    } finally {
      setIsProcessing(false);
      e.target.value = null; // Reset input
    }
  };

  const deleteImage = (id) => {
    setImages(images.filter(img => img.id !== id));
  };

  // --- Document Logic ---
  const handleDocUpload = (e) => {
    const files = Array.from(e.target.files);
    const newDocs = files.map(file => ({
      id: Math.random() + Date.now(),
      name: file.name,
      size: (file.size / 1024).toFixed(1) + " KB",
      status: "completed"
    }));
    setDocs(prev => [...prev, ...newDocs]);
    e.target.value = null;
  };

  const deleteDoc = (id) => {
    setDocs(docs.filter(doc => doc.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans text-left">
      <input type="file" hidden ref={imgInputRef} accept="image/*" multiple onChange={handleImageUpload} />
      <input type="file" hidden ref={docInputRef} accept=".pdf,.doc,.docx" multiple onChange={handleDocUpload} />

      <div className="flex-grow p-4 md:p-8">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition">
            <ArrowLeft size={24} className="text-gray-700" />
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">New work order</h1>
        </div>

        <div className="max-w-4xl mx-auto space-y-6 mb-24">
          {/* Images Section */}
          <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-800">Images</h2>
              {isProcessing && (
                <div className="flex items-center gap-2 text-[#708B53]">
                  <span className="text-xs font-bold animate-pulse">Compressing...</span>
                  <Loader2 className="animate-spin" size={18} />
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-4 mb-8">
              {images.map((img) => (
                <div key={img.id} className="relative w-28 h-28 rounded-2xl overflow-hidden border border-gray-100 group shadow-sm">
                  <img src={img.url} className="w-full h-full object-cover" alt="preview" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <button onClick={() => deleteImage(img.id)} className="p-2 bg-white text-red-500 rounded-full hover:scale-110 transition">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              
              <button 
                onClick={() => imgInputRef.current.click()}
                className="w-28 h-28 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 hover:border-[#708B53] transition"
              >
                <ImageIcon size={24} />
                <span className="text-[10px] font-bold mt-2 uppercase">Add More</span>
              </button>
            </div>
            
            <div 
              onClick={() => imgInputRef.current.click()}
              className="flex flex-col items-center justify-center py-10 bg-[#F1F4F0]/30 rounded-2xl border-2 border-dashed border-[#708B53]/30 cursor-pointer hover:bg-[#F1F4F0]/50 transition"
            >
              <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-[#708B53] mb-4">
                <ImageIcon size={24} />
              </div>
              <button className="px-8 py-2.5 bg-[#708B53] text-white rounded-xl font-bold text-sm mb-2 shadow-lg shadow-[#708B53]/20">
                Browse Images
              </button>
              <p className="text-[12px] text-gray-500 text-center px-4">Files are automatically optimized for fast upload</p>
            </div>
          </div>

          {/* Document Section */}
          <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-lg font-bold text-gray-800 mb-6">Documents</h2>
            <div className="space-y-3 mb-8">
              {docs.length === 0 ? (
                <div className="text-center py-10 bg-gray-50/50 rounded-2xl border border-dashed border-gray-100 text-gray-400 text-sm italic">
                  No documents uploaded yet
                </div>
              ) : (
                docs.map((doc) => (
                  <div key={doc.id} className="flex items-center gap-4 p-4 border border-gray-100 rounded-2xl bg-white hover:border-[#708B53]/30 transition shadow-sm">
                    <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center shadow-inner">
                      <FileText size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-bold text-gray-800 truncate">{doc.name}</span>
                        <button onClick={() => deleteDoc(doc.id)} className="p-1.5 text-gray-400 hover:text-red-500 transition">
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tighter">{doc.size}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span className="text-[11px] font-bold text-emerald-500 uppercase">Ready</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div 
              onClick={() => docInputRef.current.click()}
              className="flex flex-col items-center justify-center py-10 bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200 cursor-pointer hover:bg-gray-100 transition"
            >
              <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-400 mb-4">
                <FileText size={24} />
              </div>
              <button className="px-8 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold text-sm mb-2 hover:bg-gray-50 transition-colors">
                Select Files
              </button>
              <p className="text-[10px] text-gray-400 font-bold mt-2 uppercase tracking-widest">PDF, DOC up to 5MB</p>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-100 p-4 px-8 z-50 flex justify-end gap-4">
        <button onClick={onBack} className="px-8 py-2.5 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors">Previous</button>
        <button onClick={() => onNext(images, docs)} className="px-12 py-2.5 bg-[#708B53] text-white rounded-xl font-bold text-sm shadow-lg shadow-[#708B53]/20 hover:bg-[#5f7546] transition-all active:scale-95">Next</button>
      </div>
    </div>
  );
}