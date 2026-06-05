import React from 'react';
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  Users, Calendar, Clock, Video, FileText, CheckCircle, Target,
  Star, MessageSquare
} from 'lucide-react';

export default function CounselorDashboard() {
  return (
    <DashboardLayout title="Counselor Dashboard" subtitle="Manage your counseling sessions and students">
      <div className="space-y-8">
        
        {/* KPIs */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-card p-5 rounded-2xl shadow-sm border border-border">
            <div className="flex justify-between"><span className="text-muted-foreground">Active Students</span><Users className="text-[#2563EB]" /></div>
            <p className="text-3xl font-bold mt-2">142</p>
            <p className="text-xs text-muted-foreground mt-1">Currently mentoring</p>
          </div>
          <div className="bg-card p-5 rounded-2xl shadow-sm border border-border">
            <div className="flex justify-between"><span className="text-muted-foreground">Sessions Today</span><Video className="text-[#10B981]" /></div>
            <p className="text-3xl font-bold mt-2">6</p>
            <p className="text-xs text-muted-foreground mt-1">2 completed, 4 remaining</p>
          </div>
          <div className="bg-card p-5 rounded-2xl shadow-sm border border-border">
            <div className="flex justify-between"><span className="text-muted-foreground">Avg. Rating</span><Star className="text-yellow-500 fill-yellow-500" /></div>
            <p className="text-3xl font-bold mt-2">4.9/5</p>
            <p className="text-xs text-muted-foreground mt-1">From 85 reviews</p>
          </div>
          <div className="bg-card p-5 rounded-2xl shadow-sm border border-border">
            <div className="flex justify-between"><span className="text-muted-foreground">Reports Due</span><FileText className="text-orange-500" /></div>
            <p className="text-3xl font-bold mt-2">12</p>
            <p className="text-xs text-muted-foreground mt-1">Aptitude assessments pending</p>
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Schedule */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-card rounded-2xl p-6 border border-border shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg flex items-center gap-2"><Calendar className="text-primary" /> Today's Sessions</h3>
                <button className="text-sm font-semibold text-primary hover:underline">View Calendar</button>
              </div>
              <div className="space-y-4">
                {[
                  { time: '10:00 AM', name: 'Rahul Sharma', topic: 'Engineering vs Medical track', status: 'Completed', color: 'bg-green-500/10 text-green-600' },
                  { time: '02:00 PM', name: 'Priya Patel', topic: 'US University Applications', status: 'Upcoming', color: 'bg-blue-500/10 text-blue-600' },
                  { time: '04:30 PM', name: 'Amit Kumar', topic: 'Aptitude Test Review', status: 'Upcoming', color: 'bg-blue-500/10 text-blue-600' }
                ].map((session, i) => (
                  <div key={i} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-border rounded-xl hover:shadow-sm transition-shadow bg-background">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                        {session.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold">{session.name}</h4>
                        <p className="text-xs text-muted-foreground flex items-center gap-1"><Target className="w-3.5 h-3.5" /> {session.topic}</p>
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-0 flex items-center gap-4 w-full sm:w-auto">
                      <div className="text-sm font-semibold flex items-center gap-1.5"><Clock className="w-4 h-4 text-muted-foreground" /> {session.time}</div>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${session.color}`}>{session.status}</div>
                      {session.status === 'Upcoming' && (
                        <button className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90"><Video className="w-4 h-4" /></button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Quick Stats / Actions */}
          <div className="space-y-8">
            <section className="bg-card rounded-2xl p-6 border border-border shadow-sm">
              <h3 className="font-bold text-lg mb-4">Pending Reports</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between items-center p-3 border border-border rounded-xl">
                    <div className="flex items-center gap-3">
                      <FileText className="text-orange-500 bg-orange-500/10 p-2 rounded-lg w-8 h-8" />
                      <div>
                        <p className="font-medium text-sm">Career Roadmap</p>
                        <p className="text-xs text-muted-foreground">For Neha Singh</p>
                      </div>
                    </div>
                    <button className="text-xs font-semibold text-primary">Draft</button>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-card rounded-2xl p-6 border border-border shadow-sm">
              <h3 className="font-bold text-lg mb-4">Messages</h3>
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold">U</div>
                    <div>
                      <div className="flex justify-between items-center w-full">
                        <p className="text-sm font-semibold">Student Name</p>
                        <span className="text-[10px] text-muted-foreground">12m</span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">Could we reschedule tomorrow's session?</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
