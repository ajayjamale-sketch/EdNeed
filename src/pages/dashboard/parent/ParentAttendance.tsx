import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Calendar, CheckCircle, XCircle, Clock, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const monthDays = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  const rand = Math.random();
  const status = day > 25 ? "upcoming" : rand > 0.85 ? "absent" : rand > 0.7 ? "late" : "present";
  return { day, status };
});

const subjectAttendance = [
  { subject: "Mathematics", present: 22, total: 24, pct: 92 },
  { subject: "Physics", present: 19, total: 24, pct: 79 },
  { subject: "Chemistry", present: 23, total: 24, pct: 96 },
  { subject: "English", present: 21, total: 24, pct: 88 },
  { subject: "Biology", present: 20, total: 24, pct: 83 },
  { subject: "Social Studies", present: 24, total: 24, pct: 100 },
];

const statusColor: Record<string, string> = {
  present: "bg-green-500",
  absent: "bg-red-500",
  late: "bg-yellow-500",
  upcoming: "bg-muted",
};

export default function ParentAttendance() {
  const [child, setChild] = useState<"riya" | "aryan">("riya");
  const [month, setMonth] = useState("June 2025");

  const present = monthDays.filter((d) => d.status === "present").length;
  const absent = monthDays.filter((d) => d.status === "absent").length;
  const late = monthDays.filter((d) => d.status === "late").length;

  return (
    <DashboardLayout title="Attendance Tracker" subtitle="Monitor daily and subject-wise attendance for your children">
      {/* Child toggle */}
      <div className="flex gap-2 mb-6">
        {(["riya", "aryan"] as const).map((c) => (
          <button key={c} onClick={() => setChild(c)} className={cn("px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all capitalize", child === c ? "gradient-primary text-white border-transparent" : "bg-muted border-transparent text-muted-foreground hover:text-foreground")}>
            {c === "riya" ? "Riya Kumar" : "Aryan Kumar"}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Overall Attendance", val: child === "riya" ? "92%" : "88%", icon: CheckCircle, color: "text-green-500 bg-green-50 dark:bg-green-950" },
          { label: "Days Present", val: present, icon: CheckCircle, color: "text-accent bg-accent/10" },
          { label: "Days Absent", val: absent, icon: XCircle, color: "text-destructive bg-destructive/10" },
          { label: "Days Late", val: late, icon: Clock, color: "text-yellow-500 bg-yellow-50 dark:bg-yellow-950" },
        ].map((s, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-4">
            <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center mb-3", s.color.split(" ").slice(1).join(" "))}>
              <s.icon className={cn("w-4 h-4", s.color.split(" ")[0])} />
            </div>
            <div className="text-2xl font-bold">{s.val}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold">Monthly Attendance — {month}</h3>
            <div className="flex items-center gap-2">
              <button onClick={() => toast.info("Previous month")} className="w-7 h-7 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors">
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => toast.info("Next month")} className="w-7 h-7 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <div key={d} className="text-center text-[10px] text-muted-foreground font-semibold py-1">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {/* Offset for June starting on Sunday */}
            {Array.from({ length: 0 }, (_, i) => <div key={`empty-${i}`} />)}
            {monthDays.map((d) => (
              <button
                key={d.day}
                onClick={() => d.status !== "upcoming" && toast.info(`${d.day} June: ${d.status}`)}
                className={cn("aspect-square rounded-lg flex items-center justify-center text-xs font-medium transition-all hover:ring-2 hover:ring-primary/30", d.status === "present" ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300" : d.status === "absent" ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300" : d.status === "late" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300" : "bg-muted text-muted-foreground")}
              >
                {d.day}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4 text-xs">
            {[["Present", "bg-green-500"], ["Absent", "bg-red-500"], ["Late", "bg-yellow-500"], ["Upcoming", "bg-muted"]].map(([label, color]) => (
              <span key={label} className="flex items-center gap-1.5">
                <span className={cn("w-2.5 h-2.5 rounded-sm", color)} /> {label}
              </span>
            ))}
          </div>
        </div>

        {/* Subject Attendance */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold mb-4">Subject-wise Attendance</h3>
          <div className="space-y-3">
            {subjectAttendance.map((s, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{s.subject}</span>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground">{s.present}/{s.total}</span>
                    <span className={cn("font-bold", s.pct >= 85 ? "text-accent" : s.pct >= 75 ? "text-primary" : "text-destructive")}>{s.pct}%</span>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className={cn("h-full rounded-full", s.pct >= 85 ? "bg-accent" : s.pct >= 75 ? "bg-primary" : "bg-destructive")} style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          {subjectAttendance.some((s) => s.pct < 80) && (
            <div className="mt-4 p-3 rounded-xl bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-900 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-foreground">Physics attendance is below 80%. Please ensure regular attendance to avoid debarment from exams.</p>
            </div>
          )}
          <button onClick={() => toast.success("Downloading attendance report...")} className="w-full mt-4 py-2.5 border border-border rounded-xl text-xs font-semibold hover:bg-muted transition-colors">
            Download Report
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
