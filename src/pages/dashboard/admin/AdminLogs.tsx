import DashboardLayout from "@/components/layout/DashboardLayout";
import { Database, Search, Shield, AlertTriangle, Info, Terminal, Calendar, ArrowDownCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const mockLogs = [
  { id: "log-1", type: "Security", message: "Multiple failed login attempts detected", source: "Auth Service", timestamp: "10 mins ago", level: "critical" },
  { id: "log-2", type: "System", message: "Database backup completed successfully", source: "Cron Job", timestamp: "1 hour ago", level: "info" },
  { id: "log-3", type: "User", message: "New bulk institution import started", source: "Admin Panel", timestamp: "2 hours ago", level: "info" },
  { id: "log-4", type: "API", message: "High latency on course catalog endpoint", source: "Course Service", timestamp: "3 hours ago", level: "warning" },
  { id: "log-5", type: "Payment", message: "Payment gateway webhook timeout", source: "Billing Service", timestamp: "5 hours ago", level: "critical" },
  { id: "log-6", type: "System", message: "Server resource utilization > 80%", source: "Monitor", timestamp: "1 day ago", level: "warning" },
];

export default function AdminLogs() {
  const [filter, setFilter] = useState("all");

  const filtered = mockLogs.filter(log => filter === "all" || log.level === filter);

  return (
    <DashboardLayout title="Platform Logs" subtitle="System events, security audits, and activity logs">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card border border-border p-4 rounded-2xl">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search logs by keyword or trace ID..."
              className="w-full pl-9 pr-4 py-2 bg-muted border-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-muted rounded-xl p-1 overflow-x-auto custom-scrollbar">
              {["All", "Info", "Warning", "Critical"].map((f) => (
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
            <button className="px-4 py-2 border border-border bg-card text-foreground rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-muted transition-colors">
              <ArrowDownCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>

        {/* Logs Table / List */}
        <div className="glass-card-premium rounded-3xl overflow-hidden">
          <div className="divide-y divide-border">
            {filtered.map((log) => (
              <div key={log.id} className="p-5 hover:bg-muted/50 transition-colors flex items-start sm:items-center gap-4 flex-col sm:flex-row">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                  log.level === "critical" ? "bg-red-100 text-red-600 dark:bg-red-900/30" :
                  log.level === "warning" ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30" :
                  "bg-blue-100 text-blue-600 dark:bg-blue-900/30"
                )}>
                  {log.level === "critical" ? <Shield className="w-5 h-5" /> :
                   log.level === "warning" ? <AlertTriangle className="w-5 h-5" /> :
                   <Info className="w-5 h-5" />}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{log.type}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><Terminal className="w-3 h-3" /> {log.source}</span>
                  </div>
                  <p className="font-medium text-sm sm:text-base text-foreground truncate">{log.message}</p>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground sm:w-40 sm:justify-end flex-shrink-0">
                  <Calendar className="w-4 h-4" />
                  {log.timestamp}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
