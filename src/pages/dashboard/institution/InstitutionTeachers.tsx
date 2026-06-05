import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Search, Plus, Eye, Edit, Trash2, Star, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const teachers = [
  { id: 1, name: "Dr. Aisha Patel", subject: "Physics", experience: "8 years", classes: ["10-A", "11-A", "12-B"], rating: 4.8, status: "active" },
  { id: 2, name: "Mr. Ravi Tiwari", subject: "Mathematics", experience: "12 years", classes: ["8-A", "9-A", "10-A", "10-B"], rating: 4.7, status: "active" },
  { id: 3, name: "Ms. Kavitha Nair", subject: "English", experience: "6 years", classes: ["8-B", "9-B", "11-A"], rating: 4.6, status: "active" },
  { id: 4, name: "Dr. Sanjay Mehta", subject: "Chemistry", experience: "15 years", classes: ["11-A", "11-B", "12-A", "12-B"], rating: 4.9, status: "active" },
  { id: 5, name: "Dr. Priya Sharma", subject: "Biology", experience: "10 years", classes: ["11-A", "12-A"], rating: 4.8, status: "on-leave" },
];

export default function InstitutionTeachers() {
  const [data, setData] = useState(teachers);
  const [search, setSearch] = useState("");

  const filtered = data.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()) || t.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout title="Teaching Staff" subtitle="Manage your school's faculty and teaching assignments">
      <div className="flex gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search teachers..." className="w-full pl-9 pr-4 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <button onClick={() => toast.success("Opening new teacher form...")} className="flex items-center gap-2 px-4 py-2.5 gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 whitespace-nowrap">
          <Plus className="w-4 h-4" /> Add Teacher
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((t) => (
          <div key={t.id} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/30 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl gradient-primary flex items-center justify-center text-white font-bold flex-shrink-0">{t.name.charAt(0)}</div>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-primary font-medium">{t.subject}</div>
                </div>
              </div>
              <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full", t.status === "active" ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300" : "bg-yellow-100 text-yellow-700")}>{t.status}</span>
            </div>
            <div className="text-xs text-muted-foreground mb-2">Experience: {t.experience}</div>
            <div className="flex items-center gap-1 mb-2 text-xs"><Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /><span className="font-semibold">{t.rating}</span><span className="text-muted-foreground">/5.0 rating</span></div>
            <div className="flex flex-wrap gap-1 mb-3">
              {t.classes.map((c) => <span key={c} className="text-xs bg-muted px-2 py-0.5 rounded-full">{c}</span>)}
            </div>
            <div className="flex gap-2">
              <button onClick={() => toast.success(`Viewing ${t.name}'s profile...`)} className="flex-1 py-2 border border-border rounded-lg text-xs font-semibold hover:bg-muted transition-colors"><Eye className="w-3 h-3 inline mr-1" />View</button>
              <button onClick={() => toast.success(`Editing ${t.name}...`)} className="w-8 h-8 border border-border rounded-lg flex items-center justify-center hover:bg-muted transition-colors"><Edit className="w-3.5 h-3.5" /></button>
              <button onClick={() => { setData((prev) => prev.filter((x) => x.id !== t.id)); toast.success("Teacher removed"); }} className="w-8 h-8 border border-border rounded-lg flex items-center justify-center hover:bg-destructive/10 hover:text-destructive transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
