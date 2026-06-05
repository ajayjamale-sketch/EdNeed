import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Briefcase, Users, CheckSquare, TrendingUp, Star, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const pipelineData = [
  { stage: "Applied", count: 312 }, { stage: "Screened", count: 185 },
  { stage: "Shortlisted", count: 68 }, { stage: "Interviewed", count: 32 },
  { stage: "Offered", count: 12 }, { stage: "Hired", count: 8 },
];

const recentCandidates = [
  { name: "Rahul Sharma", role: "Software Engineering Intern", skills: ["Python", "React", "ML"], cgpa: 9.1, college: "IIT Delhi", status: "shortlisted", initials: "RS", color: "bg-blue-500" },
  { name: "Priya Mehta", role: "Data Science Associate", skills: ["Python", "SQL", "Statistics"], cgpa: 8.7, college: "NIT Trichy", status: "interviewed", initials: "PM", color: "bg-purple-500" },
  { name: "Arjun Nair", role: "Software Engineering Intern", skills: ["Java", "Spring Boot", "AWS"], cgpa: 8.9, college: "BITS Pilani", status: "offered", initials: "AN", color: "bg-green-500" },
  { name: "Sneha Roy", role: "UI/UX Design Intern", skills: ["Figma", "Adobe XD", "Sketch"], cgpa: 8.2, college: "NID Delhi", status: "applied", initials: "SR", color: "bg-orange-500" },
];

const statusColors: Record<string, string> = {
  applied: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  shortlisted: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
  interviewed: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  offered: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  rejected: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
};

export default function RecruiterDashboard() {
  return (
    <DashboardLayout title="Recruiter Dashboard" subtitle="Post opportunities, review candidates, and manage hiring pipeline">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Active Listings", val: "4", icon: Briefcase, color: "text-blue-500 bg-blue-50 dark:bg-blue-950" },
          { label: "Total Applicants", val: "312", icon: Users, color: "text-purple-500 bg-purple-50 dark:bg-purple-950" },
          { label: "Shortlisted", val: "68", icon: CheckSquare, color: "text-accent bg-accent/10" },
          { label: "Hired This Month", val: "8", icon: TrendingUp, color: "text-green-500 bg-green-50 dark:bg-green-950" },
        ].map((s, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-5">
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center mb-3", s.color.split(" ").slice(1).join(" "))}>
              <s.icon className={cn("w-4 h-4", s.color.split(" ")[0])} />
            </div>
            <div className="text-2xl font-bold">{s.val}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mb-6">
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold mb-4">Hiring Pipeline Funnel</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={pipelineData} layout="vertical" barSize={18}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="stage" type="category" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} width={70} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 10, fontSize: 12 }} />
              <Bar dataKey="count" fill="hsl(221 83% 53%)" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Candidates</h3>
            <Link to="/dashboard/recruiter/candidates" className="text-xs text-primary font-semibold hover:underline flex items-center gap-1">All <ChevronRight className="w-3.5 h-3.5" /></Link>
          </div>
          <div className="space-y-3">
            {recentCandidates.map((c, i) => (
              <div key={i} onClick={() => toast.success(`Reviewing ${c.name}'s profile...`)} className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary/30 cursor-pointer transition-colors">
                <div className={cn("w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0", c.color)}>{c.initials}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm">{c.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{c.role} · {c.college}</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {c.skills.slice(0, 2).map((s) => <span key={s} className="text-[10px] bg-muted px-1.5 py-0.5 rounded">{s}</span>)}
                    <span className="text-xs font-semibold text-accent">CGPA: {c.cgpa}</span>
                  </div>
                </div>
                <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full capitalize flex-shrink-0", statusColors[c.status])}>{c.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold mb-2">Post a New Opportunity</h3>
            <p className="text-white/70 text-sm mb-4">Reach 2M+ students across India's top colleges and universities. Your posting goes live instantly.</p>
            <div className="flex items-center gap-4 text-sm text-white/80">
              <span>✓ 2M+ student network</span>
              <span>✓ AI-powered matching</span>
              <span>✓ Instant shortlisting</span>
            </div>
          </div>
          <Link to="/dashboard/recruiter/opportunities" className="flex-shrink-0 px-5 py-2.5 bg-white text-primary rounded-xl text-sm font-bold hover:bg-white/90 transition-colors ml-4">
            Post Now →
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
