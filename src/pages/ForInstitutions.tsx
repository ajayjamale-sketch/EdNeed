import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import {
  Building2, Users, BarChart3, Calendar, DollarSign, MessageSquare,
  CheckCircle, ArrowRight, Shield, FileText, TrendingUp, Bell,
  Zap, Star, Globe, BookOpen, Award
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const features = [
  { icon: Users, title: "Student Management", desc: "Manage all student records, academic profiles, and enrollment data from a centralized admin dashboard with powerful search and filter tools.", color: "blue" },
  { icon: Calendar, title: "Attendance Tracking", desc: "Real-time attendance management with automated alerts to parents for low attendance. Generate detailed monthly attendance reports instantly.", color: "purple" },
  { icon: DollarSign, title: "Fee Management", desc: "Streamline fee collection with online payment integration. Track payments, generate receipts, send reminders, and manage defaulters.", color: "green" },
  { icon: FileText, title: "Result Management", desc: "Publish exam results, generate report cards, and analyze class-wise performance trends with detailed subject-level breakdowns.", color: "orange" },
  { icon: MessageSquare, title: "Parent Communication", desc: "Send announcements, circulars, and direct messages to parents. Enable two-way communication between teachers and parents.", color: "teal" },
  { icon: BarChart3, title: "Analytics & Reporting", desc: "Comprehensive institutional analytics covering attendance, academic performance, fee collection, and teacher efficiency. One-click PDF reports.", color: "pink" },
];

const colorMap: Record<string, string> = {
  blue: "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
  purple: "bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
  green: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
  orange: "bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400",
  teal: "bg-teal-100 text-teal-600 dark:bg-teal-950 dark:text-teal-400",
  pink: "bg-pink-100 text-pink-600 dark:bg-pink-950 dark:text-pink-400",
};

const institutionTypes = [
  { emoji: "🏫", title: "K-12 Schools", desc: "Complete school management from Class 1 to Class 12 including all CBSE, ICSE, and State Board requirements." },
  { emoji: "🏛️", title: "Colleges & Universities", desc: "Higher education management with course registration, exam management, and student placement tracking." },
  { emoji: "📚", title: "Coaching Institutes", desc: "Specialized tools for JEE, NEET, UPSC, and other competitive exam coaching centers." },
  { emoji: "🎓", title: "Skill Development Centers", desc: "Vocational training and skill development program management with certification tracking." },
];

const testimonials = [
  { name: "Mr. Rajesh Kumar", role: "Principal, Delhi Public School", text: "EdNeed has transformed how we manage our 1,200 students. Attendance, fees, and communication are all automated. Parent satisfaction has increased by 40%.", initials: "RK" },
  { name: "Ms. Sunita Sharma", role: "Director, Brilliant Tutorials", text: "Our JEE coaching institute uses EdNeed for student management and online test series. The analytics help us identify struggling students before it's too late.", initials: "SS" },
  { name: "Dr. Anil Verma", role: "HOD, NIT Trichy", text: "The parent communication module and fee management system have significantly reduced our administrative workload. Highly recommended for any institution.", initials: "AV" },
];

export default function ForInstitutions() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-accent/5 via-primary/5 to-background pt-28 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(160_84%_39%/0.08),_transparent_60%)]" />
        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-6">
                <Building2 className="w-4 h-4" /> For Schools & Institutions
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold font-heading mb-6 leading-tight">
                Complete <span className="gradient-text">Academic Management</span> for Your Institution
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Automate student management, attendance, fee collection, result publishing, and parent communication — all from a single, easy-to-use platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link to="/register" className="px-8 py-4 gradient-primary text-white rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center gap-2 justify-center">
                  Get Started Free <ArrowRight className="w-4 h-4" />
                </Link>
                <button onClick={() => toast.success("Scheduling a demo call...")} className="px-8 py-4 border border-border rounded-xl font-bold hover:bg-muted transition-colors flex items-center gap-2 justify-center">
                  Schedule a Demo
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {["2,000+ Institutions", "Free Setup Assistance", "Dedicated Support"].map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Institutions Onboarded", val: "2,000+", icon: Building2, color: "blue" },
                { label: "Students Managed", val: "2M+", icon: Users, color: "purple" },
                { label: "Reduction in Admin Work", val: "70%", icon: TrendingUp, color: "green" },
                { label: "Parent Satisfaction", val: "96%", icon: Star, color: "orange" },
                { label: "Data Security", val: "ISO 27001", icon: Shield, color: "teal" },
                { label: "Support Availability", val: "24/7", icon: Bell, color: "pink" },
              ].map((s, i) => (
                <div key={i} className="bg-card border border-border rounded-2xl p-5">
                  <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center mb-3", colorMap[s.color])}>
                    <s.icon className="w-4 h-4" />
                  </div>
                  <div className="text-2xl font-bold">{s.val}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Institution Types */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading mb-3">Built for <span className="gradient-text">Every Institution</span></h2>
            <p className="text-muted-foreground">Tailored solutions for every type of educational institution</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {institutionTypes.map((type, i) => (
              <div key={i} onClick={() => toast.success(`Exploring ${type.title} features...`)} className="glass-card-premium rounded-3xl p-6 text-center hover:border-primary/40 hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                <div className="text-3xl mb-3">{type.emoji}</div>
                <h3 className="font-bold mb-2">{type.title}</h3>
                <p className="text-xs text-muted-foreground">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold font-heading mb-4">Powerful Tools for <span className="gradient-text">Efficient Management</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Everything your institution needs to operate smoothly, communicate effectively, and deliver excellent educational outcomes.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="glass-card-premium rounded-3xl p-8 hover:border-primary/40 hover:-translate-y-2 transition-all duration-300">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4", colorMap[f.color])}>
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading mb-3">Get Started in <span className="gradient-text">3 Days</span></h2>
            <p className="text-muted-foreground">Our dedicated onboarding team ensures a smooth transition with zero disruption</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { step: "Day 1", icon: "📋", title: "Onboarding Call", desc: "Dedicated onboarding manager reviews your requirements and customizes the platform." },
              { step: "Day 2", icon: "🔧", title: "Data Migration", desc: "Import existing student, teacher, and fee data with our assisted bulk import tools." },
              { step: "Day 3", icon: "🎓", title: "Staff Training", desc: "Live training sessions for teachers, admin staff, and management teams." },
              { step: "Go Live", icon: "🚀", title: "Launch & Support", desc: "Platform goes live with 24/7 dedicated support for the first 30 days." },
            ].map((s, i) => (
              <div key={i} className="glass-card-premium rounded-3xl p-6 text-center hover:border-primary/30 transition-colors">
                <div className="text-2xl mb-2">{s.icon}</div>
                <div className="text-xs font-bold text-primary mb-1">{s.step}</div>
                <h3 className="font-bold mb-2">{s.title}</h3>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading mb-3">Trusted by <span className="gradient-text">2,000+ Institutions</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="glass-card-premium rounded-3xl p-8 hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-center gap-1 mb-3">{[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}</div>
                <p className="text-sm text-muted-foreground mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-3 border-t border-border">
                  <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold">{t.initials}</div>
                  <div>
                    <div className="text-sm font-bold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-3xl gradient-primary p-10 text-white text-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(255,255,255,0.12),_transparent_60%)]" />
            <div className="relative">
              <Zap className="w-12 h-12 mx-auto mb-4 text-white/80" />
              <h2 className="text-3xl font-bold mb-4">Transform Your Institution with EdNeed</h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">Join 2,000+ schools and coaching institutes already using EdNeed to deliver better education outcomes.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register" className="px-8 py-4 bg-white text-primary rounded-xl font-bold hover:bg-white/90 transition-colors">
                  Register Your Institution
                </Link>
                <Link to="/contact" className="px-8 py-4 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition-colors border border-white/20">
                  Talk to Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
