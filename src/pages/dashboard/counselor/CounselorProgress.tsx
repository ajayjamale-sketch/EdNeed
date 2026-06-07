import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { TrendingUp, Target, Users, BarChart2, CheckCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const progressTrend = [
  { month: "Jan", avg: 35 }, { month: "Feb", avg: 42 }, { month: "Mar", avg: 50 },
  { month: "Apr", avg: 58 }, { month: "May", avg: 65 }, { month: "Jun", avg: 72 },
];

const students = [
  { name: "Rahul Mehta", target: "IIT Engineering", progress: 72, milestones: ["Assessment Done", "College List Ready", "App Started"], pending: ["Mock Interview"], status: "on-track" },
  { name: "Ananya Reddy", target: "MBBS via NEET", progress: 58, milestones: ["Assessment Done"], pending: ["College List", "NEET Strategy"], status: "needs-attention" },
  { name: "Siddharth Rao", target: "IAS Civil Services", progress: 85, milestones: ["Assessment Done", "Strategy Built", "Coaching Enrolled", "Mock Test Started"], pending: [], status: "excellent" },
  { name: "Kavya Nair", target: "MBA via CAT", progress: 44, milestones: ["Assessment Done"], pending: ["CAT Prep Plan", "B-School Research"], status: "needs-attention" },
];

const statusColors: Record<string, string> = {
  "on-track": "text-primary",
  "needs-attention": "text-yellow-500",
  "excellent": "text-accent",
};

export default function CounselorProgress() {
  const [data, setData] = useState(students);
  const [updateStudent, setUpdateStudent] = useState<any>(null);
  const [selectedMilestones, setSelectedMilestones] = useState<string[]>([]);

  const avgProgress = Math.round(data.reduce((acc, curr) => acc + curr.progress, 0) / data.length);

  const handleUpdate = () => {
    if (selectedMilestones.length === 0) {
      toast.error("Select at least one milestone to update.");
      return;
    }

    const newCompleted = [...updateStudent.milestones, ...selectedMilestones];
    const newPending = updateStudent.pending.filter((p: string) => !selectedMilestones.includes(p));
    const total = newCompleted.length + newPending.length;
    const newProgress = Math.round((newCompleted.length / total) * 100);

    let newStatus = "needs-attention";
    if (newProgress === 100) newStatus = "excellent";
    else if (newProgress >= 50) newStatus = "on-track";

    setData(data.map(s => s.name === updateStudent.name ? {
      ...s,
      milestones: newCompleted,
      pending: newPending,
      progress: newProgress,
      status: newStatus
    } : s));

    toast.success(`Progress updated for ${updateStudent.name}!`);
    setUpdateStudent(null);
    setSelectedMilestones([]);
  };

  return (
    <DashboardLayout title="Student Progress Tracking" subtitle="Monitor career guidance progress milestones for all students">
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Avg. Progress", val: `${avgProgress}%`, icon: TrendingUp, color: "text-primary" },
          { label: "On Track", val: data.filter((s) => s.status === "on-track" || s.status === "excellent").length, icon: CheckCircle, color: "text-accent" },
          { label: "Need Attention", val: data.filter((s) => s.status === "needs-attention").length, icon: Target, color: "text-yellow-500" },
        ].map((s, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-4 text-center">
            <s.icon className={`w-4 h-4 mx-auto mb-2 ${s.color}`} />
            <div className="text-2xl font-bold">{s.val}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mb-5">
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold mb-4">Average Guidance Progress (Cohort)</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={progressTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 10, fontSize: 12 }} />
              <Line dataKey="avg" name="Avg Progress %" stroke="hsl(160 84% 39%)" strokeWidth={2.5} dot={{ fill: "hsl(160 84% 39%)", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold mb-4">Student Progress Summary</h3>
          <div className="space-y-3">
            {data.map((s, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1 text-sm">
                  <span className="font-medium">{s.name}</span>
                  <span className={`font-bold text-xs ${statusColors[s.status]}`}>{s.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${s.status === "excellent" ? "bg-accent" : s.status === "on-track" ? "bg-primary" : "bg-yellow-400"}`} style={{ width: `${s.progress}%` }} />
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{s.target}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {data.map((s, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/20 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold">{s.name}</h3>
                <p className="text-xs text-primary">{s.target}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{s.progress}%</div>
                <div className={`text-xs font-semibold capitalize ${statusColors[s.status]}`}>{s.status.replace("-", " ")}</div>
              </div>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-3">
              <div className={`h-full rounded-full ${s.status === "excellent" ? "bg-accent" : s.status === "on-track" ? "bg-primary" : "bg-yellow-400"}`} style={{ width: `${s.progress}%` }} />
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <div className="font-semibold text-accent mb-1 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Completed</div>
                <ul className="space-y-0.5">{s.milestones.map((m) => <li key={m} className="text-muted-foreground">✓ {m}</li>)}</ul>
              </div>
              {s.pending.length > 0 && (
                <div>
                  <div className="font-semibold text-yellow-500 mb-1 flex items-center gap-1"><Target className="w-3 h-3" /> Pending</div>
                  <ul className="space-y-0.5">{s.pending.map((p) => <li key={p} className="text-muted-foreground">○ {p}</li>)}</ul>
                </div>
              )}
            </div>
            <button onClick={() => { setUpdateStudent(s); setSelectedMilestones([]); }} className="mt-3 px-4 py-2 gradient-primary text-white rounded-xl text-xs font-semibold hover:opacity-90 disabled:opacity-50" disabled={s.pending.length === 0}>
              {s.pending.length === 0 ? "All Milestones Met" : "Update Progress"}
            </button>
          </div>
        ))}
      </div>

      {/* --- Update Milestones Modal --- */}
      <Dialog open={!!updateStudent} onOpenChange={(open) => !open && setUpdateStudent(null)}>
        <DialogContent className="sm:max-w-[400px] bg-background">
          <DialogHeader>
            <DialogTitle>Update Progress</DialogTitle>
          </DialogHeader>
          {updateStudent && (
            <div className="py-2 space-y-4">
              <p className="text-sm text-muted-foreground">Mark pending milestones as completed for <strong className="text-foreground">{updateStudent.name}</strong>.</p>
              
              <div className="space-y-2 border border-border rounded-xl p-3">
                {updateStudent.pending.length > 0 ? updateStudent.pending.map((p: string) => (
                  <label key={p} className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg cursor-pointer transition-colors">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary/30"
                      checked={selectedMilestones.includes(p)}
                      onChange={(e) => {
                        if (e.target.checked) setSelectedMilestones([...selectedMilestones, p]);
                        else setSelectedMilestones(selectedMilestones.filter(m => m !== p));
                      }}
                    />
                    <span className="text-sm font-medium">{p}</span>
                  </label>
                )) : (
                  <p className="text-sm text-center py-2 text-muted-foreground">All milestones met!</p>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setUpdateStudent(null)}>Cancel</Button>
            <Button onClick={handleUpdate} disabled={selectedMilestones.length === 0}>Save Progress</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
