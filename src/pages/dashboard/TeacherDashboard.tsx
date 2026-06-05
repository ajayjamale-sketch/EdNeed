import React from 'react';
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  Users, BookOpen, Clock, Calendar, CheckCircle, Target, TrendingUp, 
  DollarSign, FileText, Video, Bell, Upload
} from 'lucide-react';
import { cn } from "@/lib/utils";

export default function TeacherDashboard() {
  return (
    <DashboardLayout title="Teacher Dashboard" subtitle="Manage your courses and students">
      <div className="space-y-8">
        
        {/* KPIs */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-card p-5 rounded-2xl shadow-sm border border-border">
            <div className="flex justify-between"><span className="text-muted-foreground">Active Students</span><Users className="text-[#2563EB]" /></div>
            <p className="text-3xl font-bold mt-2">1,240</p>
            <p className="text-xs text-muted-foreground mt-1">+12% this month</p>
          </div>
          <div className="bg-card p-5 rounded-2xl shadow-sm border border-border">
            <div className="flex justify-between"><span className="text-muted-foreground">Total Revenue</span><DollarSign className="text-[#10B981]" /></div>
            <p className="text-3xl font-bold mt-2">₹45.2K</p>
            <p className="text-xs text-muted-foreground mt-1">₹5.2K this week</p>
          </div>
          <div className="bg-card p-5 rounded-2xl shadow-sm border border-border">
            <div className="flex justify-between"><span className="text-muted-foreground">Avg. Rating</span><Star className="text-yellow-500 fill-yellow-500" /></div>
            <p className="text-3xl font-bold mt-2">4.9/5</p>
            <p className="text-xs text-muted-foreground mt-1">From 842 reviews</p>
          </div>
          <div className="bg-card p-5 rounded-2xl shadow-sm border border-border">
            <div className="flex justify-between"><span className="text-muted-foreground">Live Classes</span><Video className="text-[#7C3AED]" /></div>
            <p className="text-3xl font-bold mt-2">12</p>
            <p className="text-xs text-muted-foreground mt-1">Scheduled this week</p>
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* My Courses */}
            <section className="bg-card rounded-2xl p-6 border border-border shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg">My Courses</h3>
                <button className="bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-2">
                  <Upload className="w-4 h-4" /> Create Course
                </button>
              </div>
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="flex flex-col sm:flex-row gap-4 p-4 border border-border rounded-xl">
                    <div className="w-full sm:w-32 h-24 bg-muted rounded-lg flex items-center justify-center">
                      <BookOpen className="w-8 h-8 text-muted-foreground/40" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">Advanced Physics Masterclass</h4>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> 840 students</span>
                        <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" /> ₹2,999</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="bg-primary text-white px-3 py-1.5 rounded-lg text-xs font-semibold">Edit Course</button>
                        <button className="bg-muted text-foreground px-3 py-1.5 rounded-lg text-xs font-semibold">View Analytics</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Assignments & Grading */}
            <section className="bg-card rounded-2xl p-6 border border-border shadow-sm">
              <h3 className="font-bold text-lg mb-4">Pending Assignments</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between items-center p-3 hover:bg-muted/50 rounded-xl transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText className="w-8 h-8 text-[#7C3AED] bg-[#7C3AED]/10 p-1.5 rounded-lg" />
                      <div>
                        <p className="font-medium text-sm">Thermodynamics Quiz #{i}</p>
                        <p className="text-xs text-muted-foreground">Class 11 Physics • 12 submissions</p>
                      </div>
                    </div>
                    <button className="text-xs font-semibold bg-secondary text-secondary-foreground px-3 py-1.5 rounded-lg">Grade</button>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            
            {/* Upcoming Schedule */}
            <section className="bg-card rounded-2xl p-6 border border-border shadow-sm">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Calendar className="w-5 h-5 text-primary" /> Today's Schedule</h3>
              <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Video className="w-4 h-4" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card border border-border p-3 rounded-xl shadow-sm">
                    <time className="text-xs font-medium text-primary mb-1 block">10:00 AM</time>
                    <p className="text-sm font-semibold">Live: Mechanics Pt 2</p>
                  </div>
                </div>
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card border border-border p-3 rounded-xl shadow-sm">
                    <time className="text-xs font-medium text-primary mb-1 block">02:30 PM</time>
                    <p className="text-sm font-semibold">1-on-1 Mentoring</p>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}

function Star({ className }: { className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
}
