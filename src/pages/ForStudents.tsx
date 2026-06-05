import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import {
  GraduationCap, Brain, BookOpen, Target, Trophy, Users,
  CheckCircle, ArrowRight, Play, BarChart3, Star, Zap,
  Calendar, MessageCircle, Award, Compass
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const features = [
  { icon: Brain, title: "AI Study Assistant", desc: "Get instant answers to any academic question 24/7. Our AI understands your doubt, explains concepts step-by-step, and suggests study plans tailored to your learning style.", color: "blue" },
  { icon: BookOpen, title: "15,000+ Courses", desc: "Access a comprehensive library of video lectures, notes, and practice materials for every subject from Class 1 to competitive exams like JEE, NEET, and UPSC.", color: "purple" },
  { icon: Target, title: "Mock Tests & Analytics", desc: "Practice with real exam-pattern mock tests. Get instant scores, detailed solutions, and AI-generated insights on your weak areas to improve systematically.", color: "green" },
  { icon: Trophy, title: "Career Guidance", desc: "Discover your ideal career path through AI-powered assessments. Get personalized college recommendations, roadmaps, and access to certified career counselors.", color: "orange" },
  { icon: Users, title: "Tutor Marketplace", desc: "Connect with 2,500+ verified tutors for personalized 1-on-1 sessions. Choose by subject, rating, price, and availability for maximum learning impact.", color: "teal" },
  { icon: Award, title: "Scholarship Hub", desc: "Find and apply for scholarships, internships, and competitions perfectly matched to your profile. Never miss an opportunity with smart deadline alerts.", color: "pink" },
];

const colorMap: Record<string, string> = {
  blue: "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
  purple: "bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
  green: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
  orange: "bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400",
  teal: "bg-teal-100 text-teal-600 dark:bg-teal-950 dark:text-teal-400",
  pink: "bg-pink-100 text-pink-600 dark:bg-pink-950 dark:text-pink-400",
};

const journey = [
  { step: "01", title: "Create Your Profile", desc: "Sign up and complete your academic profile — class, subjects, goals, and learning preferences." },
  { step: "02", title: "Get AI Recommendations", desc: "Our AI analyzes your profile and recommends the best courses, tutors, and study plans." },
  { step: "03", title: "Learn & Practice", desc: "Attend live/recorded classes, solve practice problems, and complete assignments at your pace." },
  { step: "04", title: "Test & Improve", desc: "Take mock tests, track your performance analytics, and strengthen weak areas with targeted practice." },
  { step: "05", title: "Achieve Your Goals", desc: "Crack competitive exams, secure scholarships, and get career guidance to shape your future." },
];

const testimonials = [
  { name: "Arjun Sharma", grade: "JEE Advanced AIR 142, 2025", text: "EdNeed's AI study assistant helped me understand complex calculus concepts instantly. The mock tests with detailed analytics were game-changing for my preparation.", initials: "AS" },
  { name: "Priya Mehta", grade: "NEET 2025 — 710/720", text: "I used EdNeed's biology courses and AI doubt solver throughout my NEET prep. The personalized study plan helped me cover the entire syllabus systematically.", initials: "PM" },
  { name: "Sneha Roy", grade: "Class 12 CBSE — 98.6%", text: "The board exam preparation resources on EdNeed are outstanding. Live doubt sessions and chapter-wise tests helped me score 98.6% in boards.", initials: "SR" },
];

export default function ForStudents() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-background pt-28 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(221_83%_53%/0.1),_transparent_60%)]" />
        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                <GraduationCap className="w-4 h-4" /> Built for Students
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold font-heading mb-6 leading-tight">
                Your Complete <span className="gradient-text">Learning Companion</span> for Academic Success
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                From Class 5 to competitive exams — EdNeed gives you everything you need: AI-powered learning, expert tutors, mock tests, career guidance, and a supportive community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link to="/register" className="px-8 py-4 gradient-primary text-white rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center gap-2 justify-center">
                  Start Learning Free <ArrowRight className="w-4 h-4" />
                </Link>
                <button onClick={() => toast.success("Opening demo walkthrough...")} className="px-8 py-4 border border-border rounded-xl font-bold hover:bg-muted transition-colors flex items-center gap-2 justify-center">
                  <Play className="w-4 h-4 text-primary" /> Watch Demo
                </button>
              </div>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                {["5M+ Students", "Free to Start", "No Credit Card"].map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Courses Available", val: "15,000+", icon: BookOpen, color: "blue" },
                { label: "Expert Tutors", val: "2,500+", icon: Users, color: "purple" },
                { label: "Mock Tests", val: "50,000+", icon: Target, color: "green" },
                { label: "Students Enrolled", val: "5M+", icon: Trophy, color: "orange" },
                { label: "Career Paths", val: "500+", icon: Compass, color: "teal" },
                { label: "Scholarships", val: "5,400+", icon: Award, color: "pink" },
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

      {/* Features */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold font-heading mb-4">Everything You Need to <span className="gradient-text">Excel Academically</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">EdNeed is not just a learning app — it's your complete academic partner from school through college entrance exams and career placement.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg transition-all">
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

      {/* Learning Journey */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold font-heading mb-4">Your <span className="gradient-text">Learning Journey</span> on EdNeed</h2>
          </div>
          <div className="space-y-4 max-w-3xl mx-auto">
            {journey.map((step, i) => (
              <div key={i} className="flex items-start gap-5 bg-card border border-border rounded-2xl p-5">
                <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center text-white font-bold flex-shrink-0">{step.step}</div>
                <div>
                  <h3 className="font-bold mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading mb-3">Real Students, <span className="gradient-text">Real Results</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-1 mb-3">{[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}</div>
                <p className="text-sm text-muted-foreground mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-3 border-t border-border">
                  <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold">{t.initials}</div>
                  <div>
                    <div className="text-sm font-bold">{t.name}</div>
                    <div className="text-xs text-accent font-medium">{t.grade}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-6">
            {[
              { plan: "Free", price: "₹0", desc: "Get started with basic features", features: ["1,000+ free courses", "AI study assistant (10 questions/day)", "Community access", "Mock test (2/month)"], cta: "Start Free", primary: false },
              { plan: "Student Pro", price: "₹499/mo", desc: "Perfect for serious exam preparation", features: ["All 15,000+ courses", "Unlimited AI study assistant", "All mock tests & analytics", "1 tutor session/month", "Career guidance tools", "Scholarship alerts"], cta: "Start Trial", primary: true },
              { plan: "Student Plus", price: "₹999/mo", desc: "For students with multiple goals", features: ["Everything in Pro", "4 tutor sessions/month", "Personal counseling", "Study abroad guidance", "Priority doubt support", "Offline downloads"], cta: "Get Plus", primary: false },
            ].map((plan, i) => (
              <div key={i} className={cn("bg-card border rounded-2xl p-6", plan.primary ? "border-primary shadow-lg shadow-primary/10 relative" : "border-border")}>
                {plan.primary && <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 gradient-primary text-white rounded-full">Most Popular</div>}
                <h3 className="font-bold text-lg mb-1">{plan.plan}</h3>
                <div className="text-3xl font-bold mb-1 text-primary">{plan.price}</div>
                <p className="text-xs text-muted-foreground mb-4">{plan.desc}</p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f, j) => <li key={j} className="flex items-center gap-2 text-sm"><CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />{f}</li>)}
                </ul>
                <Link to="/pricing" className={cn("block w-full py-3 rounded-xl text-sm font-bold text-center", plan.primary ? "gradient-primary text-white hover:opacity-90" : "border border-border hover:bg-muted")}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-3xl gradient-primary p-10 text-white text-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(255,255,255,0.12),_transparent_60%)]" />
            <div className="relative">
              <Zap className="w-12 h-12 mx-auto mb-4 text-white/80" />
              <h2 className="text-3xl font-bold mb-4">Start Your Learning Journey Today</h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">Join 5 million+ students already achieving their academic goals with EdNeed.</p>
              <Link to="/register" className="inline-block px-8 py-4 bg-white text-primary rounded-xl font-bold hover:bg-white/90 transition-colors">
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
