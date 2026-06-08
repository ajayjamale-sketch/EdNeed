import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  BookOpen, Clock, Trophy, TrendingUp, Target, Calendar, Play,
  Brain, ChevronRight, Flame, BarChart2, Zap, Hand
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";

// Mock user from localStorage
function getMockUser() {
  try {
    const s = localStorage.getItem("edneed-user");
    return s ? JSON.parse(s) : { name: "Alex Johnson", email: "alex@edneed.com", role: "Student" };
  } catch { 
    return { name: "Alex Johnson", email: "alex@edneed.com", role: "Student" }; 
  }
}

const weeklyProgress = [
  { day: "Mon", hours: 2.5, score: 72 }, { day: "Tue", hours: 3.2, score: 78 },
  { day: "Wed", hours: 1.8, score: 75 }, { day: "Thu", hours: 4.1, score: 84 },
  { day: "Fri", hours: 2.9, score: 80 }, { day: "Sat", hours: 5.0, score: 88 },
  { day: "Sun", hours: 3.5, score: 82 },
];

const subjectData = [
  { subject: "Math", score: 78, prev: 65 }, { subject: "Physics", score: 64, prev: 58 },
  { subject: "Chem", score: 89, prev: 82 }, { subject: "English", score: 71, prev: 69 },
  { subject: "Bio", score: 83, prev: 75 },
];

const courses = [
  { title: "JEE Mathematics - Complete Course", instructor: "Prof. Ramesh Kumar", progress: 68, duration: "48h", category: "JEE Prep", color: "blue" },
  { title: "Physics for NEET & JEE", instructor: "Dr. Aisha Patel", progress: 42, duration: "36h", category: "NEET Prep", color: "purple" },
  { title: "English Grammar Mastery", instructor: "Ms. Kavitha Nair", progress: 85, duration: "22h", category: "Language", color: "green" },
  { title: "Organic Chemistry - Advanced", instructor: "Dr. Sanjay Mehta", progress: 31, duration: "30h", category: "Chemistry", color: "orange" },
];

const upcoming = [
  { title: "Calculus — Live Class", subject: "Mathematics", time: "Today, 4:00 PM", type: "Live", urgent: true },
  { title: "Physics Mock Test #7", subject: "Physics", time: "Tomorrow, 10:00 AM", type: "Test", urgent: false },
  { title: "Chemistry Assignment", subject: "Chemistry", time: "Thu, 11:59 PM", type: "Assignment", urgent: false },
  { title: "AI Doubt Session", subject: "Biology", time: "Fri, 2:00 PM", type: "Session", urgent: false },
];

const achievements = [
  { icon: Flame, title: "7-Day Streak", desc: "Studied 7 days in a row" },
  { icon: Zap, title: "Fast Learner", desc: "Completed 5 lessons in a day" },
  { icon: Target, title: "Perfect Score", desc: "100% on Chemistry Quiz" },
  { icon: Trophy, title: "Top 10%", desc: "Among JEE aspirants" },
];

const colorMap: Record<string, string> = {
  blue: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
  purple: "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
  green: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
  orange: "bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400",
};

const typeColor: Record<string, string> = {
  Live: "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400",
  Test: "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
  Assignment: "bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400",
  Session: "bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
};

export default function DashboardOverview() {
  const user = getMockUser();
  const [activeTab, setActiveTab] = useState<"hours" | "score">("hours");

  return (
    <DashboardLayout title={`Good morning, ${user?.name?.split(" ")[0]} `} subtitle="Here's your academic overview for today">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Courses Enrolled", val: "12", change: "+2 this month", icon: BookOpen, color: "blue" },
          { label: "Hours Studied", val: "247h", change: "+18h this week", icon: Clock, color: "purple" },
          { label: "Tests Completed", val: "34", change: "+5 this week", icon: Trophy, color: "green" },
          { label: "Avg. Score", val: "82%", change: "+4% improvement", icon: TrendingUp, color: "orange" },
        ].map((s, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-5">
            <span className="text-xs text-muted-foreground font-medium block mb-2">{s.label}</span>
            <div className="text-2xl font-bold mb-0.5">{s.val}</div>
            <div className="text-xs text-accent font-medium mt-1">
              {s.change}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-5 gap-5 mb-6">
        <div className="lg:col-span-3 bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-semibold">Weekly Progress</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Study hours & test performance</p>
            </div>
            <div className="flex gap-1">
              {(["hours", "score"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                    activeTab === t
                      ? "gradient-primary text-white"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {t === "hours" ? "Study Hours" : "Test Score"}
                </button>
              ))}
            </div>
          </div>
          <div className="w-full h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyProgress}>
                <defs>
                  <linearGradient id="colorGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(221 83% 53%)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(221 83% 53%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 10, fontSize: 12 }} />
                <Area type="monotone" dataKey={activeTab} stroke="hsl(221 83% 53%)" strokeWidth={2} fill="url(#colorGrad)" dot={{ fill: "hsl(221 83% 53%)", r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold mb-4">Subject Performance</h3>
          <div className="w-full h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectData} barSize={12}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="subject" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 10, fontSize: 12 }} />
                <Bar dataKey="score" fill="hsl(221 83% 53%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="prev" fill="hsl(221 83% 53% / 0.25)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><span className="w-3 h-2 rounded-sm bg-primary inline-block" />Current</span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><span className="w-3 h-2 rounded-sm bg-primary/25 inline-block" />Previous</span>
          </div>
        </div>
      </div>

      {/* Courses + Schedule */}
      <div className="grid lg:grid-cols-3 gap-5 mb-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold">Continue Learning</h3>
            <Link to="/dashboard/courses" className="text-xs text-primary font-semibold hover:underline flex items-center gap-1">
              View all <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="space-y-4">
            {courses.map((c, i) => (
              <div key={i} className="flex items-center gap-4 group cursor-pointer">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", colorMap[c.color])}>
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate group-hover:text-primary transition-colors">{c.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{c.instructor} · {c.duration}</div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${c.progress}%` }} />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">{c.progress}%</span>
                  </div>
                </div>
                <Link
                  to="/dashboard/courses"
                  state={{ selectCourseTitle: c.title }}
                  className="w-8 h-8 rounded-lg bg-primary/10 hover:bg-primary hover:text-white text-primary flex items-center justify-center transition-all flex-shrink-0"
                >
                  <Play className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold">Upcoming</h3>
            <Link to="/dashboard/schedule" className="text-xs text-primary font-semibold hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {upcoming.map((ev, i) => (
              <div key={i} className={cn("p-3 rounded-xl border transition-colors cursor-pointer hover:border-primary/30", ev.urgent ? "border-primary/30 bg-primary/5" : "border-border")}>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="text-xs font-medium leading-tight">{ev.title}</span>
                  <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-md flex-shrink-0", typeColor[ev.type])}>{ev.type}</span>
                </div>
                <div className="text-xs text-muted-foreground">{ev.subject} · {ev.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements + AI Tip */}
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold">Recent Achievements</h3>
            <Link to="/dashboard/achievements" className="text-xs text-primary font-semibold hover:underline">View all</Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((a, i) => (
              <div key={i} className="p-3 rounded-xl bg-muted/40 hover:bg-muted transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <a.icon className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold">{a.title}</span>
                </div>
                <div className="text-xs text-muted-foreground">{a.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-5 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-5 h-5" />
              <span className="text-sm font-semibold">AI Study Insight</span>
            </div>
            <p className="text-white/85 text-sm leading-relaxed mb-4">
              Based on your recent test performance, you should focus on <strong>Thermodynamics in Physics</strong> — your accuracy dropped to 58% in the last 3 mock tests.
            </p>
            <div className="flex gap-2">
              <Link to="/dashboard/assessments" className="px-4 py-2 bg-white text-primary rounded-lg text-xs font-semibold hover:bg-white/90 transition-colors">
                Practice Now
              </Link>
              <Link to="/dashboard/ai-assistant" className="px-4 py-2 bg-white/15 text-white border border-white/25 rounded-lg text-xs font-semibold hover:bg-white/25 transition-colors">
                Ask AI Tutor
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hand icon after greeting – positioned inline with the title */}
      <div className="fixed hidden">
        {/* The Hand icon is added as a separate element in the title */}
      </div>
    </DashboardLayout>
  );
}