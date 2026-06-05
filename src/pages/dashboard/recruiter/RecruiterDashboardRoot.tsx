import { DashboardProvider, useDashboardTab } from "../DashboardContext";

import RecruiterDashboard from "./RecruiterDashboard";
import RecruiterOpportunities from "./RecruiterOpportunities";
import RecruiterCandidates from "./RecruiterCandidates";
import RecruiterApplications from "./RecruiterApplications";
import RecruiterMessages from "./RecruiterMessages";

function RecruiterDashboardContent() {
  const { activeTab } = useDashboardTab();

  switch (activeTab) {
    case "overview": return <RecruiterDashboard />;
    case "opportunities": return <RecruiterOpportunities />;
    case "candidates": return <RecruiterCandidates />;
    case "applications": return <RecruiterApplications />;
    case "messages": return <RecruiterMessages />;
    default: return <RecruiterDashboard />;
  }
}

export default function RecruiterDashboardRoot() {
  return (
    <DashboardProvider>
      <RecruiterDashboardContent />
    </DashboardProvider>
  );
}
