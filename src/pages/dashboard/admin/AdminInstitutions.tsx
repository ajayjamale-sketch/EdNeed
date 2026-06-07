import DashboardLayout from "@/components/layout/DashboardLayout";
import { Building, Search, Filter, MoreVertical, Plus, Building2, MapPin, Users, Award, ShieldAlert, CheckCircle, Ban, Trash2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const mockInstitutions = [
  { id: 1, name: "Delhi Public School", location: "New Delhi, India", type: "School", students: 4500, status: "Verified", rating: 4.8 },
  { id: 2, name: "Aakash Institute", location: "Kota, India", type: "Coaching", students: 12000, status: "Verified", rating: 4.6 },
  { id: 3, name: "St. Xavier's College", location: "Mumbai, India", type: "College", students: 3200, status: "Pending", rating: 4.5 },
  { id: 4, name: "FIITJEE", location: "Chennai, India", type: "Coaching", students: 8500, status: "Verified", rating: 4.7 },
  { id: 5, name: "Global Innovators Academy", location: "Bangalore, India", type: "School", students: 1200, status: "Suspended", rating: 3.2 },
];

export default function AdminInstitutions() {
  const [institutions, setInstitutions] = useState(mockInstitutions);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addFormData, setAddFormData] = useState({ name: "", location: "", type: "School" });
  const [viewInst, setViewInst] = useState<any>(null);

  const filtered = institutions.filter(inst => {
    const matchesSearch = inst.name.toLowerCase().includes(search.toLowerCase()) || inst.location.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || inst.status.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const handleAdd = () => {
    if (!addFormData.name || !addFormData.location) {
      toast.error("Please fill in all fields");
      return;
    }
    const newInst = {
      id: Date.now(),
      name: addFormData.name,
      location: addFormData.location,
      type: addFormData.type,
      students: 0,
      status: "Pending",
      rating: 0
    };
    setInstitutions(prev => [newInst, ...prev]);
    toast.success("Institution added successfully");
    setIsAddModalOpen(false);
    setAddFormData({ name: "", location: "", type: "School" });
  };

  const updateStatus = (id: number, newStatus: string) => {
    setInstitutions(prev => prev.map(inst => inst.id === id ? { ...inst, status: newStatus } : inst));
    if (viewInst?.id === id) setViewInst({ ...viewInst, status: newStatus });
    toast.success(`Institution status updated to ${newStatus}`);
  };

  const removeInst = (id: number) => {
    setInstitutions(prev => prev.filter(inst => inst.id !== id));
    toast.success("Institution removed");
    setViewInst(null);
  };

  return (
    <DashboardLayout title="Institutions" subtitle="Manage registered schools and colleges">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card border border-border p-4 rounded-2xl">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search institutions by name or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-muted border-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex bg-muted rounded-xl p-1 overflow-x-auto custom-scrollbar">
              {["All", "Verified", "Pending", "Suspended"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f.toLowerCase())}
                  className={cn(
                    "px-4 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
                    filter === f.toLowerCase() ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
            <button onClick={() => setIsAddModalOpen(true)} className="px-4 py-2 gradient-primary text-white rounded-xl text-sm font-semibold flex items-center gap-2 hover:opacity-90 flex-shrink-0">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Institution</span>
            </button>
          </div>
        </div>

        {/* Institutions Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((inst) => (
            <div key={inst.id} className="glass-card-premium rounded-3xl p-6 hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className={cn(
                  "px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1",
                  inst.status === "Verified" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
                  inst.status === "Pending" ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                  "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                )}>
                  {inst.status === "Suspended" && <ShieldAlert className="w-3 h-3" />}
                  {inst.status}
                </span>
              </div>
              
              <h3 className="font-bold text-lg mb-1">{inst.name}</h3>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
                <MapPin className="w-3.5 h-3.5" />
                {inst.location}
              </div>

              <div className="grid grid-cols-3 gap-2 py-4 border-y border-border mb-4">
                <div className="text-center">
                  <div className="text-xs text-muted-foreground mb-1">Type</div>
                  <div className="text-sm font-semibold">{inst.type}</div>
                </div>
                <div className="text-center border-x border-border">
                  <div className="text-xs text-muted-foreground mb-1">Students</div>
                  <div className="text-sm font-semibold">{inst.students.toLocaleString()}</div>
                </div>
                <div className="text-center flex flex-col items-center justify-center">
                  <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><Award className="w-3 h-3 text-yellow-500" /> Rating</div>
                  <div className="text-sm font-semibold">{inst.rating}</div>
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={() => setViewInst(inst)} className="flex-1 py-2 bg-muted text-foreground rounded-xl text-sm font-medium hover:bg-muted/80 transition-colors">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* --- Add Institution Modal --- */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[400px] bg-background">
          <DialogHeader>
            <DialogTitle>Add New Institution</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Institution Name</Label>
              <Input value={addFormData.name} onChange={(e) => setAddFormData({ ...addFormData, name: e.target.value })} placeholder="e.g. Modern High School" />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input value={addFormData.location} onChange={(e) => setAddFormData({ ...addFormData, location: e.target.value })} placeholder="e.g. Mumbai, India" />
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <select value={addFormData.type} onChange={(e) => setAddFormData({ ...addFormData, type: e.target.value })} className="w-full px-3 py-2 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option>School</option>
                <option>College</option>
                <option>Coaching</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Add Institution</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- View Profile Modal --- */}
      <Dialog open={!!viewInst} onOpenChange={(open) => !open && setViewInst(null)}>
        <DialogContent className="sm:max-w-[500px] bg-background">
          <DialogHeader>
            <DialogTitle>Institution Profile</DialogTitle>
          </DialogHeader>
          {viewInst && (
            <div className="py-4 space-y-5">
              <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-xl border border-border">
                <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 flex-shrink-0">
                  <Building2 className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl">{viewInst.name}</h3>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                    <MapPin className="w-4 h-4" /> {viewInst.location}
                  </div>
                  <div className="mt-2 flex gap-2">
                    <span className="text-xs bg-muted border border-border px-2 py-0.5 rounded-full">{viewInst.type}</span>
                    <span className={cn(
                      "text-xs font-bold px-2 py-0.5 rounded-full",
                      viewInst.status === "Verified" ? "bg-emerald-100 text-emerald-700" :
                      viewInst.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                      "bg-red-100 text-red-700"
                    )}>
                      {viewInst.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-border bg-card text-center">
                  <div className="text-2xl font-bold text-primary">{viewInst.students.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground mt-1">Registered Students</div>
                </div>
                <div className="p-4 rounded-xl border border-border bg-card text-center">
                  <div className="text-2xl font-bold text-yellow-500">{viewInst.rating > 0 ? viewInst.rating : "N/A"}</div>
                  <div className="text-xs text-muted-foreground mt-1">Institution Rating</div>
                </div>
              </div>
              
              <div className="flex gap-2 pt-2 border-t border-border">
                {viewInst.status !== "Verified" && (
                  <Button onClick={() => updateStatus(viewInst.id, "Verified")} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"><CheckCircle className="w-4 h-4 mr-2" /> Verify</Button>
                )}
                {viewInst.status !== "Suspended" && (
                  <Button onClick={() => updateStatus(viewInst.id, "Suspended")} variant="outline" className="flex-1 border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-red-900/50 dark:hover:bg-red-950/30"><Ban className="w-4 h-4 mr-2" /> Suspend</Button>
                )}
                <Button onClick={() => removeInst(viewInst.id)} variant="destructive" className="flex-1"><Trash2 className="w-4 h-4 mr-2" /> Delete</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
