import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Briefcase, Users, CheckSquare, TrendingUp, Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { toast } from "sonner";

const applicationsData = [
  { month: "Jan", apps: 8 }, { month: "Feb", apps: 15 }, { month: "Mar", apps: 22 },
  { month: "Apr", apps: 31 }, { month: "May", apps: 44 }, { month: "Jun", apps: 38 },
];

const opportunities = [
  { id: 1, title: "Software Engineering Intern", type: "Internship", dept: "Technology", location: "Bangalore / Remote", stipend: "₹25,000/mo", applications: 124, status: "active", deadline: "Jun 30" },
  { id: 2, title: "Data Science Associate", type: "Full-time", dept: "Analytics", location: "Hyderabad", stipend: "₹8–12 LPA", applications: 87, status: "active", deadline: "Jul 15" },
  { id: 3, title: "Product Management Trainee", type: "Internship", dept: "Product", location: "Mumbai", stipend: "₹20,000/mo", applications: 58, status: "active", deadline: "Jul 5" },
  { id: 4, title: "UI/UX Design Intern", type: "Internship", dept: "Design", location: "Remote", stipend: "₹15,000/mo", applications: 43, status: "paused", deadline: "Aug 1" },
];

export default function RecruiterOpportunities() {
  const [opps, setOpps] = useState(opportunities);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", type: "Internship", dept: "", location: "", stipend: "", deadline: "" });

  const addOpp = () => {
    if (!form.title || !form.dept) { toast.error("Fill required fields"); return; }
    setOpps((prev) => [...prev, { id: Date.now(), ...form, applications: 0, status: "active" }]);
    setForm({ title: "", type: "Internship", dept: "", location: "", stipend: "", deadline: "" });
    setShowForm(false);
    toast.success("Opportunity posted! Students can now apply.");
  };

  const deleteOpp = (id: number) => {
    setOpps((prev) => prev.filter((o) => o.id !== id));
    toast.success("Opportunity removed");
  };

  return (
    <DashboardLayout title="Posted Opportunities" subtitle="Manage your job and internship postings">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Active Postings", val: opps.filter((o) => o.status === "active").length, icon: Briefcase, color: "text-blue-500" },
          { label: "Total Applications", val: opps.reduce((a, o) => a + o.applications, 0), icon: Users, color: "text-purple-500" },
          { label: "Shortlisted", val: 32, icon: CheckSquare, color: "text-accent" },
          { label: "Hires This Month", val: 8, icon: TrendingUp, color: "text-green-500" },
        ].map((s, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-4">
            <s.icon className={`w-4 h-4 mb-2 ${s.color}`} />
            <div className="text-2xl font-bold">{s.val}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mb-5">
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold mb-4">Application Volume (Monthly)</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={applicationsData} barSize={24}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 10, fontSize: 12 }} />
              <Bar dataKey="apps" name="Applications" fill="hsl(221 83% 53%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-5 text-white flex flex-col justify-between">
          <div>
            <Briefcase className="w-8 h-8 mb-3 opacity-80" />
            <h3 className="font-bold text-lg mb-2">Post a New Opportunity</h3>
            <p className="text-white/70 text-sm">Reach thousands of qualified students across India</p>
          </div>
          <button onClick={() => setShowForm(true)} className="mt-4 py-2.5 bg-white text-primary rounded-xl text-sm font-semibold hover:bg-white/90 transition-colors flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" /> Post Now
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-card border border-primary/30 rounded-2xl p-5 mb-5">
          <h3 className="font-semibold mb-4">New Opportunity</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            {[
              { label: "Job Title *", key: "title", placeholder: "e.g. Software Engineering Intern" },
              { label: "Department *", key: "dept", placeholder: "e.g. Technology" },
              { label: "Location", key: "location", placeholder: "e.g. Bangalore / Remote" },
              { label: "Stipend/Salary", key: "stipend", placeholder: "e.g. ₹25,000/mo" },
            ].map((f) => (
              <div key={f.key}>
                <label className="block text-xs font-medium mb-1.5">{f.label}</label>
                <input value={(form as any)[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.placeholder} className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            ))}
            <div>
              <label className="block text-xs font-medium mb-1.5">Type</label>
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none">
                <option>Internship</option>
                <option>Full-time</option>
                <option>Part-time</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5">Application Deadline</label>
              <input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} className="w-full px-3 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={addOpp} className="px-5 py-2 gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90">Post Opportunity</button>
            <button onClick={() => setShowForm(false)} className="px-5 py-2 border border-border rounded-xl text-sm font-semibold hover:bg-muted transition-colors">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {opps.map((o) => (
          <div key={o.id} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/20 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="font-semibold text-sm">{o.title}</h3>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{o.type}</span>
                  <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full", o.status === "active" ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300" : "bg-yellow-100 text-yellow-700")}>{o.status}</span>
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span>{o.dept}</span>
                  <span>{o.location}</span>
                  <span className="font-semibold text-accent">{o.stipend}</span>
                  <span>Deadline: {o.deadline}</span>
                  <span className="font-semibold text-foreground">{o.applications} applications</span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => toast.success(`Viewing applicants for "${o.title}"...`)} className="px-3 py-1.5 gradient-primary text-white rounded-lg text-xs font-semibold hover:opacity-90">View ({o.applications})</button>
                <button onClick={() => toast.success("Editing opportunity...")} className="w-7 h-7 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors"><Edit className="w-3.5 h-3.5" /></button>
                <button onClick={() => deleteOpp(o.id)} className="w-7 h-7 rounded-lg border border-border flex items-center justify-center hover:bg-destructive/10 hover:text-destructive transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
