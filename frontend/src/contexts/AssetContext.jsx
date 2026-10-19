import { createContext, useContext, useState, useEffect } from "react";

const AssetContext = createContext();

export const useAssets = () => useContext(AssetContext);

export const AssetProvider = ({ children }) => {

  const [assets, setAssets] = useState(() => {
    const saved = localStorage.getItem("assets");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("assets", JSON.stringify(assets));
  }, [assets]);

  const createAsset = (asset) => {
    setAssets(prev => [...prev, asset]);
  };

  const updateAsset = (id, updatedData) => {
    setAssets(prev =>
      prev.map(asset =>
        asset.id === id ? { ...asset, ...updatedData } : asset
      )
    );
  };

  const deleteAsset = (id) => {
    setAssets(prev => prev.filter(asset => asset.id !== id));
  };

  const getAsset = (id) => {
    return assets.find(asset => asset.id === id);
  };

  return (
    <AssetContext.Provider
      value={{
        assets,
        createAsset,
        updateAsset,
        deleteAsset,
        getAsset
      }}
    >
      {children}
    </AssetContext.Provider>
  );
};