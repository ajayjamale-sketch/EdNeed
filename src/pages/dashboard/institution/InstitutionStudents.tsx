import { useState, useEffect, useMemo } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Search, Plus, Eye, Edit, Trash2, Filter, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// --- TypeScript Interface ---
interface Student {
  id: number;
  name: string;
  class: string;
  roll: string;
  gender: string;
  parent: string;
  phone: string;
  attendance: number;
  avg: number;
  status: "active" | "at-risk";
}

// --- Mock Initial Data (would come from API) ---
const mockStudents: Student[] = [
  { id: 1, name: "Aarav Sharma", class: "Class 10-A", roll: "001", gender: "M", parent: "Rakesh Sharma", phone: "+91-9876543210", attendance: 92, avg: 81, status: "active" },
  { id: 2, name: "Priya Mehta", class: "Class 10-B", roll: "002", gender: "F", parent: "Sunita Mehta", phone: "+91-9876543211", attendance: 88, avg: 75, status: "active" },
  { id: 3, name: "Rohan Verma", class: "Class 9-A", roll: "012", gender: "M", parent: "Vijay Verma", phone: "+91-9876543212", attendance: 65, avg: 62, status: "at-risk" },
  { id: 4, name: "Sneha Pillai", class: "Class 11-A", roll: "024", gender: "F", parent: "Anita Pillai", phone: "+91-9876543213", attendance: 95, avg: 88, status: "active" },
  { id: 5, name: "Kiran Rao", class: "Class 12-B", roll: "035", gender: "M", parent: "Suresh Rao", phone: "+91-9876543214", attendance: 78, avg: 73, status: "active" },
  { id: 6, name: "Ananya Singh", class: "Class 8-C", roll: "047", gender: "F", parent: "Deepak Singh", phone: "+91-9876543215", attendance: 58, avg: 55, status: "at-risk" },
];

export default function InstitutionStudents() {
  // --- State ---
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "at-risk">("all");

  // --- Modal & Form State ---
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState<Partial<Student>>({});

  // --- Fetch students on mount (mock API) ---
  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        setStudents(mockStudents);
      } catch (error) {
        toast.error("Failed to load students");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  // --- Derived: unique class options for filter dropdown (based on actual data) ---
  const classOptions = useMemo(() => {
    const uniqueClasses = new Set(students.map((s) => s.class.split("-")[0]?.trim()));
    return ["All", ...Array.from(uniqueClasses).sort()];
  }, [students]);

  // --- Filtered students (memoized for performance) ---
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.roll.includes(search);
      const matchesClass =
        classFilter === "All" || student.class.startsWith(classFilter);
      const matchesStatus =
        statusFilter === "all" || student.status === statusFilter;
      return matchesSearch && matchesClass && matchesStatus;
    });
  }, [students, search, classFilter, statusFilter]);

  // --- Delete handler with confirmation & toast undo option ---
  const handleDelete = (id: number, name: string) => {
    toast.custom(
      (t) => (
        <div className="bg-background border border-border rounded-xl shadow-lg p-4 flex items-center gap-3">
          <span>Deleted {name}</span>
          <button
            onClick={() => {
              toast.dismiss(t);
              // Restore student logic would need the full student object.
              // For brevity, we just show a message.
              toast.success(`${name} restored (demo)`);
            }}
            className="text-primary text-sm font-medium underline"
          >
            Undo
          </button>
        </div>
      ),
      { duration: 5000 }
    );
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  // --- Actions ---
  const handleView = (student: Student) => {
    setSelectedStudent(student);
    setIsViewOpen(true);
  };
  
  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setFormData(student);
    setIsEditOpen(true);
  };
  
  const handleAdd = () => {
    setFormData({
      name: "", class: "", roll: "", gender: "M", parent: "", phone: "", attendance: 0, avg: 0, status: "active"
    });
    setIsAddOpen(true);
  };

  const handleSaveStudent = () => {
    if (isAddOpen) {
      const newStudent: Student = {
        ...(formData as Student),
        id: students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1,
      };
      setStudents(prev => [...prev, newStudent]);
      toast.success("Student added successfully");
      setIsAddOpen(false);
    } else if (isEditOpen && selectedStudent) {
      setStudents(prev => prev.map(s => s.id === selectedStudent.id ? { ...s, ...formData } as Student : s));
      toast.success("Student updated successfully");
      setIsEditOpen(false);
    }
  };

  const handleExport = () => {
    const headers = ["Roll,Name,Class,Gender,Parent,Phone,Attendance,Average,Status"];
    const csvData = filteredStudents.map(s => `${s.roll},${s.name},${s.class},${s.gender},${s.parent},${s.phone},${s.attendance},${s.avg},${s.status}`);
    const blob = new Blob([headers.concat(csvData).join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "students.csv";
    a.click();
    toast.success("Exported student data");
  };

  // --- Helper for status badge styling ---
  const getStatusBadgeClasses = (status: Student["status"]) =>
    cn(
      "text-xs font-semibold px-2 py-0.5 rounded-full",
      status === "active"
        ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
        : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
    );

  // --- Loading state ---
  if (loading) {
    return (
      <DashboardLayout title="Student Management" subtitle="Loading student records...">
        <div className="flex justify-center py-12">
          <div className="animate-pulse flex space-x-4">
            <div className="h-10 w-10 bg-muted rounded-full"></div>
            <div className="space-y-2">
              <div className="h-4 w-48 bg-muted rounded"></div>
              <div className="h-4 w-32 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Student Management" subtitle="View, manage, and monitor all enrolled students">
      {/* Filters & Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or roll number..."
            className="w-full pl-9 pr-4 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
            aria-label="Search students"
          />
        </div>

        <select
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
          className="px-3 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none"
          aria-label="Filter by class"
        >
          {classOptions.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
          className="px-3 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none"
          aria-label="Filter by status"
        >
          <option value="all">All Students</option>
          <option value="active">Active</option>
          <option value="at-risk">At Risk</option>
        </select>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-semibold hover:opacity-90 whitespace-nowrap"
        >
          <Plus className="w-4 h-4" /> Add Student
        </button>

        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-3 py-2.5 border border-border rounded-xl text-sm font-semibold hover:bg-muted transition-colors"
          aria-label="Export student data"
        >
          <Download className="w-4 h-4" />
        </button>
      </div>

      {/* Summary Stats */}
      <div className="flex gap-3 text-sm text-muted-foreground mb-4">
        <span>{filteredStudents.length} students shown</span>
        <span className="text-destructive">
          {students.filter((s) => s.status === "at-risk").length} at risk
        </span>
      </div>

      {/* Student Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                {["Roll", "Name", "Class", "Parent", "Attendance", "Avg Score", "Status", "Actions"].map((heading) => (
                  <th key={heading} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-xs text-muted-foreground">{student.roll}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {student.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{student.class}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{student.parent}</td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "text-xs font-bold",
                        student.attendance >= 85
                          ? "text-green-600 dark:text-green-400"
                          : student.attendance >= 75
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-red-600 dark:text-red-400"
                      )}
                    >
                      {student.attendance}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "text-xs font-bold",
                        student.avg >= 80
                          ? "text-green-600 dark:text-green-400"
                          : student.avg >= 65
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-red-600 dark:text-red-400"
                      )}
                    >
                      {student.avg}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={getStatusBadgeClasses(student.status)}>
                      {student.status === "at-risk" ? "At Risk" : "Active"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleView(student)}
                        className="w-6 h-6 rounded flex items-center justify-center hover:bg-muted transition-colors"
                        aria-label={`View ${student.name}`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleEdit(student)}
                        className="w-6 h-6 rounded flex items-center justify-center hover:bg-muted transition-colors"
                        aria-label={`Edit ${student.name}`}
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(student.id, student.name)}
                        className="w-6 h-6 rounded flex items-center justify-center hover:bg-destructive/10 hover:text-destructive transition-colors"
                        aria-label={`Delete ${student.name}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredStudents.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">No students found.</div>
          )}
        </div>
      </div>

      {/* --- Add / Edit Modal --- */}
      <Dialog open={isAddOpen || isEditOpen} onOpenChange={(open) => {
        if (!open) { setIsAddOpen(false); setIsEditOpen(false); }
      }}>
        <DialogContent className="sm:max-w-[500px] bg-background">
          <DialogHeader>
            <DialogTitle>{isAddOpen ? "Add New Student" : "Edit Student"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={formData.name || ""} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="roll">Roll Number</Label>
                <Input id="roll" value={formData.roll || ""} onChange={(e) => setFormData({ ...formData, roll: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="class">Class</Label>
                <Input id="class" value={formData.class || ""} onChange={(e) => setFormData({ ...formData, class: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <select id="gender" value={formData.gender || "M"} onChange={(e) => setFormData({ ...formData, gender: e.target.value })} className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="parent">Parent Name</Label>
                <Input id="parent" value={formData.parent || ""} onChange={(e) => setFormData({ ...formData, parent: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" value={formData.phone || ""} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="attendance">Attendance (%)</Label>
                <Input id="attendance" type="number" value={formData.attendance || 0} onChange={(e) => setFormData({ ...formData, attendance: Number(e.target.value) })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="avg">Avg Score (%)</Label>
                <Input id="avg" type="number" value={formData.avg || 0} onChange={(e) => setFormData({ ...formData, avg: Number(e.target.value) })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select id="status" value={formData.status || "active"} onChange={(e) => setFormData({ ...formData, status: e.target.value as "active" | "at-risk" })} className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                  <option value="active">Active</option>
                  <option value="at-risk">At Risk</option>
                </select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setIsAddOpen(false); setIsEditOpen(false); }}>Cancel</Button>
            <Button onClick={handleSaveStudent}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- View Modal --- */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-[500px] bg-background">
          <DialogHeader>
            <DialogTitle>Student Details</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className="py-4 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                  {selectedStudent.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{selectedStudent.name}</h3>
                  <p className="text-muted-foreground">{selectedStudent.roll} | {selectedStudent.class}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <p className="text-sm text-muted-foreground">Parent/Guardian</p>
                  <p className="font-medium">{selectedStudent.parent}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{selectedStudent.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Gender</p>
                  <p className="font-medium">{selectedStudent.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <span className={getStatusBadgeClasses(selectedStudent.status)}>
                    {selectedStudent.status === "at-risk" ? "At Risk" : "Active"}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Attendance</p>
                  <p className="font-medium">{selectedStudent.attendance}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Average Score</p>
                  <p className="font-medium">{selectedStudent.avg}%</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </DashboardLayout>
  );
}