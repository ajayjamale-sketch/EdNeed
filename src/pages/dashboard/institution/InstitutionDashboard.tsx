import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Users, BookOpen, DollarSign, Calendar, TrendingUp, AlertCircle, BarChart2, Building, MessageSquare, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const attendanceData = [
  { week: "W1", present: 880, absent: 120 }, { week: "W2", present: 920, absent: 80 },
  { week: "W3", present: 850, absent: 150 }, { week: "W4", present: 910, absent: 90 },
];

const feeData = [
  { name: "Paid", value: 820, color: "#10B981" },
  { name: "Pending", value: 120, color: "#2563EB" },
  { name: "Overdue", value: 60, color: "#EF4444" },
];

const classPerformance = [
  { class: "Class 8", avg: 72 }, { class: "Class 9", avg: 68 }, { class: "Class 10", avg: 82 },
  { class: "Class 11", avg: 74 }, { class: "Class 12", avg: 79 },
];

const recentAlerts = [
  { type: "warning", msg: "45 students have attendance below 75% this month", icon: AlertCircle, color: "text-yellow-500 bg-yellow-50 dark:bg-yellow-950/30" },
  { type: "info", msg: "₹5,40,000 in fee payments pending for July term", icon: DollarSign, color: "text-blue-500 bg-blue-50 dark:bg-blue-950/30" },
  { type: "success", msg: "Class 10 Board Results: School average 87.4%", icon: TrendingUp, color: "text-green-500 bg-green-50 dark:bg-green-950/30" },
  { type: "warning", msg: "3 teacher vacancies pending approval", icon: Users, color: "text-orange-500 bg-orange-50 dark:bg-orange-950/30" },
];

export default function InstitutionDashboard() {
  return (
    <DashboardLayout title="Institution Dashboard" subtitle="Manage your school's academic operations, students, and staff">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Students", val: "1,000", icon: Users, color: "blue" },
          { label: "Teaching Staff", val: "68", icon: BookOpen, color: "purple" },
          { label: "Fee Collection", val: "82%", icon: DollarSign, color: "green" },
          { label: "Avg. Attendance", val: "91%", icon: Calendar, color: "orange" },
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
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Weekly Attendance</h3>
            <Link to="/dashboard/institution/attendance" className="text-xs text-primary font-semibold hover:underline">Details →</Link>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={attendanceData} barSize={22}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 10, fontSize: 12 }} />
              <Bar dataKey="present" name="Present" fill="hsl(160 84% 39%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="absent" name="Absent" fill="hsl(0 84% 60%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Fee Collection Status</h3>
            <Link to="/dashboard/institution/fees" className="text-xs text-primary font-semibold hover:underline">Manage</Link>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={feeData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} dataKey="value" paddingAngle={3}>
                {feeData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Legend formatter={(val) => <span className="text-xs">{val}</span>} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 10, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance + Alerts */}
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Class-wise Academic Performance</h3>
            <Link to="/dashboard/institution/reports" className="text-xs text-primary font-semibold hover:underline flex items-center gap-1">Report <ChevronRight className="w-3 h-3" /></Link>
          </div>
          <div className="space-y-3">
            {classPerformance.map((c, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1 text-sm">
                  <span className="font-medium">{c.class}</span>
                  <span className={cn("font-bold", c.avg >= 80 ? "text-accent" : c.avg >= 70 ? "text-primary" : "text-destructive")}>{c.avg}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className={cn("h-full rounded-full", c.avg >= 80 ? "bg-accent" : c.avg >= 70 ? "bg-primary" : "bg-destructive")} style={{ width: `${c.avg}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold mb-4">Important Alerts</h3>
          <div className="space-y-3">
            {recentAlerts.map((a, i) => (
              <div key={i} className={cn("flex items-start gap-3 p-3 rounded-xl cursor-pointer hover:opacity-80 transition-opacity", a.color)} onClick={() => toast.info(a.msg)}>
                <a.icon className={cn("w-4 h-4 flex-shrink-0 mt-0.5", a.color.split(" ")[0])} />
                <p className="text-xs leading-relaxed">{a.msg}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <Link to="/dashboard/institution/communication" className="py-2 text-center border border-border rounded-xl text-xs font-semibold hover:bg-muted transition-colors">
              <MessageSquare className="w-3.5 h-3.5 inline mr-1" /> Parent Comms
            </Link>
            <button onClick={() => toast.success("Generating institution report...")} className="py-2 gradient-primary text-white rounded-xl text-xs font-semibold hover:opacity-90">
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
