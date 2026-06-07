import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { DollarSign, TrendingUp, Download, BarChart2, CheckCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from "recharts";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const monthlyEarnings = [
  { month: "Jan", gross: 12000, net: 9600 }, { month: "Feb", gross: 15000, net: 12000 },
  { month: "Mar", gross: 18000, net: 14400 }, { month: "Apr", gross: 22000, net: 17600 },
  { month: "May", gross: 28000, net: 22400 }, { month: "Jun", gross: 35000, net: 28000 },
];

const transactions = [
  { date: "Jun 3, 2025", desc: "Enrollment — Advanced Calculus (12 students)", amount: 4200, type: "credit" },
  { date: "Jun 1, 2025", desc: "Enrollment — Physics Mechanics (8 students)", amount: 2400, type: "credit" },
  { date: "May 28, 2025", desc: "Platform fee deduction (20%)", amount: -1600, type: "debit" },
  { date: "May 25, 2025", desc: "Enrollment — Differential Equations (5 students)", amount: 1750, type: "credit" },
  { date: "May 20, 2025", desc: "Withdrawal to bank account", amount: -20000, type: "debit" },
  { date: "May 18, 2025", desc: "Enrollment — Advanced Calculus (18 students)", amount: 6300, type: "credit" },
];

export default function TeacherEarnings() {
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [amount, setAmount] = useState(28000);
  const [history, setHistory] = useState(transactions);

  const handleWithdraw = () => {
    toast.success(`Withdrawal of ₹${amount.toLocaleString()} initiated successfully!`);
    setHistory([{ date: "Just now", desc: "Withdrawal to bank account", amount: -amount, type: "debit" }, ...history]);
    setAmount(0);
    setWithdrawOpen(false);
  };

  const exportCSV = () => {
    const csvData = [
      ["Date", "Description", "Amount", "Type"],
      ...history.map(t => [t.date, t.desc, t.amount.toString(), t.type])
    ].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Earnings_Statement.csv";
    link.click();
    toast.success("Statement downloaded successfully!");
  };

  return (
    <DashboardLayout title="Earnings & Revenue" subtitle="Track your income, commissions, and payout history">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Earnings", val: "₹1,83,950", sub: "All time" },
          { label: "This Month", val: "₹35,000", sub: "+25% vs last" },
          { label: "Available Balance", val: `₹${amount.toLocaleString()}`, sub: amount > 0 ? "Ready to withdraw" : "Next payout on 1st" },
          { label: "Platform Fee", val: "20%", sub: "Per transaction" },
        ].map((s, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-4">
            <div className="text-xs text-muted-foreground mb-2">{s.label}</div>
            <div className="text-2xl font-bold">{s.val}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-5 mb-6">
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold mb-4">Monthly Revenue (Gross vs Net)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyEarnings} barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 10, fontSize: 12 }} formatter={(v: number) => [`₹${v.toLocaleString()}`]} />
              <Bar dataKey="gross" name="Gross" fill="hsl(262 83% 57%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="net" name="Net (after fee)" fill="hsl(160 84% 39%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold mb-4">Revenue Growth Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthlyEarnings}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 10, fontSize: 12 }} formatter={(v: number) => [`₹${v.toLocaleString()}`]} />
              <Line dataKey="net" name="Net Earnings" stroke="hsl(262 83% 57%)" strokeWidth={2.5} dot={{ fill: "hsl(262 83% 57%)", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Transaction History</h3>
          <div className="flex gap-2">
            <button onClick={exportCSV} className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-xl text-xs font-semibold hover:bg-muted transition-colors">
              <Download className="w-3.5 h-3.5" /> Export
            </button>
            <button onClick={() => setWithdrawOpen(true)} disabled={amount === 0} className="flex items-center gap-2 px-3 py-1.5 gradient-primary text-white rounded-xl text-xs font-semibold hover:opacity-90 disabled:opacity-50">
              Withdraw ₹{amount.toLocaleString()}
            </button>
          </div>
        </div>
        <div className="space-y-2">
          {history.map((t, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-border hover:bg-muted/30 transition-colors">
              <div>
                <p className="text-sm font-medium">{t.desc}</p>
                <p className="text-xs text-muted-foreground">{t.date}</p>
              </div>
              <span className={`font-bold text-sm ${t.type === "credit" ? "text-accent" : "text-destructive"}`}>
                {t.type === "credit" ? "+" : ""}₹{Math.abs(t.amount).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Withdraw Modal */}
      <Dialog open={withdrawOpen} onOpenChange={setWithdrawOpen}>
        <DialogContent className="sm:max-w-[400px] bg-background">
          <DialogHeader>
            <DialogTitle>Request Payout</DialogTitle>
          </DialogHeader>
          <div className="py-4 text-center">
            <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-2xl mb-2 text-foreground">₹{amount.toLocaleString()}</h3>
            <p className="text-sm text-muted-foreground mb-4">You are withdrawing your entire available balance. This amount will be transferred to your linked bank account ending in **3491**.</p>
          </div>
          <DialogFooter className="sm:justify-center">
            <Button variant="outline" onClick={() => setWithdrawOpen(false)}>Cancel</Button>
            <Button onClick={handleWithdraw} className="bg-green-600 hover:bg-green-700 text-white gap-2">
              <CheckCircle className="w-4 h-4" /> Confirm Transfer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
