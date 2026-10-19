import { useState } from "react";
import CardWrapper from "./CardWrapper";

export default function CertificationCard() {
  const [openFilter, setOpenFilter] = useState(false);
  const [openSection, setOpenSection] = useState(null);

  const items = [
    { label: "Up-to-date", percent: 80, color: "bg-green-600" },
    { label: "Near Expiry", percent: 15, color: "bg-orange-500" },
    { label: "Expired", percent: 5, color: "bg-red-500" },
  ];

  // filter sections
  const filters = [
    {
      title: "Asset Certifications",
      children: ["Safety", "Calibration", "Compliance"],
    },
    {
      title: "Personnel Certifications",
      children: ["Training", "Medical", "Competency"],
    },
    {
      title: "Vessel / Ship Certifications",
      children: ["Registration", "Seaworthiness"],
    },
    {
      title: "Operational Certifications / Permits",
      children: ["Permit to Work", "Hot Work Permit"],
    },
    {
      title: "Inspection & Audit Certifications",
      children: ["Internal Audit", "External Audit"],
    },
    {
      title: "Temporary Certificates & Exemptions",
      children: ["Temporary Permit"],
    },
    {
      title: "Repairs Summary",
      children: [],
    },
  ];

  return (
    <CardWrapper
      title="Certification"
      right={
        <div className="relative">
          <button
            onClick={() => setOpenFilter(!openFilter)}
            className="text-xs border px-3 py-1.5 rounded-lg hover:bg-gray-50"
          >
            Filter
          </button>

          {/* Dropdown */}
          {openFilter && (
            <div className="absolute right-0 mt-2 w-72 bg-white border rounded-2xl shadow-xl p-3 z-50">
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filters.map((section, index) => (
                  <div
                    key={index}
                    className="border rounded-xl overflow-hidden"
                  >
                    {/* Section Header */}
                    <button
                      onClick={() =>
                        setOpenSection(
                          openSection === index ? null : index
                        )
                      }
                      className="w-full flex justify-between items-center px-4 py-2 text-sm font-medium hover:bg-gray-50"
                    >
                      {section.title}
                      <span className="text-xs">
                        {openSection === index ? "▲" : "▼"}
                      </span>
                    </button>

                    {/* Children */}
                    {openSection === index &&
                      section.children.length > 0 && (
                        <div className="px-4 pb-3 space-y-2">
                          {section.children.map((child, i) => (
                            <label
                              key={i}
                              className="flex items-center gap-2 text-sm text-gray-600"
                            >
                              <input type="checkbox" className="accent-green-600" />
                              {child}
                            </label>
                          ))}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      }
    >
      <div className="space-y-4">
        {items.map((i, idx) => (
          <div key={idx}>
            <p className="text-xs mb-1">{i.label}</p>
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className={`${i.color} h-2 rounded-full`}
                style={{ width: `${i.percent}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">{i.percent}%</p>
          </div>
        ))}
      </div>
    </CardWrapper>
  );
}