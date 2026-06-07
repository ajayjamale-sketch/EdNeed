import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { FileText, Download, Eye, Search, Filter, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const results = [
  { exam: "Annual Examination 2024–25", date: "Mar 15, 2025", type: "Annual", riya: { total: 487, max: 600, pct: 81, grade: "A", subjects: [{ s: "Math", m: 78, g: "B+" }, { s: "Physics", m: 64, g: "C+" }, { s: "Chemistry", m: 89, g: "A" }, { s: "English", m: 82, g: "A-" }, { s: "Biology", m: 74, g: "B" }, { s: "SST", m: 100, g: "O" }] }, aryan: { total: 412, max: 600, pct: 69, grade: "B", subjects: [{ s: "Math", m: 65, g: "C+" }, { s: "Science", m: 72, g: "B-" }, { s: "English", m: 80, g: "A-" }, { s: "SST", m: 78, g: "B+" }, { s: "Hindi", m: 82, g: "A-" }, { s: "Sanskrit", m: 75, g: "B" }] } },
  { exam: "Half-Yearly Examination", date: "Nov 20, 2024", type: "Half-Yearly", riya: { total: 452, max: 600, pct: 75, grade: "B+", subjects: [] }, aryan: { total: 390, max: 600, pct: 65, grade: "C+", subjects: [] } },
  { exam: "Unit Test — Term 2", date: "Jan 10, 2025", type: "Unit Test", riya: { total: 92, max: 100, pct: 92, grade: "A+", subjects: [] }, aryan: { total: 78, max: 100, pct: 78, grade: "B+", subjects: [] } },
];

export default function ParentResults() {
  const [child, setChild] = useState<"riya" | "aryan">("riya");
  const [expanded, setExpanded] = useState<number | null>(0);
  const [reportOpen, setReportOpen] = useState<any>(null);

  return (
    <DashboardLayout title="Results & Report Cards" subtitle="View detailed exam results and download report cards">
      <div className="flex gap-2 mb-6">
        {(["riya", "aryan"] as const).map((c) => (
          <button key={c} onClick={() => setChild(c)} className={cn("px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all", child === c ? "gradient-primary text-white border-transparent" : "bg-muted border-transparent text-muted-foreground hover:text-foreground")}>
            {c === "riya" ? "Riya Kumar" : "Aryan Kumar"}
          </button>
        ))}
      </div>

      <div className="space-y-4 max-w-3xl">
        {results.map((r, i) => {
          const data = r[child];
          return (
            <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden">
              <div
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="flex items-center justify-between p-5 cursor-pointer hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-white">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{r.exam}</h3>
                    <p className="text-xs text-muted-foreground">{r.date} · {r.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-bold">{data.total}/{data.max}</div>
                    <div className={cn("text-xs font-bold", data.pct >= 80 ? "text-accent" : data.pct >= 65 ? "text-primary" : "text-destructive")}>{data.pct}% — Grade {data.grade}</div>
                  </div>
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm bg-gradient-to-br", data.pct >= 80 ? "from-green-500 to-green-600" : data.pct >= 65 ? "from-blue-500 to-blue-600" : "from-red-500 to-red-600")}>{data.grade}</div>
                </div>
              </div>

              {expanded === i && data.subjects.length > 0 && (
                <div className="border-t border-border p-5">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                    {data.subjects.map((s, j) => (
                      <div key={j} className="p-3 rounded-xl bg-muted/50 flex items-center justify-between">
                        <span className="text-sm font-medium">{s.s}</span>
                        <div className="text-right">
                          <div className="font-bold text-sm">{s.m}</div>
                          <div className={cn("text-xs font-bold", s.m >= 80 ? "text-accent" : s.m >= 65 ? "text-primary" : "text-destructive")}>{s.g}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setReportOpen({ exam: r.exam, date: r.date, data: data })} className="flex items-center gap-2 px-4 py-2 border border-border rounded-xl text-xs font-semibold hover:bg-muted transition-colors">
                      <Eye className="w-3.5 h-3.5" /> View Full Report
                    </button>
                    <button onClick={() => toast.success("Downloading report card PDF...")} className="flex items-center gap-2 px-4 py-2 gradient-primary text-white rounded-xl text-xs font-semibold hover:opacity-90">
                      <Download className="w-3.5 h-3.5" /> Download PDF
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* View Full Report Modal */}
      <Dialog open={!!reportOpen} onOpenChange={(open) => !open && setReportOpen(null)}>
        <DialogContent className="sm:max-w-[500px] bg-background">
          <DialogHeader>
            <DialogTitle>Official Report Card</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                <FileText className="w-8 h-8" />
              </div>
              <h2 className="font-bold text-lg text-foreground">{child === "riya" ? "Riya Kumar" : "Aryan Kumar"}</h2>
              <p className="text-sm text-muted-foreground">{reportOpen?.exam} — {reportOpen?.date}</p>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-xl mb-6">
              <div className="flex justify-between items-center pb-2 border-b border-border/50 mb-2">
                <span className="text-sm font-medium text-muted-foreground">Overall Score</span>
                <span className="font-bold text-foreground">{reportOpen?.data.total} / {reportOpen?.data.max}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-border/50 mb-2">
                <span className="text-sm font-medium text-muted-foreground">Percentage</span>
                <span className={cn("font-bold", reportOpen?.data.pct >= 80 ? "text-accent" : reportOpen?.data.pct >= 65 ? "text-primary" : "text-destructive")}>{reportOpen?.data.pct}%</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-border/50 mb-2">
                <span className="text-sm font-medium text-muted-foreground">Grade</span>
                <span className={cn("font-bold px-2 py-0.5 rounded text-white text-xs", reportOpen?.data.pct >= 80 ? "bg-accent" : reportOpen?.data.pct >= 65 ? "bg-primary" : "bg-destructive")}>{reportOpen?.data.grade}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">Class Rank</span>
                <span className="font-bold text-foreground">#12 / 48</span>
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Teacher's Remarks</h4>
              <p className="text-sm leading-relaxed text-foreground bg-primary/5 border border-primary/10 p-3 rounded-lg">
                "{child === "riya" ? "Riya" : "Aryan"} has demonstrated excellent academic progress this term. Their active participation in class discussions is commendable. Focus on maintaining consistency in upcoming assessments."
              </p>
            </div>
          </div>
          <DialogFooter className="sm:justify-between sm:items-center">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle className="w-3 h-3 text-accent" /> Digitally Verified
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setReportOpen(null)}>Close</Button>
              <Button onClick={() => { toast.success("Downloading PDF..."); setReportOpen(null); }}>Download PDF</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
