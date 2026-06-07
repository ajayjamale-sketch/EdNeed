import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Search, MessageSquare, CheckSquare, Clock, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const applications = [
  { id: 1, candidate: "Rahul Sharma", role: "Software Engineering Intern", college: "IIT Delhi", cgpa: 9.1, applied: "Jun 1, 2025", status: "shortlisted", initials: "RS", color: "bg-blue-500" },
  { id: 2, candidate: "Priya Mehta", role: "Data Science Associate", college: "NIT Trichy", cgpa: 8.7, applied: "May 28, 2025", status: "interviewed", initials: "PM", color: "bg-purple-500" },
  { id: 3, candidate: "Arjun Nair", role: "Software Engineering Intern", college: "BITS Pilani", cgpa: 8.9, applied: "May 25, 2025", status: "offered", initials: "AN", color: "bg-green-500" },
  { id: 4, candidate: "Sneha Roy", role: "UI/UX Design Intern", college: "NID Delhi", cgpa: 8.2, applied: "Jun 2, 2025", status: "applied", initials: "SR", color: "bg-orange-500" },
  { id: 5, candidate: "Vikram Singh", role: "Product Management Trainee", college: "IIM Ahmedabad", cgpa: 8.5, applied: "Jun 3, 2025", status: "applied", initials: "VS", color: "bg-red-500" },
];

const statusColors: Record<string, string> = {
  applied: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  shortlisted: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
  interviewed: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  offered: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  rejected: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
};

export default function RecruiterApplications() {
  const [data, setData] = useState(applications);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [messageCandidate, setMessageCandidate] = useState<any>(null);

  const filtered = data.filter((a) => {
    const m = a.candidate.toLowerCase().includes(search.toLowerCase()) || a.role.toLowerCase().includes(search.toLowerCase());
    const f = statusFilter === "all" || a.status === statusFilter;
    return m && f;
  });

  const updateStatus = (id: number, s: string) => {
    setData((prev) => prev.map((a) => a.id === id ? { ...a, status: s } : a));
    toast.success(`Status updated to: ${s}`);
  };

  return (
    <DashboardLayout title="Applications" subtitle="Review and process all job applications">
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search applications..." className="w-full pl-9 pr-4 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none">
          <option value="all">All Status</option>
          <option value="applied">Applied</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="interviewed">Interviewed</option>
          <option value="offered">Offered</option>
        </select>
      </div>

      <div className="space-y-3">
        {filtered.map((a) => (
          <div key={a.id} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/20 transition-colors">
            <div className="flex items-center gap-4">
              <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0", a.color)}>{a.initials}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-sm">{a.candidate}</span>
                  <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full capitalize", statusColors[a.status])}>{a.status}</span>
                </div>
                <div className="text-xs text-muted-foreground">{a.role} · {a.college} · CGPA: {a.cgpa}</div>
                <div className="text-xs text-muted-foreground">Applied: {a.applied}</div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                {a.status === "applied" && <button onClick={() => updateStatus(a.id, "shortlisted")} className="px-3 py-1.5 gradient-primary text-white rounded-lg text-xs font-semibold hover:opacity-90"><CheckSquare className="w-3 h-3 inline mr-1" />Shortlist</button>}
                {a.status === "shortlisted" && <button onClick={() => updateStatus(a.id, "interviewed")} className="px-3 py-1.5 gradient-primary text-white rounded-lg text-xs font-semibold hover:opacity-90"><Clock className="w-3 h-3 inline mr-1" />Interview</button>}
                {a.status === "interviewed" && <button onClick={() => updateStatus(a.id, "offered")} className="px-3 py-1.5 bg-accent text-white rounded-lg text-xs font-semibold hover:opacity-90">Send Offer</button>}
                <button onClick={() => setMessageCandidate(a)} className="w-8 h-8 border border-border rounded-lg flex items-center justify-center hover:bg-muted transition-colors"><MessageSquare className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- Send Message Modal --- */}
      <Dialog open={!!messageCandidate} onOpenChange={(open) => !open && setMessageCandidate(null)}>
        <DialogContent className="sm:max-w-[400px] bg-background">
          <DialogHeader>
            <DialogTitle>Message Applicant</DialogTitle>
          </DialogHeader>
          {messageCandidate && (
            <div className="py-2">
              <p className="text-sm text-muted-foreground mb-4">Send a direct message to <strong className="text-foreground">{messageCandidate.candidate}</strong>. They will be notified via email and the platform.</p>
              <textarea 
                className="w-full h-32 px-3 py-3 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" 
                placeholder="Type your message here..."
                defaultValue={`Hi ${messageCandidate.candidate.split(' ')[0]},\n\nWe have reviewed your application for the ${messageCandidate.role} position...`}
              />
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setMessageCandidate(null)}>Cancel</Button>
            <Button onClick={() => { toast.success(`Message sent to ${messageCandidate.candidate}`); setMessageCandidate(null); }} className="gap-2">
              <Send className="w-4 h-4" /> Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
