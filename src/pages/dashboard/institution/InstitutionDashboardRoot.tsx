import { DashboardProvider, useDashboardTab } from "../DashboardContext";

import InstitutionDashboard from "./InstitutionDashboard";
import InstitutionStudents from "./InstitutionStudents";
import InstitutionAttendance from "./InstitutionAttendance";
import InstitutionFees from "./InstitutionFees";
import InstitutionTimetable from "./InstitutionTimetable";
import InstitutionReports from "./InstitutionReports";
import InstitutionCommunication from "./InstitutionCommunication";
import InstitutionTeachers from "./InstitutionTeachers";

function InstitutionDashboardContent() {
  const { activeTab } = useDashboardTab();

  switch (activeTab) {
    case "overview": return <InstitutionDashboard />;
    case "students": return <InstitutionStudents />;
    case "teachers": return <InstitutionTeachers />;
    case "attendance": return <InstitutionAttendance />;
    case "fees": return <InstitutionFees />;
    case "timetable": return <InstitutionTimetable />;
    case "reports": return <InstitutionReports />;
    case "communication": return <InstitutionCommunication />;
    default: return <InstitutionDashboard />;
  }
}

export default function InstitutionDashboardRoot() {
  return (
    <DashboardProvider>
      <InstitutionDashboardContent />
    </DashboardProvider>
  );
}
