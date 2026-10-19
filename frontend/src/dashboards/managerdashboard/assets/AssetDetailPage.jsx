import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import {
  ChevronDown,
  ChevronRight,
  Download,
  Maximize2,
  Check
} from "lucide-react";

import { useAssets } from "../../../contexts/AssetContext";

const AssetDetailsPage = () => {
  const navigate = useNavigate();
  const { assetId } = useParams();

  const { assets } = useAssets();

  const asset = assets.find(a => String(a.id) === String(assetId));

  const [selectedPart, setSelectedPart] = useState("Main Engine");
  const [isPartsOpen, setIsPartsOpen] = useState(true);
  const [qrGenerated, setQrGenerated] = useState(false);

  if (!asset) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-bold">Asset not found</h2>
      </div>
    );
  }

  // ✅ SAFE QR VALUE
  const qrValue = `${window.location.origin}/dashboard/assets/${asset.id}?part=${selectedPart}`;

  // ✅ DOWNLOAD FUNCTION
  const downloadQR = () => {
    const canvas = document.getElementById("qr-code");
    if (!canvas) return;

    const url = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = url;
    link.download = `${selectedPart}-qr.png`;
    link.click();
  };

  const assetPartsData = {
    "Main Engine": {
      name: asset.name,
      id: asset.id,
      location: asset.location,
      criticality: asset.criticality || "High",
      category: asset.category,
      condition: asset.condition,
    },
    "Compressor 1": {
      name: "Primary Compressor",
      id: "#CP-01",
      location: asset.location,
      criticality: "High",
      category: "Repair",
      condition: "Brand New",
    },
    "Compressor 2": {
      name: "Secondary Compressor",
      id: "#CP-02",
      location: asset.location,
      criticality: "Medium",
      category: "Inspection",
      condition: "Fairly Used",
    }
  };

  const activeData = useMemo(
    () => assetPartsData[selectedPart] || assetPartsData["Main Engine"],
    [selectedPart]
  );

  return (
    <div className="min-h-screen bg-[#F2F4F7] p-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-[1400px] mx-auto">

        {/* LEFT SIDEBAR */}
        <div className="lg:col-span-4 space-y-6">

          {/* PARTS */}
          <div className="bg-white rounded-2xl border shadow-sm">
            <div
              onClick={() => {
                setSelectedPart("Main Engine");
                setIsPartsOpen(!isPartsOpen);
              }}
              className="p-4 flex justify-between cursor-pointer hover:bg-gray-50"
            >
              <div>
                <p className="font-bold text-[#708B53]">{asset.name}</p>
                <p className="text-xs text-gray-400">Sub Parts</p>
              </div>

              <ChevronDown className={isPartsOpen ? "" : "-rotate-90"} />
            </div>

            {isPartsOpen && (
              <div>
                {["Compressor 1", "Compressor 2"].map((item) => (
                  <div
                    key={item}
                    onClick={() => setSelectedPart(item)}
                    className={`p-4 cursor-pointer flex justify-between ${
                      selectedPart === item
                        ? "bg-gray-100 border-l-4 border-[#708B53]"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <p>{item}</p>
                    <ChevronRight size={16} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* QR SECTION */}
          <div className="bg-white rounded-2xl p-6 border shadow-sm">
            <h3 className="font-bold mb-2">Asset QR Code</h3>
            <p className="text-xs text-gray-400 mb-6">
              Scan to open {selectedPart}
            </p>

            <div className="bg-gray-50 p-6 rounded-xl text-center border-dashed border">

              {!qrGenerated ? (
                <>
                  <p className="font-semibold">No QR code</p>
                  <p className="text-sm text-[#708B53] mb-4">
                    No QR assigned yet
                  </p>

                  <button
                    onClick={() => setQrGenerated(true)}
                    className="w-full bg-[#708B53] text-white py-3 rounded-xl font-bold"
                  >
                    Generate QR Code
                  </button>
                </>
              ) : (
                <>
                  <QRCodeCanvas
                    id="qr-code"
                    value={qrValue}
                    size={150}
                    className="mx-auto mb-6"
                  />

                  <div className="flex gap-3">
                    <button
                      onClick={downloadQR}
                      className="flex-1 border py-3 rounded-xl flex justify-center gap-2"
                    >
                      <Download size={18} />
                      Download
                    </button>

                    <button
                      onClick={() => setQrGenerated(false)}
                      className="flex-1 bg-gray-200 py-3 rounded-xl"
                    >
                      Reset
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="lg:col-span-8 bg-white rounded-2xl border shadow-sm flex flex-col">
          <div className="p-8 flex-1">

            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#F0F4EC] rounded-xl flex items-center justify-center">
                <Maximize2 />
              </div>

              <div>
                <h2 className="text-xl font-bold">{activeData.name}</h2>
                <p className="text-xs text-gray-400">
                  Viewing {selectedPart}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SpecRow label="Asset Name" value={activeData.name} />
              <SpecRow label="Asset ID" value={activeData.id} />
              <SpecRow label="Location" value={activeData.location} />
              <SpecRow label="Category" value={activeData.category} />
              <SpecRow label="Condition" value={activeData.condition} />
            </div>

          </div>

          <div className="p-6 border-t flex justify-end gap-3">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 border rounded-xl"
            >
              Cancel
            </button>

            <button
              onClick={() => navigate(-1)}
              className="px-8 py-3 bg-[#708B53] text-white rounded-xl flex gap-2"
            >
              Done <Check size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SpecRow = ({ label, value }) => (
  <div className="flex justify-between border-b py-3 text-sm">
    <span className="text-gray-400">{label}</span>
    <span className="font-bold">{value}</span>
  </div>
);

export default AssetDetailsPage;