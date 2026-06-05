import DashboardLayout from "@/components/layout/DashboardLayout";
import { BarChart3, TrendingUp, TrendingDown, Target, Award, AlertTriangle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AreaChart, Area, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, PolarRadiusAxis
} from "recharts";

const monthlyPerformance = [
  { month: "Jan", score: 62, hours: 45, tests: 4 },
  { month: "Feb", score: 68, hours: 52, tests: 6 },
  { month: "Mar", score: 65, hours: 48, tests: 5 },
  { month: "Apr", score: 74, hours: 60, tests: 8 },
  { month: "May", score: 78, hours: 68, tests: 9 },
  { month: "Jun", score: 82, hours: 75, tests: 11 },
];

const subjectData = [
  { subject: "Mathematics", score: 78, target: 85, change: +8, tests: 12 },
  { subject: "Physics", score: 64, target: 75, change: -2, tests: 9 },
  { subject: "Chemistry", score: 89, target: 85, change: +5, tests: 11 },
  { subject: "Biology", score: 83, target: 80, change: +6, tests: 8 },
  { subject: "English", score: 71, target: 75, change: +1, tests: 6 },
];

const radarData = [
  { subject: "Maths", A: 78, fullMark: 100 },
  { subject: "Physics", A: 64, fullMark: 100 },
  { subject: "Chemistry", A: 89, fullMark: 100 },
  { subject: "Biology", A: 83, fullMark: 100 },
  { subject: "English", A: 71, fullMark: 100 },
];

const weakTopics = [
  { topic: "Thermodynamics", subject: "Physics", accuracy: 42, icon: "⚡" },
  { topic: "Coordinate Geometry", subject: "Mathematics", accuracy: 55, icon: "📐" },
  { topic: "Ionic Equilibrium", subject: "Chemistry", accuracy: 58, icon: "⚗️" },
  { topic: "Genetics", subject: "Biology", accuracy: 61, icon: "🧬" },
];

const attendanceData = [
  { week: "W1", attended: 18, total: 20 },
  { week: "W2", attended: 20, total: 20 },
  { week: "W3", attended: 16, total: 20 },
  { week: "W4", attended: 19, total: 20 },
  { week: "W5", attended: 20, total: 20 },
  { week: "W6", attended: 17, total: 20 },
];

export default function DashboardAnalytics() {
  return (
    <DashboardLayout title="Academic Analytics" subtitle="Deep insights into your learning performance">
      {/* Top KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Overall Score", val: "78%", change: "+6% this month", trend: "up", icon: Target, color: "blue" },
          { label: "Study Streak", val: "14 days", change: "Personal best!", trend: "up", icon: Award, color: "orange" },
          { label: "Tests Attempted", val: "46", change: "+8 this month", trend: "up", icon: BarChart3, color: "purple" },
          { label: "Avg. Accuracy", val: "76%", change: "-2% vs last month", trend: "down", icon: CheckCircle, color: "green" },
        ].map((s, i) => {
          const colorMap: Record<string, string> = {
            blue: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
            purple: "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
            green: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
            orange: "bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400",
          };
          return (
            <div key={i} className="bg-card border border-border rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">{s.label}</span>
                <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center", colorMap[s.color])}>
                  <s.icon className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="text-2xl font-bold mb-0.5">{s.val}</div>
              <div className={cn("text-xs font-medium flex items-center gap-1", s.trend === "up" ? "text-accent" : "text-destructive")}>
                {s.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {s.change}
              </div>
            </div>
          );
        })}
      </div>

      {/* Monthly Performance + Radar */}
      <div className="grid lg:grid-cols-5 gap-5 mb-6">
        <div className="lg:col-span-3 bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold mb-1">6-Month Score Trend</h3>
          <p className="text-xs text-muted-foreground mb-4">Your average test score over the past 6 months</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyPerformance}>
              <defs>
                <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(221 83% 53%)" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="hsl(221 83% 53%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis domain={[50, 100]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 10, fontSize: 12 }} />
              <Area type="monotone" dataKey="score" name="Score %" stroke="hsl(221 83% 53%)" strokeWidth={2.5} fill="url(#scoreGrad)" dot={{ fill: "hsl(221 83% 53%)", r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold mb-1">Skill Radar</h3>
          <p className="text-xs text-muted-foreground mb-4">Performance across subjects</p>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
              <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 9 }} axisLine={false} />
              <Radar name="Score" dataKey="A" stroke="hsl(221 83% 53%)" fill="hsl(221 83% 53%)" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Subject Breakdown + Weak Topics */}
      <div className="grid lg:grid-cols-2 gap-5 mb-6">
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold mb-4">Subject Performance Breakdown</h3>
          <div className="space-y-4">
            {subjectData.map((s, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium">{s.subject}</span>
                  <div className="flex items-center gap-3 text-xs">
                    <span className={cn("flex items-center gap-0.5 font-medium", s.change > 0 ? "text-accent" : "text-destructive")}>
                      {s.change > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {s.change > 0 ? "+" : ""}{s.change}%
                    </span>
                    <span className="font-bold">{s.score}%</span>
                  </div>
                </div>
                <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${s.score}%` }} />
                  <div className="absolute top-0 h-full w-0.5 bg-primary/40" style={{ left: `${s.target}%` }} />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[10px] text-muted-foreground">{s.tests} tests taken</span>
                  <span className="text-[10px] text-muted-foreground">Target: {s.target}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-yellow-500" />
            <h3 className="font-semibold">Weak Topics — Needs Attention</h3>
          </div>
          <div className="space-y-3 mb-5">
            {weakTopics.map((t, i) => (
              <div key={i} className="p-3 rounded-xl bg-yellow-50/50 dark:bg-yellow-950/20 border border-yellow-200/50 dark:border-yellow-900/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{t.icon}</span>
                    <div>
                      <div className="text-sm font-semibold">{t.topic}</div>
                      <div className="text-xs text-muted-foreground">{t.subject}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-destructive">{t.accuracy}%</div>
                    <div className="text-[10px] text-muted-foreground">Accuracy</div>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${t.accuracy}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Attendance */}
          <h3 className="font-semibold mb-3">Attendance Overview</h3>
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={attendanceData} barSize={16}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="week" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 25]} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 10, fontSize: 12 }} />
              <Bar dataKey="total" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="attended" fill="hsl(221 83% 53%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardLayout>
  );
}
