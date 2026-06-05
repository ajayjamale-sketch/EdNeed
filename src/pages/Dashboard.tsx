import { getMockUser, UserRole } from "@/hooks/useRole";
import { DashboardProvider } from "./dashboard/DashboardContext";

import StudentDashboard from "./dashboard/StudentDashboard";
import ParentDashboard from "./dashboard/ParentDashboard";
import TeacherDashboard from "./dashboard/TeacherDashboard";
import InstitutionDashboard from "./dashboard/InstitutionDashboard";
import CounselorDashboard from "./dashboard/CounselorDashboard";
import RecruiterDashboard from "./dashboard/RecruiterDashboard";
import AdminDashboard from "./dashboard/AdminDashboard";

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
