import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Plus, CheckSquare, Clock, AlertCircle, Users, Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const initialAssignments = [
  { id: 1, title: "Integration by Parts — Problem Set", course: "Advanced Calculus for JEE", due: "Jun 10, 2025", submitted: 98, total: 120, graded: 72, status: "active" },
  { id: 2, title: "Kinematics Numerical Problems", course: "Physics Mechanics", due: "Jun 8, 2025", submitted: 105, total: 120, graded: 105, status: "closed" },
  { id: 3, title: "Organic Reactions Summary", course: "Chemistry", due: "Jun 15, 2025", submitted: 42, total: 80, graded: 0, status: "active" },
  { id: 4, title: "Differential Equations — Theory Assignment", course: "Differential Equations", due: "Jun 20, 2025", submitted: 15, total: 50, graded: 0, status: "active" },
];

export default function TeacherAssignments() {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", course: "Advanced Calculus for JEE", due: "" });

  const create = () => {
    if (!form.title || !form.due) { toast.error("Fill all fields"); return; }
    setAssignments((prev) => [...prev, { id: Date.now(), ...form, submitted: 0, total: 120, graded: 0, status: "active" }]);
    setForm({ title: "", course: "Advanced Calculus for JEE", due: "" });
    setShowForm(false);
    toast.success("Assignment published!");
  };

  const deleteAssignment = (id: number) => {
    setAssignments((prev) => prev.filter((a) => a.id !== id));
    toast.success("Assignment deleted");
  };

  return (
    <DashboardLayout title="Assignments" subtitle="Create and manage assignments for your students">
      <div className="grid grid-cols-3 gap-4 mb-5">
        {[
          { label: "Active", val: assignments.filter((a) => a.status === "active").length, color: "text-primary" },
          { label: "Pending Grading", val: assignments.reduce((acc, a) => acc + (a.submitted - a.graded), 0), color: "text-yellow-500" },
          { label: "Total Submissions", val: assignments.reduce((acc, a) => acc + a.submitted, 0), color: "text-accent" },
        ].map((s, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-4 text-center">
            <div className={cn("text-3xl font-bold mb-1", s.color)}>{s.val}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex justify-end mb-4">
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90">
          <Plus className="w-4 h-4" /> New Assignment
        </button>
      </div>

      {showForm && (
        <div className="bg-card border border-primary/30 rounded-2xl p-5 mb-5">
          <h3 className="font-semibold mb-4">New Assignment</h3>
          <div className="grid sm:grid-cols-3 gap-3 mb-4">
            <div className="sm:col-span-3">
              <label className="block text-xs font-medium mb-1.5">Assignment Title</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Chapter 5 Practice Problems" className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5">Course</label>
              <select value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30">
                {["Advanced Calculus for JEE", "Physics Mechanics", "Differential Equations"].map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5">Due Date</label>
              <input type="date" value={form.due} onChange={(e) => setForm({ ...form, due: e.target.value })} className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={create} className="px-5 py-2 gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90">Publish</button>
            <button onClick={() => setShowForm(false)} className="px-5 py-2 border border-border rounded-xl text-sm font-semibold hover:bg-muted transition-colors">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {assignments.map((a) => {
          const pending = a.submitted - a.graded;
          return (
            <div key={a.id} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/20 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-semibold text-sm">{a.title}</h3>
                    <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full", a.status === "active" ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300" : "bg-muted text-muted-foreground")}>{a.status}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{a.course} · Due: {a.due}</p>
                  <div className="flex flex-wrap gap-4 text-xs">
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" />{a.submitted}/{a.total} submitted</span>
                    <span className="flex items-center gap-1 text-accent"><CheckSquare className="w-3 h-3" />{a.graded} graded</span>
                    {pending > 0 && <span className="flex items-center gap-1 text-yellow-500"><Clock className="w-3 h-3" />{pending} pending grading</span>}
                  </div>
                  <div className="mt-2 w-48 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${(a.submitted / a.total) * 100}%` }} />
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  {a.submitted > a.graded && (
                    <button onClick={() => toast.success("Opening grading panel...")} className="px-3 py-1.5 gradient-primary text-white rounded-xl text-xs font-semibold hover:opacity-90">
                      Grade ({pending})
                    </button>
                  )}
                  <button onClick={() => toast.success("Editing assignment...")} className="w-7 h-7 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors"><Edit className="w-3.5 h-3.5" /></button>
                  <button onClick={() => deleteAssignment(a.id)} className="w-7 h-7 rounded-lg border border-border flex items-center justify-center hover:bg-destructive/10 hover:text-destructive transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
