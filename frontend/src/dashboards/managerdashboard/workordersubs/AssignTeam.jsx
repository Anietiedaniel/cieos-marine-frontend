import React, { useState } from "react";
import { ArrowLeft, Plus } from "lucide-react";

export default function AssignTeam({ onBack, onNext }) {
  const [teamMembers, setTeamMembers] = useState({
    supervisors: [],
    assistants: [],
    members: []
  });

  const addRoleMember = (role) => {

    const newMember = `User ${teamMembers[role].length + 1}`;
    setTeamMembers(prev => ({
      ...prev,
      [role]: [...prev[role], newMember]
    }));
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans">
      <div className="flex-grow p-4 md:p-8">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition">
            <ArrowLeft size={24} className="text-gray-700" />
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">New work order</h1>
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 mb-20">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-6">Assign team</h2>

          <div className="space-y-8">
            {/* Create Group Dropdown */}
            <div className="max-w-md">
              <label className="block text-[13px] font-bold text-gray-700 mb-2">Create Group</label>
              <select className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-[13px] text-gray-500 focus:border-[#708B53] outline-none">
                <option>Group Name</option>
              </select>
            </div>

            {/* Note Area */}
            <div>
              <textarea placeholder="Add Note" className="w-full h-32 rounded-lg border border-gray-200 bg-white p-4 text-[13px] focus:border-[#708B53] outline-none resize-none" />
            </div>

            {/* Roles Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Supervisor Column */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[14px] font-bold text-gray-800">Supervisor</span>
                  <button onClick={() => addRoleMember('supervisors')} className="text-[#708B53] text-[12px] font-bold flex items-center gap-1">
                    <span className="text-lg">+</span> Add
                  </button>
                </div>
                <div className="space-y-2">
                   {teamMembers.supervisors.map((m, i) => (
                     <div key={i} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{m}</div>
                   ))}
                </div>
              </div>

              {/* Assistant Column */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[14px] font-bold text-gray-800">Assistant</span>
                  <button onClick={() => addRoleMember('assistants')} className="text-[#708B53] text-[12px] font-bold flex items-center gap-1">
                    <span className="text-lg">+</span> Add
                  </button>
                </div>
                <div className="space-y-2">
                   {teamMembers.assistants.map((m, i) => (
                     <div key={i} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{m}</div>
                   ))}
                </div>
              </div>

              {/* Member Column */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[14px] font-bold text-gray-800">member</span>
                  <button onClick={() => addRoleMember('members')} className="text-[#708B53] text-[12px] font-bold flex items-center gap-1">
                    <span className="text-lg">+</span> Add
                  </button>
                </div>
                <div className="space-y-2">
                   {teamMembers.members.map((m, i) => (
                     <div key={i} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{m}</div>
                   ))}
                </div>
              </div>
            </div>

            {/* Done Button aligned like the image */}
            <div className="flex justify-end pt-4">
              <button onClick={onNext} className="px-10 py-2 bg-[#708B53] text-white rounded-lg font-bold text-sm shadow-md hover:opacity-90 transition">
                Done
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar consistent with the rest of the app */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#F1F4F0] border-t border-gray-200 p-4">
        <div className="max-w-5xl mx-auto flex justify-end gap-4">
          <button className="px-8 py-2 bg-[#D1D5DB] text-gray-500 rounded-lg font-bold text-sm cursor-not-allowed">
            Save as Draft
          </button>
          <button className="px-10 py-2 bg-[#708B53] opacity-50 text-white rounded-lg font-bold text-sm cursor-not-allowed">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}