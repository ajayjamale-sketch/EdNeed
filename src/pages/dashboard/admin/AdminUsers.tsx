import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Search, Users, UserCheck, Building, GraduationCap, Eye, Edit, Trash2, Ban, CheckCircle, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const users = [
  { id: 1, name: "Rahul Sharma", email: "rahul@example.com", role: "Student", joined: "Jan 15, 2025", status: "active", courses: 5, lastActive: "Today" },
  { id: 2, name: "Dr. Priya Reddy", email: "priya@example.com", role: "Teacher", joined: "Feb 2, 2025", status: "active", courses: 3, lastActive: "2h ago" },
  { id: 3, name: "Delhi Public School", email: "dps@example.com", role: "Institution", joined: "Mar 10, 2025", status: "active", courses: 0, lastActive: "1d ago" },
  { id: 4, name: "Ananya Singh", email: "ananya@example.com", role: "Parent", joined: "Apr 5, 2025", status: "active", courses: 0, lastActive: "3d ago" },
  { id: 5, name: "Mr. Kiran Tech", email: "kiran@example.com", role: "Teacher", joined: "Jan 8, 2025", status: "suspended", courses: 1, lastActive: "5d ago" },
  { id: 6, name: "TCS Recruiter", email: "tcs@example.com", role: "Recruiter", joined: "May 20, 2025", status: "pending", courses: 0, lastActive: "1d ago" },
];

const roleColors: Record<string, string> = {
  Student: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  Teacher: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  Institution: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400",
  Parent: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  Recruiter: "bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300",
  Admin: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
};

const statusColors: Record<string, string> = {
  active: "text-accent",
  suspended: "text-destructive",
  pending: "text-yellow-500",
};

export default function AdminUsers() {
  const [data, setData] = useState(users);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const filtered = data.filter((u) => {
    const m = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const f = roleFilter === "All" || u.role === roleFilter;
    return m && f;
  });

  const toggleStatus = (id: number) => {
    setData((prev) => prev.map((u) => {
      if (u.id === id) {
        const s = u.status === "active" ? "suspended" : "active";
        toast.success(`User ${s === "active" ? "activated" : "suspended"}`);
        return { ...u, status: s };
      }
      return u;
    }));
  };

  const approve = (id: number) => {
    setData((prev) => prev.map((u) => u.id === id ? { ...u, status: "active" } : u));
    toast.success("User approved and activated!");
  };

  const remove = (id: number) => {
    setData((prev) => prev.filter((u) => u.id !== id));
    toast.success("User removed from platform");
  };

  return (
    <DashboardLayout title="User Management" subtitle="Manage all platform users — students, teachers, institutions, and more">
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users..." className="w-full pl-9 pr-4 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="px-3 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none">
          {["All", "Student", "Teacher", "Institution", "Parent", "Recruiter"].map((r) => <option key={r}>{r}</option>)}
        </select>
      </div>

      <div className="flex gap-4 text-sm text-muted-foreground mb-4">
        {[
          { label: "Total", val: data.length },
          { label: "Active", val: data.filter((u) => u.status === "active").length },
          { label: "Pending", val: data.filter((u) => u.status === "pending").length, color: "text-yellow-500" },
          { label: "Suspended", val: data.filter((u) => u.status === "suspended").length, color: "text-destructive" },
        ].map((s, i) => <span key={i} className={s.color}>{s.label}: <strong>{s.val}</strong></span>)}
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                {["User", "Role", "Joined", "Status", "Last Active", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{u.name.charAt(0)}</div>
                      <div>
                        <div className="text-sm font-semibold">{u.name}</div>
                        <div className="text-xs text-muted-foreground">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", roleColors[u.role] || "bg-muted text-muted-foreground")}>{u.role}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{u.joined}</td>
                  <td className="px-4 py-3">
                    <span className={cn("text-xs font-bold capitalize", statusColors[u.status] || "")}>{u.status}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{u.lastActive}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => toast.success(`Viewing ${u.name}'s profile...`)} className="w-6 h-6 rounded flex items-center justify-center hover:bg-muted transition-colors"><Eye className="w-3.5 h-3.5" /></button>
                      {u.status === "pending" ? (
                        <button onClick={() => approve(u.id)} className="w-6 h-6 rounded flex items-center justify-center hover:bg-accent/10 text-accent transition-colors"><CheckCircle className="w-3.5 h-3.5" /></button>
                      ) : (
                        <button onClick={() => toggleStatus(u.id)} className="w-6 h-6 rounded flex items-center justify-center hover:bg-muted transition-colors"><Ban className="w-3.5 h-3.5" /></button>
                      )}
                      <button onClick={() => remove(u.id)} className="w-6 h-6 rounded flex items-center justify-center hover:bg-destructive/10 hover:text-destructive transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
