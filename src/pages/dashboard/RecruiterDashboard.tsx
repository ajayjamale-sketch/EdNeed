import React from 'react';
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  Briefcase, Users, FileText, CheckCircle, Search, 
  MapPin, Clock, DollarSign, Building2
} from 'lucide-react';
import { cn } from "@/lib/utils";

export default function RecruiterDashboard() {
  return (
    <DashboardLayout title="Recruiter Dashboard" subtitle="Find and hire the best campus talent">
      <div className="space-y-8">
        
        {/* KPIs */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-card p-5 rounded-2xl shadow-sm border border-border">
            <div className="flex justify-between"><span className="text-muted-foreground">Active Jobs</span><Briefcase className="text-[#2563EB]" /></div>
            <p className="text-3xl font-bold mt-2">14</p>
            <p className="text-xs text-muted-foreground mt-1">3 closing this week</p>
          </div>
          <div className="bg-card p-5 rounded-2xl shadow-sm border border-border">
            <div className="flex justify-between"><span className="text-muted-foreground">Total Applicants</span><Users className="text-[#10B981]" /></div>
            <p className="text-3xl font-bold mt-2">842</p>
            <p className="text-xs text-muted-foreground mt-1">+124 this week</p>
          </div>
          <div className="bg-card p-5 rounded-2xl shadow-sm border border-border">
            <div className="flex justify-between"><span className="text-muted-foreground">Shortlisted</span><CheckCircle className="text-[#7C3AED]" /></div>
            <p className="text-3xl font-bold mt-2">56</p>
            <p className="text-xs text-muted-foreground mt-1">Awaiting interviews</p>
          </div>
          <div className="bg-card p-5 rounded-2xl shadow-sm border border-border">
            <div className="flex justify-between"><span className="text-muted-foreground">Institutions</span><Building2 className="text-orange-500" /></div>
            <p className="text-3xl font-bold mt-2">8</p>
            <p className="text-xs text-muted-foreground mt-1">Campus drives active</p>
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-card rounded-2xl p-6 border border-border shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg">Active Job Postings</h3>
                <button className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold">Post New Job</button>
              </div>
              <div className="space-y-4">
                {[
                  { title: 'Software Engineer Intern', location: 'Bangalore, India', applicants: 145, status: 'Active', type: 'Internship' },
                  { title: 'Data Science Fresher', location: 'Remote', applicants: 320, status: 'Active', type: 'Full-time' },
                  { title: 'UI/UX Designer', location: 'Mumbai, India', applicants: 85, status: 'Closing Soon', type: 'Full-time' }
                ].map((job, i) => (
                  <div key={i} className="p-4 border border-border rounded-xl hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-lg">{job.title}</h4>
                      <span className={`px-2 py-1 text-xs font-bold rounded-lg ${job.status === 'Active' ? 'bg-green-500/10 text-green-600' : 'bg-orange-500/10 text-orange-600'}`}>{job.status}</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                      <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {job.type}</span>
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {job.applicants} Applicants</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((a) => (
                          <div key={a} className="w-8 h-8 rounded-full border-2 border-card bg-muted flex items-center justify-center text-[10px] font-bold">U{a}</div>
                        ))}
                        <div className="w-8 h-8 rounded-full border-2 border-card bg-background flex items-center justify-center text-[10px] font-bold">+{job.applicants - 3}</div>
                      </div>
                      <button className="text-sm font-semibold text-primary hover:underline">View Applicants</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <section className="bg-card rounded-2xl p-6 border border-border shadow-sm">
              <h3 className="font-bold text-lg mb-4">Top Candidates Match</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center font-bold text-primary shrink-0">
                      C{i}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold">Candidate Name</h4>
                      <p className="text-xs text-muted-foreground">B.Tech Computer Science</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-bold text-green-600 bg-green-500/10 px-2 py-0.5 rounded">98% Match</span>
                        <span className="text-[10px] text-muted-foreground border border-border px-2 py-0.5 rounded">ReactJS</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 border border-border py-2 rounded-xl text-sm font-semibold hover:bg-muted transition-colors">View All Recommendations</button>
            </section>

            <section className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-primary/10">
              <h3 className="font-bold text-lg mb-2">Campus Drive</h3>
              <p className="text-sm text-muted-foreground mb-4">Connect directly with top institutions to hire freshers.</p>
              <button className="bg-primary text-white w-full py-2 rounded-xl text-sm font-semibold">Explore Colleges</button>
            </section>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
