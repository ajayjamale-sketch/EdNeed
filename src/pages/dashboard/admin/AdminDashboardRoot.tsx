import { DashboardProvider, useDashboardTab } from "../DashboardContext";

import AdminDashboard from "./AdminDashboard";
import AdminUsers from "./AdminUsers";
import AdminCourses from "./AdminCourses";
import AdminTutors from "./AdminTutors";
import AdminInstitutions from "./AdminInstitutions";
import AdminRevenue from "./AdminRevenue";
import AdminModeration from "./AdminModeration";
import AdminLogs from "./AdminLogs";

function AdminDashboardContent() {
  const { activeTab } = useDashboardTab();

  switch (activeTab) {
    case "overview": return <AdminDashboard />;
    case "users": return <AdminUsers />;
    case "courses": return <AdminCourses />;
    case "tutors": return <AdminTutors />;
    case "institutions": return <AdminInstitutions />;
    case "revenue": return <AdminRevenue />;
    case "moderation": return <AdminModeration />;
    case "logs": return <AdminLogs />;
    default: return <AdminDashboard />;
  }
}

export default function AdminDashboardRoot() {
  return (
    <DashboardProvider>
      <AdminDashboardContent />
    </DashboardProvider>
  );
}
