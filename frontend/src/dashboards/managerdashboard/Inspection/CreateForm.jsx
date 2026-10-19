import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, Plus, Type, List, 
  Check, X, Expand, Trash2, 
  ChevronLeft, Layout, Save, Send,
  AlertCircle, FileText, Settings2
} from 'lucide-react';

const CreateForm = ({ onBack }) => {
  const [sections, setSections] = useState([
    { 
      id: 1, 
      name: 'Hull External Conditions', 
      description: 'Assess the outer shell integrity and marine growth.', 
      fields: [{ id: 101, question: '', type: 'Multiple Choice', required: true }] 
    }
  ]);

  const [formStats, setFormStats] = useState({ total: 1, required: 1 });

  useEffect(() => {
    const fields = sections.flatMap(s => s.fields);
    setFormStats({
      total: fields.length,
      required: fields.filter(f => f.required).length
    });
  }, [sections]);

  // --- Logic Handlers ---
  const addSection = () => {
    setSections([...sections, { 
      id: Date.now(), 
      name: '', 
      description: '', 
      fields: [{ id: Date.now() + 1, question: '', type: 'Multiple Choice', required: false }] 
    }]);
  };

  const removeSection = (id) => {
    if (sections.length > 1) setSections(sections.filter(sec => sec.id !== id));
  };

  const addField = (sectionId) => {
    setSections(sections.map(sec => {
      if (sec.id === sectionId) {
        return { 
          ...sec, 
          fields: [...sec.fields, { id: Date.now(), question: '', type: 'Multiple Choice', required: false }] 
        };
      }
      return sec;
    }));
  };

  const removeField = (sectionId, fieldId) => {
    setSections(sections.map(sec => {
      if (sec.id === sectionId) {
        return { ...sec, fields: sec.fields.filter(f => f.id !== fieldId) };
      }
      return sec;
    }));
  };

  const updateFieldType = (sectionId, fieldId, newType) => {
    setSections(sections.map(sec => {
      if (sec.id === sectionId) {
        return {
          ...sec,
          fields: sec.fields.map(f => f.id === fieldId ? { ...f, type: newType } : f)
        };
      }
      return sec;
    }));
  };

  const toggleRequired = (sectionId, fieldId) => {
    setSections(sections.map(sec => {
      if (sec.id === sectionId) {
        return {
          ...sec,
          fields: sec.fields.map(f => f.id === fieldId ? { ...f, required: !f.required } : f)
        };
      }
      return sec;
    }));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFB] font-sans text-slate-700 pb-20">
      {/* Responsive Toolbar */}
      <div className="sticky top-0 z-50 bg-white border-b border-slate-200 px-4 md:px-6 py-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2 md:gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-lg transition-colors group">
            <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <div className="h-6 w-[1px] bg-slate-200 mx-1 md:mx-2" />
          <div>
            <h1 className="text-xs md:text-sm font-bold text-slate-900 leading-tight">Form Builder</h1>
            <p className="text-[9px] md:text-[11px] text-[#84A962] font-semibold uppercase tracking-widest">Hull Maintenance</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Stats hidden on small mobile */}
          <div className="hidden lg:flex items-center gap-4 mr-6 text-[11px] font-bold text-slate-400">
            <span className="flex items-center gap-1.5"><FileText size={14}/> {formStats.total} Questions</span>
            <span className="flex items-center gap-1.5"><AlertCircle size={14}/> {formStats.required} Required</span>
          </div>
          <button className="hidden sm:flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
            <Save size={16} /> Save
          </button>
          <button className="flex items-center gap-2 px-4 md:px-6 py-2 bg-[#84A962] hover:bg-[#749654] text-white text-xs font-bold rounded-lg transition-all shadow-md">
            <Send size={16} /> <span className="hidden xs:inline">Publish</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-6 md:py-10 px-4 space-y-6 md:space-y-8">
        {/* Metadata Header Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 px-4 md:px-6 py-3 border-b border-slate-200 flex justify-between items-center">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Form Configuration</span>
            <Settings2 size={14} className="text-slate-400" />
          </div>
          <div className="p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 md:gap-y-6">
            <FormInput label="Inspection Title" placeholder="e.g. Hull Integrity" defaultValue="Hull Integrity Inspection" />
            <FormSelect label="Asset Category" options={['Tanker', 'Bulk Carrier', 'LPG Carrier']} />
            <FormSelect label="Location" options={['Ship Hull', 'Internal Tanks', 'Ballast Area']} />
            <FormSelect label="Default Priority" options={['High', 'Medium', 'Low']} />
          </div>
        </div>

        {/* Sections Container */}
        {sections.map((section, sIdx) => (
          <div key={section.id} className="relative group">
            <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-6">
              <div className="p-5 md:p-8">
                <div className="flex justify-between items-start mb-4 md:mb-6">
                  <div className="space-y-1 flex-1">
                    <span className="text-[10px] font-bold text-[#84A962] uppercase tracking-tighter">Section {sIdx + 1}</span>
                    <input 
                      className="w-full text-xl md:text-2xl font-black text-slate-800 outline-none placeholder:text-slate-200"
                      placeholder="Enter Section Title..."
                      defaultValue={section.name}
                    />
                    <input 
                      className="w-full text-xs md:text-sm text-slate-500 outline-none placeholder:text-slate-300 mt-1 md:mt-2"
                      placeholder="Instructions for the technical surveyor..."
                      defaultValue={section.description}
                    />
                  </div>
                  {sections.length > 1 && (
                    <button 
                      onClick={() => removeSection(section.id)}
                      className="p-2 text-slate-300 hover:text-red-500 rounded-lg"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>

                <div className="h-[1px] bg-slate-100 mb-6 md:mb-8" />

                {/* Question List */}
                <div className="space-y-4 md:space-y-6">
                  {section.fields.map((field, fIdx) => (
                    <div key={field.id} className="bg-slate-50/50 rounded-xl md:rounded-2xl p-4 md:p-6 border border-slate-100 hover:bg-white transition-all">
                      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 mb-4 md:mb-6">
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-black text-slate-300 tracking-widest uppercase">Q{fIdx + 1}</span>
                            {field.required && <span className="text-[8px] bg-red-100 text-red-500 px-1.5 py-0.5 rounded font-bold uppercase">Required</span>}
                          </div>
                          <input 
                            className="w-full bg-transparent border-b border-slate-200 py-1.5 outline-none text-sm md:text-base font-bold text-slate-700 focus:border-[#84A962]"
                            placeholder="Inspection criteria..."
                          />
                        </div>

                        {/* Field Type Switcher */}
                        <div className="w-full lg:w-56">
                          <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Response Type</label>
                          <div className="relative">
                            <select 
                              className="w-full appearance-none bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs font-bold text-slate-700 outline-none"
                              value={field.type}
                              onChange={(e) => updateFieldType(section.id, field.id, e.target.value)}
                            >
                              <option value="Multiple Choice">Multiple Choice</option>
                              <option value="Text Field">Text Field</option>
                            </select>
                            <div className="absolute left-3 top-2.5 text-[#84A962]">
                              {field.type === 'Multiple Choice' ? <List size={14} /> : <Type size={14} />}
                            </div>
                            <ChevronDown size={12} className="absolute right-3 top-3 text-slate-400 pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      {/* Field Actions */}
                      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-4">
                        <div className="flex gap-2">
                          {field.type === 'Multiple Choice' ? (
                            ['Pass', 'Flag', 'Fail'].map(label => (
                              <InteractiveStatus key={label} label={label} activeColor={
                                label === 'Pass' ? 'border-green-500 text-green-600 bg-green-50' :
                                label === 'Flag' ? 'border-orange-500 text-orange-600 bg-orange-50' :
                                'border-red-500 text-red-600 bg-red-50'
                              } />
                            ))
                          ) : (
                            <div className="flex items-center gap-2 py-1 px-3 bg-slate-100 rounded-lg text-slate-400">
                              <Type size={12} />
                              <span className="text-[9px] font-bold uppercase">Text Input Enabled</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-4 ml-auto">
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-black text-slate-400 uppercase">Required</span>
                            <button 
                              onClick={() => toggleRequired(section.id, field.id)}
                              className={`w-8 h-4 rounded-full relative transition-all duration-300 ${field.required ? 'bg-[#84A962]' : 'bg-slate-200'}`}
                            >
                              <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${field.required ? 'left-4.5' : 'left-0.5'}`} />
                            </button>
                          </div>
                          <button onClick={() => removeField(section.id, field.id)} className="text-slate-300 hover:text-red-400">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Section Controls */}
                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                  <button 
                    onClick={() => addField(section.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 font-bold hover:border-[#84A962] hover:text-[#84A962] transition-all text-xs"
                  >
                    <Plus size={16} /> Add Field
                  </button>
                  <button 
                    onClick={addSection}
                    className="px-6 py-3.5 bg-slate-800 text-white rounded-xl font-bold text-xs hover:bg-slate-900 transition-all"
                  >
                    New Section
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* --- UI COMPONENTS --- */

const FormInput = ({ label, placeholder, defaultValue }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
    <input 
      className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold text-slate-700 focus:border-[#84A962] outline-none transition-all placeholder:text-slate-300" 
      placeholder={placeholder}
      defaultValue={defaultValue}
    />
  </div>
);

const FormSelect = ({ label, options }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
    <div className="relative">
      <select className="w-full appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold text-slate-700 outline-none cursor-pointer">
        {options.map((opt, i) => <option key={i}>{opt}</option>)}
      </select>
      <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
    </div>
  </div>
);

const InteractiveStatus = ({ label, activeColor }) => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <button 
      onClick={() => setIsSelected(!isSelected)}
      className={`px-3 md:px-4 py-1 rounded-lg border-2 text-[9px] md:text-[10px] font-black uppercase transition-all duration-200 ${
        isSelected ? activeColor : 'border-slate-100 bg-white text-slate-300'
      }`}
    >
      {label}
    </button>
  );
};

export default CreateForm;