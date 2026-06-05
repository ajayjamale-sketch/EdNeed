import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { DollarSign, CheckCircle, Clock, AlertCircle, CreditCard, Download, Search, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const feeRecords = [
  { id: 1, student: "Aarav Sharma", class: "10-A", term: "Annual Fee 2025-26", amount: 45000, paid: 45000, due: "Apr 30", status: "paid", date: "Apr 2" },
  { id: 2, student: "Priya Mehta", class: "10-B", term: "Annual Fee 2025-26", amount: 45000, paid: 22500, due: "Apr 30", status: "partial", date: "" },
  { id: 3, student: "Rohan Verma", class: "9-A", term: "Annual Fee 2025-26", amount: 40000, paid: 0, due: "Apr 30", status: "overdue", date: "" },
  { id: 4, student: "Sneha Pillai", class: "11-A", term: "Annual Fee 2025-26", amount: 50000, paid: 50000, due: "Apr 30", status: "paid", date: "Mar 28" },
  { id: 5, student: "Kiran Rao", class: "12-B", term: "Annual Fee 2025-26", amount: 52000, paid: 0, due: "Apr 30", status: "upcoming", date: "" },
  { id: 6, student: "Ananya Singh", class: "8-C", term: "Annual Fee 2025-26", amount: 38000, paid: 38000, due: "Apr 30", status: "paid", date: "Apr 10" },
];

const pieData = [
  { name: "Fully Paid", value: 3, color: "#10B981" },
  { name: "Partial", value: 1, color: "#2563EB" },
  { name: "Overdue", value: 1, color: "#EF4444" },
  { name: "Upcoming", value: 1, color: "#F59E0B" },
];

const statusCfg: Record<string, { label: string; color: string }> = {
  paid: { label: "Paid", color: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300" },
  partial: { label: "Partial", color: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300" },
  overdue: { label: "Overdue", color: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300" },
  upcoming: { label: "Upcoming", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300" },
};

export default function InstitutionFees() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = feeRecords.filter((f) => {
    const m = f.student.toLowerCase().includes(search.toLowerCase());
    const s = filter === "all" || f.status === filter;
    return m && s;
  });

  const totalCollected = feeRecords.reduce((a, f) => a + f.paid, 0);
  const totalDue = feeRecords.reduce((a, f) => a + (f.amount - f.paid), 0);

  return (
    <DashboardLayout title="Fee Management" subtitle="Track fee collection, send reminders, and manage payments">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Collected", val: `₹${(totalCollected / 100000).toFixed(1)}L`, color: "text-accent" },
          { label: "Outstanding", val: `₹${(totalDue / 100000).toFixed(1)}L`, color: "text-destructive" },
          { label: "Collection Rate", val: "82%", color: "text-primary" },
          { label: "Overdue Students", val: feeRecords.filter((f) => f.status === "overdue").length.toString(), color: "text-orange-500" },
        ].map((s, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-4">
            <div className={cn("text-2xl font-bold mb-1", s.color)}>{s.val}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mb-5">
        <div className="lg:col-span-2">
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search student..." className="w-full pl-9 pr-4 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="px-3 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none">
              <option value="all">All Status</option>
              <option value="paid">Paid</option>
              <option value="partial">Partial</option>
              <option value="overdue">Overdue</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>

          <div className="space-y-2">
            {filtered.map((f) => {
              const cfg = statusCfg[f.status];
              const pct = Math.round((f.paid / f.amount) * 100);
              return (
                <div key={f.id} className="bg-card border border-border rounded-2xl p-4 hover:border-primary/20 transition-colors">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm">{f.student}</span>
                        <span className="text-xs text-muted-foreground">Class {f.class}</span>
                        <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full", cfg.color)}>{cfg.label}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{f.term} · Due: {f.due}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className={cn("h-full rounded-full", pct === 100 ? "bg-accent" : pct > 0 ? "bg-primary" : "bg-destructive")} style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground">₹{f.paid.toLocaleString()} / ₹{f.amount.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      {f.status !== "paid" && (
                        <button onClick={() => toast.success(`Recording payment for ${f.student}...`)} className="px-3 py-1.5 gradient-primary text-white rounded-lg text-xs font-semibold hover:opacity-90">Record</button>
                      )}
                      <button onClick={() => toast.success(`Reminder sent to ${f.student}'s parents!`)} className="w-7 h-7 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors">
                        <Send className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold mb-4">Fee Status Overview</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={70} dataKey="value">
                {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Legend formatter={(v) => <span className="text-xs">{v}</span>} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 10, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            <button onClick={() => toast.success("Sending payment reminders to all overdue parents...")} className="w-full py-2 gradient-primary text-white rounded-xl text-xs font-semibold hover:opacity-90">
              Send Bulk Reminders
            </button>
            <button onClick={() => toast.success("Downloading fee report...")} className="w-full py-2 border border-border rounded-xl text-xs font-semibold hover:bg-muted transition-colors flex items-center justify-center gap-2">
              <Download className="w-3.5 h-3.5" /> Export Report
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
