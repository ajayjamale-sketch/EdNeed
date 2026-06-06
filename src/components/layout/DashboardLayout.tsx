import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  GraduationCap, LayoutDashboard, BookOpen, Users, BarChart3,
  Calendar, Settings, Bell, Search, ChevronLeft, ChevronRight,
  Briefcase, Trophy, MessageSquare, LogOut, Menu, Star, Brain,
  ShoppingBag, Target, Home, TrendingUp, DollarSign, FileText,
  UserCheck, Building, ClipboardList, Award, Globe, PieChart,
  Shield, Database, AlertCircle, CheckSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollToTopButton } from "@/components/features/ScrollToTop";
import { useTheme } from "@/components/features/ThemeProvider";
import { Sun, Moon } from "lucide-react";
import { getMockUser, getRoleLabel, UserRole } from "@/hooks/useRole";
import { useDashboardTab } from "@/pages/dashboard/DashboardContext";

type NavItem = { icon: React.ElementType; label: string; href: string };

const navByRole: Record<UserRole, NavItem[]> = {
  student: [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
    { icon: BookOpen, label: "My Courses", href: "/dashboard/courses" },
    { icon: Brain, label: "AI Assistant", href: "/dashboard/ai-assistant" },
    { icon: Users, label: "Tutors", href: "/dashboard/tutors" },
    { icon: Target, label: "Assessments", href: "/dashboard/assessments" },
    { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
    { icon: Calendar, label: "Schedule", href: "/dashboard/schedule" },
    { icon: Trophy, label: "Achievements", href: "/dashboard/achievements" },
    { icon: Briefcase, label: "Career", href: "/dashboard/career" },
    { icon: MessageSquare, label: "Community", href: "/dashboard/community" },
    { icon: Star, label: "Scholarships", href: "/dashboard/scholarships" },
  ],
  parent: [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard/parent" },
    { icon: TrendingUp, label: "Performance", href: "/dashboard/parent/performance" },
    { icon: Calendar, label: "Attendance", href: "/dashboard/parent/attendance" },
    { icon: MessageSquare, label: "Communication", href: "/dashboard/parent/communication" },
    { icon: FileText, label: "Results", href: "/dashboard/parent/results" },
    { icon: DollarSign, label: "Fee Status", href: "/dashboard/parent/fees" },
  ],
  teacher: [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard/teacher" },
    { icon: BookOpen, label: "My Courses", href: "/dashboard/teacher/courses" },
    { icon: Users, label: "My Students", href: "/dashboard/teacher/students" },
    { icon: ClipboardList, label: "Assignments", href: "/dashboard/teacher/assignments" },
    { icon: BarChart3, label: "Analytics", href: "/dashboard/teacher/analytics" },
    { icon: Calendar, label: "Schedule", href: "/dashboard/teacher/schedule" },
    { icon: DollarSign, label: "Earnings", href: "/dashboard/teacher/earnings" },
  ],
  institution: [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard/institution" },
    { icon: Users, label: "Students", href: "/dashboard/institution/students" },
    { icon: UserCheck, label: "Teachers", href: "/dashboard/institution/teachers" },
    { icon: Calendar, label: "Attendance", href: "/dashboard/institution/attendance" },
    { icon: DollarSign, label: "Fee Management", href: "/dashboard/institution/fees" },
    { icon: ClipboardList, label: "Timetable", href: "/dashboard/institution/timetable" },
    { icon: BarChart3, label: "Reports", href: "/dashboard/institution/reports" },
    { icon: MessageSquare, label: "Parent Comms", href: "/dashboard/institution/communication" },
  ],
  counselor: [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard/counselor" },
    { icon: Users, label: "My Students", href: "/dashboard/counselor/students" },
    { icon: Calendar, label: "Sessions", href: "/dashboard/counselor/sessions" },
    { icon: Target, label: "Assessments", href: "/dashboard/counselor/assessments" },
    { icon: Globe, label: "Opportunities", href: "/dashboard/counselor/opportunities" },
    { icon: TrendingUp, label: "Progress Track", href: "/dashboard/counselor/progress" },
  ],
  recruiter: [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard/recruiter" },
    { icon: Briefcase, label: "Opportunities", href: "/dashboard/recruiter/opportunities" },
    { icon: Users, label: "Candidates", href: "/dashboard/recruiter/candidates" },
    { icon: CheckSquare, label: "Applications", href: "/dashboard/recruiter/applications" },
    { icon: MessageSquare, label: "Messages", href: "/dashboard/recruiter/messages" },
  ],
  admin: [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard/admin" },
    { icon: Users, label: "User Management", href: "/dashboard/admin/users" },
    { icon: BookOpen, label: "Courses", href: "/dashboard/admin/courses" },
    { icon: UserCheck, label: "Tutor Verification", href: "/dashboard/admin/tutors" },
    { icon: Building, label: "Institutions", href: "/dashboard/admin/institutions" },
    { icon: PieChart, label: "Revenue", href: "/dashboard/admin/revenue" },
    { icon: Shield, label: "Content Moderation", href: "/dashboard/admin/moderation" },
    { icon: Database, label: "Platform Logs", href: "/dashboard/admin/logs" },
  ],
};

const roleColors: Record<UserRole, string> = {
  student: "from-[#2563EB] to-[#7C3AED]",
  parent: "from-[#2563EB] to-[#7C3AED]",
  teacher: "from-[#2563EB] to-[#7C3AED]",
  institution: "from-[#2563EB] to-[#7C3AED]",
  counselor: "from-[#2563EB] to-[#7C3AED]",
  recruiter: "from-[#2563EB] to-[#7C3AED]",
  admin: "from-[#2563EB] to-[#7C3AED]",
};

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

import { toast } from "sonner";

export default function DashboardLayout({ children, title, subtitle }: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifs, setNotifs] = useState([
    { id: 1, title: "New assignment uploaded", desc: "Physics assignment due on Tuesday", time: "5 mins ago", read: false },
    { id: 2, title: "Grade published", desc: "Calculus test score: A-", time: "1 hour ago", read: false },
    { id: 3, title: "Class reminder", desc: "Chemistry live class starts in 30 mins", time: "2 hours ago", read: false },
  ]);
  const unreadCount = notifs.filter(n => !n.read).length;
  const [searchVal, setSearchVal] = useState("");
  const { resolvedTheme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const user = getMockUser();
  const rawRole = user?.role || "student";
  const role = (typeof rawRole === 'string' ? rawRole.toLowerCase() : "student") as UserRole;
  const navItems = navByRole[role] || navByRole.student;
  const { activeTab, setActiveTab } = useDashboardTab();

  useEffect(() => {
    let tabId = location.pathname.split("/").pop();
    if (!tabId || tabId === "dashboard" || tabId === role) {
      tabId = "overview";
    }
    setActiveTab(tabId);
  }, [location.pathname, role, setActiveTab]);

  const handleLogout = () => {
    localStorage.removeItem("edneed-user");
    navigate("/");
  };

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <Link to="/" className="p-4 flex items-center gap-3 border-b border-border hover:opacity-90 transition-opacity">
        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br", roleColors[role])}>
          <GraduationCap className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-lg"><span className="gradient-text">Ed</span>Need</span>
      </Link>

      {/* Role badge + User info */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className={cn("w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 bg-gradient-to-br", roleColors[role])}>
            {user?.name?.charAt(0) || "U"}
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-sm truncate">{user?.name || "User"}</div>
            <div className="text-xs text-muted-foreground capitalize flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {getRoleLabel(role)}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1 custom-scrollbar">
        {navItems.map((item, index) => {
          // Fallback parsing: if the link is exactly the dashboard root for the role, tab id is "overview"
          let tabId = item.href.split("/").pop();
          if (!tabId || tabId === "dashboard" || tabId === role) tabId = "overview";
          
          const isActive = activeTab === tabId;
          
          return (
            <Link
              key={index}
              to={item.href}
              onClick={() => {
                setActiveTab(tabId);
                setMobileOpen(false);
              }}
              className={cn(
                "w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                isActive 
                  ? cn("bg-gradient-to-r text-white shadow-md shadow-primary/20", roleColors[role].replace("to-", "to-").split(" ")[0], roleColors[role].split(" ")[1])
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className={cn("w-4.5 h-4.5 flex-shrink-0 transition-transform group-hover:scale-110", isActive ? "text-white" : "text-muted-foreground group-hover:text-primary")} />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-border space-y-1">
        <Link to="/settings" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
          <Settings className="w-4 h-4 flex-shrink-0" />
          <span>Settings</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          <span>Sign out</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col h-screen sticky top-0 bg-sidebar border-r border-border transition-all duration-300 flex-shrink-0 w-60">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-sidebar border-r border-border flex flex-col">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-border px-4 md:px-6 h-14 flex items-center gap-4">
          <button onClick={() => setMobileOpen(true)} className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center hover:bg-muted transition-colors">
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search..."
              className="w-full pl-9 pr-4 py-2 bg-muted border border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary focus:bg-background transition-all"
            />
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <span className="hidden md:block text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground font-medium">
              {getRoleLabel(role)}
            </span>
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground"
            >
              {resolvedTheme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative w-9 h-9 rounded-lg flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-destructive text-white rounded-full text-[10px] flex items-center justify-center font-bold">{unreadCount}</span>
                )}
              </button>

              {notifOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                  <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-2xl shadow-xl z-50 overflow-hidden py-1 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2.5 border-b border-border flex justify-between items-center bg-muted/40">
                      <span className="font-bold text-xs">Notifications</span>
                      {unreadCount > 0 && (
                        <button 
                          onClick={() => setNotifs(notifs.map(n => ({ ...n, read: true })))}
                          className="text-[10px] font-semibold text-primary hover:underline bg-transparent border-0 cursor-pointer p-0"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifs.length === 0 ? (
                        <div className="px-4 py-8 text-center text-xs text-muted-foreground">
                          No notifications yet
                        </div>
                      ) : (
                        notifs.map((n) => (
                          <div 
                            key={n.id}
                            onClick={() => {
                              setNotifs(notifs.map(x => x.id === n.id ? { ...x, read: true } : x));
                              toast.info(`${n.title}: ${n.desc}`);
                            }}
                            className={cn(
                              "px-4 py-3 border-b border-border last:border-0 hover:bg-muted/50 cursor-pointer transition-colors text-left",
                              !n.read && "bg-primary/5"
                            )}
                          >
                            <div className="flex justify-between items-start gap-2">
                              <span className={cn("text-xs font-semibold", !n.read ? "text-foreground" : "text-muted-foreground")}>{n.title}</span>
                              <span className="text-[10px] text-muted-foreground whitespace-nowrap">{n.time}</span>
                            </div>
                            <p className="text-[11px] text-muted-foreground mt-0.5 leading-normal">{n.desc}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
            <Link to="/profile" className={cn("w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm hover:opacity-90 transition-opacity flex-shrink-0 bg-gradient-to-br", roleColors[role])}>
              {user?.name?.charAt(0) || "U"}
            </Link>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {(title || subtitle) && (
            <div className="mb-6">
              {title && <h1 className="text-2xl font-bold">{title}</h1>}
              {subtitle && <p className="text-muted-foreground mt-1 text-sm">{subtitle}</p>}
            </div>
          )}
          {children}
        </main>
      </div>
      <ScrollToTopButton />
    </div>
  );
}
