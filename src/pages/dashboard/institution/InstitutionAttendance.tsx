import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { CheckCircle, XCircle, Clock, AlertTriangle, Download, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const initialClassAttendance = [
  { class: "Class 8-A", present: 38, total: 42, pct: 90, teacher: "Ms. Rita Gupta" },
  { class: "Class 9-B", present: 35, total: 44, pct: 80, teacher: "Mr. Suresh Nair" },
  { class: "Class 10-A", present: 40, total: 44, pct: 91, teacher: "Dr. Anita Rao" },
  { class: "Class 10-B", present: 29, total: 44, pct: 66, teacher: "Mr. Vikas Sharma" },
  { class: "Class 11-A", present: 36, total: 40, pct: 90, teacher: "Ms. Priya Iyer" },
  { class: "Class 12-B", present: 32, total: 38, pct: 84, teacher: "Dr. Meera Pillai" },
];

const weeklyTrend = [
  { day: "Mon", pct: 88 }, { day: "Tue", pct: 92 }, { day: "Wed", pct: 85 },
  { day: "Thu", pct: 91 }, { day: "Fri", pct: 78 },
];

export default function InstitutionAttendance() {
  const [date, setDate] = useState("2025-06-04");
  const [data, setData] = useState(initialClassAttendance);
  const [showAtRisk, setShowAtRisk] = useState(false);
  
  // Modal state
  const [isMarkOpen, setIsMarkOpen] = useState(false);
  const [formData, setFormData] = useState({ class: "Class 8-A", present: 0, total: 0 });

  const filteredData = showAtRisk ? data.filter(c => c.pct < 75) : data;

  const handleMarkAttendance = () => {
    const selectedClass = data.find(c => c.class === formData.class) || data[0];
    setFormData({ class: selectedClass.class, present: selectedClass.present, total: selectedClass.total });
    setIsMarkOpen(true);
  };

  const handleSaveAttendance = () => {
    const pct = Math.round((formData.present / formData.total) * 100) || 0;
    setData(prev => prev.map(c => c.class === formData.class ? { ...c, present: formData.present, total: formData.total, pct } : c));
    toast.success("Attendance updated successfully");
    setIsMarkOpen(false);
  };

  const handleExport = () => {
    const headers = ["Class,Teacher,Present,Total,Percentage"];
    const csvData = data.map(c => `${c.class},${c.teacher},${c.present},${c.total},${c.pct}%`);
    const blob = new Blob([headers.concat(csvData).join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "attendance_report.csv";
    a.click();
    toast.success("Exported attendance report");
  };

  return (
    <DashboardLayout title="Attendance Management" subtitle="School-wide attendance tracking across all classes">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Present Today", val: "908", pct: "91%", color: "text-accent" },
          { label: "Absent Today", val: "92", pct: "9%", color: "text-destructive" },
          { label: "Late Arrivals", val: "23", pct: "2.3%", color: "text-yellow-500" },
          { label: "Low Attendance Classes", val: "2", pct: "<75%", color: "text-orange-500" },
        ].map((s, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-4">
            <div className={cn("text-2xl font-bold", s.color)}>{s.val}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
            <div className="text-xs font-semibold text-muted-foreground mt-0.5">{s.pct} of total</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mb-5">
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Weekly Attendance Trend</h3>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="px-3 py-1.5 border border-border rounded-xl text-xs bg-background focus:outline-none" />
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={weeklyTrend} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[60, 100]} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 10, fontSize: 12 }} />
              <Bar dataKey="pct" name="Attendance %" fill="hsl(221 83% 53%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <button onClick={handleMarkAttendance} className="w-full py-2.5 border border-border rounded-xl text-xs font-semibold hover:bg-muted transition-colors text-left px-3">
              Mark Today's Attendance
            </button>
            <button onClick={() => toast.success("Sending SMS notifications...")} className="w-full py-2.5 border border-border rounded-xl text-xs font-semibold hover:bg-muted transition-colors text-left px-3">
              Send Absent SMS to Parents
            </button>
            <button onClick={handleExport} className="w-full py-2.5 border border-border rounded-xl text-xs font-semibold hover:bg-muted transition-colors text-left px-3">
              Download Monthly Report
            </button>
            <button onClick={() => setShowAtRisk(!showAtRisk)} className={cn("w-full py-2.5 border border-border rounded-xl text-xs font-semibold hover:bg-muted transition-colors text-left px-3", showAtRisk && "bg-muted")}>
              {showAtRisk ? "View All Students" : "View At-Risk Students"}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h3 className="font-semibold">{showAtRisk ? "At-Risk Classes (<75%)" : "Class-wise Attendance — Today"}</h3>
          <button onClick={handleExport} className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-xl text-xs font-semibold hover:bg-muted transition-colors">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                {["Class", "Teacher", "Present", "Total", "Attendance %", "Status"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((c, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium">{c.class}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{c.teacher}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-accent">{c.present}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{c.total}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className={cn("h-full rounded-full", c.pct >= 85 ? "bg-accent" : c.pct >= 75 ? "bg-primary" : "bg-destructive")} style={{ width: `${c.pct}%` }} />
                      </div>
                      <span className={cn("text-xs font-bold", c.pct >= 85 ? "text-accent" : c.pct >= 75 ? "text-primary" : "text-destructive")}>{c.pct}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {c.pct < 75 ? (
                      <span className="text-xs font-semibold text-destructive flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Alert</span>
                    ) : (
                      <span className="text-xs font-semibold text-accent flex items-center gap-1"><CheckCircle className="w-3 h-3" /> OK</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredData.length === 0 && (
            <div className="p-6 text-center text-sm text-muted-foreground">No classes found in this view.</div>
          )}
        </div>
      </div>

      {/* --- Mark Attendance Modal --- */}
      <Dialog open={isMarkOpen} onOpenChange={setIsMarkOpen}>
        <DialogContent className="sm:max-w-[400px] bg-background">
          <DialogHeader>
            <DialogTitle>Mark Class Attendance</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="class-select">Select Class</Label>
              <select 
                id="class-select" 
                value={formData.class} 
                onChange={(e) => {
                  const selected = data.find(c => c.class === e.target.value);
                  if (selected) setFormData({ ...formData, class: selected.class, present: selected.present, total: selected.total });
                }} 
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                {data.map(c => <option key={c.class} value={c.class}>{c.class}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="present-count">Present</Label>
                <Input id="present-count" type="number" min="0" max={formData.total} value={formData.present} onChange={(e) => setFormData({ ...formData, present: Number(e.target.value) })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="total-count">Total Students</Label>
                <Input id="total-count" type="number" min="0" value={formData.total} onChange={(e) => setFormData({ ...formData, total: Number(e.target.value) })} />
              </div>
            </div>
            <div className="mt-2 p-3 bg-muted/50 rounded-lg text-center">
              <span className="text-sm text-muted-foreground">Calculated Percentage: </span>
              <span className={cn("font-bold", (formData.present / formData.total) >= 0.75 ? "text-accent" : "text-destructive")}>
                {Math.round((formData.present / formData.total) * 100) || 0}%
              </span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMarkOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveAttendance}>Save Attendance</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
