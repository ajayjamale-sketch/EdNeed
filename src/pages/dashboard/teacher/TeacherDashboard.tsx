import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { BookOpen, Users, DollarSign, Star, TrendingUp, Play, Plus, Video, BarChart2, Clock, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const earningsData = [
  { month: "Jan", amount: 12000 }, { month: "Feb", amount: 15000 },
  { month: "Mar", amount: 18000 }, { month: "Apr", amount: 22000 },
  { month: "May", amount: 28000 }, { month: "Jun", amount: 35000 },
];

const myCourses = [
  { title: "Advanced Calculus for JEE", students: 1842, rating: 4.9, revenue: 92100, status: "published", lessons: 120, color: "blue" },
  { title: "Physics Mechanics — NEET & JEE", students: 1205, rating: 4.8, revenue: 60250, status: "published", lessons: 95, color: "purple" },
  { title: "Differential Equations Mastery", students: 632, rating: 4.7, revenue: 31600, status: "published", lessons: 60, color: "green" },
  { title: "IIT-JEE Problem Solving Workshop", students: 0, rating: 0, revenue: 0, status: "draft", lessons: 20, color: "orange" },
];

const recentStudents = [
  { name: "Rahul Sharma", enrolled: "JEE Mathematics", progress: 68, initials: "RS" },
  { name: "Priya Mehta", enrolled: "Physics Mechanics", progress: 45, initials: "PM" },
  { name: "Arjun Nair", enrolled: "JEE Mathematics", progress: 90, initials: "AN" },
  { name: "Sneha Roy", enrolled: "Differential Equations", progress: 30, initials: "SR" },
];

const colorMap: Record<string, string> = {
  blue: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
  purple: "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
  green: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
  orange: "bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400",
};

export default function TeacherDashboard() {
  return (
    <DashboardLayout title="Teacher Dashboard" subtitle="Manage your courses, students, and track earnings">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Active Courses", val: "3", icon: BookOpen, color: "blue" },
          { label: "Total Students", val: "3,679", icon: Users, color: "purple" },
          { label: "Monthly Earnings", val: "₹35K", icon: DollarSign, color: "green" },
          { label: "Avg. Rating", val: "4.8", icon: Star, color: "orange" },
        ].map((s, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-5">
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center mb-3", colorMap[s.color])}>
              <s.icon className="w-4 h-4" />
            </div>
            <div className="text-2xl font-bold">{s.val}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Earnings Chart + Students */}
      <div className="grid lg:grid-cols-5 gap-5 mb-6">
        <div className="lg:col-span-3 bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Earnings Trend</h3>
              <p className="text-xs text-muted-foreground">Monthly revenue from all courses</p>
            </div>
            <Link to="/dashboard/teacher/earnings" className="text-xs text-primary font-semibold hover:underline">Full report →</Link>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={earningsData}>
              <defs>
                <linearGradient id="earn" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(262 83% 57%)" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="hsl(262 83% 57%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 10, fontSize: 12 }} formatter={(v: number) => [`₹${v.toLocaleString()}`, "Earnings"]} />
              <Area type="monotone" dataKey="amount" stroke="hsl(262 83% 57%)" strokeWidth={2.5} fill="url(#earn)" dot={{ fill: "hsl(262 83% 57%)", r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Students</h3>
            <Link to="/dashboard/teacher/students" className="text-xs text-primary font-semibold hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {recentStudents.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{s.initials}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{s.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{s.enrolled}</div>
                </div>
                <div className="text-xs font-semibold text-primary">{s.progress}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* My Courses */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold">My Courses</h3>
          <div className="flex gap-2">
            <Link to="/dashboard/teacher/courses" className="text-xs text-primary font-semibold hover:underline">Manage all</Link>
            <button onClick={() => toast.success("Opening course builder...")} className="flex items-center gap-1.5 px-3 py-1.5 gradient-primary text-white rounded-lg text-xs font-semibold hover:opacity-90">
              <Plus className="w-3 h-3" /> New Course
            </button>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {myCourses.map((c, i) => (
            <div key={i} className="border border-border rounded-xl p-4 hover:border-primary/30 transition-colors cursor-pointer" onClick={() => toast.success(`Opening: ${c.title}`)}>
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3", colorMap[c.color])}>
                <BookOpen className="w-4 h-4" />
              </div>
              <h4 className="font-semibold text-xs leading-snug mb-2">{c.title}</h4>
              {c.status === "published" ? (
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div className="flex justify-between"><span>{c.students.toLocaleString()} students</span><span className="text-yellow-500">{c.rating}</span></div>
                  <div className="font-semibold text-accent">₹{c.revenue.toLocaleString()}</div>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-[10px] font-semibold">Draft</span>
                  <span>{c.lessons} lessons added</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
