import { getMockUser, UserRole } from "@/hooks/useRole";
import { DashboardProvider } from "./dashboard/DashboardContext";

import StudentDashboard from "./dashboard/StudentDashboard";
import ParentDashboard from "./dashboard/parent/ParentDashboardRoot";
import TeacherDashboard from "./dashboard/teacher/TeacherDashboardRoot";
import InstitutionDashboard from "./dashboard/institution/InstitutionDashboardRoot";
import CounselorDashboard from "./dashboard/counselor/CounselorDashboardRoot";
import RecruiterDashboard from "./dashboard/recruiter/RecruiterDashboardRoot";
import AdminDashboard from "./dashboard/admin/AdminDashboardRoot";

export default function Dashboard() {
  const user = getMockUser();
  const role = (user?.role as UserRole) || "student";

  const renderDashboard = () => {
    switch (role) {
      case "student": return <StudentDashboard />;
      case "parent": return <ParentDashboard />;
      case "teacher": return <TeacherDashboard />;
      case "institution": return <InstitutionDashboard />;
      case "counselor": return <CounselorDashboard />;
      case "recruiter": return <RecruiterDashboard />;
      case "admin": return <AdminDashboard />;
      default: return <StudentDashboard />;
    }
  };

  return (
    <DashboardProvider>
      {renderDashboard()}
    </DashboardProvider>
  );
}
