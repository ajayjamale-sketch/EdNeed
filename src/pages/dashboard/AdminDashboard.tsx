import React from 'react';
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  Users, DollarSign, Activity, ShieldAlert, BarChart3, 
  Settings, Globe, Database, UserCheck, AlertTriangle
} from 'lucide-react';
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  return (
    <DashboardLayout title="Admin Dashboard" subtitle="Platform Overview & System Management">
      <div className="space-y-8">
        
        {/* KPIs */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          <div className="bg-card p-5 rounded-2xl shadow-sm border border-border">
            <div className="flex justify-between"><span className="text-muted-foreground">Total Users</span><Users className="text-[#2563EB]" /></div>
            <p className="text-3xl font-bold mt-2">1.2M</p>
            <p className="text-xs text-green-500 font-medium mt-1">↑ 4.2% this month</p>
          </div>
          <div className="bg-card p-5 rounded-2xl shadow-sm border border-border">
            <div className="flex justify-between"><span className="text-muted-foreground">Platform Revenue</span><DollarSign className="text-[#10B981]" /></div>
            <p className="text-3xl font-bold mt-2">$2.4M</p>
            <p className="text-xs text-green-500 font-medium mt-1">↑ 12% this quarter</p>
          </div>
          <div className="bg-card p-5 rounded-2xl shadow-sm border border-border">
            <div className="flex justify-between"><span className="text-muted-foreground">System Status</span><Activity className="text-[#7C3AED]" /></div>
            <p className="text-3xl font-bold mt-2">99.9%</p>
            <p className="text-xs text-muted-foreground mt-1">All systems operational</p>
          </div>
          <div className="bg-card p-5 rounded-2xl shadow-sm border border-border">
            <div className="flex justify-between"><span className="text-muted-foreground">Pending Verifications</span><ShieldAlert className="text-orange-500" /></div>
            <p className="text-3xl font-bold mt-2">142</p>
            <p className="text-xs text-orange-500 font-medium mt-1">Requires attention</p>
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Area */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-card rounded-2xl p-6 border border-border shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg">Revenue & Growth</h3>
                <button className="bg-muted px-3 py-1.5 rounded-lg text-sm">Download Report</button>
              </div>
              <div className="h-64 flex items-center justify-center text-muted-foreground bg-muted/20 rounded-xl border border-border/50">
                <div className="text-center space-y-2">
                  <BarChart3 className="w-8 h-8 text-[#2563EB] mx-auto opacity-50" />
                  <p>Global Analytics Chart</p>
                </div>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-6 border border-border shadow-sm">
              <h3 className="font-bold text-lg mb-4">Recent Verification Requests</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-muted-foreground bg-muted/50 rounded-lg">
                    <tr>
                      <th className="px-4 py-3 font-semibold rounded-l-lg">Name / Entity</th>
                      <th className="px-4 py-3 font-semibold">Type</th>
                      <th className="px-4 py-3 font-semibold">Date Submitted</th>
                      <th className="px-4 py-3 font-semibold rounded-r-lg">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium">Dr. Alan Smith</td>
                      <td className="px-4 py-3"><span className="bg-blue-500/10 text-blue-600 px-2 py-1 rounded text-xs font-bold">Tutor</span></td>
                      <td className="px-4 py-3 text-muted-foreground">2 hours ago</td>
                      <td className="px-4 py-3">
                        <button className="text-primary font-semibold hover:underline mr-3">Review</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium">Delhi Public School</td>
                      <td className="px-4 py-3"><span className="bg-purple-500/10 text-purple-600 px-2 py-1 rounded text-xs font-bold">Institution</span></td>
                      <td className="px-4 py-3 text-muted-foreground">5 hours ago</td>
                      <td className="px-4 py-3">
                        <button className="text-primary font-semibold hover:underline mr-3">Review</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            <section className="bg-card rounded-2xl p-6 border border-border shadow-sm">
              <h3 className="font-bold text-lg mb-4">System Alerts</h3>
              <div className="space-y-4">
                <div className="flex gap-3 items-start">
                  <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold">High Server Load</h4>
                    <p className="text-xs text-muted-foreground">Database CPU utilization at 85% in Asia-South region.</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold">Multiple Failed Logins</h4>
                    <p className="text-xs text-muted-foreground">Spike in failed authentication attempts from IP range.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-card rounded-2xl p-6 border border-border shadow-sm">
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-border hover:border-primary/50 hover:text-primary transition-colors">
                  <UserCheck className="w-6 h-6 mb-2" />
                  <span className="text-xs font-semibold">Approvals</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-border hover:border-primary/50 hover:text-primary transition-colors">
                  <Globe className="w-6 h-6 mb-2" />
                  <span className="text-xs font-semibold">Content</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-border hover:border-primary/50 hover:text-primary transition-colors">
                  <Database className="w-6 h-6 mb-2" />
                  <span className="text-xs font-semibold">Database</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-border hover:border-primary/50 hover:text-primary transition-colors">
                  <Settings className="w-6 h-6 mb-2" />
                  <span className="text-xs font-semibold">Settings</span>
                </button>
              </div>
            </section>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
