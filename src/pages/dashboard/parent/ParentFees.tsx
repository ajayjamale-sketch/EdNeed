import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { DollarSign, CheckCircle, Clock, AlertCircle, CreditCard, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const fees = [
  { term: "Annual Fee 2025–26", due: "Apr 30, 2025", amount: 45000, paid: 45000, status: "paid", date: "Apr 2, 2025", child: "Riya" },
  { term: "Transport Fee — Q1", due: "Apr 15, 2025", amount: 6000, paid: 6000, status: "paid", date: "Apr 5, 2025", child: "Riya" },
  { term: "Annual Fee 2025–26", due: "Apr 30, 2025", amount: 38000, paid: 38000, status: "paid", date: "Apr 10, 2025", child: "Aryan" },
  { term: "Activity Fee — Q2", due: "Jul 15, 2025", amount: 3500, paid: 0, status: "upcoming", date: "", child: "Riya" },
  { term: "Transport Fee — Q2", due: "Jul 15, 2025", amount: 6000, paid: 0, status: "upcoming", date: "", child: "Aryan" },
  { term: "Lab Fee — Science", due: "Jun 20, 2025", amount: 2500, paid: 0, status: "overdue", date: "", child: "Aryan" },
];

const statusCfg: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  paid: { label: "Paid", color: "text-accent bg-accent/10", icon: CheckCircle },
  upcoming: { label: "Upcoming", color: "text-primary bg-primary/10", icon: Clock },
  overdue: { label: "Overdue", color: "text-destructive bg-destructive/10", icon: AlertCircle },
};

export default function ParentFees() {
  const [child, setChild] = useState("all");
  const filtered = fees.filter((f) => child === "all" || f.child === child);
  const totalDue = filtered.filter((f) => f.status !== "paid").reduce((a, f) => a + f.amount, 0);
  const totalPaid = filtered.filter((f) => f.status === "paid").reduce((a, f) => a + f.paid, 0);

  return (
    <DashboardLayout title="Fee Management" subtitle="Track and pay school fees for your children">
      <div className="flex gap-2 mb-6">
        {["all", "Riya", "Aryan"].map((c) => (
          <button key={c} onClick={() => setChild(c)} className={cn("px-4 py-2 rounded-xl text-sm font-semibold border transition-all", child === c ? "gradient-primary text-white border-transparent" : "bg-muted border-transparent text-muted-foreground hover:text-foreground")}>
            {c === "all" ? "All Children" : c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-card border border-border rounded-2xl p-4">
          <DollarSign className="w-4 h-4 text-accent mb-2" />
          <div className="text-2xl font-bold">₹{totalPaid.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">Total Paid</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-4">
          <Clock className="w-4 h-4 text-primary mb-2" />
          <div className="text-2xl font-bold">₹{totalDue.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">Amount Due</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-4">
          <AlertCircle className="w-4 h-4 text-destructive mb-2" />
          <div className="text-2xl font-bold">{filtered.filter((f) => f.status === "overdue").length}</div>
          <div className="text-xs text-muted-foreground">Overdue Fees</div>
        </div>
      </div>

      <div className="space-y-3 max-w-2xl">
        {filtered.map((f, i) => {
          const cfg = statusCfg[f.status];
          return (
            <div key={i} className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">{f.term}</span>
                    <span className="text-xs bg-muted px-2 py-0.5 rounded-full">{f.child}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Due: {f.due} {f.date && `· Paid: ${f.date}`}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-bold">₹{f.amount.toLocaleString()}</div>
                  <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", cfg.color)}>{cfg.label}</span>
                </div>
              </div>
              {f.status !== "paid" && (
                <div className="mt-3 flex gap-2">
                  <button onClick={() => toast.success(`Processing payment of ₹${f.amount.toLocaleString()} for ${f.term}...`)} className="flex items-center gap-2 px-4 py-2 gradient-primary text-white rounded-xl text-xs font-semibold hover:opacity-90">
                    <CreditCard className="w-3.5 h-3.5" /> Pay Now
                  </button>
                  <button onClick={() => toast.success("Downloading fee receipt...")} className="flex items-center gap-2 px-4 py-2 border border-border rounded-xl text-xs font-semibold hover:bg-muted transition-colors">
                    <Download className="w-3.5 h-3.5" /> Receipt
                  </button>
                </div>
              )}
              {f.status === "paid" && (
                <button onClick={() => toast.success("Downloading receipt...")} className="mt-3 flex items-center gap-2 px-4 py-2 border border-border rounded-xl text-xs font-semibold hover:bg-muted transition-colors">
                  <Download className="w-3.5 h-3.5" /> Download Receipt
                </button>
              )}
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
