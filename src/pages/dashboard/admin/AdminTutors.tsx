import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { UserCheck, Search, CheckCircle, XCircle, Eye, Star, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const tutors = [
  { id: 1, name: "Dr. Vivek Agarwal", email: "vivek@example.com", subject: "Physics (JEE)", experience: "12 years", rating: 4.9, courses: 3, students: 18500, status: "verified", docs: "complete" },
  { id: 2, name: "Dr. Priya Reddy", email: "priya@example.com", subject: "Biology (NEET)", experience: "8 years", rating: 4.8, courses: 2, students: 22000, status: "verified", docs: "complete" },
  { id: 3, name: "Mr. Rajesh Tutor", email: "rajesh@example.com", subject: "Mathematics", experience: "5 years", rating: 0, courses: 0, students: 0, status: "pending", docs: "incomplete" },
  { id: 4, name: "Ms. Preethi Sharma", email: "preethi@example.com", subject: "Chemistry", experience: "7 years", rating: 0, courses: 0, students: 0, status: "pending", docs: "complete" },
  { id: 5, name: "Mr. Kiran Tech", email: "kiran@example.com", subject: "Coding/CS", experience: "4 years", rating: 3.1, courses: 1, students: 1200, status: "flagged", docs: "complete" },
];

const statusCfg: Record<string, { color: string; label: string }> = {
  verified: { color: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300", label: "Verified" },
  pending: { color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300", label: "Pending" },
  flagged: { color: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300", label: "Flagged" },
  rejected: { color: "bg-muted text-muted-foreground", label: "Rejected" },
};

export default function AdminTutors() {
  const [data, setData] = useState(tutors);
  const [search, setSearch] = useState("");

  const filtered = data.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()) || t.subject.toLowerCase().includes(search.toLowerCase()));

  const verify = (id: number) => {
    setData((prev) => prev.map((t) => t.id === id ? { ...t, status: "verified" } : t));
    toast.success("Tutor verified and activated!");
  };

  const reject = (id: number) => {
    setData((prev) => prev.map((t) => t.id === id ? { ...t, status: "rejected" } : t));
    toast.success("Tutor application rejected");
  };

  return (
    <DashboardLayout title="Tutor Verification" subtitle="Review tutor applications and manage educator credentials">
      <div className="grid grid-cols-3 gap-4 mb-5">
        {[
          { label: "Verified Tutors", val: data.filter((t) => t.status === "verified").length, color: "text-accent" },
          { label: "Pending Review", val: data.filter((t) => t.status === "pending").length, color: "text-yellow-500" },
          { label: "Flagged", val: data.filter((t) => t.status === "flagged").length, color: "text-destructive" },
        ].map((s, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-4 text-center">
            <div className={cn("text-3xl font-bold mb-1", s.color)}>{s.val}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="relative max-w-sm mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search tutors..." className="w-full pl-9 pr-4 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
      </div>

      <div className="space-y-3">
        {filtered.map((t) => {
          const cfg = statusCfg[t.status];
          return (
            <div key={t.id} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/20 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="w-11 h-11 rounded-2xl gradient-primary flex items-center justify-center text-white font-bold flex-shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-semibold text-sm">{t.name}</h3>
                      <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full", cfg.color)}>{cfg.label}</span>
                      <span className={cn("text-xs px-2 py-0.5 rounded-full", t.docs === "complete" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700")}>
                        Docs: {t.docs}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{t.email}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <span>Subject: {t.subject}</span>
                      <span>Experience: {t.experience}</span>
                      {t.rating > 0 && <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />{t.rating}</span>}
                      {t.students > 0 && <span>{t.students.toLocaleString()} students</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => toast.success(`Reviewing ${t.name}'s documents...`)} className="w-8 h-8 border border-border rounded-lg flex items-center justify-center hover:bg-muted transition-colors"><Eye className="w-3.5 h-3.5" /></button>
                  {(t.status === "pending" || t.status === "flagged") && (
                    <>
                      <button onClick={() => verify(t.id)} className="flex items-center gap-1.5 px-3 py-1.5 bg-accent text-white rounded-lg text-xs font-semibold hover:opacity-90">
                        <CheckCircle className="w-3 h-3" /> Verify
                      </button>
                      <button onClick={() => reject(t.id)} className="flex items-center gap-1.5 px-3 py-1.5 bg-destructive/10 text-destructive rounded-lg text-xs font-semibold hover:bg-destructive hover:text-white transition-colors">
                        <XCircle className="w-3 h-3" /> Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
