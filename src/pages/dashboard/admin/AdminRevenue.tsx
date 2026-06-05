import DashboardLayout from "@/components/layout/DashboardLayout";
import { DollarSign, TrendingUp, BarChart2, Download, PieChart as PieIcon } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, PieChart, Pie, Cell, Legend } from "recharts";
import { toast } from "sonner";

const revenueData = [
  { month: "Jan", courses: 180000, subscriptions: 60000, ads: 40000 },
  { month: "Feb", courses: 220000, subscriptions: 80000, ads: 50000 },
  { month: "Mar", courses: 280000, subscriptions: 90000, ads: 52000 },
  { month: "Apr", courses: 360000, subscriptions: 110000, ads: 70000 },
  { month: "May", courses: 440000, subscriptions: 150000, ads: 90000 },
  { month: "Jun", courses: 550000, subscriptions: 200000, ads: 100000 },
];

const pieData = [
  { name: "Course Sales", value: 550000, color: "#2563EB" },
  { name: "Subscriptions", value: 200000, color: "#7C3AED" },
  { name: "Advertisements", value: 100000, color: "#10B981" },
];

const topCourses = [
  { title: "UPSC Polity", instructor: "Ms. Ananya", revenue: 1083690 },
  { title: "NEET Biology", instructor: "Dr. Priya", revenue: 549780 },
  { title: "JEE Physics", instructor: "Dr. Vivek", revenue: 554850 },
  { title: "JEE Chemistry", instructor: "Dr. Sanjay", revenue: 388440 },
];

export default function AdminRevenue() {
  return (
    <DashboardLayout title="Revenue Analytics" subtitle="Platform-wide financial performance and earnings breakdown">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Revenue (All Time)", val: "₹32.5L", trend: "+52% YoY" },
          { label: "This Month", val: "₹8.5L", trend: "+25% MoM" },
          { label: "Platform Fee Collected", val: "₹1.7L", trend: "20% cut" },
          { label: "Teacher Payouts", val: "₹6.8L", trend: "80% of revenue" },
        ].map((s, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-4">
            <div className="text-xs text-muted-foreground mb-2">{s.label}</div>
            <div className="text-2xl font-bold">{s.val}</div>
            <div className="text-xs text-accent font-medium mt-0.5">{s.trend}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mb-5">
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Revenue Breakdown by Stream</h3>
            <button onClick={() => toast.success("Downloading revenue report...")} className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-xl text-xs font-semibold hover:bg-muted transition-colors">
              <Download className="w-3.5 h-3.5" /> Export
            </button>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueData} barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 10, fontSize: 12 }} formatter={(v: number) => [`₹${v.toLocaleString()}`]} />
              <Bar dataKey="courses" name="Course Sales" fill="#2563EB" radius={[4, 4, 0, 0]} />
              <Bar dataKey="subscriptions" name="Subscriptions" fill="#7C3AED" radius={[4, 4, 0, 0]} />
              <Bar dataKey="ads" name="Ads" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold mb-4">Revenue Mix</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={65} dataKey="value">
                {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Legend formatter={(v) => <span className="text-xs">{v}</span>} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 10, fontSize: 12 }} formatter={(v: number) => [`₹${v.toLocaleString()}`]} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-5">
        <h3 className="font-semibold mb-4">Top Revenue-Generating Courses</h3>
        <div className="space-y-3">
          {topCourses.map((c, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{i + 1}</div>
              <div className="flex-1">
                <div className="font-semibold text-sm">{c.title}</div>
                <div className="text-xs text-muted-foreground">{c.instructor}</div>
              </div>
              <div className="text-sm font-bold text-accent">₹{c.revenue.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
