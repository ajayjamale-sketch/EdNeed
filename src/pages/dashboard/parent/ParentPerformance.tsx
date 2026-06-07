import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { BarChart2, TrendingUp, TrendingDown, Award, BookOpen, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line, Legend } from "recharts";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const monthlyData = [
  { month: "Jan", riya: 72, aryan: 65 }, { month: "Feb", riya: 76, aryan: 68 },
  { month: "Mar", riya: 74, aryan: 70 }, { month: "Apr", riya: 80, aryan: 72 },
  { month: "May", riya: 82, aryan: 75 }, { month: "Jun", riya: 87, aryan: 78 },
];

const subjectPerformance = [
  { subject: "Mathematics", riya: 78, aryan: 62, riyaGrade: "B+", aryanGrade: "C+" },
  { subject: "Physics", riya: 64, aryan: 70, riyaGrade: "C+", aryanGrade: "B-" },
  { subject: "Chemistry", riya: 89, aryan: 74, riyaGrade: "A", aryanGrade: "B" },
  { subject: "English", riya: 82, aryan: 80, riyaGrade: "A-", aryanGrade: "A-" },
  { subject: "Biology", riya: 74, aryan: 68, riyaGrade: "B", aryanGrade: "B-" },
  { subject: "Social Studies", riya: 88, aryan: 82, riyaGrade: "A", aryanGrade: "A-" },
];

const examResults = [
  { exam: "Mid-Term Exam", date: "Apr 15, 2025", riya: "82% — Grade A-", aryan: "71% — Grade B-", type: "Exam" },
  { exam: "Unit Test 3 — Math", date: "May 5, 2025", riya: "78% — Grade B+", aryan: "65% — Grade C+", type: "Test" },
  { exam: "Chemistry Practical", date: "May 18, 2025", riya: "91% — Grade A+", aryan: "78% — Grade B+", type: "Practical" },
  { exam: "Quarterly Assessment", date: "Jun 1, 2025", riya: "87% — Grade A", aryan: "76% — Grade B", type: "Exam" },
];

export default function ParentPerformance() {
  const [selected, setSelected] = useState<"riya" | "aryan">("riya");
  const [reportOpen, setReportOpen] = useState<any>(null);
  const name = selected === "riya" ? "Riya" : "Aryan";

  return (
    <DashboardLayout title="Academic Performance" subtitle="Detailed subject-wise and exam performance reports">
      {/* Child toggle */}
      <div className="flex gap-2 mb-6">
        {(["riya", "aryan"] as const).map((c) => (
          <button key={c} onClick={() => setSelected(c)} className={cn("px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all capitalize", selected === c ? "gradient-primary text-white border-transparent" : "bg-muted border-transparent text-muted-foreground hover:text-foreground")}>
            {c === "riya" ? "Riya Kumar" : "Aryan Kumar"}
          </button>
        ))}
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Overall Average", val: selected === "riya" ? "81%" : "74%", trend: "+5%", up: true },
          { label: "Best Subject", val: selected === "riya" ? "Chemistry" : "Social Studies", trend: "89% / 82%", up: true },
          { label: "Needs Attention", val: selected === "riya" ? "Physics" : "Mathematics", trend: "64% / 62%", up: false },
          { label: "Class Rank", val: selected === "riya" ? "#12" : "#20", trend: "of 48 students", up: true },
        ].map((s, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-4">
            <div className="text-xs text-muted-foreground mb-2">{s.label}</div>
            <div className="text-xl font-bold mb-0.5">{s.val}</div>
            <div className={cn("text-xs font-medium flex items-center gap-1", s.up ? "text-accent" : "text-destructive")}>
              {s.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />} {s.trend}
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-5 mb-6">
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold mb-4">6-Month Performance Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[50, 100]} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 10, fontSize: 12 }} />
              <Line dataKey={selected} name={name} stroke="hsl(221 83% 53%)" strokeWidth={2.5} dot={{ fill: "hsl(221 83% 53%)", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold mb-4">Subject-wise Scores</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={subjectPerformance} barSize={16}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="subject" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 10, fontSize: 12 }} />
              <Bar dataKey={selected} name={name} fill="hsl(221 83% 53%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed breakdown */}
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold mb-4">Subject Grade Card</h3>
          <div className="space-y-3">
            {subjectPerformance.map((s, i) => {
              const score = selected === "riya" ? s.riya : s.aryan;
              const grade = selected === "riya" ? s.riyaGrade : s.aryanGrade;
              return (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-32 text-sm font-medium truncate">{s.subject}</div>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full", score >= 80 ? "bg-accent" : score >= 65 ? "bg-primary" : "bg-destructive")} style={{ width: `${score}%` }} />
                  </div>
                  <div className="flex items-center gap-2 text-xs w-16 text-right">
                    <span className="font-bold">{score}%</span>
                    <span className={cn("font-bold px-1.5 py-0.5 rounded text-white text-[10px]", score >= 80 ? "bg-accent" : score >= 65 ? "bg-primary" : "bg-destructive")}>{grade}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold mb-4">Recent Exams & Tests</h3>
          <div className="space-y-3">
            {examResults.map((e, i) => (
              <div key={i} className="p-3 rounded-xl border border-border hover:border-primary/30 transition-colors cursor-pointer" onClick={() => setReportOpen(e)}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold">{e.exam}</span>
                  <span className="text-xs bg-muted px-2 py-0.5 rounded-full">{e.type}</span>
                </div>
                <p className="text-xs text-primary font-medium">{selected === "riya" ? e.riya : e.aryan}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{e.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={!!reportOpen} onOpenChange={(open) => !open && setReportOpen(null)}>
        <DialogContent className="sm:max-w-[425px] bg-background">
          <DialogHeader>
            <DialogTitle>{reportOpen?.exam} Details</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-3">
            <div className="flex justify-between pb-3 border-b border-border">
              <span className="text-sm text-muted-foreground">Student</span>
              <span className="text-sm font-semibold">{name} Kumar</span>
            </div>
            <div className="flex justify-between pb-3 border-b border-border">
              <span className="text-sm text-muted-foreground">Date Taken</span>
              <span className="text-sm font-medium">{reportOpen?.date}</span>
            </div>
            <div className="flex justify-between pb-3 border-b border-border">
              <span className="text-sm text-muted-foreground">Score & Grade</span>
              <span className="text-sm font-bold text-primary">{selected === "riya" ? reportOpen?.riya : reportOpen?.aryan}</span>
            </div>
            <div className="pt-2">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Teacher's Note: {name} has shown a good understanding of the core concepts in this assessment. Continued practice with advanced problem sets is recommended to improve the score further.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReportOpen(null)}>Close</Button>
            <Button onClick={() => { toast.success("Downloading full PDF report..."); setReportOpen(null); }}>Download PDF</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
