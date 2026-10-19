import { createContext, useContext, useState } from "react";

const InspectionContext = createContext();

export const useInspections = () => useContext(InspectionContext);

export const InspectionProvider = ({ children }) => {

  // FORM TEMPLATES
  const [forms, setForms] = useState([]);

  // INSPECTIONS (instances created from forms)
  const [inspections, setInspections] = useState([]);

  // REPORTS (after submission)
  const [reports, setReports] = useState([]);

  // =========================
  // FORM FUNCTIONS
  // =========================
  const createForm = (form) => {
    const newForm = {
      id: Date.now(),
      ...form
    };
    setForms(prev => [...prev, newForm]);
  };

  // =========================
  // INSPECTION FUNCTIONS
  // =========================
  const createInspection = (data) => {
    const newInspection = {
      id: Date.now(),
      status: "pending", // pending | in_progress | submitted | approved | rejected
      ...data
    };

    setInspections(prev => [...prev, newInspection]);
  };

  const updateInspection = (id, updatedData) => {
    setInspections(prev =>
      prev.map(item =>
        item.id === id ? { ...item, ...updatedData } : item
      )
    );
  };

  const getInspection = (id) =>
    inspections.find(item => String(item.id) === String(id));

  // =========================
  // REPORT FUNCTIONS
  // =========================
  const submitInspection = (id, reportData) => {
    const inspection = getInspection(id);

    if (!inspection) return;

    const newReport = {
      id: Date.now(),
      inspectionId: id,
      status: reportData.status || "submitted",
      ...reportData
    };

    setReports(prev => [...prev, newReport]);

    // update inspection status
    updateInspection(id, { status: "submitted" });
  };

  const getReport = (id) =>
    reports.find(r => String(r.id) === String(id));

  const getReportsByInspection = (inspectionId) =>
    reports.filter(r => String(r.inspectionId) === String(inspectionId));

  return (
    <InspectionContext.Provider
      value={{
        forms,
        inspections,
        reports,

        createForm,

        createInspection,
        updateInspection,
        getInspection,

        submitInspection,
        getReport,
        getReportsByInspection
      }}
    >
      {children}
    </InspectionContext.Provider>
  );
};