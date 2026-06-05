import DashboardLayout from "@/components/layout/DashboardLayout";
import { Building, Search, Filter, MoreVertical, Plus, Building2, MapPin, Users, Award, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const mockInstitutions = [
  { id: 1, name: "Delhi Public School", location: "New Delhi, India", type: "School", students: 4500, status: "Verified", rating: 4.8 },
  { id: 2, name: "Aakash Institute", location: "Kota, India", type: "Coaching", students: 12000, status: "Verified", rating: 4.6 },
  { id: 3, name: "St. Xavier's College", location: "Mumbai, India", type: "College", students: 3200, status: "Pending", rating: 4.5 },
  { id: 4, name: "FIITJEE", location: "Chennai, India", type: "Coaching", students: 8500, status: "Verified", rating: 4.7 },
  { id: 5, name: "Global Innovators Academy", location: "Bangalore, India", type: "School", students: 1200, status: "Suspended", rating: 3.2 },
];

export default function AdminInstitutions() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = mockInstitutions.filter(inst => {
    const matchesSearch = inst.name.toLowerCase().includes(search.toLowerCase()) || inst.location.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || inst.status.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

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
            <button className="px-4 py-2 gradient-primary text-white rounded-xl text-sm font-semibold flex items-center gap-2 hover:opacity-90 flex-shrink-0">
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
                <button className="flex-1 py-2 bg-muted text-foreground rounded-xl text-sm font-medium hover:bg-muted/80 transition-colors">
                  View Profile
                </button>
                <button className="w-10 flex items-center justify-center border border-border rounded-xl hover:bg-muted transition-colors text-muted-foreground">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </DashboardLayout>
  );
}
