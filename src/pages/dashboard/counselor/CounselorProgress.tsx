import DashboardLayout from "@/components/layout/DashboardLayout";
import { TrendingUp, Target, Users, BarChart2, CheckCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { toast } from "sonner";

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
  return (
    <DashboardLayout title="Student Progress Tracking" subtitle="Monitor career guidance progress milestones for all students">
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Avg. Progress", val: "72%", icon: TrendingUp, color: "text-primary" },
          { label: "On Track", val: students.filter((s) => s.status === "on-track" || s.status === "excellent").length, icon: CheckCircle, color: "text-accent" },
          { label: "Need Attention", val: students.filter((s) => s.status === "needs-attention").length, icon: Target, color: "text-yellow-500" },
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
            {students.map((s, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1 text-sm">
                  <span className="font-medium">{s.name}</span>
                  <span className={`font-bold text-xs ${statusColors[s.status]}`}>{s.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${s.status === "excellent" ? "bg-accent" : s.status === "on-track" ? "bg-primary" : "bg-yellow-400"}`} style={{ width: `${s.progress}%` }} />
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{s.target}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {students.map((s, i) => (
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
            <button onClick={() => toast.success(`Updating milestones for ${s.name}...`)} className="mt-3 px-4 py-2 gradient-primary text-white rounded-xl text-xs font-semibold hover:opacity-90">
              Update Progress
            </button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
