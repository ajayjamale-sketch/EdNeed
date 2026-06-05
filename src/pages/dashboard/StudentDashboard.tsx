import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import DashboardOverview from './DashboardOverview';
import DashboardCourses from './DashboardCourses';
import DashboardMarketplace from './DashboardMarketplace';
import DashboardAIAssistant from './DashboardAIAssistant';
import DashboardTutors from './DashboardTutors';
import DashboardAssessments from './DashboardAssessments';
import DashboardAnalytics from './DashboardAnalytics';
import DashboardSchedule from './DashboardSchedule';
import DashboardAchievements from './DashboardAchievements';
import DashboardCareer from './DashboardCareer';
import DashboardCommunity from './DashboardCommunity';
import DashboardScholarships from './DashboardScholarships';

export default function StudentDashboard() {
  return (
    <Routes>
      <Route path="/" element={<DashboardOverview />} />
      <Route path="/courses" element={<DashboardCourses />} />
      <Route path="/marketplace" element={<DashboardMarketplace />} />
      <Route path="/ai-assistant" element={<DashboardAIAssistant />} />
      <Route path="/tutors" element={<DashboardTutors />} />
      <Route path="/assessments" element={<DashboardAssessments />} />
      <Route path="/analytics" element={<DashboardAnalytics />} />
      <Route path="/schedule" element={<DashboardSchedule />} />
      <Route path="/achievements" element={<DashboardAchievements />} />
      <Route path="/career" element={<DashboardCareer />} />
      <Route path="/community" element={<DashboardCommunity />} />
      <Route path="/scholarships" element={<DashboardScholarships />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}