import { useState } from "react";
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

type NavItem = { icon: React.ElementType; label: string; href: string };

const navByRole: Record<UserRole, NavItem[]> = {
  student: [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
    { icon: BookOpen, label: "My Courses", href: "/dashboard/courses" },
    { icon: ShoppingBag, label: "Marketplace", href: "/dashboard/marketplace" },
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
  student: "from-blue-600 to-blue-700",
  parent: "from-green-600 to-green-700",
  teacher: "from-purple-600 to-purple-700",
  institution: "from-orange-600 to-orange-700",
  counselor: "from-teal-600 to-teal-700",
  recruiter: "from-rose-600 to-rose-700",
  admin: "from-slate-700 to-slate-800",
};

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export default function DashboardLayout({ children, title, subtitle }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [searchVal, setSearchVal] = useState("");
  const { resolvedTheme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const user = getMockUser();
  const role = (user?.role as UserRole) || "student";
  const navItems = navByRole[role] || navByRole.student;

  const handleLogout = () => {
    localStorage.removeItem("edneed-user");
    navigate("/role-select");
  };

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className={cn("p-4 flex items-center gap-3 border-b border-border", collapsed && "justify-center")}>
        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br", roleColors[role])}>
          <GraduationCap className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <span className="font-bold text-lg"><span className="gradient-text">Ed</span>Need</span>
        )}
      </div>

      {/* Role badge + User info */}
      <div className={cn("p-4 border-b border-border", collapsed && "flex justify-center")}>
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className={cn("w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 bg-gradient-to-br", roleColors[role])}>
              {user?.name?.charAt(0) || "U"}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{getRoleLabel(role)}</p>
            </div>
          </div>
        ) : (
          <div className={cn("w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm bg-gradient-to-br", roleColors[role])}>
            {user?.name?.charAt(0) || "U"}
          </div>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href ||
            (item.href !== "/dashboard" && location.pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium",
                collapsed && "justify-center",
                isActive
                  ? `bg-gradient-to-r ${roleColors[role]} text-white shadow-sm`
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {!collapsed && item.label}
            </Link>
          );
        })}
      </nav>

      {/* Role switch + bottom actions */}
      <div className="p-3 border-t border-border space-y-0.5">
        {!collapsed && (
          <Link
            to="/role-select"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-primary bg-primary/5 hover:bg-primary/10 transition-colors mb-1"
          >
            <Users className="w-4 h-4 flex-shrink-0" />
            Switch Role / Dashboard
          </Link>
        )}
        <Link
          to="/"
          className={cn("flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all", collapsed && "justify-center")}
        >
          <Home className="w-4 h-4 flex-shrink-0" />
          {!collapsed && "Home"}
        </Link>
        <Link
          to="/settings"
          className={cn("flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all", collapsed && "justify-center")}
        >
          <Settings className="w-4 h-4 flex-shrink-0" />
          {!collapsed && "Settings"}
        </Link>
        <button
          onClick={handleLogout}
          className={cn("w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all", collapsed && "justify-center")}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!collapsed && "Sign out"}
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop Sidebar */}
      <aside className={cn("hidden lg:flex flex-col h-screen sticky top-0 bg-sidebar border-r border-border transition-all duration-300 flex-shrink-0", collapsed ? "w-[68px]" : "w-60")}>
        <SidebarContent />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3.5 top-20 w-7 h-7 rounded-full bg-card border border-border flex items-center justify-center shadow-sm hover:bg-muted transition-colors z-10"
        >
          {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>
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
            <button
              onClick={() => setNotifications(0)}
              className="relative w-9 h-9 rounded-lg flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground"
            >
              <Bell className="w-4 h-4" />
              {notifications > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-destructive text-white rounded-full text-[10px] flex items-center justify-center font-bold">{notifications}</span>
              )}
            </button>
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
