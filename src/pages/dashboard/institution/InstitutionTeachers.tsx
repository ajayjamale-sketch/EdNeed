import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Search, Plus, Eye, Edit, Trash2, Star, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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

  // --- Modal & Form State ---
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  const filtered = data.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()) || t.subject.toLowerCase().includes(search.toLowerCase())
  );

  const handleView = (t: any) => {
    setSelectedTeacher(t);
    setIsViewOpen(true);
  };
  
  const handleEdit = (t: any) => {
    setSelectedTeacher(t);
    // Convert array back to comma separated string for easy editing
    setFormData({ ...t, classes: Array.isArray(t.classes) ? t.classes.join(", ") : t.classes });
    setIsEditOpen(true);
  };
  
  const handleAdd = () => {
    setFormData({
      name: "", subject: "", experience: "", classes: "", rating: 5.0, status: "active"
    });
    setIsAddOpen(true);
  };

  const handleSaveTeacher = () => {
    const parseClasses = (val: any) => {
      if (typeof val === "string") return val.split(",").map((s) => s.trim()).filter(Boolean);
      return val || [];
    };

    if (isAddOpen) {
      const newTeacher = {
        ...formData,
        id: data.length > 0 ? Math.max(...data.map((d: any) => d.id)) + 1 : 1,
        classes: parseClasses(formData.classes),
        rating: Number(formData.rating) || 5.0
      };
      setData(prev => [...prev, newTeacher]);
      toast.success("Teacher added successfully");
      setIsAddOpen(false);
    } else if (isEditOpen && selectedTeacher) {
      const updatedTeacher = {
        ...formData,
        classes: parseClasses(formData.classes),
        rating: Number(formData.rating) || 5.0
      };
      setData(prev => prev.map((t: any) => t.id === selectedTeacher.id ? updatedTeacher : t));
      toast.success("Teacher updated successfully");
      setIsEditOpen(false);
    }
  };

  return (
    <DashboardLayout title="Teaching Staff" subtitle="Manage your school's faculty and teaching assignments">
      <div className="flex gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search teachers..." className="w-full pl-9 pr-4 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2.5 gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 whitespace-nowrap">
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
              <button onClick={() => handleView(t)} className="flex-1 py-2 border border-border rounded-lg text-xs font-semibold hover:bg-muted transition-colors"><Eye className="w-3 h-3 inline mr-1" />View</button>
              <button onClick={() => handleEdit(t)} className="w-8 h-8 border border-border rounded-lg flex items-center justify-center hover:bg-muted transition-colors"><Edit className="w-3.5 h-3.5" /></button>
              <button onClick={() => { setData((prev) => prev.filter((x) => x.id !== t.id)); toast.success("Teacher removed"); }} className="w-8 h-8 border border-border rounded-lg flex items-center justify-center hover:bg-destructive/10 hover:text-destructive transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
      </div>

      {/* --- Add / Edit Modal --- */}
      <Dialog open={isAddOpen || isEditOpen} onOpenChange={(open) => {
        if (!open) { setIsAddOpen(false); setIsEditOpen(false); }
      }}>
        <DialogContent className="sm:max-w-[500px] bg-background">
          <DialogHeader>
            <DialogTitle>{isAddOpen ? "Add New Teacher" : "Edit Teacher"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="t-name">Full Name</Label>
                <Input id="t-name" value={formData.name || ""} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="t-subject">Subject</Label>
                <Input id="t-subject" value={formData.subject || ""} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="t-experience">Experience (e.g. 5 years)</Label>
                <Input id="t-experience" value={formData.experience || ""} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="t-rating">Rating (0-5)</Label>
                <Input id="t-rating" type="number" step="0.1" max="5" value={formData.rating || ""} onChange={(e) => setFormData({ ...formData, rating: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="t-classes">Classes (comma separated)</Label>
              <Input id="t-classes" value={formData.classes || ""} onChange={(e) => setFormData({ ...formData, classes: e.target.value })} placeholder="e.g. 10-A, 11-B" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="t-status">Status</Label>
              <select id="t-status" value={formData.status || "active"} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                <option value="active">Active</option>
                <option value="on-leave">On Leave</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setIsAddOpen(false); setIsEditOpen(false); }}>Cancel</Button>
            <Button onClick={handleSaveTeacher}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- View Modal --- */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-[400px] bg-background">
          <DialogHeader>
            <DialogTitle>Teacher Details</DialogTitle>
          </DialogHeader>
          {selectedTeacher && (
            <div className="py-4 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                  {selectedTeacher.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{selectedTeacher.name}</h3>
                  <p className="text-primary font-medium">{selectedTeacher.subject}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-sm text-muted-foreground">Experience</p>
                  <p className="font-medium">{selectedTeacher.experience}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full inline-block mt-1", selectedTeacher.status === "active" ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300" : "bg-yellow-100 text-yellow-700")}>
                    {selectedTeacher.status === "active" ? "Active" : "On Leave"}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <div className="flex items-center gap-1 mt-1 font-medium">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {selectedTeacher.rating} / 5.0
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Assigned Classes</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedTeacher.classes.map((c: string) => (
                      <span key={c} className="text-xs bg-muted px-2 py-0.5 rounded-full">{c}</span>
                    ))}
                  </div>
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
