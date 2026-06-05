import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { FileText, Download, Eye, Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const results = [
  { exam: "Annual Examination 2024–25", date: "Mar 15, 2025", type: "Annual", riya: { total: 487, max: 600, pct: 81, grade: "A", subjects: [{ s: "Math", m: 78, g: "B+" }, { s: "Physics", m: 64, g: "C+" }, { s: "Chemistry", m: 89, g: "A" }, { s: "English", m: 82, g: "A-" }, { s: "Biology", m: 74, g: "B" }, { s: "SST", m: 100, g: "O" }] }, aryan: { total: 412, max: 600, pct: 69, grade: "B", subjects: [{ s: "Math", m: 65, g: "C+" }, { s: "Science", m: 72, g: "B-" }, { s: "English", m: 80, g: "A-" }, { s: "SST", m: 78, g: "B+" }, { s: "Hindi", m: 82, g: "A-" }, { s: "Sanskrit", m: 75, g: "B" }] } },
  { exam: "Half-Yearly Examination", date: "Nov 20, 2024", type: "Half-Yearly", riya: { total: 452, max: 600, pct: 75, grade: "B+", subjects: [] }, aryan: { total: 390, max: 600, pct: 65, grade: "C+", subjects: [] } },
  { exam: "Unit Test — Term 2", date: "Jan 10, 2025", type: "Unit Test", riya: { total: 92, max: 100, pct: 92, grade: "A+", subjects: [] }, aryan: { total: 78, max: 100, pct: 78, grade: "B+", subjects: [] } },
];

export default function ParentResults() {
  const [child, setChild] = useState<"riya" | "aryan">("riya");
  const [expanded, setExpanded] = useState<number | null>(0);

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
                    <button onClick={() => toast.success("Opening report card...")} className="flex items-center gap-2 px-4 py-2 border border-border rounded-xl text-xs font-semibold hover:bg-muted transition-colors">
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
    </DashboardLayout>
  );
}
