import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// 👉 IMPORT YOUR LOCAL IMAGES (replace with your real paths)
import img1 from "../../../assets/images/image10.png";
import img2 from "../../../assets/images/image11.png";
import img3 from "../../../assets/images/image12.png";

const mockData = [
  {
    id: "IN-091",
    title: "Hull Integrity Inspection",
    form: "Hull Integrity Inspection",
    location: "Ship Hull",
    startDate: "5th March, 2026",
    inspector: "John Hanks",
    reviewer: "J. Morrison",
    submittedDate: "10th March, 2026",
    attachments: 3,
    status: "Pending",

    summary: { passed: 13, flagged: 2, failed: 1 },

    images: [img1, img2, img3],

    sections: [
      {
        name: "Section 1",
        title: "Hull surface condition",
        stats: { passed: 3, flagged: 1 },
        items: [
          { name: "Paint condition (Port side midship)", desc: "Minor scuffs, no exposed metal", result: "Passed" },
          { name: "Visible dents or deformation", desc: "None observed", result: "Passed" },
          { name: "Marine growth buildup level", desc: "Moderate barnacle buildup near waterline", result: "Flagged", image: img1 },
          { name: "Hull cleanliness around drainage points", desc: "Drain outlets clear", result: "Passed" },
        ],
      },
      {
        name: "Section 2",
        title: "Structural integrity and plating",
        stats: { passed: 3, flagged: 1 },
        items: [
          { name: "Signs of corrosion on plating", desc: "No active corrosion", result: "Passed" },
          { name: "Weld seam condition (Port stern seam)", desc: "None observed", result: "Flagged", image: img2 },
          { name: "Hull plating thickness reference", desc: "Recommend ultrasound check at next docking", result: "Passed" },
          { name: "Signs of impact damage near stern", desc: "None seen", result: "Passed" },
        ],
      },
      {
        name: "Section 3",
        title: "Openings, Seals and safety points",
        stats: { passed: 3, failed: 1 },
        items: [
          { name: "Porthole seals and frame condition", desc: "All seals intact", result: "Passed" },
          { name: "Sea chest grates and intake area", desc: "Secure, no blockage", result: "Passed" },
          { name: "Bilge outlet area condition", desc: "Clear and functional", result: "Passed" },
          { name: "Sacrificial anode condition", desc: "Below safe threshold", result: "Failed", image: img3 },
        ],
      },
      {
        name: "Section 4",
        title: "General observation and environmental exposure",
        stats: { passed: 4 },
        items: [
          { name: "Evidence of abrasion from docking", desc: "Minor marks", result: "Passed" },
          { name: "Signs of galvanic corrosion", desc: "None detected", result: "Passed" },
          { name: "Hull alignment visually acceptable", desc: "Within tolerance", result: "Passed" },
          { name: "Fouling around propeller zone", desc: "Minimal", result: "Passed" },
        ],
      },
    ],

    findings: [
      {
        title: "Marine growth buildup near waterline",
        id: "Issue-001",
        severity: "Medium",
        image: img1,
      },
      {
        title: "Suspected hairline crack at weld seam",
        id: "Issue-001",
        severity: "High",
        image: img2,
      },
      {
        title: "Sacrificial anode worn beyond safe limit",
        id: "Issue-001",
        severity: "Critical",
        image: img3,
      },
    ],
  },
];

const severityColor = {
  Medium: "bg-blue-100 text-blue-600",
  High: "bg-red-100 text-red-600",
  Critical: "bg-red-600 text-white",
};

const statusColor = {
  Passed: "text-green-600",
  Flagged: "text-yellow-600",
  Failed: "text-red-600",
};

export default function InspectionDetail() {
  const { inspectionId } = useParams();
  const navigate = useNavigate();


  const inspection = mockData.find(
    (item) => item.id === inspectionId
  );

  // const [status, setStatus] = useState(
  //   inspection?.status || "Pending"
  // );

  const [status, setStatus] = useState(inspection?.status);
  const [openSections, setOpenSections] = useState({});
  const [menuOpen, setMenuOpen] = useState(null);

  if (!inspection) return <div className="p-6">Not found</div>;

  const toggleSection = (i) => {
    setOpenSections(prev => ({ ...prev, [i]: !prev[i] }));
  };

  return (
    <div className="bg-[#F4F6F8] min-h-screen p-6">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
          <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-600"
        >
          ← Back
        </button>
        <h1 className="text-lg font-semibold">{inspection.title}</h1>
        <span className="bg-gray-200 px-2 py-1 text-xs rounded">{status}</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6">

          {/* DETAILS */}
          <div className="grid grid-cols-2 gap-4 text-sm mb-6">
            <Detail label="Inspection ID" value={inspection.id} />
            <Detail label="Location" value={inspection.location} />
            <Detail label="Start Date" value={inspection.startDate} />
            <Detail label="Inspection Form" value={inspection.form} />

            <Avatar label="Performed by" name={inspection.inspector} />
            <Avatar label="Reviewed by" name={inspection.reviewer} />

            <Detail label="Submission Date" value={inspection.submittedDate} />
            <Detail label="Attachment" value={`${inspection.attachments} photos`} />
          </div>

          {/* SUMMARY */}
          <div className="border rounded-xl p-4 mb-6">
            <p className="text-sm mb-3">
              Inspection Result:
              <span className="text-yellow-600 ml-2 font-semibold">Needs attention</span>
            </p>

            <div className="flex justify-between text-center">
              <Stat label="Passed" value={inspection.summary.passed} color="text-green-600" />
              <Stat label="Flagged" value={inspection.summary.flagged} color="text-yellow-600" />
              <Stat label="Failed" value={inspection.summary.failed} color="text-red-600" />
            </div>
          </div>

          {/* SECTIONS */}
          {inspection.sections.map((sec, i) => (
            <div key={i} className="mb-4 border rounded-xl overflow-hidden">

              <div
                onClick={() => toggleSection(i)}
                className="flex justify-between items-center px-4 py-3 bg-gray-50 cursor-pointer"
              >
                <div>
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded mr-2">
                    {sec.name}
                  </span>
                  <span className="font-semibold text-sm">{sec.title}</span>

                  <div className="text-xs mt-1 text-gray-400">
                    {sec.stats.passed && `✔ ${sec.stats.passed} Passed`}{" "}
                    {sec.stats.flagged && `⚠ ${sec.stats.flagged} flagged`}{" "}
                    {sec.stats.failed && `✖ ${sec.stats.failed} Failed`}
                  </div>
                </div>

                <span>{openSections[i] ? "▲" : "›"}</span>
              </div>

              {openSections[i] && sec.items.map((item, idx) => (
                <div key={idx} className="flex justify-between px-4 py-3 border-t">

                  <div className="flex gap-3">
                    {item.image && (
                      <img src={item.image} className="w-10 h-10 rounded-md" />
                    )}

                    <div>
                      <p className="text-sm">{item.name}</p>
                      <p className="text-xs text-gray-400">{item.desc}</p>
                    </div>
                  </div>

                  <span className={`text-sm ${statusColor[item.result]}`}>
                    {item.result}
                  </span>
                </div>
              ))}
            </div>
          ))}

          {/* FINDINGS */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold mb-3">
              Findings {inspection.findings.length} Auto generated
            </h3>

            {inspection.findings.map((f, i) => (
              <div key={i} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl mb-2">

                <div className="flex gap-3">
                  <img src={f.image} className="w-12 h-12 rounded-lg" />

                  <div>
                    <p className="text-sm font-medium">{f.title}</p>
                    <p className="text-xs text-gray-400">{f.id}</p>

                    <span className={`text-xs px-2 py-1 rounded ${severityColor[f.severity]}`}>
                      {f.severity}
                    </span>
                  </div>
                </div>

                <div className="relative">
                  <button onClick={() => setMenuOpen(menuOpen === i ? null : i)}>⋮</button>

                  {menuOpen === i && (
                    <div className="absolute right-0 mt-2 bg-white shadow rounded-lg w-40">
                      <button className="block w-full px-3 py-2 text-sm hover:bg-gray-100">
                        Move to Defect
                      </button>
                      <button className="block w-full px-3 py-2 text-sm hover:bg-gray-100">
                        Auto work order
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* SIGNATURE */}
          <div className="border rounded-xl p-4 mt-6">
            <p className="text-sm mb-2">Assignee signature</p>
            <input className="border w-full p-2 rounded mb-2" placeholder="Signature" />
            <p className="text-xs text-gray-400">John Hanks · 10th march, 2026</p>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-2 mt-6">
            <button className="flex-1 bg-green-600 text-white py-2 rounded-lg">Approve</button>
            <button className="flex-1 bg-gray-200 py-2 rounded-lg">Set as pending</button>
            <button className="flex-1 bg-gray-200 py-2 rounded-lg">Reject</button>
            <button className="flex-1 bg-gray-200 py-2 rounded-lg">Reassign</button>
          </div>

        </div>

      </div>
    </div>
  );
}

/* SMALL COMPONENTS */
const Detail = ({ label, value }) => (
  <div>
    <p className="text-gray-400">{label}</p>
    <p className="font-semibold">{value}</p>
  </div>
);

const Avatar = ({ label, name }) => (
  <div>
    <p className="text-gray-400">{label}</p>
    <div className="flex items-center gap-2">
      <img
        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`}
        className="w-6 h-6 rounded-full"
      />
      <span className="font-semibold">{name}</span>
    </div>
  </div>
);

const Stat = ({ label, value, color }) => (
  <div>
    <p className={`text-xl font-bold ${color}`}>{value}</p>
    <p className="text-xs text-gray-400">{label}</p>
  </div>
);