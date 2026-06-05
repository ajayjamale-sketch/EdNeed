import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Search, Plus, Eye, Edit, Trash2, Filter, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const students = [
  { id: 1, name: "Aarav Sharma", class: "Class 10-A", roll: "001", gender: "M", parent: "Rakesh Sharma", phone: "+91-9876543210", attendance: 92, avg: 81, status: "active" },
  { id: 2, name: "Priya Mehta", class: "Class 10-B", roll: "002", gender: "F", parent: "Sunita Mehta", phone: "+91-9876543211", attendance: 88, avg: 75, status: "active" },
  { id: 3, name: "Rohan Verma", class: "Class 9-A", roll: "012", gender: "M", parent: "Vijay Verma", phone: "+91-9876543212", attendance: 65, avg: 62, status: "at-risk" },
  { id: 4, name: "Sneha Pillai", class: "Class 11-A", roll: "024", gender: "F", parent: "Anita Pillai", phone: "+91-9876543213", attendance: 95, avg: 88, status: "active" },
  { id: 5, name: "Kiran Rao", class: "Class 12-B", roll: "035", gender: "M", parent: "Suresh Rao", phone: "+91-9876543214", attendance: 78, avg: 73, status: "active" },
  { id: 6, name: "Ananya Singh", class: "Class 8-C", roll: "047", gender: "F", parent: "Deepak Singh", phone: "+91-9876543215", attendance: 58, avg: 55, status: "at-risk" },
];

export default function InstitutionStudents() {
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("all");
  const [data, setData] = useState(students);

  const filtered = data.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.roll.includes(search);
    const matchClass = classFilter === "All" || s.class.startsWith(classFilter);
    const matchStatus = statusFilter === "all" || s.status === statusFilter;
    return matchSearch && matchClass && matchStatus;
  });

  const remove = (id: number) => {
    setData((prev) => prev.filter((s) => s.id !== id));
    toast.success("Student record removed");
  };

  return (
    <DashboardLayout title="Student Management" subtitle="View, manage, and monitor all enrolled students">
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or roll number..." className="w-full pl-9 pr-4 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <select value={classFilter} onChange={(e) => setClassFilter(e.target.value)} className="px-3 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none">
          {["All", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"].map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none">
          <option value="all">All Students</option>
          <option value="active">Active</option>
          <option value="at-risk">At Risk</option>
        </select>
        <button onClick={() => toast.success("Add student form opening...")} className="flex items-center gap-2 px-4 py-2.5 gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 whitespace-nowrap">
          <Plus className="w-4 h-4" /> Add Student
        </button>
        <button onClick={() => toast.success("Exporting student data...")} className="flex items-center gap-2 px-3 py-2.5 border border-border rounded-xl text-sm font-semibold hover:bg-muted transition-colors">
          <Download className="w-4 h-4" />
        </button>
      </div>

      <div className="flex gap-3 text-sm text-muted-foreground mb-4">
        <span>{filtered.length} students shown</span>
        <span className="text-destructive">{data.filter((s) => s.status === "at-risk").length} at risk</span>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                {["Roll", "Name", "Class", "Parent", "Attendance", "Avg Score", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-xs text-muted-foreground">{s.roll}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{s.name.charAt(0)}</div>
                      <span className="text-sm font-medium">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{s.class}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{s.parent}</td>
                  <td className="px-4 py-3">
                    <span className={cn("text-xs font-bold", s.attendance >= 85 ? "text-accent" : s.attendance >= 75 ? "text-primary" : "text-destructive")}>{s.attendance}%</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("text-xs font-bold", s.avg >= 80 ? "text-accent" : s.avg >= 65 ? "text-primary" : "text-destructive")}>{s.avg}%</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", s.status === "active" ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300" : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300")}>{s.status === "at-risk" ? "At Risk" : "Active"}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => toast.success(`Viewing ${s.name}'s profile...`)} className="w-6 h-6 rounded flex items-center justify-center hover:bg-muted transition-colors"><Eye className="w-3.5 h-3.5" /></button>
                      <button onClick={() => toast.success(`Editing ${s.name}...`)} className="w-6 h-6 rounded flex items-center justify-center hover:bg-muted transition-colors"><Edit className="w-3.5 h-3.5" /></button>
                      <button onClick={() => remove(s.id)} className="w-6 h-6 rounded flex items-center justify-center hover:bg-destructive/10 hover:text-destructive transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
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
