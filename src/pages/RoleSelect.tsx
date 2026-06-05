import { Link, useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { setMockUser, getRoleDashboardPath, UserRole } from "@/hooks/useRole";
import { toast } from "sonner";

const roles = [
  {
    id: "student" as UserRole,
    icon: "🎓",
    title: "Student",
    desc: "Learn, practice, take tests, and track your academic progress",
    color: "blue",
    demo: { name: "Alex Johnson", email: "student@edneed.com" },
  },
  {
    id: "parent" as UserRole,
    icon: "👨‍👩‍👧",
    title: "Parent",
    desc: "Monitor your child's attendance, performance, and communicate with teachers",
    color: "green",
    demo: { name: "Rajesh Kumar", email: "parent@edneed.com" },
  },
  {
    id: "teacher" as UserRole,
    icon: "👩‍🏫",
    title: "Teacher / Tutor",
    desc: "Create and publish courses, conduct classes, and evaluate students",
    color: "purple",
    demo: { name: "Dr. Priya Sharma", email: "teacher@edneed.com" },
  },
  {
    id: "institution" as UserRole,
    icon: "🏫",
    title: "School / Institute",
    desc: "Manage students, track attendance, handle fees, and generate reports",
    color: "orange",
    demo: { name: "Delhi Public School", email: "institution@edneed.com" },
  },
  {
    id: "counselor" as UserRole,
    icon: "🧭",
    title: "Career Counselor",
    desc: "Assess students, provide guidance, and recommend career opportunities",
    color: "teal",
    demo: { name: "Dr. Meera Iyer", email: "counselor@edneed.com" },
  },
  {
    id: "recruiter" as UserRole,
    icon: "💼",
    title: "Recruiter",
    desc: "Post internships, review candidates, and connect with talented students",
    color: "rose",
    demo: { name: "HR Manager, TCS", email: "recruiter@edneed.com" },
  },
  {
    id: "admin" as UserRole,
    icon: "⚙️",
    title: "Admin",
    desc: "Manage the platform, verify educators, and analyze growth metrics",
    color: "slate",
    demo: { name: "Platform Admin", email: "admin@edneed.com" },
  },
];

const colorMap: Record<string, string> = {
  blue: "border-blue-200 hover:border-blue-400 dark:border-blue-900 dark:hover:border-blue-600 bg-blue-50/50 dark:bg-blue-950/20",
  green: "border-green-200 hover:border-green-400 dark:border-green-900 dark:hover:border-green-600 bg-green-50/50 dark:bg-green-950/20",
  purple: "border-purple-200 hover:border-purple-400 dark:border-purple-900 dark:hover:border-purple-600 bg-purple-50/50 dark:bg-purple-950/20",
  orange: "border-orange-200 hover:border-orange-400 dark:border-orange-900 dark:hover:border-orange-600 bg-orange-50/50 dark:bg-orange-950/20",
  teal: "border-teal-200 hover:border-teal-400 dark:border-teal-900 dark:hover:border-teal-600 bg-teal-50/50 dark:bg-teal-950/20",
  rose: "border-rose-200 hover:border-rose-400 dark:border-rose-900 dark:hover:border-rose-600 bg-rose-50/50 dark:bg-rose-950/20",
  slate: "border-slate-200 hover:border-slate-400 dark:border-slate-700 dark:hover:border-slate-500 bg-slate-50/50 dark:bg-slate-900/20",
};

export default function RoleSelect() {
  const navigate = useNavigate();

  const handleSelect = (role: typeof roles[0]) => {
    const user = { name: role.demo.name, email: role.demo.email, role: role.id, id: `demo-${role.id}` };
    setMockUser(user);
    toast.success(`Entering ${role.title} dashboard...`);
    setTimeout(() => navigate(getRoleDashboardPath(role.id)), 400);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <GraduationCap className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg"><span className="gradient-text">Ed</span>Need</span>
        </Link>
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← Back to Home
        </Link>
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center mb-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4 border border-primary/20">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Demo Mode — Select Your Role
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Which dashboard would you<br />like to explore?
          </h1>
          <p className="text-muted-foreground text-base">
            EdNeed supports 7 user roles. Select one to enter the corresponding demo dashboard with all features pre-loaded.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full max-w-5xl">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => handleSelect(role)}
              className={cn(
                "p-5 rounded-2xl border-2 text-left transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] group",
                colorMap[role.color]
              )}
            >
              <div className="text-3xl mb-3">{role.icon}</div>
              <h3 className="font-bold text-sm mb-1 group-hover:text-primary transition-colors">{role.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{role.desc}</p>
              <div className="mt-3 text-xs text-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                Enter Dashboard →
              </div>
            </button>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mt-8">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
