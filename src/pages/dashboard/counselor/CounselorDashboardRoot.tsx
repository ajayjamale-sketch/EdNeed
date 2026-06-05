import { DashboardProvider, useDashboardTab } from "../DashboardContext";

import CounselorDashboard from "./CounselorDashboard";
import CounselorStudents from "./CounselorStudents";
import CounselorSessions from "./CounselorSessions";
import CounselorAssessments from "./CounselorAssessments";
import CounselorOpportunities from "./CounselorOpportunities";
import CounselorProgress from "./CounselorProgress";

function CounselorDashboardContent() {
  const { activeTab } = useDashboardTab();

  switch (activeTab) {
    case "overview": return <CounselorDashboard />;
    case "students": return <CounselorStudents />;
    case "sessions": return <CounselorSessions />;
    case "assessments": return <CounselorAssessments />;
    case "opportunities": return <CounselorOpportunities />;
    case "progress": return <CounselorProgress />;
    default: return <CounselorDashboard />;
  }
}

export default function CounselorDashboardRoot() {
  return (
    <DashboardProvider>
      <CounselorDashboardContent />
    </DashboardProvider>
  );
}
