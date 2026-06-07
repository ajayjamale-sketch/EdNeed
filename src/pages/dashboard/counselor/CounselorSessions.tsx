import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Calendar, Clock, Plus, Video, Check, X, ChevronDown, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const sessions = [
  { id: 1, student: "Rahul Mehta", type: "Career Assessment Review", date: "Jun 5, 2025", time: "4:00 PM", duration: "45 min", mode: "Video", status: "upcoming", notes: "Discuss IIT vs NIT options" },
  { id: 2, student: "Siddharth Rao", type: "UPSC Strategy Session", date: "Jun 6, 2025", time: "11:00 AM", duration: "60 min", mode: "Video", status: "upcoming", notes: "Book list and timetable planning" },
  { id: 3, student: "Ananya Reddy", type: "NEET Guidance", date: "Jun 7, 2025", time: "2:00 PM", duration: "45 min", mode: "Chat", status: "upcoming", notes: "NEET coaching institute selection" },
  { id: 4, student: "Kavya Nair", type: "MBA Roadmap Planning", date: "Jun 9, 2025", time: "3:00 PM", duration: "60 min", mode: "Video", status: "upcoming", notes: "CAT preparation kickoff" },
  { id: 5, student: "Arjun Iyer", type: "JEE College Selection", date: "Jun 3, 2025", time: "5:00 PM", duration: "45 min", mode: "Video", status: "completed", notes: "Discussed branch preferences" },
  { id: 6, student: "Deepa Verma", type: "Design Career Intro", date: "Jun 2, 2025", time: "3:30 PM", duration: "30 min", mode: "Video", status: "completed", notes: "NATA exam overview provided" },
];

export default function CounselorSessions() {
  const [data, setData] = useState(sessions);
  const [filter, setFilter] = useState("upcoming");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ student: "Rahul Mehta", type: "Career Assessment", date: "", time: "10:00", mode: "Video", notes: "" });
  const [rescheduleSession, setRescheduleSession] = useState<any>(null);

  const filtered = data.filter((s) => filter === "all" || s.status === filter);

  const book = () => {
    if (!form.date) { toast.error("Select a date"); return; }
    
    const newSession = {
      id: Date.now(),
      student: form.student,
      type: form.type,
      date: form.date,
      time: form.time,
      duration: "45 min",
      mode: form.mode,
      status: "upcoming",
      notes: "Scheduled via Dashboard"
    };

    setData([newSession, ...data]);
    toast.success(`Session booked with ${form.student}!`);
    setShowForm(false);
  };

  const completeSession = (id: number) => {
    setData(data.map(s => s.id === id ? { ...s, status: "completed" } : s));
    toast.success("Session completed and logged!");
  };

  return (
    <DashboardLayout title="Counseling Sessions" subtitle="Schedule and manage one-on-one career guidance sessions">
      <div className="flex flex-col sm:flex-row gap-3 mb-5 justify-between">
        <div className="flex gap-2">
          {(["upcoming", "completed", "all"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={cn("px-4 py-2 rounded-xl text-sm font-semibold border capitalize transition-all", filter === f ? "gradient-primary text-white border-transparent" : "bg-muted border-transparent text-muted-foreground hover:text-foreground")}>
              {f}
            </button>
          ))}
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90">
          <Plus className="w-4 h-4" /> Book Session
        </button>
      </div>

      {showForm && (
        <div className="bg-card border border-primary/30 rounded-2xl p-5 mb-5">
          <h3 className="font-semibold mb-4">New Counseling Session</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-xs font-medium mb-1.5">Student</label>
              <select value={form.student} onChange={(e) => setForm({ ...form, student: e.target.value })} className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30">
                {["Rahul Mehta", "Ananya Reddy", "Siddharth Rao", "Kavya Nair", "Arjun Iyer", "Deepa Verma"].map((n) => <option key={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5">Session Type</label>
              <input value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5">Date</label>
              <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5">Time</label>
              <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={book} className="px-5 py-2 gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90">Book Session</button>
            <button onClick={() => setShowForm(false)} className="px-5 py-2 border border-border rounded-xl text-sm font-semibold hover:bg-muted transition-colors">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {filtered.map((s) => (
          <div key={s.id} className={cn("bg-card border rounded-2xl p-5 hover:border-primary/20 transition-colors", s.status === "completed" ? "border-border opacity-80" : "border-border")}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", s.status === "completed" ? "bg-accent/10" : "gradient-primary")}>
                  <Video className={cn("w-4 h-4", s.status === "completed" ? "text-accent" : "text-white")} />
                </div>
                <div>
                  <div className="font-semibold text-sm">{s.student}</div>
                  <div className="text-xs text-primary font-medium">{s.type}</div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{s.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{s.time} · {s.duration}</span>
                    <span className="bg-muted px-1.5 py-0.5 rounded">{s.mode}</span>
                  </div>
                  {s.notes && <p className="text-xs text-muted-foreground mt-1.5 italic">"{s.notes}"</p>}
                </div>
              </div>
              {s.status === "upcoming" ? (
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => completeSession(s.id)} className="px-3 py-1.5 gradient-primary text-white rounded-lg text-xs font-semibold hover:opacity-90 flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5"/> Complete</button>
                  <button onClick={() => setRescheduleSession(s)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors"><Clock className="w-3.5 h-3.5" /></button>
                </div>
              ) : (
                <span className="text-xs font-semibold text-accent flex items-center gap-1 flex-shrink-0">
                  <Check className="w-3.5 h-3.5" /> Completed
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* --- Reschedule Session Modal --- */}
      <Dialog open={!!rescheduleSession} onOpenChange={(open) => !open && setRescheduleSession(null)}>
        <DialogContent className="sm:max-w-[400px] bg-background">
          <DialogHeader>
            <DialogTitle>Reschedule Session</DialogTitle>
          </DialogHeader>
          {rescheduleSession && (
            <div className="py-2 space-y-4">
              <p className="text-sm text-muted-foreground">Pick a new date and time for your session with <strong className="text-foreground">{rescheduleSession.student}</strong>.</p>
              <div>
                <label className="block text-xs font-medium mb-1.5">New Date</label>
                <input type="date" defaultValue={rescheduleSession.date} className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5">New Time</label>
                <input type="time" defaultValue={rescheduleSession.time} className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setRescheduleSession(null)}>Cancel</Button>
            <Button onClick={() => { 
              toast.success(`Session rescheduled successfully`); 
              setRescheduleSession(null); 
            }}>Update Schedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
