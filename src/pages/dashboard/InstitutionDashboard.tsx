import React from 'react';
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  Building2, Users, GraduationCap, DollarSign, TrendingUp, 
  BarChart3, FileText, Settings, ShieldCheck, Mail
} from 'lucide-react';
import { cn } from "@/lib/utils";

export default function InstitutionDashboard() {
  return (
    <DashboardLayout title="Institution Dashboard" subtitle="Manage your entire campus digitally">
      <div className="space-y-8">
        
        {/* KPIs */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          <div className="bg-card p-5 rounded-2xl shadow-sm border border-border">
            <div className="flex justify-between"><span className="text-muted-foreground">Total Students</span><Users className="text-[#2563EB]" /></div>
            <p className="text-3xl font-bold mt-2">4,250</p>
            <p className="text-xs text-muted-foreground mt-1">Across 12 departments</p>
          </div>
          <div className="bg-card p-5 rounded-2xl shadow-sm border border-border">
            <div className="flex justify-between"><span className="text-muted-foreground">Active Faculty</span><GraduationCap className="text-[#7C3AED]" /></div>
            <p className="text-3xl font-bold mt-2">184</p>
            <p className="text-xs text-muted-foreground mt-1">98% attendance today</p>
          </div>
          <div className="bg-card p-5 rounded-2xl shadow-sm border border-border">
            <div className="flex justify-between"><span className="text-muted-foreground">Revenue (Q3)</span><DollarSign className="text-[#10B981]" /></div>
            <p className="text-3xl font-bold mt-2">₹1.2Cr</p>
            <p className="text-xs text-[#10B981] font-medium mt-1">↑ 12% vs last quarter</p>
          </div>
          <div className="bg-card p-5 rounded-2xl shadow-sm border border-border">
            <div className="flex justify-between"><span className="text-muted-foreground">Avg. Score</span><BarChart3 className="text-orange-500" /></div>
            <p className="text-3xl font-bold mt-2">78.4%</p>
            <p className="text-xs text-muted-foreground mt-1">Institution-wide average</p>
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Analytics */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-card rounded-2xl p-6 border border-border shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg">Admissions & Growth</h3>
                <select className="bg-muted text-sm px-3 py-1.5 rounded-lg border-none focus:ring-0">
                  <option>This Year</option>
                  <option>Last Year</option>
                </select>
              </div>
              <div className="h-64 flex items-center justify-center text-muted-foreground bg-muted/20 rounded-xl border border-border/50">
                <div className="text-center space-y-2">
                  <TrendingUp className="w-8 h-8 text-[#2563EB] mx-auto opacity-50" />
                  <p>Admissions chart visualization</p>
                </div>
              </div>
            </section>

            {/* Department Overview */}
            <section className="bg-card rounded-2xl p-6 border border-border shadow-sm">
              <h3 className="font-bold text-lg mb-4">Department Performance</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-muted-foreground bg-muted/50 rounded-lg">
                    <tr>
                      <th className="px-4 py-3 font-semibold rounded-l-lg">Department</th>
                      <th className="px-4 py-3 font-semibold">Head</th>
                      <th className="px-4 py-3 font-semibold">Students</th>
                      <th className="px-4 py-3 font-semibold rounded-r-lg">Avg. Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium">Computer Science</td>
                      <td className="px-4 py-3 text-muted-foreground">Dr. Alan Turing</td>
                      <td className="px-4 py-3">850</td>
                      <td className="px-4 py-3"><span className="text-green-500 font-semibold">82%</span></td>
                    </tr>
                    <tr className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3 font-medium">Mechanical Engg.</td>
                      <td className="px-4 py-3 text-muted-foreground">Dr. Sarah Connor</td>
                      <td className="px-4 py-3">620</td>
                      <td className="px-4 py-3"><span className="text-yellow-500 font-semibold">74%</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Quick Actions & Notifications */}
          <div className="space-y-8">
            <section className="bg-gradient-to-br from-[#2563EB]/10 to-[#7C3AED]/10 rounded-2xl p-6 border border-primary/10">
              <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-background flex flex-col items-center justify-center p-4 rounded-xl border border-border shadow-sm hover:border-primary/50 hover:text-primary transition-colors">
                  <FileText className="w-6 h-6 mb-2" />
                  <span className="text-xs font-semibold text-center">Generate Report</span>
                </button>
                <button className="bg-background flex flex-col items-center justify-center p-4 rounded-xl border border-border shadow-sm hover:border-primary/50 hover:text-primary transition-colors">
                  <ShieldCheck className="w-6 h-6 mb-2" />
                  <span className="text-xs font-semibold text-center">Manage Roles</span>
                </button>
                <button className="bg-background flex flex-col items-center justify-center p-4 rounded-xl border border-border shadow-sm hover:border-primary/50 hover:text-primary transition-colors">
                  <Mail className="w-6 h-6 mb-2" />
                  <span className="text-xs font-semibold text-center">Broadcast Mail</span>
                </button>
                <button className="bg-background flex flex-col items-center justify-center p-4 rounded-xl border border-border shadow-sm hover:border-primary/50 hover:text-primary transition-colors">
                  <Settings className="w-6 h-6 mb-2" />
                  <span className="text-xs font-semibold text-center">Campus Setup</span>
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
