import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Search, Filter, CheckSquare, X, Star, MessageSquare, Download, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const candidates = [
  { id: 1, name: "Rahul Sharma", role: "Software Engineering Intern", skills: ["Python", "React", "ML", "Git"], cgpa: 9.1, college: "IIT Delhi", year: "3rd Year B.Tech", status: "shortlisted", initials: "RS", color: "bg-blue-500" },
  { id: 2, name: "Priya Mehta", role: "Data Science Associate", skills: ["Python", "SQL", "Statistics", "Tableau"], cgpa: 8.7, college: "NIT Trichy", year: "Final Year", status: "interviewed", initials: "PM", color: "bg-purple-500" },
  { id: 3, name: "Arjun Nair", role: "Software Engineering Intern", skills: ["Java", "Spring Boot", "AWS", "Docker"], cgpa: 8.9, college: "BITS Pilani", year: "3rd Year B.Tech", status: "offered", initials: "AN", color: "bg-green-500" },
  { id: 4, name: "Sneha Roy", role: "UI/UX Design Intern", skills: ["Figma", "Adobe XD", "Sketch", "Prototyping"], cgpa: 8.2, college: "NID Delhi", year: "2nd Year MDesign", status: "applied", initials: "SR", color: "bg-orange-500" },
  { id: 5, name: "Vikram Singh", role: "Product Management Trainee", skills: ["Product Strategy", "Analytics", "Agile", "SQL"], cgpa: 8.5, college: "IIM Ahmedabad", year: "MBA 1st Year", status: "shortlisted", initials: "VS", color: "bg-red-500" },
  { id: 6, name: "Ananya Pillai", role: "Software Engineering Intern", skills: ["JavaScript", "Node.js", "MongoDB", "React"], cgpa: 8.8, college: "BITS Hyderabad", year: "3rd Year B.Tech", status: "applied", initials: "AP", color: "bg-teal-500" },
];

const statusColors: Record<string, string> = {
  applied: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  shortlisted: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
  interviewed: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  offered: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  rejected: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
};

export default function RecruiterCandidates() {
  const [data, setData] = useState(candidates);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = data.filter((c) => {
    const m = c.name.toLowerCase().includes(search.toLowerCase()) || c.skills.some((s) => s.toLowerCase().includes(search.toLowerCase())) || c.college.toLowerCase().includes(search.toLowerCase());
    const f = statusFilter === "all" || c.status === statusFilter;
    return m && f;
  });

  const updateStatus = (id: number, newStatus: string) => {
    setData((prev) => prev.map((c) => c.id === id ? { ...c, status: newStatus } : c));
    toast.success(`Status updated to: ${newStatus}`);
  };

  return (
    <DashboardLayout title="Candidate Pool" subtitle="Review, shortlist, and manage applicants for your opportunities">
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name, skills, college..." className="w-full pl-9 pr-4 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none">
          <option value="all">All Candidates</option>
          <option value="applied">Applied</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="interviewed">Interviewed</option>
          <option value="offered">Offered</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="space-y-3">
        {filtered.map((c) => (
          <div key={c.id} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/20 transition-colors">
            <div className="flex items-start gap-4">
              <div className={cn("w-11 h-11 rounded-2xl flex items-center justify-center text-white font-bold flex-shrink-0", c.color)}>{c.initials}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <div className="font-semibold">{c.name}</div>
                    <div className="text-xs text-muted-foreground">{c.college} · {c.year}</div>
                    <div className="text-xs text-primary font-medium mt-0.5">{c.role}</div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-sm font-bold text-accent">CGPA: {c.cgpa}</span>
                    <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full capitalize", statusColors[c.status])}>{c.status}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-2 mb-3">
                  {c.skills.map((s) => <span key={s} className="text-xs bg-muted px-2.5 py-0.5 rounded-full">{s}</span>)}
                </div>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => toast.success(`Opening ${c.name}'s full profile...`)} className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-xs font-semibold hover:bg-muted transition-colors">
                    <Eye className="w-3 h-3" /> View Profile
                  </button>
                  {c.status === "applied" && (
                    <button onClick={() => updateStatus(c.id, "shortlisted")} className="flex items-center gap-1.5 px-3 py-1.5 gradient-primary text-white rounded-lg text-xs font-semibold hover:opacity-90">
                      <CheckSquare className="w-3 h-3" /> Shortlist
                    </button>
                  )}
                  {c.status === "shortlisted" && (
                    <button onClick={() => updateStatus(c.id, "interviewed")} className="flex items-center gap-1.5 px-3 py-1.5 gradient-primary text-white rounded-lg text-xs font-semibold hover:opacity-90">
                      Schedule Interview
                    </button>
                  )}
                  {c.status === "interviewed" && (
                    <button onClick={() => updateStatus(c.id, "offered")} className="flex items-center gap-1.5 px-3 py-1.5 bg-accent text-white rounded-lg text-xs font-semibold hover:opacity-90">
                      Send Offer
                    </button>
                  )}
                  <button onClick={() => toast.success(`Message sent to ${c.name}!`)} className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-xs font-semibold hover:bg-muted transition-colors">
                    <MessageSquare className="w-3 h-3" /> Message
                  </button>
                  {c.status !== "rejected" && c.status !== "offered" && (
                    <button onClick={() => updateStatus(c.id, "rejected")} className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-xs font-semibold hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors">
                      <X className="w-3 h-3" /> Reject
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
