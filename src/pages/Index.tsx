import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import {
  GraduationCap, BookOpen, Users, BarChart3, Brain, Trophy, Star,
  ArrowRight, Play, CheckCircle, ChevronDown, ChevronUp, Zap, Target,
  Shield, Clock, Globe, Award, TrendingUp, MessageSquare, Briefcase,
  Search, Filter, Heart, Eye, MapPin, Building2
} from "lucide-react";
import heroImg from "@/assets/hero-illustration.png";
import { cn } from "@/lib/utils";
import DemoModal from "@/components/features/DemoModal";

// ─── Hero Section ────────────────────────────────────────────────
function HeroSection() {
  const [activeUsers] = useState(125000);
  const [showDemo, setShowDemo] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("edneed-user")) setIsLoggedIn(true);
  }, []);

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden pt-8 pb-16">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50/40 to-emerald-50/30 dark:from-slate-950 dark:via-blue-950/20 dark:to-purple-950/10" />
      <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[120px] -translate-x-1/2" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-400/10 rounded-full blur-[100px] translate-x-1/4" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6 border border-primary/20">
              <Zap className="w-3.5 h-3.5" />
              AI-Powered Learning Platform · Trusted by {activeUsers.toLocaleString()}+ Students
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight text-balance mb-6">
              Learn Smarter,{" "}
              <span className="gradient-text">Achieve More</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
              EdNeed connects students, parents, teachers, and institutions through an AI-powered ecosystem for personalized learning, assessments, career guidance, and academic excellence.
            </p>

            {/* Stats row */}
            <div className="flex items-center justify-center lg:justify-start gap-6 mb-8">
              {[
                { val: "500K+", label: "Students" },
                { val: "15K+", label: "Courses" },
                { val: "8K+", label: "Tutors" },
                { val: "98%", label: "Satisfaction" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-xl font-bold gradient-text">{s.val}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <Link
                to={isLoggedIn ? "/dashboard" : "/register"}
                className="w-full sm:w-auto px-7 py-3.5 gradient-primary text-white rounded-xl font-semibold text-base hover:opacity-90 transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2 group"
              >
                {isLoggedIn ? "Go to Dashboard" : "Start Learning Free"}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <button
                onClick={() => setShowDemo(true)}
                className="w-full sm:w-auto px-7 py-3.5 bg-background border border-border rounded-xl font-semibold text-base hover:bg-muted transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Play className="w-4 h-4 text-primary" />
                Watch Demo
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-6">
              {["No credit card required", "CBSE & ICSE aligned", "AI-powered"].map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CheckCircle className="w-3.5 h-3.5 text-accent" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right – Hero Image + floating cards */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 border border-border/50">
              <img src={heroImg} alt="EdNeed platform" className="w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>

            {/* Floating cards */}
            <div className="absolute -left-10 top-16 glass-card rounded-xl p-3.5 shadow-lg animate-float">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <TrendingUp className="w-4.5 h-4.5 text-green-600" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Progress</div>
                  <div className="text-sm font-bold">+24% this week</div>
                </div>
              </div>
            </div>

            <div className="absolute -right-8 top-1/3 glass-card rounded-xl p-3.5 shadow-lg animate-float-delayed">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                <span className="text-xs font-semibold">4.9/5</span>
              </div>
              <div className="text-xs text-muted-foreground">Avg. Rating</div>
            </div>

            <div className="absolute -left-6 bottom-20 glass-card rounded-xl p-3.5 shadow-lg animate-float">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["S", "T", "P"].map((initial, i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-primary text-white font-bold flex items-center justify-center text-[10px] border border-background">{initial}</div>
                  ))}
                </div>
                <span className="text-xs font-medium">+2K joined today</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DemoModal
        isOpen={showDemo}
        onClose={() => setShowDemo(false)}
        title="EdNeed Platform Walkthrough Demo"
      />
    </section>
  );
}

// ─── Features Section ─────────────────────────────────────────────
const features = [
  { icon: Brain, title: "AI Study Assistant", desc: "24/7 intelligent doubt solving, concept explanation, and personalized study planning.", color: "blue" },
  { icon: BookOpen, title: "Course Marketplace", desc: "15,000+ courses covering school curriculum, competitive exams, skills, and certifications.", color: "purple" },
  { icon: Users, title: "Tutor Marketplace", desc: "Connect with 8,000+ verified subject experts for one-on-one or group sessions.", color: "green" },
  { icon: BarChart3, title: "Performance Analytics", desc: "Deep academic insights — track learning progress, identify skill gaps, and hit goals.", color: "orange" },
  { icon: Target, title: "Adaptive Assessments", desc: "AI-powered mock tests, question banks, and adaptive exams that match your level.", color: "blue" },
  { icon: Briefcase, title: "Career Guidance", desc: "Aptitude tests, career roadmaps, college guidance, and professional counseling.", color: "purple" },
  { icon: Trophy, title: "Scholarship Hub", desc: "Discover scholarships, olympiads, internships, and fellowship opportunities.", color: "green" },
  { icon: MessageSquare, title: "Student Community", desc: "Study groups, discussion forums, peer collaboration, and knowledge sharing.", color: "orange" },
];

const colorMap: Record<string, string> = {
  blue: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
  purple: "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
  green: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
  orange: "bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400",
};

function FeaturesSection() {
  return (
    <section id="features" className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="badge-blue mb-4 inline-block">All-in-One Platform</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to <span className="gradient-text">Excel Academically</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            From AI-powered learning to career guidance, EdNeed brings the complete education ecosystem into one platform.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-border bg-card card-hover group cursor-pointer"
            >
              <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", colorMap[f.color])}>
                <f.icon className="w-5.5 h-5.5" />
              </div>
              <h3 className="font-semibold text-base mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/features" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
            View all features <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Workflow Section ─────────────────────────────────────────────
const steps = [
  { num: "01", title: "Create Your Profile", desc: "Register and complete your academic assessment to personalize your learning journey.", icon: GraduationCap },
  { num: "02", title: "Explore & Enroll", desc: "Browse thousands of courses, find expert tutors, and join the right learning paths.", icon: Search },
  { num: "03", title: "Learn & Practice", desc: "Attend live or recorded classes, complete assignments, and take adaptive tests.", icon: BookOpen },
  { num: "04", title: "Track & Achieve", desc: "Monitor your progress, earn achievements, get career guidance, and reach your goals.", icon: Trophy },
];

function WorkflowSection() {
  return (
    <section className="section-padding bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-950 dark:to-blue-950/10">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="badge-blue mb-4 inline-block">How It Works</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-5">
              Your Journey to <span className="gradient-text">Academic Excellence</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              EdNeed's structured learning path takes you from enrollment to achievement through AI-guided steps designed around your goals.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-6 py-3 gradient-primary text-white rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
            >
              Start Your Journey <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-5">
            {steps.map((step, i) => (
              <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors group">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white font-bold text-sm shadow-md shadow-primary/25">
                  {step.num}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-base mb-1 flex items-center gap-2">
                    {step.title}
                    <step.icon className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Benefits Section ─────────────────────────────────────────────
const userTypes = [
  {
    role: "Students",
    icon: GraduationCap,
    benefits: ["AI-powered personalized learning", "24/7 doubt solving assistant", "Mock tests & analytics", "Career guidance & counseling", "Scholarship discovery"],
    color: "blue",
  },
  {
    role: "Teachers",
    icon: BookOpen,
    benefits: ["Publish & monetize courses", "Live & recorded classes", "Student performance insights", "Revenue dashboard", "Global reach"],
    color: "purple",
  },
  {
    role: "Parents",
    icon: Users,
    benefits: ["Real-time progress monitoring", "Attendance & result tracking", "Teacher communication", "Safe learning environment", "Goal tracking"],
    color: "green",
  },
  {
    role: "Institutions",
    icon: Building2,
    benefits: ["Student & attendance management", "Timetable & fee management", "Academic reports", "Parent communication portal", "Analytics dashboard"],
    color: "orange",
  },
];

function BenefitsSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="badge-blue mb-4 inline-block">Built for Everyone</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            One Platform, <span className="gradient-text">Every Role</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Whether you're a student, teacher, parent, or institution — EdNeed is built precisely for your needs.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {userTypes.map((u, i) => {
            const Icon = u.icon;
            return (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={cn(
                  "px-5 py-2.5 rounded-xl text-sm font-semibold transition-all border flex items-center gap-2",
                  active === i
                    ? "gradient-primary text-white border-transparent shadow-md shadow-primary/20"
                    : "bg-muted border-transparent hover:border-border text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="w-4 h-4" /> {u.role}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-4">
            {userTypes[active].benefits.map((b, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-sm font-medium">{b}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-6 py-3 gradient-primary text-white rounded-xl font-semibold hover:opacity-90 shadow-lg shadow-primary/25"
            >
              Get Started as {userTypes[active].role} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Dashboard Preview Section ─────────────────────────────────────
function DashboardPreviewSection() {
  return (
    <section className="section-padding bg-gradient-to-br from-slate-900 to-blue-950 dark:from-slate-950 dark:to-blue-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(37,99,235,0.15),_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(124,58,237,0.12),_transparent_60%)]" />

      <div className="container-custom relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-full text-sm font-semibold mb-4 border border-white/20">
            <BarChart3 className="w-3.5 h-3.5" />
            Live Analytics Dashboard
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Track Every Step of Your <span className="text-blue-300">Learning Journey</span>
          </h2>
          <p className="text-blue-100/70 text-lg">
            Comprehensive analytics and insights help you understand exactly where you stand and what to do next.
          </p>
        </div>

        {/* Mock Dashboard UI */}
        <div className="bg-slate-900/80 border border-slate-700/50 rounded-2xl p-5 backdrop-blur-sm shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-700/50">
            <div>
              <h3 className="text-white font-semibold">Student Dashboard</h3>
              <p className="text-slate-400 text-xs mt-0.5">Welcome back, Alex! 3 tasks pending</p>
            </div>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
            {[
              { label: "Courses Enrolled", val: "12", change: "+2", color: "blue" },
              { label: "Hours Studied", val: "247", change: "+18h", color: "purple" },
              { label: "Tests Taken", val: "34", change: "+5", color: "green" },
              { label: "Avg. Score", val: "82%", change: "+4%", color: "orange" },
            ].map((s, i) => (
              <div key={i} className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/30">
                <div className="text-slate-400 text-xs mb-1">{s.label}</div>
                <div className="text-white text-2xl font-bold">{s.val}</div>
                <div className="text-emerald-400 text-xs mt-1 font-medium">{s.change} this week</div>
              </div>
            ))}
          </div>

          {/* Progress bars */}
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/30">
              <h4 className="text-white text-sm font-semibold mb-4">Subject Progress</h4>
              {[
                { sub: "Mathematics", pct: 78, color: "bg-blue-500" },
                { sub: "Physics", pct: 64, color: "bg-purple-500" },
                { sub: "Chemistry", pct: 89, color: "bg-emerald-500" },
                { sub: "English", pct: 71, color: "bg-orange-500" },
              ].map((s) => (
                <div key={s.sub} className="mb-3 last:mb-0">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-300">{s.sub}</span>
                    <span className="text-slate-400">{s.pct}%</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full transition-all", s.color)} style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/30">
              <h4 className="text-white text-sm font-semibold mb-4">Upcoming Schedule</h4>
              {[
                { title: "Calculus — Live Class", time: "Today, 4:00 PM", status: "Soon" },
                { title: "Physics Mock Test", time: "Tomorrow, 10:00 AM", status: "Scheduled" },
                { title: "Chemistry Assignment", time: "Thu, 11:59 PM", status: "Due" },
                { title: "English Group Discussion", time: "Fri, 3:00 PM", status: "Scheduled" },
              ].map((e, i) => (
                <div key={i} className="flex items-center justify-between mb-3 last:mb-0">
                  <div>
                    <div className="text-slate-200 text-xs font-medium">{e.title}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{e.time}</div>
                  </div>
                  <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", {
                    "bg-blue-500/20 text-blue-400": e.status === "Soon",
                    "bg-purple-500/20 text-purple-400": e.status === "Scheduled",
                    "bg-orange-500/20 text-orange-400": e.status === "Due",
                  })}>
                    {e.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-slate-900 rounded-xl font-semibold hover:bg-white/90 transition-colors shadow-xl"
          >
            Explore Dashboard <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Global Reach Section ─────────────────────────────────────────
function GlobalReachSection() {
  return (
    <section className="section-padding bg-background border-t border-b border-border overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full animate-pulse-slow" />
              <div className="absolute inset-4 bg-card border border-border rounded-full glass-card-premium flex items-center justify-center p-8">
                <div className="relative w-full h-full">
                  <Globe className="absolute inset-0 w-full h-full text-primary/10" />
                  {/* Floating dots representing institutions */}
                  {[
                    { top: "20%", left: "30%", delay: "0s" },
                    { top: "40%", left: "70%", delay: "1s" },
                    { top: "70%", left: "40%", delay: "2s" },
                    { top: "50%", left: "20%", delay: "3s" },
                    { top: "30%", left: "80%", delay: "0.5s" }
                  ].map((pos, i) => (
                    <div key={i} className="absolute w-3 h-3 bg-primary rounded-full animate-ping" style={{ top: pos.top, left: pos.left, animationDelay: pos.delay }} />
                  ))}
                  {[
                    { top: "20%", left: "30%" },
                    { top: "40%", left: "70%" },
                    { top: "70%", left: "40%" },
                    { top: "50%", left: "20%" },
                    { top: "30%", left: "80%" }
                  ].map((pos, i) => (
                    <div key={i} className="absolute w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_rgba(37,99,235,0.8)]" style={{ top: pos.top, left: pos.left }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <span className="badge-blue mb-4 inline-block">Global Network</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-5">
              Trusted by <span className="gradient-text">Top Institutions</span> Worldwide
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              EdNeed powers the digital infrastructure for schools, colleges, and educational organizations across the globe, ensuring uninterrupted and premium learning experiences.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex flex-col gap-2 p-4 rounded-xl border border-border bg-card">
                <Building2 className="w-8 h-8 text-primary mb-2" />
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm text-muted-foreground">Partner Schools</div>
              </div>
              <div className="flex flex-col gap-2 p-4 rounded-xl border border-border bg-card">
                <MapPin className="w-8 h-8 text-secondary mb-2" />
                <div className="text-3xl font-bold">12</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
            </div>
            
            <Link to="/about" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
              Read about our mission <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials Section ─────────────────────────────────────────
const testimonials = [
  { name: "Priya Sharma", role: "Class 12 Student, CBSE", rating: 5, text: "EdNeed's AI study assistant helped me crack JEE with a 97 percentile! The personalized mock tests and concept explanations are absolutely amazing.", avatar: "PS" },
  { name: "Rajesh Kumar", role: "Mathematics Teacher", rating: 5, text: "I've published 3 courses on EdNeed and earn more than my school salary. The platform makes it so easy to create content and reach thousands of students.", avatar: "RK" },
  { name: "Anita Patel", role: "Parent, Mumbai", rating: 5, text: "I can track my daughter's attendance, test scores, and daily progress from my phone. Communication with her teachers has never been this seamless.", avatar: "AP" },
  { name: "Dr. Suresh Nair", role: "Principal, St. Xavier's School", rating: 5, text: "EdNeed transformed how we manage our 2,000+ students. Fee management, attendance, and parent communication all in one dashboard is truly game-changing.", avatar: "SN" },
  { name: "Kavya Reddy", role: "NEET Aspirant", rating: 5, text: "The adaptive mock tests identified my weak areas in Biology instantly. My score jumped from 480 to 640 in just 3 months of EdNeed preparation.", avatar: "KR" },
  { name: "Arun Menon", role: "Career Counselor", rating: 5, text: "The career guidance tools on EdNeed are incredibly comprehensive. My students get proper aptitude assessments and roadmaps they never had access to before.", avatar: "AM" },
];

function TestimonialsSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="badge-blue mb-4 inline-block">Success Stories</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Loved by <span className="gradient-text">Students & Educators</span>
          </h2>
          <p className="text-muted-foreground text-lg">Real experiences from students, teachers, parents, and institutions across India.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div key={i} className="p-6 rounded-2xl bg-card border border-border hover:border-primary/20 transition-colors card-hover">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Rating summary */}
        <div className="flex flex-wrap justify-center gap-8 mt-12 pt-10 border-t border-border">
          {[
            { val: "4.9/5", label: "Average Rating" },
            { val: "50,000+", label: "Reviews" },
            { val: "98%", label: "Would Recommend" },
            { val: "#1", label: "EdTech Platform India" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold gradient-text">{s.val}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing Section ──────────────────────────────────────────────
const plans = [
  {
    name: "Free",
    price: { monthly: 0, annual: 0 },
    desc: "Perfect for getting started",
    features: ["5 free courses", "AI Study Assistant (10 queries/day)", "Basic progress tracking", "Community access", "Mobile app"],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Pro",
    price: { monthly: 499, annual: 399 },
    desc: "For serious learners",
    features: ["Unlimited courses", "Unlimited AI Study Assistant", "Advanced analytics", "Mock tests & question banks", "Career guidance tools", "Priority support", "Certificates"],
    cta: "Start Pro",
    popular: true,
  },
  {
    name: "Institution",
    price: { monthly: 2999, annual: 2399 },
    desc: "For schools & coaching institutes",
    features: ["All Pro features", "Student management system", "Attendance & fee tracking", "Parent communication portal", "Custom branding", "Bulk enrollments", "Dedicated account manager"],
    cta: "Contact Sales",
    popular: false,
  },
];

function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="section-padding bg-gradient-to-b from-slate-50/50 to-background dark:from-slate-950/50">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="badge-blue mb-4 inline-block">Simple Pricing</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Plans for Every <span className="gradient-text">Learner</span>
          </h2>
          <p className="text-muted-foreground text-lg">Start free, scale as you grow. No hidden fees.</p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className={cn("text-sm font-medium", !annual && "text-foreground")}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className={cn("relative w-12 h-6 rounded-full transition-colors", annual ? "bg-primary" : "bg-muted")}
            >
              <span className={cn("absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform", annual && "translate-x-6")} />
            </button>
            <span className={cn("text-sm font-medium", annual && "text-foreground")}>
              Annual <span className="text-accent font-semibold text-xs ml-1">Save 20%</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={cn(
                "rounded-2xl p-7 border transition-all relative",
                plan.popular
                  ? "gradient-primary text-white border-transparent shadow-2xl shadow-primary/25 scale-[1.02]"
                  : "bg-card border-border hover:border-primary/30 card-hover"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <div className="mb-5">
                <h3 className={cn("text-lg font-bold mb-1", plan.popular ? "text-white" : "text-foreground")}>{plan.name}</h3>
                <p className={cn("text-sm", plan.popular ? "text-white/70" : "text-muted-foreground")}>{plan.desc}</p>
              </div>
              <div className="mb-6">
                <span className={cn("text-5xl font-bold", plan.popular ? "text-white" : "gradient-text")}>
                  ₹{annual ? plan.price.annual : plan.price.monthly}
                </span>
                {plan.price.monthly > 0 && (
                  <span className={cn("text-sm ml-1", plan.popular ? "text-white/70" : "text-muted-foreground")}>/month</span>
                )}
              </div>
              <ul className="space-y-3 mb-7">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2.5 text-sm">
                    <CheckCircle className={cn("w-4 h-4 flex-shrink-0", plan.popular ? "text-white/80" : "text-accent")} />
                    <span className={plan.popular ? "text-white/90" : ""}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to={plan.name === "Institution" ? "/contact" : "/register"}
                className={cn(
                  "block w-full py-3 rounded-xl text-center text-sm font-semibold transition-all",
                  plan.popular
                    ? "bg-white text-primary hover:bg-white/90"
                    : "gradient-primary text-white hover:opacity-90 shadow-md shadow-primary/20"
                )}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </section>
  );
}

// ─── FAQ Section ──────────────────────────────────────────────────
const faqs = [
  { q: "Is EdNeed suitable for all age groups?", a: "Yes! EdNeed serves students from Class 1 to postgraduate levels, covering school curriculum, competitive exam prep, professional certifications, and skill development programs." },
  { q: "How does the AI Study Assistant work?", a: "Our AI Study Assistant uses advanced language models to provide instant, contextual answers to academic questions, generate personalized study plans, explain concepts step-by-step, and guide exam preparation 24/7." },
  { q: "Can teachers earn money on EdNeed?", a: "Absolutely! Teachers and tutors can publish courses, conduct live sessions, offer one-on-one tutoring, and earn revenue through our marketplace. Many educators earn ₹50,000+ monthly." },
  { q: "Is there a mobile app available?", a: "Yes, EdNeed is available on iOS and Android with full feature parity including offline learning, live class access, and push notifications for study reminders." },
  { q: "How do schools integrate EdNeed?", a: "Schools can onboard through our Institution plan, which includes bulk student import, attendance management, timetable setup, fee management, and parent communication — all within 48 hours." },
  { q: "What exam preparations does EdNeed support?", a: "EdNeed supports JEE, NEET, UPSC, CAT, GATE, SSC, Banking, IELTS, SAT, and 50+ other competitive examinations with dedicated courses, mock tests, and mentoring." },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="badge-blue mb-4 inline-block">Frequently Asked</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Got <span className="gradient-text">Questions?</span>
          </h2>
          <p className="text-muted-foreground text-lg">Everything you need to know about EdNeed.</p>
        </div>

        <div className="max-w-2xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/50 transition-colors"
              >
                <span className="font-medium text-sm pr-4">{faq.q}</span>
                {open === i ? <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
              </button>
              {open === i && (
                <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3 bg-muted/20">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Still have questions?{" "}
          <Link to="/contact" className="text-primary font-semibold hover:underline">Contact our team</Link>
        </p>
      </div>
    </section>
  );
}

// ─── CTA Banner Section ───────────────────────────────────────────
function CTASection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 gradient-primary opacity-95" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.1),_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(0,0,0,0.1),_transparent_60%)]" />

      <div className="container-custom relative z-10 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-full text-sm font-semibold mb-6 border border-white/30">
            <Zap className="w-3.5 h-3.5" />
            Join 500,000+ Learners Today
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-5 text-balance leading-tight">
            Ready to Transform Your Educational Journey?
          </h2>
          <p className="text-xl text-white/80 mb-10 leading-relaxed">
            Start for free. No credit card required. Join the largest AI-powered education ecosystem in India.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-4 bg-white text-primary rounded-xl font-bold text-base hover:bg-white/95 transition-colors shadow-xl flex items-center justify-center gap-2 group"
            >
              Get Started for Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-white/15 text-white border border-white/30 rounded-xl font-semibold text-base hover:bg-white/25 transition-colors backdrop-blur-sm flex items-center justify-center gap-2"
            >
              Schedule a Demo
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            {[
              { icon: Shield, text: "100% Safe & Secure" },
              { icon: Clock, text: "Available 24/7" },
              { icon: Globe, text: "Access Anywhere" },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="flex items-center gap-2 text-sm text-white/75">
                <Icon className="w-4 h-4" />
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main Index ───────────────────────────────────────────────────
export default function Index() {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <WorkflowSection />
      <BenefitsSection />
      <DashboardPreviewSection />
      <GlobalReachSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
    </Layout>
  );
}
