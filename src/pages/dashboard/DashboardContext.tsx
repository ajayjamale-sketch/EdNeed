import { createContext, useContext, useState, ReactNode } from "react";

interface DashboardContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState("overview");
  return (
    <DashboardContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardTab() {
  const context = useContext(DashboardContext);
  if (!context) {
    // Return a dummy fallback so it doesn't crash if used outside provider (e.g. direct url hit during dev)
    return { activeTab: "overview", setActiveTab: () => {} };
  }
  return context;
}
