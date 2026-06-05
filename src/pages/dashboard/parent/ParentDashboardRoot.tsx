import { DashboardProvider, useDashboardTab } from "../DashboardContext";

import ParentDashboard from "./ParentDashboard";
import ParentPerformance from "./ParentPerformance";
import ParentAttendance from "./ParentAttendance";
import ParentCommunication from "./ParentCommunication";
import ParentResults from "./ParentResults";
import ParentFees from "./ParentFees";

function ParentDashboardContent() {
  const { activeTab } = useDashboardTab();

  switch (activeTab) {
    case "overview": return <ParentDashboard />;
    case "performance": return <ParentPerformance />;
    case "attendance": return <ParentAttendance />;
    case "communication": return <ParentCommunication />;
    case "results": return <ParentResults />;
    case "fees": return <ParentFees />;
    default: return <ParentDashboard />;
  }
}

export default function ParentDashboardRoot() {
  return (
    <DashboardProvider>
      <ParentDashboardContent />
    </DashboardProvider>
  );
}
