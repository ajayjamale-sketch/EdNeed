import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Calendar, Plus, Clock, Video, FileText, CheckSquare, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const schedule = [
  { id: 1, day: "Monday", date: "Jun 2", time: "10:00 AM", title: "Live Class — Calculus: Chain Rule", type: "live", students: 45, duration: "90 min" },
  { id: 2, day: "Monday", date: "Jun 2", time: "4:00 PM", title: "Doubt Session — Integration", type: "doubt", students: 12, duration: "60 min" },
  { id: 3, day: "Tuesday", date: "Jun 3", time: "11:00 AM", title: "Live Class — Physics: Kinematics", type: "live", students: 38, duration: "90 min" },
  { id: 4, day: "Wednesday", date: "Jun 4", time: "9:00 AM", title: "Assignment Deadline — Differentiation Problems", type: "deadline", students: 120, duration: "" },
  { id: 5, day: "Thursday", date: "Jun 5", time: "3:00 PM", title: "Live Class — Differential Equations Intro", type: "live", students: 22, duration: "75 min" },
  { id: 6, day: "Friday", date: "Jun 6", time: "5:00 PM", title: "Mock Test Review Session", type: "doubt", students: 30, duration: "60 min" },
];

const typeConfig: Record<string, { color: string; icon: React.ElementType; label: string }> = {
  live: { color: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300", icon: Video, label: "Live Class" },
  doubt: { color: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300", icon: Clock, label: "Doubt Session" },
  deadline: { color: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300", icon: CheckSquare, label: "Deadline" },
};

export default function TeacherSchedule() {
  const [events, setEvents] = useState(schedule);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", type: "live", day: "Monday", time: "10:00 AM", duration: "90 min", students: 30 });

  const addEvent = () => {
    if (!form.title.trim()) { toast.error("Enter event title"); return; }
    setEvents((prev) => [...prev, { id: Date.now(), ...form, date: "Jun 7" }]);
    setShowForm(false);
    toast.success("Class scheduled successfully!");
  };

  const deleteEvent = (id: number) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    toast.success("Event removed");
  };

  const grouped = events.reduce((acc, ev) => {
    if (!acc[ev.day]) acc[ev.day] = [];
    acc[ev.day].push(ev);
    return acc;
  }, {} as Record<string, typeof events>);

  return (
    <DashboardLayout title="Teaching Schedule" subtitle="Plan and manage your live classes, doubt sessions, and deadlines">
      <div className="flex justify-between items-center mb-5">
        <p className="text-sm text-muted-foreground">{events.length} events this week</p>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90">
          <Plus className="w-4 h-4" /> Schedule Class
        </button>
      </div>

      {showForm && (
        <div className="bg-card border border-primary/30 rounded-2xl p-5 mb-5">
          <h3 className="font-semibold mb-4">New Schedule Entry</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-xs font-medium mb-1.5">Title</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Live Class — Integration" className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5">Type</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option value="live">Live Class</option>
                <option value="doubt">Doubt Session</option>
                <option value="deadline">Deadline</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5">Day</label>
              <select value={form.day} onChange={(e) => setForm({ ...form, day: e.target.value })} className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5">Time</label>
              <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={addEvent} className="px-5 py-2 gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90">Schedule</button>
            <button onClick={() => setShowForm(false)} className="px-5 py-2 border border-border rounded-xl text-sm font-semibold hover:bg-muted transition-colors">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-5">
        {Object.entries(grouped).map(([day, dayEvents]) => (
          <div key={day}>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">{day}</h3>
            <div className="space-y-2">
              {dayEvents.map((ev) => {
                const cfg = typeConfig[ev.type];
                return (
                  <div key={ev.id} className="flex items-center gap-4 bg-card border border-border rounded-2xl p-4 hover:border-primary/30 transition-colors group">
                    <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0", cfg.color)}>
                      <cfg.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm">{ev.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{ev.time} {ev.duration && `· ${ev.duration}`} · {ev.students} students</div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => toast.success(`Starting: ${ev.title}`)} className="px-3 py-1.5 gradient-primary text-white rounded-lg text-xs font-semibold hover:opacity-90">
                        {ev.type === "deadline" ? "View" : "Start"}
                      </button>
                      <button onClick={() => deleteEvent(ev.id)} className="w-7 h-7 rounded-lg border border-border flex items-center justify-center hover:bg-destructive/10 hover:border-destructive/30 transition-colors">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
