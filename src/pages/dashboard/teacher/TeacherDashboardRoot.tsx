import { DashboardProvider, useDashboardTab } from "../DashboardContext";

import TeacherDashboard from "./TeacherDashboard";
import TeacherCourses from "./TeacherCourses";
import TeacherStudents from "./TeacherStudents";
import TeacherAssignments from "./TeacherAssignments";
import TeacherAnalytics from "./TeacherAnalytics";
import TeacherSchedule from "./TeacherSchedule";
import TeacherEarnings from "./TeacherEarnings";

function TeacherDashboardContent() {
  const { activeTab } = useDashboardTab();

  switch (activeTab) {
    case "overview": return <TeacherDashboard />;
    case "courses": return <TeacherCourses />;
    case "students": return <TeacherStudents />;
    case "assignments": return <TeacherAssignments />;
    case "analytics": return <TeacherAnalytics />;
    case "schedule": return <TeacherSchedule />;
    case "earnings": return <TeacherEarnings />;
    default: return <TeacherDashboard />;
  }
}

export default function TeacherDashboardRoot() {
  return (
    <DashboardProvider>
      <TeacherDashboardContent />
    </DashboardProvider>
  );
}
