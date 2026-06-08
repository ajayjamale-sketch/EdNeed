import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/features/ThemeProvider";
import { ScrollRestorer } from "@/components/features/ScrollToTop";

import Index from "./pages/Index";
import About from "./pages/About";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import SettingsPage from "./pages/Settings";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import AccessibilityPage from "./pages/Accessibility";
import NotFound from "./pages/NotFound";
import RoleSelect from "./pages/RoleSelect";
import Courses from "./pages/Courses";
import TutorsPage from "./pages/TutorsPage";
import Career from "./pages/Career";
import Scholarships from "./pages/Scholarships";
import Community from "./pages/Community";
import ForStudents from "./pages/ForStudents";
import ForTeachers from "./pages/ForTeachers";
import ForInstitutions from "./pages/ForInstitutions";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollRestorer />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/role-select" element={<RoleSelect />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/accessibility" element={<AccessibilityPage />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/tutors" element={<TutorsPage />} />
            <Route path="/career" element={<Career />} />
            <Route path="/scholarships" element={<Scholarships />} />
            <Route path="/community" element={<Community />} />
            <Route path="/for-students" element={<ForStudents />} />
            <Route path="/for-teachers" element={<ForTeachers />} />
            <Route path="/for-institutions" element={<ForInstitutions />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
