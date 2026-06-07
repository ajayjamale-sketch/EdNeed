import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { AlertCircle, Shield, CheckCircle, XCircle, Eye, BookOpen, MessageSquare, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const initialQueue = [
  { id: 1, type: "Course Content", item: "JEE Advanced Chemistry 2025 — Dr. Sharma", flag: "Unverified exam date claims", reported_by: "User #4829", time: "2h ago", priority: "high", icon: BookOpen },
  { id: 2, type: "Teacher Profile", item: "Prof. Unknown XYZ — Pending identity docs", flag: "No credential verification", reported_by: "System", time: "4h ago", priority: "high", icon: UserCheck },
  { id: 3, type: "Forum Post", item: "Post #4892 — 'How to cheat in exams'", flag: "Inappropriate content", reported_by: "User #1234", time: "1 day ago", priority: "medium", icon: MessageSquare },
  { id: 4, type: "Course Review", item: "'Excellent course!' — 5 stars — suspicious bulk reviews", flag: "Fake review pattern detected", reported_by: "AI System", time: "2 days ago", priority: "low", icon: AlertCircle },
  { id: 5, type: "Institution", item: "Fake Academy Patna — Cannot verify license", flag: "No valid institution license", reported_by: "Admin Alert", time: "3 days ago", priority: "high", icon: Shield },
];

const priorityColors: Record<string, string> = {
  high: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
  low: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
};

export default function AdminModeration() {
  const [queue, setQueue] = useState(initialQueue);
  const [viewItem, setViewItem] = useState<any>(null);

  const approve = (id: number) => {
    setQueue((prev) => prev.filter((q) => q.id !== id));
    toast.success("Content approved and cleared!");
  };

  const reject = (id: number) => {
    setQueue((prev) => prev.filter((q) => q.id !== id));
    toast.success("Content removed from platform.");
  };

  return (
    <DashboardLayout title="Content Moderation" subtitle="Review flagged content, reports, and pending approvals">
      <div className="grid grid-cols-3 gap-4 mb-5">
        {[
          { label: "Total in Queue", val: queue.length, color: "text-foreground" },
          { label: "High Priority", val: queue.filter((q) => q.priority === "high").length, color: "text-destructive" },
          { label: "Resolved Today", val: 12, color: "text-accent" },
        ].map((s, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-4 text-center">
            <div className={cn("text-3xl font-bold mb-1", s.color)}>{s.val}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {queue.length === 0 ? (
        <div className="text-center py-20">
          <Shield className="w-16 h-16 text-accent mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">All Clear!</h3>
          <p className="text-muted-foreground">No items in the moderation queue. Great job!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {queue.map((item) => (
            <div key={item.id} className={cn("bg-card border rounded-2xl p-5 transition-colors", item.priority === "high" ? "border-red-200 dark:border-red-900" : "border-border")}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", item.priority === "high" ? "bg-red-50 dark:bg-red-950" : "bg-muted")}>
                    <item.icon className={cn("w-4 h-4", item.priority === "high" ? "text-destructive" : "text-muted-foreground")} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-xs font-bold text-primary">{item.type}</span>
                      <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full capitalize", priorityColors[item.priority])}>
                        {item.priority} priority
                      </span>
                    </div>
                    <p className="font-semibold text-sm mb-1 leading-snug">{item.item}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="text-yellow-600 font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3" />{item.flag}</span>
                      <span>Reported by: {item.reported_by}</span>
                      <span>{item.time}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => setViewItem(item)} className="w-8 h-8 border border-border rounded-lg flex items-center justify-center hover:bg-muted transition-colors">
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => approve(item.id)} className="flex items-center gap-1.5 px-3 py-1.5 bg-accent text-white rounded-lg text-xs font-semibold hover:opacity-90">
                    <CheckCircle className="w-3 h-3" /> Approve
                  </button>
                  <button onClick={() => reject(item.id)} className="flex items-center gap-1.5 px-3 py-1.5 bg-destructive/10 text-destructive rounded-lg text-xs font-semibold hover:bg-destructive hover:text-white transition-colors">
                    <XCircle className="w-3 h-3" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- Review Item Modal --- */}
      <Dialog open={!!viewItem} onOpenChange={(open) => !open && setViewItem(null)}>
        <DialogContent className="sm:max-w-[500px] bg-background">
          <DialogHeader>
            <DialogTitle>Review Flagged Content</DialogTitle>
          </DialogHeader>
          {viewItem && (
            <div className="py-4 space-y-5">
              <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-xl border border-border">
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0", viewItem.priority === "high" ? "bg-red-50 dark:bg-red-950" : "bg-muted")}>
                  <viewItem.icon className={cn("w-6 h-6", viewItem.priority === "high" ? "text-destructive" : "text-muted-foreground")} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-primary">{viewItem.type}</span>
                    <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full capitalize", priorityColors[viewItem.priority])}>
                      {viewItem.priority} Priority
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg leading-snug">{viewItem.item}</h3>
                  <div className="text-xs text-muted-foreground mt-2">
                    Reported by <span className="font-medium text-foreground">{viewItem.reported_by}</span> • {viewItem.time}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-red-200 bg-red-50 dark:border-red-900/30 dark:bg-red-950/20">
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-semibold mb-1 text-sm">
                  <AlertCircle className="w-4 h-4" /> Reason for Flagging
                </div>
                <p className="text-sm text-red-800 dark:text-red-200">{viewItem.flag}</p>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                Please review the content carefully. Removing the content will delete it from the platform permanently and may penalize the offending user. Approving it will dismiss this report.
              </p>
            </div>
          )}
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setViewItem(null)}>Cancel</Button>
            {viewItem && (
              <>
                <Button onClick={() => { approve(viewItem.id); setViewItem(null); }} className="bg-emerald-600 hover:bg-emerald-700 text-white flex-1">
                  <CheckCircle className="w-4 h-4 mr-2" /> Approve Content
                </Button>
                <Button onClick={() => { reject(viewItem.id); setViewItem(null); }} variant="destructive" className="flex-1">
                  <XCircle className="w-4 h-4 mr-2" /> Remove Content
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
