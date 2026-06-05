import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Users, Calendar, TrendingUp, Target, Star, ChevronRight, BookOpen, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const sessionsData = [
  { month: "Jan", sessions: 12 }, { month: "Feb", sessions: 18 }, { month: "Mar", sessions: 15 },
  { month: "Apr", sessions: 22 }, { month: "May", sessions: 28 }, { month: "Jun", sessions: 20 },
];

const myStudents = [
  { name: "Rahul Mehta", class: "Class 12 (JEE)", target: "Engineering", progress: 72, next: "Jun 5, 4:00 PM", initials: "RM", color: "bg-blue-500" },
  { name: "Ananya Reddy", class: "Class 11", target: "Medicine (NEET)", progress: 58, next: "Jun 7, 2:00 PM", initials: "AR", color: "bg-green-500" },
  { name: "Siddharth Rao", class: "Class 12 (UPSC prep)", target: "IAS/Civil Services", progress: 85, next: "Jun 6, 11:00 AM", initials: "SR", color: "bg-purple-500" },
  { name: "Kavya Nair", class: "Class 12 (CAT prep)", target: "Management/MBA", progress: 44, next: "Jun 9, 3:00 PM", initials: "KN", color: "bg-orange-500" },
];

const recentActivities = [
  { desc: "Completed career assessment with Rahul Mehta — Engineering match: 92%", time: "2h ago" },
  { desc: "Sent college shortlist to Ananya Reddy — NEET preparation guide", time: "1 day ago" },
  { desc: "Scheduled 4 counseling sessions for next week", time: "2 days ago" },
  { desc: "Recommended IIT mentorship program to Siddharth", time: "3 days ago" },
];

export default function CounselorDashboard() {
  return (
    <DashboardLayout title="Career Counselor Dashboard" subtitle="Guide students toward their ideal career paths">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Active Students", val: "42", icon: Users, color: "text-blue-500 bg-blue-50 dark:bg-blue-950" },
          { label: "Sessions This Month", val: "20", icon: Calendar, color: "text-purple-500 bg-purple-50 dark:bg-purple-950" },
          { label: "Assessments Done", val: "128", icon: Target, color: "text-accent bg-accent/10" },
          { label: "Avg. Rating", val: "4.9 ⭐", icon: Star, color: "text-yellow-500 bg-yellow-50 dark:bg-yellow-950" },
        ].map((s, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-5">
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center mb-3", s.color.split(" ").slice(1).join(" "))}>
              <s.icon className={cn("w-4 h-4", s.color.split(" ")[0])} />
            </div>
            <div className="text-2xl font-bold">{s.val}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-5 mb-6">
        <div className="lg:col-span-3 bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold mb-4">Monthly Sessions</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={sessionsData}>
              <defs>
                <linearGradient id="sessGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(160 84% 39%)" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="hsl(160 84% 39%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 10, fontSize: 12 }} />
              <Area type="monotone" dataKey="sessions" stroke="hsl(160 84% 39%)" strokeWidth={2.5} fill="url(#sessGrad)" dot={{ fill: "hsl(160 84% 39%)", r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivities.map((a, i) => (
              <div key={i} className="flex items-start gap-2 pb-3 border-b border-border last:border-0 last:pb-0">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <div>
                  <p className="text-xs leading-relaxed">{a.desc}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold">My Active Students</h3>
          <Link to="/dashboard/counselor/students" className="text-xs text-primary font-semibold hover:underline flex items-center gap-1">All students <ChevronRight className="w-3.5 h-3.5" /></Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {myStudents.map((s, i) => (
            <div key={i} className="flex items-center gap-4 p-4 border border-border rounded-xl hover:border-primary/30 transition-colors cursor-pointer" onClick={() => toast.success(`Opening ${s.name}'s counseling profile...`)}>
              <div className={cn("w-11 h-11 rounded-2xl flex items-center justify-center text-white font-bold flex-shrink-0", s.color)}>{s.initials}</div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm">{s.name}</div>
                <div className="text-xs text-muted-foreground">{s.class} · Target: {s.target}</div>
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${s.progress}%` }} />
                  </div>
                  <span className="text-xs font-medium">{s.progress}%</span>
                </div>
                <div className="text-[10px] text-muted-foreground mt-0.5">Next session: {s.next}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
