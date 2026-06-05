import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Search, Filter, Star, TrendingUp, BookOpen, MessageSquare, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const students = [
  { id: 1, name: "Rahul Sharma", initials: "RS", color: "bg-blue-500", class: "Class 12 (JEE)", email: "rahul@example.com", progress: 68, score: 78, attendance: 92, course: "Advanced Calculus for JEE", joined: "Mar 10, 2025", streak: 14 },
  { id: 2, name: "Priya Mehta", initials: "PM", color: "bg-purple-500", class: "Class 12 (NEET)", email: "priya@example.com", progress: 45, score: 85, attendance: 88, course: "Physics Mechanics", joined: "Apr 2, 2025", streak: 7 },
  { id: 3, name: "Arjun Nair", initials: "AN", color: "bg-green-500", class: "Class 12 (JEE)", email: "arjun@example.com", progress: 90, score: 92, attendance: 97, course: "Advanced Calculus for JEE", joined: "Feb 15, 2025", streak: 28 },
  { id: 4, name: "Sneha Roy", initials: "SR", color: "bg-orange-500", class: "Class 11", email: "sneha@example.com", progress: 30, score: 65, attendance: 75, course: "Differential Equations", joined: "May 1, 2025", streak: 3 },
  { id: 5, name: "Vikram Singh", initials: "VS", color: "bg-red-500", class: "Class 12 (JEE)", email: "vikram@example.com", progress: 78, score: 80, attendance: 85, course: "Advanced Calculus for JEE", joined: "Jan 20, 2025", streak: 21 },
  { id: 6, name: "Ananya Pillai", initials: "AP", color: "bg-teal-500", class: "Class 12 (NEET)", email: "ananya@example.com", progress: 55, score: 72, attendance: 90, course: "Physics Mechanics", joined: "Apr 18, 2025", streak: 9 },
];

export default function TeacherStudents() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<typeof students[0] | null>(null);

  const filtered = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.course.toLowerCase().includes(search.toLowerCase())
  );

  if (selected) {
    return (
      <DashboardLayout title={selected.name} subtitle={`${selected.class} · ${selected.course}`}>
        <button onClick={() => setSelected(null)} className="text-sm text-muted-foreground hover:text-foreground mb-5 flex items-center gap-1 transition-colors">← Back to Students</button>
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="text-center mb-5">
              <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-bold mx-auto mb-3", selected.color)}>{selected.initials}</div>
              <h2 className="font-bold text-lg">{selected.name}</h2>
              <p className="text-sm text-muted-foreground">{selected.class}</p>
              <p className="text-xs text-muted-foreground">{selected.email}</p>
            </div>
            <div className="space-y-3">
              {[
                { label: "Enrolled Course", val: selected.course },
                { label: "Joined Date", val: selected.joined },
                { label: "Study Streak", val: `${selected.streak} days` },
              ].map((d, i) => (
                <div key={i} className="flex justify-between py-2 border-b border-border last:border-0 text-sm">
                  <span className="text-muted-foreground">{d.label}</span>
                  <span className="font-medium">{d.val}</span>
                </div>
              ))}
            </div>
            <button onClick={() => toast.success(`Message sent to ${selected.name}!`)} className="w-full mt-4 py-2.5 gradient-primary text-white rounded-xl text-xs font-semibold hover:opacity-90 flex items-center justify-center gap-2">
              <MessageSquare className="w-3.5 h-3.5" /> Send Message
            </button>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Course Progress", val: `${selected.progress}%`, color: "text-primary" },
                { label: "Avg. Score", val: `${selected.score}%`, color: "text-accent" },
                { label: "Attendance", val: `${selected.attendance}%`, color: selected.attendance >= 85 ? "text-accent" : "text-destructive" },
              ].map((s, i) => (
                <div key={i} className="bg-card border border-border rounded-2xl p-4 text-center">
                  <div className={cn("text-2xl font-bold mb-1", s.color)}>{s.val}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-semibold mb-4">Subject Performance</h3>
              {[
                { topic: "Limits & Continuity", score: 88 },
                { topic: "Differentiation", score: 75 },
                { topic: "Applications of Derivatives", score: 65 },
                { topic: "Integration", score: 82 },
                { topic: "Differential Equations", score: 58 },
              ].map((t, i) => (
                <div key={i} className="mb-3 last:mb-0">
                  <div className="flex justify-between mb-1 text-sm">
                    <span>{t.topic}</span>
                    <span className={cn("font-bold", t.score >= 75 ? "text-accent" : "text-destructive")}>{t.score}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full", t.score >= 75 ? "bg-accent" : "bg-destructive")} style={{ width: `${t.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => toast.success("Sending personalized feedback...")} className="flex-1 py-2.5 gradient-primary text-white rounded-xl text-xs font-semibold hover:opacity-90">Send Feedback</button>
              <button onClick={() => toast.success("Generating progress report...")} className="flex-1 py-2.5 border border-border rounded-xl text-xs font-semibold hover:bg-muted transition-colors">Generate Report</button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="My Students" subtitle="Monitor student progress and performance across your courses">
      <div className="relative max-w-sm mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search students..." className="w-full pl-9 pr-4 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((s) => (
          <div key={s.id} onClick={() => setSelected(s)} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/30 cursor-pointer transition-all card-hover">
            <div className="flex items-center gap-3 mb-4">
              <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0", s.color)}>{s.initials}</div>
              <div>
                <div className="font-semibold text-sm">{s.name}</div>
                <div className="text-xs text-muted-foreground">{s.class}</div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground mb-3 truncate">{s.course}</div>
            <div className="grid grid-cols-3 gap-2 text-center mb-3">
              {[
                { val: `${s.progress}%`, label: "Progress", color: "text-primary" },
                { val: `${s.score}%`, label: "Score", color: "text-accent" },
                { val: `${s.attendance}%`, label: "Attend.", color: s.attendance >= 85 ? "text-accent" : "text-destructive" },
              ].map((d, i) => (
                <div key={i} className="p-2 rounded-lg bg-muted/50">
                  <div className={cn("font-bold text-sm", d.color)}>{d.val}</div>
                  <div className="text-[10px] text-muted-foreground">{d.label}</div>
                </div>
              ))}
            </div>
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: `${s.progress}%` }} />
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
