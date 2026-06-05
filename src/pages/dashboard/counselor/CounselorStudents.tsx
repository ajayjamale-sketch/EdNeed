import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Users, Search, TrendingUp, Target, Calendar, MessageSquare, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const students = [
  { id: 1, name: "Rahul Mehta", class: "12 Science", target: "IIT/NIT — Engineering", assessment: "92% Engineering", nextSession: "Jun 5", status: "on-track", initials: "RM", color: "bg-blue-500", progress: 72 },
  { id: 2, name: "Ananya Reddy", class: "11 Science", target: "MBBS — NEET", assessment: "88% Medicine", nextSession: "Jun 7", status: "on-track", initials: "AR", color: "bg-green-500", progress: 58 },
  { id: 3, name: "Siddharth Rao", class: "Graduation", target: "IAS — UPSC", assessment: "85% Civil Services", nextSession: "Jun 6", status: "excellent", initials: "SR", color: "bg-purple-500", progress: 85 },
  { id: 4, name: "Kavya Nair", class: "12 Commerce", target: "MBA — CAT", assessment: "78% Management", nextSession: "Jun 9", status: "needs-attention", initials: "KN", color: "bg-orange-500", progress: 44 },
  { id: 5, name: "Arjun Iyer", class: "12 Science", target: "B.Tech CS — JEE", assessment: "89% Engineering", nextSession: "Jun 8", status: "on-track", initials: "AI", color: "bg-teal-500", progress: 65 },
  { id: 6, name: "Deepa Verma", class: "10 Science", target: "Design — NATA", assessment: "94% Design/Arts", nextSession: "Jun 11", status: "excellent", initials: "DV", color: "bg-rose-500", progress: 88 },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  "on-track": { label: "On Track", color: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300" },
  "excellent": { label: "Excellent", color: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300" },
  "needs-attention": { label: "Needs Attention", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300" },
};

export default function CounselorStudents() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = students.filter((s) => {
    const m = s.name.toLowerCase().includes(search.toLowerCase()) || s.target.toLowerCase().includes(search.toLowerCase());
    const f = statusFilter === "all" || s.status === statusFilter;
    return m && f;
  });

  return (
    <DashboardLayout title="My Students" subtitle="Monitor career guidance progress for all assigned students">
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search students or career goals..." className="w-full pl-9 pr-4 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none">
          <option value="all">All Students</option>
          <option value="on-track">On Track</option>
          <option value="excellent">Excellent</option>
          <option value="needs-attention">Needs Attention</option>
        </select>
        <button onClick={() => toast.success("Adding new student assignment...")} className="flex items-center gap-2 px-4 py-2.5 gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 whitespace-nowrap">
          <Plus className="w-4 h-4" /> Assign Student
        </button>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((s) => {
          const cfg = statusConfig[s.status];
          return (
            <div key={s.id} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/30 card-hover cursor-pointer" onClick={() => toast.success(`Opening ${s.name}'s profile...`)}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={cn("w-11 h-11 rounded-2xl flex items-center justify-center text-white font-bold flex-shrink-0", s.color)}>{s.initials}</div>
                  <div>
                    <div className="font-semibold text-sm">{s.name}</div>
                    <div className="text-xs text-muted-foreground">{s.class}</div>
                  </div>
                </div>
                <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full", cfg.color)}>{cfg.label}</span>
              </div>

              <div className="mb-3">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                  <Target className="w-3 h-3" /> {s.target}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <TrendingUp className="w-3 h-3" /> Assessment: {s.assessment}
                </div>
              </div>

              <div className="mb-3">
                <div className="flex justify-between mb-1 text-xs">
                  <span className="text-muted-foreground">Guidance Progress</span>
                  <span className="font-semibold">{s.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${s.progress}%` }} />
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={(e) => { e.stopPropagation(); toast.success(`Scheduling session with ${s.name}...`); }} className="flex-1 py-2 gradient-primary text-white rounded-lg text-xs font-semibold hover:opacity-90 flex items-center justify-center gap-1">
                  <Calendar className="w-3 h-3" /> Session: {s.nextSession}
                </button>
                <button onClick={(e) => { e.stopPropagation(); toast.success(`Messaging ${s.name}...`); }} className="w-8 h-8 border border-border rounded-lg flex items-center justify-center hover:bg-muted transition-colors flex-shrink-0">
                  <MessageSquare className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
