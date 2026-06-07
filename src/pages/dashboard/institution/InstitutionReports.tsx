import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Download, TrendingUp, BarChart2, Users, Star, Award, FileText } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from "recharts";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
  const [isClassReportOpen, setIsClassReportOpen] = useState(false);
  const [selectedClassReport, setSelectedClassReport] = useState<any>(null);

  const handleOpenClassReport = (e: any) => {
    setSelectedClassReport(e);
    setIsClassReportOpen(true);
  };

  const handleExportCSV = () => {
    const headers = ["Class,Average Score (%),Pass Rate (%),Distinction Count"];
    const csvData = examResults.map(e => `${e.class},${e.avg},${e.pass},${e.distinction}`);
    const blob = new Blob([headers.concat(csvData).join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "academic_report.csv";
    a.click();
    toast.success("Exported academic report successfully");
  };

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
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl border border-border hover:bg-muted/30 cursor-pointer transition-colors" onClick={() => handleOpenClassReport(e)}>
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
            <button onClick={handleExportCSV} className="flex-1 py-2.5 gradient-primary text-white rounded-xl text-xs font-semibold hover:opacity-90 flex items-center justify-center gap-2">
              <FileText className="w-3.5 h-3.5" /> Generate CSV Report
            </button>
            <button onClick={handleExportCSV} className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-xl text-xs font-semibold hover:bg-muted transition-colors">
              <Download className="w-3.5 h-3.5" /> Export
            </button>
          </div>
        </div>
      </div>

      {/* --- Class Detailed Report Modal --- */}
      <Dialog open={isClassReportOpen} onOpenChange={setIsClassReportOpen}>
        <DialogContent className="sm:max-w-[450px] bg-background">
          <DialogHeader>
            <DialogTitle>{selectedClassReport?.class} — Detailed Report</DialogTitle>
          </DialogHeader>
          {selectedClassReport && (
            <div className="py-4 space-y-5">
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-muted/30 rounded-xl border border-border text-center">
                  <div className="text-2xl font-bold text-primary">{selectedClassReport.avg}%</div>
                  <div className="text-xs text-muted-foreground mt-1">Class Average</div>
                </div>
                <div className="p-4 bg-muted/30 rounded-xl border border-border text-center">
                  <div className="text-2xl font-bold text-accent">{selectedClassReport.pass}%</div>
                  <div className="text-xs text-muted-foreground mt-1">Pass Rate</div>
                </div>
                <div className="p-4 bg-muted/30 rounded-xl border border-border text-center">
                  <div className="text-2xl font-bold text-yellow-500">{selectedClassReport.distinction}</div>
                  <div className="text-xs text-muted-foreground mt-1">Distinctions</div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2">Subject Performance Breakdown</h4>
                <div className="space-y-3">
                  {[
                    { subject: "Mathematics", avg: selectedClassReport.avg + 4 },
                    { subject: "Science", avg: selectedClassReport.avg - 2 },
                    { subject: "English", avg: selectedClassReport.avg + 1 },
                  ].map((sub, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium">{sub.subject}</span>
                        <span className="text-muted-foreground">{sub.avg}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${sub.avg}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsClassReportOpen(false)}>Close Report</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
