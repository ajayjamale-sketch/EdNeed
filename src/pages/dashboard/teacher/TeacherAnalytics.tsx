import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { BarChart2, TrendingUp, Users, BookOpen, Star, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from "recharts";

const coursePerformance = [
  { course: "Calculus", completion: 68, rating: 4.9, dropoff: 12 },
  { course: "Physics", completion: 55, rating: 4.8, dropoff: 18 },
  { course: "Diff Eq.", completion: 40, rating: 4.7, dropoff: 22 },
];

const enrollmentTrend = {
  "Last 30 Days": [
    { month: "Week 1", students: 10 }, { month: "Week 2", students: 25 },
    { month: "Week 3", students: 45 }, { month: "Week 4", students: 85 },
  ],
  "This Year": [
    { month: "Jan", students: 120 }, { month: "Feb", students: 180 },
    { month: "Mar", students: 240 }, { month: "Apr", students: 320 },
    { month: "May", students: 410 }, { month: "Jun", students: 510 },
  ]
};

export default function TeacherAnalytics() {
  const [timeframe, setTimeframe] = useState<"This Year" | "Last 30 Days">("This Year");

  return (
    <DashboardLayout title="Teaching Analytics" subtitle="Insights into course performance and student engagement">
      <div className="flex justify-end mb-4">
        <select value={timeframe} onChange={(e) => setTimeframe(e.target.value as any)} className="px-3 py-2 border border-border rounded-xl text-sm bg-background font-medium focus:outline-none focus:ring-2 focus:ring-primary/30">
          <option>Last 30 Days</option>
          <option>This Year</option>
        </select>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Students", val: "3,679", icon: Users, color: "text-blue-500" },
          { label: "Avg. Completion", val: "54%", icon: BarChart2, color: "text-purple-500" },
          { label: "Avg. Rating", val: "4.8 / 5", icon: Star, color: "text-yellow-500" },
          { label: "Avg. Watch Time", val: "42 min", icon: Clock, color: "text-green-500" },
        ].map((s, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-4">
            <s.icon className={`w-4 h-4 mb-2 ${s.color}`} />
            <div className="text-2xl font-bold">{s.val}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mb-6">
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold mb-4">Course Completion Rates</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={coursePerformance} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="course" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 10, fontSize: 12 }} />
              <Bar dataKey="completion" name="Completion %" fill="hsl(262 83% 57%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold mb-4">Student Enrollment Growth</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={enrollmentTrend[timeframe]}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 10, fontSize: 12 }} />
              <Line dataKey="students" stroke="hsl(262 83% 57%)" strokeWidth={2.5} dot={{ fill: "hsl(262 83% 57%)", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-5">
        <h3 className="font-semibold mb-4">Course-wise Performance Summary</h3>
        <div className="space-y-3">
          {coursePerformance.map((c, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl border border-border hover:bg-muted/30 transition-colors">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-white flex-shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm">{c.course}</div>
                <div className="flex gap-4 text-xs text-muted-foreground mt-0.5">
                  <span>Completion: {c.completion}%</span>
                  <span>Rating: {c.rating}</span>
                  <span className="text-destructive">Drop-off: {c.dropoff}%</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mt-1.5">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${c.completion}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
