import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Calendar, Clock, Video, BookOpen, Target, Plus, CheckCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const timeSlots = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM"];

const initialEvents = [
  { id: 1, title: "JEE Calculus — Live Class", subject: "Mathematics", time: "4:00 PM", day: "Mon", type: "Live Class", color: "blue", duration: "90 min", instructor: "Prof. Ramesh Kumar" },
  { id: 2, title: "Physics Mock Test #8", subject: "Physics", time: "10:00 AM", day: "Tue", type: "Test", color: "red", duration: "60 min", instructor: "Self" },
  { id: 3, title: "Organic Chemistry Session", subject: "Chemistry", time: "2:00 PM", day: "Wed", type: "1-on-1 Session", color: "purple", duration: "60 min", instructor: "Dr. Sanjay Mehta" },
  { id: 4, title: "Biology Doubt Clearing", subject: "Biology", time: "6:00 PM", day: "Thu", type: "Group Class", color: "green", duration: "45 min", instructor: "Dr. Priya Reddy" },
  { id: 5, title: "Full Mock Test — JEE Main", subject: "PCM", time: "9:00 AM", day: "Sat", type: "Test", color: "orange", duration: "180 min", instructor: "Self" },
  { id: 6, title: "Career Counseling Session", subject: "Career", time: "3:00 PM", day: "Sun", type: "Counseling", color: "teal", duration: "60 min", instructor: "Ms. Ananya Singh" },
];

const typeConfig: Record<string, { className: string; icon: any }> = {
  "Live Class": { className: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300", icon: Video },
  "Test": { className: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300", icon: Target },
  "1-on-1 Session": { className: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300", icon: Calendar },
  "Group Class": { className: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300", icon: BookOpen },
  "Counseling": { className: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300", icon: Calendar },
};

const eventColorMap: Record<string, string> = {
  blue: "border-l-blue-500 bg-blue-50 dark:bg-blue-950/30",
  red: "border-l-red-500 bg-red-50 dark:bg-red-950/30",
  purple: "border-l-purple-500 bg-purple-50 dark:bg-purple-950/30",
  green: "border-l-green-500 bg-green-50 dark:bg-green-950/30",
  orange: "border-l-orange-500 bg-orange-50 dark:bg-orange-950/30",
  teal: "border-l-teal-500 bg-teal-50 dark:bg-teal-950/30",
};

export default function DashboardSchedule() {
  const [events, setEvents] = useState(initialEvents);
  const [showAdd, setShowAdd] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", subject: "", day: "Mon", time: "9:00 AM", type: "Live Class", duration: "60 min" });
  const [viewMode, setViewMode] = useState<"week" | "list">("week");

  const addEvent = () => {
    if (!newEvent.title || !newEvent.subject) { toast.error("Please fill all fields"); return; }
    const colors: Record<string, string> = { "Live Class": "blue", "Test": "red", "1-on-1 Session": "purple", "Group Class": "green", "Counseling": "orange" };
    setEvents((prev) => [...prev, { ...newEvent, id: Date.now(), instructor: "TBD", color: colors[newEvent.type] || "blue" }]);
    toast.success("Event added to schedule!");
    setShowAdd(false);
    setNewEvent({ title: "", subject: "", day: "Mon", time: "9:00 AM", type: "Live Class", duration: "60 min" });
  };

  const removeEvent = (id: number) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    toast.success("Event removed");
  };

  const todayEvents = events.filter((e) => e.day === "Mon").sort((a, b) => a.time.localeCompare(b.time));

  return (
    <DashboardLayout title="My Schedule" subtitle="Manage your classes, tests, and sessions">
      <div className="flex items-center justify-between mb-5">
        <div className="flex gap-2">
          {(["week", "list"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={cn("px-4 py-2 rounded-xl text-sm font-medium transition-all border capitalize", viewMode === mode ? "gradient-primary text-white border-transparent" : "bg-muted border-transparent text-muted-foreground hover:text-foreground")}
            >
              {mode} View
            </button>
          ))}
        </div>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-2 px-4 py-2 gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Add Event
        </button>
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-lg">Add Schedule Event</h3>
              <button onClick={() => setShowAdd(false)} className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Event Title</label>
                <input value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} placeholder="e.g., Physics Live Class" className="w-full px-4 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Subject</label>
                <input value={newEvent.subject} onChange={(e) => setNewEvent({ ...newEvent, subject: e.target.value })} placeholder="e.g., Physics" className="w-full px-4 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Day</label>
                  <select value={newEvent.day} onChange={(e) => setNewEvent({ ...newEvent, day: e.target.value })} className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30">
                    {days.map((d) => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Time</label>
                  <select value={newEvent.time} onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })} className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30">
                    {timeSlots.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Type</label>
                  <select value={newEvent.type} onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })} className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30">
                    {Object.keys(typeConfig).map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Duration</label>
                  <select value={newEvent.duration} onChange={(e) => setNewEvent({ ...newEvent, duration: e.target.value })} className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30">
                    {["30 min", "45 min", "60 min", "90 min", "120 min", "180 min"].map((d) => <option key={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              <button onClick={addEvent} className="w-full py-3 gradient-primary text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity">
                Add to Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {viewMode === "week" ? (
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="grid grid-cols-7 border-b border-border">
            {days.map((day) => (
              <div key={day} className={cn("p-3 text-center text-sm font-semibold border-r border-border last:border-0", day === "Mon" && "bg-primary/5 text-primary")}>
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {days.map((day) => {
              const dayEvents = events.filter((e) => e.day === day).sort((a, b) => a.time.localeCompare(b.time));
              return (
                <div key={day} className={cn("min-h-40 p-2 border-r border-border last:border-0 space-y-1.5", day === "Mon" && "bg-primary/[0.02]")}>
                  {dayEvents.map((ev) => (
                    <div key={ev.id} className={cn("p-2 rounded-lg border-l-2 text-xs relative group cursor-pointer", eventColorMap[ev.color])}>
                      <div className="font-semibold text-foreground leading-tight">{ev.title}</div>
                      <div className="text-muted-foreground mt-0.5">{ev.time} · {ev.duration}</div>
                      <button
                        onClick={() => removeEvent(ev.id)}
                        className="absolute top-1 right-1 w-4 h-4 rounded-full bg-destructive/10 text-destructive flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  ))}
                  {dayEvents.length === 0 && (
                    <div className="text-xs text-muted-foreground/50 text-center py-4">No events</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {days.map((day) => {
            const dayEvents = events.filter((e) => e.day === day);
            if (dayEvents.length === 0) return null;
            return (
              <div key={day}>
                <h3 className="font-semibold text-sm text-muted-foreground mb-2 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" /> {day}
                </h3>
                <div className="space-y-2">
                  {dayEvents.map((ev) => {
                    const TypeIcon = typeConfig[ev.type]?.icon || Calendar;
                    return (
                      <div key={ev.id} className="bg-card border border-border rounded-xl p-4 flex items-center gap-4 hover:border-primary/30 transition-colors group">
                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", typeConfig[ev.type]?.className)}>
                          <TypeIcon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="font-semibold text-sm">{ev.title}</span>
                            <span className={cn("text-xs px-2 py-0.5 rounded-full", typeConfig[ev.type]?.className)}>{ev.type}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">{ev.subject} · {ev.instructor}</div>
                        </div>
                        <div className="text-right text-sm flex-shrink-0">
                          <div className="font-semibold">{ev.time}</div>
                          <div className="text-xs text-muted-foreground">{ev.duration}</div>
                        </div>
                        <button onClick={() => removeEvent(ev.id)} className="w-7 h-7 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-destructive hover:border-destructive transition-colors opacity-0 group-hover:opacity-100">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
}
