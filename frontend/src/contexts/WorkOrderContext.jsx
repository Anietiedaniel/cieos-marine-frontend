import React, { createContext, useContext, useState, useMemo } from "react";

const WorkOrderContext = createContext();

export const useWorkOrders = () => useContext(WorkOrderContext);

export const WorkOrderProvider = ({ children }) => {
  const [workOrders, setWorkOrders] = useState([
    {
      id: "WO-001",
      title: "Generator overhaul",
      asset: "Hull B-12",
      assigneeId: "u3",        // FIXED: renamed from assignedTo
      scheduledDay: "Monday",  // FIXED: renamed from day
      priority: "High",
      status: "In Progress",
      estimatedHours: 6,
      category: "Mechanical",
      user: "Technician A"     // Added for Table View consistency
    },
    {
      id: "WO-002",
      title: "Pipe leak repair",
      asset: "Hull B-12",
      assigneeId: null,        // FIXED
      scheduledDay: null,      // FIXED
      priority: "High",
      status: "Open",          // Normalized status
      estimatedHours: 3,
      category: "Plumbing",
      user: "Unassigned"
    }
  ]);

  /* ---------------- ANALYTICS HELPER ---------------- */
  // This memoized value calculates the total hours assigned per day
  // which your ResourceCapacityBar needs.
  const analytics = useMemo(() => {
    const dayLoad = {
      Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0
    };

    workOrders.forEach(wo => {
      if (wo.scheduledDay && dayLoad[wo.scheduledDay] !== undefined) {
        dayLoad[wo.scheduledDay] += Number(wo.estimatedHours || 0);
      }
    });

    return { dayLoad };
  }, [workOrders]);

  /* ---------------- ACTIONS ---------------- */

  // CREATE
  const createWorkOrder = (data) => {
    const newWO = {
      id: "WO-" + Date.now(),
      assigneeId: null,     // Ensure default is null
      scheduledDay: null,   // Ensure default is null
      status: "Open",       // Ensure default is Open
      ...data
    };

    setWorkOrders(prev => [...prev, newWO]);
  };

  // DELETE
  const deleteWorkOrder = (id) => {
    setWorkOrders(prev => prev.filter(wo => wo.id !== id));
  };

  // UPDATE (General Purpose)
  const updateWorkOrder = (id, updated) => {
    setWorkOrders(prev =>
      prev.map(wo => wo.id === id ? { ...wo, ...updated } : wo)
    );
  };

  // ASSIGN (The Critical Fix for Drag & Drop)
  const assignWorkOrder = (id, userId, day) => {
    setWorkOrders(prev =>
      prev.map(wo =>
        wo.id === id 
          ? { ...wo, assigneeId: userId, scheduledDay: day } 
          : wo
      )
    );
  };

  return (
    <WorkOrderContext.Provider
      value={{
        workOrders,
        analytics, // Shared analytics for your Capacity Bar
        createWorkOrder,
        deleteWorkOrder,
        updateWorkOrder,
        assignWorkOrder
      }}
    >
      {children}
    </WorkOrderContext.Provider>
  );
};