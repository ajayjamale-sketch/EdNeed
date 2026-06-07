import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Search, CheckCircle, AlertCircle, ToggleRight, ToggleLeft, Eye, Trash2, Star, Users, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const courses = [
  { id: 1, title: "Complete JEE Physics", instructor: "Dr. Vivek Agarwal", category: "JEE Prep", students: 18500, rating: 4.9, revenue: 554850, status: "published" },
  { id: 2, title: "NEET Biology Mastery", instructor: "Dr. Priya Reddy", category: "NEET Prep", students: 22000, rating: 4.8, revenue: 549780, status: "published" },
  { id: 3, title: "UPSC Polity & Governance", instructor: "Ms. Ananya Singh", category: "UPSC", students: 31000, rating: 4.9, revenue: 1083690, status: "published" },
  { id: 4, title: "Unverified JEE Course 2025", instructor: "Mr. Unknown", category: "JEE Prep", students: 0, rating: 0, revenue: 0, status: "pending" },
  { id: 5, title: "Python Full Stack — Outdated", instructor: "Mr. Kiran Tech", category: "Coding", students: 1200, rating: 3.1, revenue: 47880, status: "flagged" },
];

const statusCfg: Record<string, { label: string; color: string }> = {
  published: { label: "Published", color: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300" },
  pending: { label: "Pending Review", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300" },
  flagged: { label: "Flagged", color: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300" },
  unpublished: { label: "Unpublished", color: "bg-muted text-muted-foreground" },
};

export default function AdminCourses() {
  const [data, setData] = useState(courses);
  const [search, setSearch] = useState("");
  const [viewCourse, setViewCourse] = useState<any>(null);

  const filtered = data.filter((c) => c.title.toLowerCase().includes(search.toLowerCase()) || c.instructor.toLowerCase().includes(search.toLowerCase()));

  const approve = (id: number) => {
    setData((prev) => prev.map((c) => c.id === id ? { ...c, status: "published" } : c));
    toast.success("Course approved and published!");
  };

  const toggle = (id: number, curr: string) => {
    const s = curr === "published" ? "unpublished" : "published";
    setData((prev) => prev.map((c) => c.id === id ? { ...c, status: s } : c));
    toast.success(`Course ${s}!`);
  };

  const remove = (id: number) => {
    setData((prev) => prev.filter((c) => c.id !== id));
    toast.success("Course removed");
  };

  return (
    <DashboardLayout title="Course Management" subtitle="Review, approve, and manage all courses on the platform">
      <div className="grid grid-cols-3 gap-4 mb-5">
        {[
          { label: "Total Courses", val: data.length, color: "text-primary" },
          { label: "Pending Approval", val: data.filter((c) => c.status === "pending").length, color: "text-yellow-500" },
          { label: "Flagged", val: data.filter((c) => c.status === "flagged").length, color: "text-destructive" },
        ].map((s, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-4 text-center">
            <div className={cn("text-3xl font-bold mb-1", s.color)}>{s.val}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="relative max-w-sm mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search courses..." className="w-full pl-9 pr-4 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
      </div>

      <div className="space-y-3">
        {filtered.map((c) => {
          const cfg = statusCfg[c.status];
          return (
            <div key={c.id} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/20 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-white flex-shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-semibold text-sm">{c.title}</h3>
                      <span className="text-xs bg-muted px-2 py-0.5 rounded-full">{c.category}</span>
                      <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full", cfg.color)}>{cfg.label}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">by {c.instructor}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" />{c.students.toLocaleString()} students</span>
                      {c.rating > 0 && <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />{c.rating}</span>}
                      {c.revenue > 0 && <span className="font-semibold text-accent">₹{c.revenue.toLocaleString()}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {c.status === "pending" && (
                    <button onClick={() => approve(c.id)} className="px-3 py-1.5 gradient-primary text-white rounded-lg text-xs font-semibold hover:opacity-90 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Approve
                    </button>
                  )}
                  {(c.status === "published" || c.status === "unpublished") && (
                    <button onClick={() => toggle(c.id, c.status)} className="w-8 h-8 border border-border rounded-lg flex items-center justify-center hover:bg-muted transition-colors" title="Toggle publish">
                      {c.status === "published" ? <ToggleRight className="w-4 h-4 text-accent" /> : <ToggleLeft className="w-4 h-4 text-muted-foreground" />}
                    </button>
                  )}
                  <button onClick={() => setViewCourse(c)} className="w-8 h-8 border border-border rounded-lg flex items-center justify-center hover:bg-muted transition-colors"><Eye className="w-3.5 h-3.5" /></button>
                  <button onClick={() => remove(c.id)} className="w-8 h-8 border border-border rounded-lg flex items-center justify-center hover:bg-destructive/10 hover:text-destructive transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- View Course Details Modal --- */}
      <Dialog open={!!viewCourse} onOpenChange={(open) => !open && setViewCourse(null)}>
        <DialogContent className="sm:max-w-[450px] bg-background">
          <DialogHeader>
            <DialogTitle>Course Details</DialogTitle>
          </DialogHeader>
          {viewCourse && (
            <div className="py-4 space-y-5">
              <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-xl border border-border">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white flex-shrink-0">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{viewCourse.title}</h3>
                  <div className="text-sm text-muted-foreground">Instructor: {viewCourse.instructor}</div>
                  <div className="mt-2 flex gap-2">
                    <span className="text-xs bg-muted border border-border px-2 py-0.5 rounded-full">{viewCourse.category}</span>
                    <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full", statusCfg[viewCourse.status]?.color)}>
                      {statusCfg[viewCourse.status]?.label}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-border bg-card text-center">
                  <div className="text-2xl font-bold text-primary">{viewCourse.students.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1"><Users className="w-3.5 h-3.5" /> Enrolled Students</div>
                </div>
                <div className="p-4 rounded-xl border border-border bg-card text-center">
                  <div className="text-2xl font-bold text-accent">₹{viewCourse.revenue.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground mt-1">Total Revenue</div>
                </div>
                <div className="p-4 rounded-xl border border-border bg-card text-center col-span-2">
                  <div className="text-2xl font-bold text-yellow-500 flex items-center justify-center gap-2">
                    {viewCourse.rating > 0 ? viewCourse.rating : "N/A"}
                    {viewCourse.rating > 0 && <Star className="w-5 h-5 fill-yellow-500" />}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Average Rating</div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setViewCourse(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
