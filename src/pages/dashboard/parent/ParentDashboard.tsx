import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Users, TrendingUp, Calendar, MessageSquare, Star, CheckCircle, AlertCircle, BookOpen, BarChart2, ChevronRight, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from "recharts";
import { toast } from "sonner";

const children = [
  { name: "Riya Kumar", class: "Class 10", school: "Delhi Public School", avatar: "RK", color: "bg-blue-500", attendance: 92, avgScore: 81, rank: 12, courses: 5 },
  { name: "Aryan Kumar", class: "Class 7", school: "Delhi Public School", avatar: "AK", color: "bg-purple-500", attendance: 88, avgScore: 74, rank: 20, courses: 3 },
];

const weeklyScores = [
  { day: "Mon", riya: 85, aryan: 70 }, { day: "Tue", riya: 78, aryan: 72 },
  { day: "Wed", riya: 90, aryan: 65 }, { day: "Thu", riya: 82, aryan: 78 },
  { day: "Fri", riya: 88, aryan: 74 }, { day: "Sat", riya: 92, aryan: 80 },
];

const recentAlerts = [
  { type: "warning", msg: "Aryan missed 2 classes this week in Mathematics", time: "2h ago" },
  { type: "success", msg: "Riya scored 95% in Chemistry Mock Test!", time: "1 day ago" },
  { type: "info", msg: "Parent-Teacher Meeting scheduled for June 12", time: "2 days ago" },
  { type: "warning", msg: "Riya has a pending assignment in Physics", time: "3 days ago" },
];

const messages = [
  { from: "Dr. Aisha Patel", subject: "Physics Progress — Riya", time: "1h ago", read: false },
  { from: "Mr. Ravi Tiwari", subject: "Aryan's Math improvement needed", time: "4h ago", read: false },
  { from: "Admin", subject: "Annual Report Card Available", time: "2 days ago", read: true },
];

export default function ParentDashboard() {
  const [selectedChild, setSelectedChild] = useState(0);
  const child = children[selectedChild];

  return (
    <DashboardLayout title="Parent Dashboard" subtitle="Monitor your children's academic progress and stay connected">
      {/* Child Selector */}
      <div className="flex gap-3 mb-6">
        {children.map((c, i) => (
          <button
            key={i}
            onClick={() => setSelectedChild(i)}
            className={cn("flex items-center gap-3 px-4 py-3 rounded-2xl border-2 transition-all", selectedChild === i ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/30")}
          >
            <div className={cn("w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0", c.color)}>{c.avatar}</div>
            <div className="text-left">
              <div className={cn("text-sm font-semibold", selectedChild === i && "text-primary")}>{c.name}</div>
              <div className="text-xs text-muted-foreground">{c.class}</div>
            </div>
          </button>
        ))}
        <button
          onClick={() => toast.success("Add child account feature coming soon!")}
          className="flex items-center gap-2 px-4 py-3 rounded-2xl border-2 border-dashed border-border text-muted-foreground hover:border-primary/40 hover:text-primary transition-all text-sm font-medium"
        >
          + Link Child
        </button>
      </div>

      {/* Child Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Attendance", val: `${child.attendance}%`, icon: Calendar, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950" },
          { label: "Avg. Score", val: `${child.avgScore}%`, icon: TrendingUp, color: "text-green-500", bg: "bg-green-50 dark:bg-green-950" },
          { label: "Class Rank", val: `#${child.rank}`, icon: Star, color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-950" },
          { label: "Active Courses", val: child.courses, icon: BookOpen, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-950" },
        ].map((s, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-4">
            <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center mb-3", s.bg)}>
              <s.icon className={cn("w-4 h-4", s.color)} />
            </div>
            <div className="text-2xl font-bold">{s.val}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Charts + Alerts */}
      <div className="grid lg:grid-cols-3 gap-5 mb-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold mb-1">Weekly Performance Comparison</h3>
          <p className="text-xs text-muted-foreground mb-4">Test scores across subjects this week</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={weeklyScores}>
              <defs>
                <linearGradient id="riya" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(221 83% 53%)" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="hsl(221 83% 53%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="aryan" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(262 83% 57%)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(262 83% 57%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis domain={[50, 100]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 10, fontSize: 12 }} />
              <Area type="monotone" dataKey="riya" name="Riya" stroke="hsl(221 83% 53%)" strokeWidth={2} fill="url(#riya)" />
              <Area type="monotone" dataKey="aryan" name="Aryan" stroke="hsl(262 83% 57%)" strokeWidth={2} fill="url(#aryan)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-4 h-4 text-yellow-500" />
            <h3 className="font-semibold">Alerts & Notices</h3>
          </div>
          <div className="space-y-3">
            {recentAlerts.map((a, i) => (
              <div key={i} className={cn("flex items-start gap-2.5 p-3 rounded-xl text-xs", a.type === "warning" ? "bg-yellow-50 dark:bg-yellow-950/30" : a.type === "success" ? "bg-green-50 dark:bg-green-950/30" : "bg-blue-50 dark:bg-blue-950/30")}>
                {a.type === "warning" ? <AlertCircle className="w-3.5 h-3.5 text-yellow-500 flex-shrink-0 mt-0.5" /> : a.type === "success" ? <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" /> : <Bell className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5" />}
                <div>
                  <p className="text-foreground leading-relaxed">{a.msg}</p>
                  <p className="text-muted-foreground mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subject Breakdown + Messages */}
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">{child.name}'s Subject Performance</h3>
            <Link to="/dashboard/parent/performance" className="text-xs text-primary font-semibold hover:underline flex items-center gap-1">Details <ChevronRight className="w-3 h-3" /></Link>
          </div>
          {[
            { subject: "Mathematics", score: 78, grade: "B+" },
            { subject: "Physics", score: 64, grade: "C+" },
            { subject: "Chemistry", score: 89, grade: "A" },
            { subject: "English", score: 82, grade: "A-" },
            { subject: "Biology", score: 74, grade: "B" },
          ].map((s, i) => (
            <div key={i} className="mb-3 last:mb-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">{s.subject}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-primary">{s.grade}</span>
                  <span className="text-xs text-muted-foreground">{s.score}%</span>
                </div>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${s.score}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Teacher Messages</h3>
            <Link to="/dashboard/parent/communication" className="text-xs text-primary font-semibold hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                onClick={() => toast.success(`Opening message from ${m.from}`)}
                className={cn("flex items-start gap-3 p-3 rounded-xl cursor-pointer hover:bg-muted transition-colors", !m.read && "bg-primary/5 border border-primary/10")}
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {m.from.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">{m.from}</span>
                    <span className="text-xs text-muted-foreground">{m.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">{m.subject}</p>
                </div>
                {!m.read && <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />}
              </div>
            ))}
          </div>
          <button
            onClick={() => toast.success("Composing new message to teacher...")}
            className="w-full mt-4 py-2.5 gradient-primary text-white rounded-xl text-xs font-semibold hover:opacity-90 flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-3.5 h-3.5" /> Message a Teacher
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
