import { Routes, Route } from "react-router-dom";

// Student
import DashboardOverview from "@/pages/dashboard/DashboardOverview";
import DashboardCourses from "@/pages/dashboard/DashboardCourses";
import DashboardMarketplace from "@/pages/dashboard/DashboardMarketplace";
import DashboardAIAssistant from "@/pages/dashboard/DashboardAIAssistant";
import DashboardTutors from "@/pages/dashboard/DashboardTutors";
import DashboardAssessments from "@/pages/dashboard/DashboardAssessments";
import DashboardAnalytics from "@/pages/dashboard/DashboardAnalytics";
import DashboardSchedule from "@/pages/dashboard/DashboardSchedule";
import DashboardAchievements from "@/pages/dashboard/DashboardAchievements";
import DashboardCareer from "@/pages/dashboard/DashboardCareer";
import DashboardCommunity from "@/pages/dashboard/DashboardCommunity";
import DashboardScholarships from "@/pages/dashboard/DashboardScholarships";

// Parent
import ParentDashboard from "@/pages/dashboard/parent/ParentDashboard";
import ParentPerformance from "@/pages/dashboard/parent/ParentPerformance";
import ParentAttendance from "@/pages/dashboard/parent/ParentAttendance";
import ParentCommunication from "@/pages/dashboard/parent/ParentCommunication";
import ParentResults from "@/pages/dashboard/parent/ParentResults";
import ParentFees from "@/pages/dashboard/parent/ParentFees";

// Teacher
import TeacherDashboard from "@/pages/dashboard/teacher/TeacherDashboard";
import TeacherCourses from "@/pages/dashboard/teacher/TeacherCourses";
import TeacherStudents from "@/pages/dashboard/teacher/TeacherStudents";
import TeacherAssignments from "@/pages/dashboard/teacher/TeacherAssignments";
import TeacherAnalytics from "@/pages/dashboard/teacher/TeacherAnalytics";
import TeacherSchedule from "@/pages/dashboard/teacher/TeacherSchedule";
import TeacherEarnings from "@/pages/dashboard/teacher/TeacherEarnings";

// Institution
import InstitutionDashboard from "@/pages/dashboard/institution/InstitutionDashboard";
import InstitutionStudents from "@/pages/dashboard/institution/InstitutionStudents";
import InstitutionAttendance from "@/pages/dashboard/institution/InstitutionAttendance";
import InstitutionFees from "@/pages/dashboard/institution/InstitutionFees";
import InstitutionTimetable from "@/pages/dashboard/institution/InstitutionTimetable";
import InstitutionReports from "@/pages/dashboard/institution/InstitutionReports";
import InstitutionCommunication from "@/pages/dashboard/institution/InstitutionCommunication";
import InstitutionTeachers from "@/pages/dashboard/institution/InstitutionTeachers";

// Counselor
import CounselorDashboard from "@/pages/dashboard/counselor/CounselorDashboard";
import CounselorStudents from "@/pages/dashboard/counselor/CounselorStudents";
import CounselorSessions from "@/pages/dashboard/counselor/CounselorSessions";
import CounselorAssessments from "@/pages/dashboard/counselor/CounselorAssessments";
import CounselorOpportunities from "@/pages/dashboard/counselor/CounselorOpportunities";
import CounselorProgress from "@/pages/dashboard/counselor/CounselorProgress";

// Recruiter
import RecruiterDashboard from "@/pages/dashboard/recruiter/RecruiterDashboard";
import RecruiterOpportunities from "@/pages/dashboard/recruiter/RecruiterOpportunities";
import RecruiterCandidates from "@/pages/dashboard/recruiter/RecruiterCandidates";
import RecruiterApplications from "@/pages/dashboard/recruiter/RecruiterApplications";

// Admin
import AdminDashboard from "@/pages/dashboard/admin/AdminDashboard";
import AdminUsers from "@/pages/dashboard/admin/AdminUsers";
import AdminCourses from "@/pages/dashboard/admin/AdminCourses";
import AdminTutors from "@/pages/dashboard/admin/AdminTutors";
import AdminRevenue from "@/pages/dashboard/admin/AdminRevenue";
import AdminModeration from "@/pages/dashboard/admin/AdminModeration";

export default function Dashboard() {
  return (
    <Routes>
      {/* Student Routes */}
      <Route index element={<DashboardOverview />} />
      <Route path="courses" element={<DashboardCourses />} />
      <Route path="marketplace" element={<DashboardMarketplace />} />
      <Route path="ai-assistant" element={<DashboardAIAssistant />} />
      <Route path="tutors" element={<DashboardTutors />} />
      <Route path="assessments" element={<DashboardAssessments />} />
      <Route path="analytics" element={<DashboardAnalytics />} />
      <Route path="schedule" element={<DashboardSchedule />} />
      <Route path="achievements" element={<DashboardAchievements />} />
      <Route path="career" element={<DashboardCareer />} />
      <Route path="community" element={<DashboardCommunity />} />
      <Route path="scholarships" element={<DashboardScholarships />} />

      {/* Parent Routes */}
      <Route path="parent" element={<ParentDashboard />} />
      <Route path="parent/performance" element={<ParentPerformance />} />
      <Route path="parent/attendance" element={<ParentAttendance />} />
      <Route path="parent/communication" element={<ParentCommunication />} />
      <Route path="parent/results" element={<ParentResults />} />
      <Route path="parent/fees" element={<ParentFees />} />

      {/* Teacher Routes */}
      <Route path="teacher" element={<TeacherDashboard />} />
      <Route path="teacher/courses" element={<TeacherCourses />} />
      <Route path="teacher/students" element={<TeacherStudents />} />
      <Route path="teacher/assignments" element={<TeacherAssignments />} />
      <Route path="teacher/analytics" element={<TeacherAnalytics />} />
      <Route path="teacher/schedule" element={<TeacherSchedule />} />
      <Route path="teacher/earnings" element={<TeacherEarnings />} />

      {/* Institution Routes */}
      <Route path="institution" element={<InstitutionDashboard />} />
      <Route path="institution/students" element={<InstitutionStudents />} />
      <Route path="institution/attendance" element={<InstitutionAttendance />} />
      <Route path="institution/fees" element={<InstitutionFees />} />
      <Route path="institution/timetable" element={<InstitutionTimetable />} />
      <Route path="institution/reports" element={<InstitutionReports />} />
      <Route path="institution/communication" element={<InstitutionCommunication />} />
      <Route path="institution/teachers" element={<InstitutionTeachers />} />

      {/* Counselor Routes */}
      <Route path="counselor" element={<CounselorDashboard />} />
      <Route path="counselor/students" element={<CounselorStudents />} />
      <Route path="counselor/sessions" element={<CounselorSessions />} />
      <Route path="counselor/assessments" element={<CounselorAssessments />} />
      <Route path="counselor/opportunities" element={<CounselorOpportunities />} />
      <Route path="counselor/progress" element={<CounselorProgress />} />

      {/* Recruiter Routes */}
      <Route path="recruiter" element={<RecruiterDashboard />} />
      <Route path="recruiter/opportunities" element={<RecruiterOpportunities />} />
      <Route path="recruiter/candidates" element={<RecruiterCandidates />} />
      <Route path="recruiter/applications" element={<RecruiterApplications />} />
      <Route path="recruiter/messages" element={<RecruiterCandidates />} />

      {/* Admin Routes */}
      <Route path="admin" element={<AdminDashboard />} />
      <Route path="admin/users" element={<AdminUsers />} />
      <Route path="admin/courses" element={<AdminCourses />} />
      <Route path="admin/tutors" element={<AdminTutors />} />
      <Route path="admin/revenue" element={<AdminRevenue />} />
      <Route path="admin/moderation" element={<AdminModeration />} />
    </Routes>
  );
}
