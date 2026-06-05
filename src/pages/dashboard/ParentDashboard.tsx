import React from 'react';
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  Users, Calendar, Clock, TrendingUp, CheckCircle, AlertCircle,
  FileText, Activity, BookOpen, GraduationCap, DollarSign, Wallet
} from 'lucide-react';

export default function ParentDashboard() {
  return (
    <DashboardLayout title="Parent Dashboard" subtitle="Monitor your child's academic journey">
      <div className="space-y-8">
        
        {/* Children Selector */}
        <div className="flex gap-4 overflow-x-auto pb-2">
          <button className="flex items-center gap-3 px-4 py-2 bg-primary/10 border-2 border-primary rounded-xl text-primary font-semibold">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">S</div>
            Sarah Kumar (Class 10)
          </button>
          <button className="flex items-center gap-3 px-4 py-2 bg-card border-2 border-border rounded-xl text-muted-foreground hover:bg-muted font-semibold transition-colors">
            <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center">R</div>
            Rahul Kumar (Class 8)
          </button>
        </div>

        {/* KPIs */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-card p-5 rounded-2xl shadow-sm border border-border">
            <div className="flex justify-between"><span className="text-muted-foreground">Attendance</span><CheckCircle className="text-[#10B981]" /></div>
            <p className="text-3xl font-bold mt-2">94%</p>
            <p className="text-xs text-muted-foreground mt-1">Excellent standing</p>
          </div>
          <div className="bg-card p-5 rounded-2xl shadow-sm border border-border">
            <div className="flex justify-between"><span className="text-muted-foreground">Overall Grade</span><GraduationCap className="text-[#2563EB]" /></div>
            <p className="text-3xl font-bold mt-2">A-</p>
            <p className="text-xs text-muted-foreground mt-1">Top 15% of class</p>
          </div>
          <div className="bg-card p-5 rounded-2xl shadow-sm border border-border">
            <div className="flex justify-between"><span className="text-muted-foreground">Upcoming Tasks</span><Calendar className="text-[#7C3AED]" /></div>
            <p className="text-3xl font-bold mt-2">3</p>
            <p className="text-xs text-muted-foreground mt-1">Due this week</p>
          </div>
          <div className="bg-card p-5 rounded-2xl shadow-sm border border-border">
            <div className="flex justify-between"><span className="text-muted-foreground">Fee Status</span><Wallet className="text-red-500" /></div>
            <p className="text-3xl font-bold mt-2">Pending</p>
            <p className="text-xs text-red-500 font-medium mt-1">Due in 4 days</p>
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Recent Performance */}
          <section className="bg-card rounded-2xl p-6 border border-border shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Activity className="text-primary" /> Recent Performance</h3>
            <div className="space-y-4">
              {[
                { subject: 'Mathematics Mock Test', score: '88%', date: '2 days ago', color: 'text-green-500', bg: 'bg-green-500/10' },
                { subject: 'Physics Mid-Term', score: '74%', date: '1 week ago', color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
                { subject: 'Chemistry Quiz', score: '92%', date: '2 weeks ago', color: 'text-green-500', bg: 'bg-green-500/10' }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center p-3 hover:bg-muted rounded-xl transition-colors">
                  <div>
                    <p className="font-medium text-sm">{item.subject}</p>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-lg font-bold text-sm ${item.color} ${item.bg}`}>
                    {item.score}
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-sm font-semibold text-primary py-2 border border-primary/20 rounded-xl hover:bg-primary/5 transition-colors">
              View Detailed Report
            </button>
          </section>

          {/* Teacher Communication & Updates */}
          <section className="bg-card rounded-2xl p-6 border border-border shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Clock className="text-primary" /> Teacher Updates</h3>
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 group-hover:bg-primary group-hover:text-white transition-colors">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card border border-border p-3 rounded-xl shadow-sm">
                  <time className="text-xs font-medium text-primary mb-1 block">Today</time>
                  <p className="text-sm font-semibold">Mr. Sharma (Math)</p>
                  <p className="text-xs text-muted-foreground mt-1">Sarah is doing exceptionally well in Calculus. Keep it up!</p>
                </div>
              </div>
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 group-hover:bg-primary group-hover:text-white transition-colors">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card border border-border p-3 rounded-xl shadow-sm">
                  <time className="text-xs font-medium text-primary mb-1 block">Yesterday</time>
                  <p className="text-sm font-semibold">Ms. Reddy (Physics)</p>
                  <p className="text-xs text-muted-foreground mt-1">Please ensure Sarah completes the pending Thermodynamics assignment.</p>
                </div>
              </div>
            </div>
          </section>

        </div>

      </div>
    </DashboardLayout>
  );
}
