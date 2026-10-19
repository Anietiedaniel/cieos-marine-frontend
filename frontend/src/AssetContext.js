import React, { createContext, useState, useContext } from 'react';

const AssetContext = createContext();

export const AssetProvider = ({ children }) => {
  const [assets, setAssets] = useState([
    // Initial Mock Data
    { id: "1", name: "Main Engine", code: "#12345", location: "engine-room", parts: 5, condition: "Brand new", priority: "High", criticality: "Important", team: [] },
  ]);

  const addAsset = (newAsset) => {
    setAssets((prev) => [...prev, { ...newAsset, id: Date.now().toString() }]);
  };

  return (
    <AssetContext.Provider value={{ assets, addAsset }}>
      {children}
    </AssetContext.Provider>
  );
};

export const useAssets = () => useContext(AssetContext);