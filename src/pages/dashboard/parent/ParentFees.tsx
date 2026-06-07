import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { DollarSign, CheckCircle, Clock, AlertCircle, CreditCard, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const initialFees = [
  { id: 1, term: "Annual Fee 2025–26", due: "Apr 30, 2025", amount: 45000, paid: 45000, status: "paid", date: "Apr 2, 2025", child: "Riya" },
  { id: 2, term: "Transport Fee — Q1", due: "Apr 15, 2025", amount: 6000, paid: 6000, status: "paid", date: "Apr 5, 2025", child: "Riya" },
  { id: 3, term: "Annual Fee 2025–26", due: "Apr 30, 2025", amount: 38000, paid: 38000, status: "paid", date: "Apr 10, 2025", child: "Aryan" },
  { id: 4, term: "Activity Fee — Q2", due: "Jul 15, 2025", amount: 3500, paid: 0, status: "upcoming", date: "", child: "Riya" },
  { id: 5, term: "Transport Fee — Q2", due: "Jul 15, 2025", amount: 6000, paid: 0, status: "upcoming", date: "", child: "Aryan" },
  { id: 6, term: "Lab Fee — Science", due: "Jun 20, 2025", amount: 2500, paid: 0, status: "overdue", date: "", child: "Aryan" },
];

const statusCfg: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  paid: { label: "Paid", color: "text-accent bg-accent/10", icon: CheckCircle },
  upcoming: { label: "Upcoming", color: "text-primary bg-primary/10", icon: Clock },
  overdue: { label: "Overdue", color: "text-destructive bg-destructive/10", icon: AlertCircle },
};

export default function ParentFees() {
  const [child, setChild] = useState("all");
  const [feesList, setFeesList] = useState(initialFees);
  const [payModalOpen, setPayModalOpen] = useState<any>(null);

  const filtered = feesList.filter((f) => child === "all" || f.child === child);
  const totalDue = filtered.filter((f) => f.status !== "paid").reduce((a, f) => a + f.amount, 0);
  const totalPaid = filtered.filter((f) => f.status === "paid").reduce((a, f) => a + f.paid, 0);

  const handlePay = () => {
    if (!payModalOpen) return;
    setFeesList(prev => prev.map(f => {
      if (f.id === payModalOpen.id) {
        return { ...f, status: "paid", paid: f.amount, date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) };
      }
      return f;
    }));
    toast.success(`Payment of ₹${payModalOpen.amount.toLocaleString()} successful!`);
    setPayModalOpen(null);
  };

  const downloadReceipt = (fee: any) => {
    const csvData = [
      ["Receipt Number", `REC-${Math.floor(Math.random() * 100000)}`],
      ["Date", fee.date || new Date().toLocaleDateString()],
      ["Student", fee.child],
      ["Fee Type", fee.term],
      ["Amount Paid", `Rs. ${fee.amount}`],
      ["Status", "PAID"]
    ].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Receipt_${fee.term.replace(/ /g, "_")}.csv`;
    link.click();
    toast.success("Receipt downloaded successfully!");
  };

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
                  <button onClick={() => setPayModalOpen(f)} className="flex items-center gap-2 px-4 py-2 gradient-primary text-white rounded-xl text-xs font-semibold hover:opacity-90">
                    <CreditCard className="w-3.5 h-3.5" /> Pay Now
                  </button>
                  <button onClick={() => downloadReceipt(f)} className="flex items-center gap-2 px-4 py-2 border border-border rounded-xl text-xs font-semibold hover:bg-muted transition-colors">
                    <Download className="w-3.5 h-3.5" /> Invoice
                  </button>
                </div>
              )}
              {f.status === "paid" && (
                <button onClick={() => downloadReceipt(f)} className="mt-3 flex items-center gap-2 px-4 py-2 border border-border rounded-xl text-xs font-semibold hover:bg-muted transition-colors">
                  <Download className="w-3.5 h-3.5" /> Download Receipt
                </button>
              )}
            </div>
          );
        })}
      </div>

      <Dialog open={!!payModalOpen} onOpenChange={(open) => !open && setPayModalOpen(null)}>
        <DialogContent className="sm:max-w-[400px] bg-background">
          <DialogHeader>
            <DialogTitle>Complete Payment</DialogTitle>
          </DialogHeader>
          <div className="py-4 text-center">
            <div className="w-16 h-16 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-2xl mb-1 text-foreground">₹{payModalOpen?.amount.toLocaleString()}</h3>
            <p className="text-sm font-semibold mb-1 text-foreground">{payModalOpen?.term}</p>
            <p className="text-xs text-muted-foreground mb-4">Student: {payModalOpen?.child}</p>
            
            <div className="text-left bg-muted p-4 rounded-xl mb-4">
              <div className="flex justify-between text-sm mb-2"><span className="text-muted-foreground">Subtotal</span><span className="font-medium">₹{payModalOpen?.amount.toLocaleString()}</span></div>
              <div className="flex justify-between text-sm mb-2"><span className="text-muted-foreground">Convenience Fee</span><span className="font-medium">₹0</span></div>
              <div className="flex justify-between text-sm font-bold pt-2 border-t border-border mt-2"><span>Total</span><span>₹{payModalOpen?.amount.toLocaleString()}</span></div>
            </div>
          </div>
          <DialogFooter className="sm:justify-center">
            <Button variant="outline" onClick={() => setPayModalOpen(null)}>Cancel</Button>
            <Button onClick={handlePay} className="bg-primary hover:bg-primary/90 text-white gap-2">
              Pay ₹{payModalOpen?.amount.toLocaleString()}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
