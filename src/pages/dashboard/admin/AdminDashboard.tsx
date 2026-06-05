import DashboardLayout from "@/components/layout/DashboardLayout";
import { Users, BookOpen, UserCheck, Building, DollarSign, Shield, TrendingUp, AlertCircle, CheckCircle, Eye, BarChart2 } from "lucide-react";
import { Link } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, PieChart, Pie, Cell, Legend } from "recharts";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const growthData = [
  { month: "Jan", students: 12000, teachers: 420 }, { month: "Feb", students: 15000, teachers: 510 },
  { month: "Mar", students: 19000, teachers: 640 }, { month: "Apr", students: 24000, teachers: 780 },
  { month: "May", students: 31000, teachers: 920 }, { month: "Jun", students: 40000, teachers: 1100 },
];

const revenueData = [
  { month: "Jan", revenue: 280000 }, { month: "Feb", revenue: 350000 },
  { month: "Mar", revenue: 420000 }, { month: "Apr", revenue: 540000 },
  { month: "May", revenue: 680000 }, { month: "Jun", revenue: 850000 },
];

const userDistribution = [
  { name: "Students", value: 40000, color: "#2563EB" },
  { name: "Teachers", value: 1100, color: "#7C3AED" },
  { name: "Parents", value: 8000, color: "#10B981" },
  { name: "Institutions", value: 120, color: "#F59E0B" },
];

const moderationQueue = [
  { type: "Course Review", item: "JEE Advanced Chemistry 2025 — Dr. Sharma", flag: "Unverified claims", time: "2h ago", icon: BookOpen },
  { type: "Teacher Verification", item: "Prof. Rajesh Kumar — Pending documents", flag: "Identity check", time: "4h ago", icon: UserCheck },
  { type: "Content Report", item: "Forum post #4892 — Inappropriate content", flag: "User reported", time: "1 day ago", icon: AlertCircle },
  { type: "Institution Review", item: "New Academy Patna — Verification pending", flag: "Documents pending", time: "2 days ago", icon: Building },
];

export default function AdminDashboard() {
  return (
    <DashboardLayout title="Admin Dashboard" subtitle="Platform-wide management, analytics, and governance">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Users", val: "49,220+", icon: Users, color: "blue" },
          { label: "Active Courses", val: "15,480", icon: BookOpen, color: "purple" },
          { label: "Monthly Revenue", val: "₹8.5L", icon: DollarSign, color: "green" },
          { label: "Pending Reviews", val: "24", icon: Shield, color: "orange" },
        ].map((s, i) => {
          const colors: Record<string, string> = {
            blue: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
            purple: "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
            green: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
            orange: "bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400",
          };
          return (
            <div key={i} className="bg-card border border-border rounded-2xl p-5">
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center mb-3", colors[s.color])}>
                <s.icon className="w-4 h-4" />
              </div>
              <div className="text-2xl font-bold">{s.val}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-5 gap-5 mb-6">
        <div className="lg:col-span-3 bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Platform Growth</h3>
            <Link to="/dashboard/admin/users" className="text-xs text-primary font-semibold hover:underline">Manage Users →</Link>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={growthData}>
              <defs>
                <linearGradient id="stuGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(221 83% 53%)" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="hsl(221 83% 53%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 10, fontSize: 12 }} />
              <Area type="monotone" dataKey="students" name="Students" stroke="hsl(221 83% 53%)" strokeWidth={2.5} fill="url(#stuGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold mb-4">User Distribution</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={userDistribution} cx="50%" cy="50%" outerRadius={65} dataKey="value">
                {userDistribution.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Legend formatter={(v) => <span className="text-xs">{v}</span>} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 10, fontSize: 12 }} formatter={(v: number) => [v.toLocaleString()]} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue + Moderation Queue */}
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Monthly Revenue</h3>
            <Link to="/dashboard/admin/revenue" className="text-xs text-primary font-semibold hover:underline">Full analytics →</Link>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={revenueData} barSize={22}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 10, fontSize: 12 }} formatter={(v: number) => [`₹${v.toLocaleString()}`]} />
              <Bar dataKey="revenue" name="Revenue" fill="hsl(160 84% 39%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Moderation Queue</h3>
            <Link to="/dashboard/admin/moderation" className="text-xs text-primary font-semibold hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {moderationQueue.map((m, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-border hover:border-primary/30 transition-colors cursor-pointer" onClick={() => toast.success(`Reviewing: ${m.item}`)}>
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                  <m.icon className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-primary mb-0.5">{m.type}</div>
                  <div className="text-xs font-medium truncate">{m.item}</div>
                  <div className="flex items-center gap-2 mt-0.5 text-[10px] text-muted-foreground">
                    <span className="text-yellow-600 font-medium">{m.flag}</span>
                    <span>{m.time}</span>
                  </div>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button onClick={(e) => { e.stopPropagation(); toast.success("Approved!"); }} className="w-6 h-6 rounded bg-accent/10 text-accent flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
