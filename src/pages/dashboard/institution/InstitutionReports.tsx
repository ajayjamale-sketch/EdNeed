import DashboardLayout from "@/components/layout/DashboardLayout";
import { Download, TrendingUp, BarChart2, Users, Star, Award } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from "recharts";
import { toast } from "sonner";

const examResults = [
  { class: "Class 8", avg: 72, pass: 95, distinction: 28 },
  { class: "Class 9", avg: 68, pass: 92, distinction: 18 },
  { class: "Class 10", avg: 82, pass: 98, distinction: 45 },
  { class: "Class 11", avg: 74, pass: 94, distinction: 30 },
  { class: "Class 12", avg: 79, pass: 96, distinction: 38 },
];

const monthlyTrend = [
  { month: "Aug", avg: 70 }, { month: "Sep", avg: 72 }, { month: "Oct", avg: 68 },
  { month: "Nov", avg: 74 }, { month: "Dec", avg: 76 }, { month: "Jan", avg: 75 },
  { month: "Feb", avg: 78 }, { month: "Mar", avg: 82 },
];

const topStudents = [
  { name: "Sneha Pillai", class: "11-A", score: 98, subject: "Chemistry" },
  { name: "Aarav Sharma", class: "10-A", score: 96, subject: "Mathematics" },
  { name: "Kiran Rao", class: "12-B", score: 94, subject: "Physics" },
  { name: "Ananya Singh", class: "8-C", score: 93, subject: "English" },
  { name: "Priya Mehta", class: "10-B", score: 91, subject: "Biology" },
];

export default function InstitutionReports() {
  return (
    <DashboardLayout title="Academic Reports" subtitle="Comprehensive performance reports across all classes and subjects">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "School Average", val: "75.5%", icon: BarChart2, color: "text-blue-500" },
          { label: "Pass Percentage", val: "95%", icon: TrendingUp, color: "text-accent" },
          { label: "Distinction Students", val: "159", icon: Award, color: "text-yellow-500" },
          { label: "School Rank (District)", val: "#3", icon: Star, color: "text-purple-500" },
        ].map((s, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-4">
            <s.icon className={`w-4 h-4 mb-2 ${s.color}`} />
            <div className="text-2xl font-bold">{s.val}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mb-5">
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold mb-4">Class-wise Average Score</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={examResults} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="class" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[50, 100]} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 10, fontSize: 12 }} />
              <Bar dataKey="avg" name="Average %" fill="hsl(221 83% 53%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold mb-4">Monthly Score Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[60, 90]} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 10, fontSize: 12 }} />
              <Line dataKey="avg" name="School Avg" stroke="hsl(221 83% 53%)" strokeWidth={2.5} dot={{ fill: "hsl(221 83% 53%)", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold mb-4">Class Performance Summary</h3>
          <div className="space-y-3">
            {examResults.map((e, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl border border-border hover:bg-muted/30 cursor-pointer transition-colors" onClick={() => toast.success(`Opening ${e.class} detailed report...`)}>
                <div className="w-16 text-sm font-semibold">{e.class}</div>
                <div className="flex-1">
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>Avg: <strong className="text-foreground">{e.avg}%</strong></span>
                    <span>Pass: <strong className="text-accent">{e.pass}%</strong></span>
                    <span>Distinction: <strong className="text-yellow-600">{e.distinction}</strong></span>
                  </div>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mt-1.5">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${e.avg}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Top Performers</h3>
          </div>
          <div className="space-y-3 mb-4">
            {topStudents.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: i === 0 ? "#F59E0B" : i === 1 ? "#9CA3AF" : i === 2 ? "#F97316" : "#6366F1" }}>
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">{s.name}</div>
                  <div className="text-xs text-muted-foreground">{s.class} · {s.subject}</div>
                </div>
                <div className="text-sm font-bold text-accent">{s.score}%</div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => toast.success("Generating full academic report...")} className="flex-1 py-2.5 gradient-primary text-white rounded-xl text-xs font-semibold hover:opacity-90">Generate Report</button>
            <button onClick={() => toast.success("Downloading PDF...")} className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-xl text-xs font-semibold hover:bg-muted transition-colors">
              <Download className="w-3.5 h-3.5" /> PDF
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
