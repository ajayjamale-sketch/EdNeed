import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Users, Search, TrendingUp, Target, Calendar, MessageSquare, Plus, FileText, Clock, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
  const [data, setData] = useState(students);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [viewStudent, setViewStudent] = useState<any>(null);
  const [scheduleStudent, setScheduleStudent] = useState<any>(null);
  const [messageStudent, setMessageStudent] = useState<any>(null);
  
  const [showAssign, setShowAssign] = useState(false);
  const [assignForm, setAssignForm] = useState({ name: "", class: "", target: "" });

  const handleAssign = () => {
    if (!assignForm.name || !assignForm.class || !assignForm.target) {
      toast.error("Please fill all fields");
      return;
    }
    const newStudent = {
      id: Date.now(),
      name: assignForm.name,
      class: assignForm.class,
      target: assignForm.target,
      assessment: "Pending Assessment",
      nextSession: "Not scheduled",
      status: "needs-attention",
      initials: assignForm.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase() || "ST",
      color: "bg-blue-500",
      progress: 0
    };
    setData([newStudent, ...data]);
    setShowAssign(false);
    setAssignForm({ name: "", class: "", target: "" });
    toast.success("Student successfully assigned to your roster!");
  };

  const filtered = data.filter((s) => {
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
        <button onClick={() => setShowAssign(true)} className="flex items-center gap-2 px-4 py-2.5 gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 whitespace-nowrap">
          <Plus className="w-4 h-4" /> Assign Student
        </button>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((s) => {
          const cfg = statusConfig[s.status];
          return (
            <div key={s.id} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/30 card-hover cursor-pointer" onClick={() => setViewStudent(s)}>
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
                <button onClick={(e) => { e.stopPropagation(); setScheduleStudent(s); }} className="flex-1 py-2 gradient-primary text-white rounded-lg text-xs font-semibold hover:opacity-90 flex items-center justify-center gap-1">
                  <Calendar className="w-3 h-3" /> Session: {s.nextSession}
                </button>
                <button onClick={(e) => { e.stopPropagation(); setMessageStudent(s); }} className="w-8 h-8 border border-border rounded-lg flex items-center justify-center hover:bg-muted transition-colors flex-shrink-0">
                  <MessageSquare className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- View Student Profile Modal --- */}
      <Dialog open={!!viewStudent} onOpenChange={(open) => !open && setViewStudent(null)}>
        <DialogContent className="sm:max-w-[500px] bg-background">
          <DialogHeader>
            <DialogTitle>Counseling Profile</DialogTitle>
          </DialogHeader>
          {viewStudent && (
            <div className="py-2">
              <div className="flex items-center gap-4 mb-5 p-4 rounded-xl border border-border bg-muted/30">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0", viewStudent.color)}>{viewStudent.initials}</div>
                <div>
                  <h3 className="font-bold text-lg">{viewStudent.name}</h3>
                  <div className="text-sm text-muted-foreground">{viewStudent.class}</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-card border border-border rounded-xl p-3">
                    <div className="text-xs text-muted-foreground mb-1">Target Career</div>
                    <div className="font-semibold text-sm">{viewStudent.target}</div>
                  </div>
                  <div className="bg-card border border-border rounded-xl p-3">
                    <div className="text-xs text-muted-foreground mb-1">Preparation Progress</div>
                    <div className="font-semibold text-sm text-primary">{viewStudent.progress}% Complete</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-2">Recent Assessments</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border border-border rounded-xl text-sm">
                      <div className="flex items-center gap-2"><FileText className="w-4 h-4 text-muted-foreground" /> {viewStudent.assessment}</div>
                      <span className="text-green-600 font-semibold text-xs bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-md">Score: 88%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-2">Upcoming Schedule</h4>
                  <div className="flex items-center justify-between p-3 border border-primary/20 bg-primary/5 rounded-xl text-sm">
                    <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> 1-on-1 Mentorship Session</div>
                    <span className="text-primary font-semibold text-xs">{viewStudent.nextSession}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewStudent(null)}>Close</Button>
            {viewStudent && (
              <Button onClick={() => { setScheduleStudent(viewStudent); setViewStudent(null); }} className="gap-2">
                <Calendar className="w-4 h-4" /> Schedule Session
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- Schedule Session Modal --- */}
      <Dialog open={!!scheduleStudent} onOpenChange={(open) => !open && setScheduleStudent(null)}>
        <DialogContent className="sm:max-w-[400px] bg-background">
          <DialogHeader>
            <DialogTitle>Schedule Counseling Session</DialogTitle>
          </DialogHeader>
          {scheduleStudent && (
            <div className="py-2 space-y-4">
              <p className="text-sm text-muted-foreground">Book a new 1-on-1 session with <strong className="text-foreground">{scheduleStudent.name}</strong>.</p>
              <div>
                <label className="block text-xs font-medium mb-1.5">Date</label>
                <input type="date" className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5">Time</label>
                <input type="time" className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5">Agenda / Notes</label>
                <input type="text" placeholder="e.g. Reviewing mock test scores" className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setScheduleStudent(null)}>Cancel</Button>
            <Button onClick={() => { toast.success(`Session scheduled with ${scheduleStudent?.name}`); setScheduleStudent(null); }}>Book Session</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- Message Student Modal --- */}
      <Dialog open={!!messageStudent} onOpenChange={(open) => !open && setMessageStudent(null)}>
        <DialogContent className="sm:max-w-[400px] bg-background">
          <DialogHeader>
            <DialogTitle>Message Student</DialogTitle>
          </DialogHeader>
          {messageStudent && (
            <div className="py-2">
              <p className="text-sm text-muted-foreground mb-4">Send a direct message to <strong className="text-foreground">{messageStudent.name}</strong>.</p>
              <textarea 
                className="w-full h-32 px-3 py-3 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" 
                placeholder="Type your message here..."
                defaultValue={`Hi ${messageStudent.name.split(' ')[0]},\n\nPlease make sure to complete your remaining assessments before our next session on ${messageStudent.nextSession}.`}
              />
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setMessageStudent(null)}>Cancel</Button>
            <Button onClick={() => { toast.success(`Message sent to ${messageStudent.name}`); setMessageStudent(null); }} className="gap-2">
              <Send className="w-4 h-4" /> Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* --- Assign Student Modal --- */}
      <Dialog open={showAssign} onOpenChange={setShowAssign}>
        <DialogContent className="sm:max-w-[400px] bg-background">
          <DialogHeader>
            <DialogTitle>Assign New Student</DialogTitle>
          </DialogHeader>
          <div className="py-2 space-y-4">
            <p className="text-sm text-muted-foreground">Add a new student to your counseling roster.</p>
            <div>
              <label className="block text-xs font-medium mb-1.5">Student Name *</label>
              <input value={assignForm.name} onChange={(e) => setAssignForm({...assignForm, name: e.target.value})} placeholder="e.g. Rohan Sharma" className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5">Class / Grade *</label>
              <input value={assignForm.class} onChange={(e) => setAssignForm({...assignForm, class: e.target.value})} placeholder="e.g. 11 Science" className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5">Target Career / Goal *</label>
              <input value={assignForm.target} onChange={(e) => setAssignForm({...assignForm, target: e.target.value})} placeholder="e.g. Architecture" className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAssign(false)}>Cancel</Button>
            <Button onClick={handleAssign}>Assign Student</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
