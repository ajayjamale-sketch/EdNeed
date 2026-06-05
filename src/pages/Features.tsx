import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import {
  Brain, BookOpen, Users, BarChart3, Target, Briefcase, Trophy, MessageSquare,
  Shield, Clock, Star, Zap, CheckCircle, ArrowRight, Play, Globe, Award
} from "lucide-react";
import { cn } from "@/lib/utils";

const allFeatures = [
  {
    id: "lms",
    category: "Learning",
    icon: BookOpen,
    title: "AI Learning Management System",
    desc: "Smart learning and content delivery with personalized paths, video lectures, interactive modules, assignments, and progress tracking.",
    features: ["Course enrollment & learning paths", "Video lectures & live classes", "Interactive learning modules", "Assignments & progress tracking", "AI-powered content recommendations"],
    color: "blue",
  },
  {
    id: "ai",
    category: "AI Tools",
    icon: Brain,
    title: "AI Study Assistant",
    desc: "24/7 intelligent academic support for doubt solving, homework help, concept explanation, study planning, and exam preparation.",
    features: ["Instant doubt resolution", "Homework assistance", "Concept deep-dives", "Personalized study plans", "Exam preparation guidance"],
    color: "purple",
  },
  {
    id: "courses",
    category: "Courses",
    icon: Star,
    title: "Courses Marketplace",
    desc: "15,000+ courses spanning school curriculum, competitive exams, skill development, professional certifications, and language learning.",
    features: ["School curriculum (CBSE, ICSE, State)", "JEE, NEET, UPSC, CAT prep", "Skill development programs", "Professional certifications", "Recorded & live classes"],
    color: "green",
  },
  {
    id: "tutors",
    category: "Tutors",
    icon: Users,
    title: "Tutor & Teacher Marketplace",
    desc: "Connect with 8,000+ verified subject experts for one-on-one sessions, group classes, and personalized coaching.",
    features: ["Verified tutor profiles", "Subject expert matching", "One-on-one & group sessions", "Session scheduling system", "Teacher reviews & ratings"],
    color: "orange",
  },
  {
    id: "assessment",
    category: "Assessment",
    icon: Target,
    title: "Assessment & Exam System",
    desc: "Comprehensive testing platform with online exams, adaptive mock tests, question banks, instant results, and performance analytics.",
    features: ["Online exams & mock tests", "Adaptive assessments", "50,000+ question bank", "Instant results & feedback", "Detailed performance reports"],
    color: "blue",
  },
  {
    id: "analytics",
    category: "Analytics",
    icon: BarChart3,
    title: "Academic Intelligence Dashboard",
    desc: "Deep performance tracking with learning progress reports, subject analytics, attendance tracking, and skill gap analysis.",
    features: ["Learning progress reports", "Subject performance analytics", "Attendance analytics", "Skill gap identification", "Goal achievement tracking"],
    color: "purple",
  },
  {
    id: "career",
    category: "Career",
    icon: Briefcase,
    title: "Career Guidance & Counseling",
    desc: "End-to-end career planning with aptitude tests, career roadmaps, college guidance, study abroad support, and counseling.",
    features: ["Aptitude & interest assessments", "Personalized career roadmaps", "College admission guidance", "Study abroad support", "Professional counseling sessions"],
    color: "green",
  },
  {
    id: "institution",
    category: "Institutions",
    icon: Shield,
    title: "School & Institute Management",
    desc: "Complete academic administration platform for student management, attendance, timetable, fee management, and parent communication.",
    features: ["Student lifecycle management", "Smart attendance tracking", "Timetable management", "Fee collection & reports", "Parent communication portal"],
    color: "orange",
  },
  {
    id: "community",
    category: "Community",
    icon: MessageSquare,
    title: "Student Community",
    desc: "Peer learning ecosystem with study groups, discussion forums, project collaboration, learning challenges, and knowledge sharing.",
    features: ["Study groups & collaboration", "Discussion forums", "Project collaboration", "Learning challenges", "Knowledge sharing communities"],
    color: "blue",
  },
  {
    id: "scholarships",
    category: "Opportunities",
    icon: Trophy,
    title: "Scholarship & Opportunity Hub",
    desc: "Discover and apply for scholarships, internships, olympiads, competitions, grants, and fellowships with application tracking.",
    features: ["Curated scholarship listings", "Internship opportunities", "Olympiad & competition info", "Grants & fellowships", "Application tracking dashboard"],
    color: "purple",
  },
];

const categories = ["All", "Learning", "AI Tools", "Courses", "Tutors", "Assessment", "Analytics", "Career", "Institutions", "Community", "Opportunities"];

const colorMap: Record<string, string> = {
  blue: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
  purple: "bg-purple-50 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
  green: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
  orange: "bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400",
};

const highlights = [
  { icon: Zap, label: "AI-Powered", desc: "Every feature enhanced with artificial intelligence" },
  { icon: Globe, label: "Multi-Language", desc: "Available in Hindi, Tamil, Telugu, and 10+ languages" },
  { icon: Clock, label: "24/7 Access", desc: "Learn anytime, anywhere, on any device" },
  { icon: Award, label: "Certified", desc: "Industry-recognized certificates for all programs" },
];

export default function Features() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? allFeatures
    : allFeatures.filter((f) => f.category === activeCategory);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-20 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50/20 to-background dark:from-slate-950 dark:via-blue-950/10" />
        <div className="container-custom relative z-10 text-center">
          <span className="badge-blue mb-5 inline-block">Platform Features</span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance leading-tight">
            Everything Education<br /><span className="gradient-text">Needs in One Place</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            EdNeed brings together AI learning, course marketplace, tutor discovery, career guidance, and institutional management in one unified platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="px-7 py-3.5 gradient-primary text-white rounded-xl font-semibold hover:opacity-90 shadow-lg shadow-primary/25 flex items-center gap-2">
              Get Started Free <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/pricing" className="px-7 py-3.5 border border-border rounded-xl font-semibold hover:bg-muted transition-colors">
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-12 border-y border-border bg-muted/20">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {highlights.map((h, i) => (
              <div key={i} className="text-center">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <h.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="font-semibold text-sm mb-1">{h.label}</div>
                <div className="text-xs text-muted-foreground">{h.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="section-padding">
        <div className="container-custom">
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-semibold transition-all border",
                  activeCategory === cat
                    ? "gradient-primary text-white border-transparent shadow-md shadow-primary/20"
                    : "bg-muted border-transparent hover:border-border text-muted-foreground hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((f) => (
              <div
                key={f.id}
                id={f.id}
                className="p-8 rounded-3xl glass-card-premium hover:border-primary/40 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0", colorMap[f.color])}>
                    <f.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">{f.category}</span>
                    <h3 className="font-bold text-lg mt-1.5 mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {f.features.map((feat, j) => (
                    <div key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                      {feat}
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-4 border-t border-border">
                  <Link
                    to="/register"
                    className="text-sm font-semibold text-primary hover:underline flex items-center gap-1.5"
                  >
                    Explore {f.title.split(" ")[0]} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Reliability Section */}
      <section className="section-padding bg-muted/20 border-t border-border">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="badge-blue mb-4 inline-block">Enterprise-Grade</span>
              <h2 className="text-4xl font-bold mb-5">Security & <span className="gradient-text">Reliability</span></h2>
              <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
                Your data is safe with us. We employ military-grade encryption and comply with all global education data privacy regulations to ensure a secure learning environment.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "End-to-End Encryption for all communications",
                  "GDPR & COPPA Compliant infrastructure",
                  "99.9% Uptime SLA for uninterrupted learning",
                  "Role-based access controls & audit logs"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/privacy" className="text-primary font-semibold hover:underline flex items-center gap-2">
                Read our Privacy Policy <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-[2rem] blur-2xl" />
              <div className="glass-card-premium p-8 rounded-[2rem] relative z-10 border border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background/80 p-6 rounded-xl text-center border border-border">
                    <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
                    <div className="text-2xl font-bold">100%</div>
                    <div className="text-xs text-muted-foreground mt-1">Data Encrypted</div>
                  </div>
                  <div className="bg-background/80 p-6 rounded-xl text-center border border-border">
                    <Clock className="w-8 h-8 text-secondary mx-auto mb-3" />
                    <div className="text-2xl font-bold">99.9%</div>
                    <div className="text-xs text-muted-foreground mt-1">Uptime SLA</div>
                  </div>
                  <div className="bg-background/80 p-6 rounded-xl text-center border border-border col-span-2">
                    <CheckCircle className="w-8 h-8 text-accent mx-auto mb-3" />
                    <div className="text-2xl font-bold">ISO 27001</div>
                    <div className="text-xs text-muted-foreground mt-1">Certified Infrastructure</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-950 dark:to-blue-950/10 border-t border-border">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Experience <span className="gradient-text">All Features?</span></h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            Start with our free plan and upgrade as your learning grows. All features, no hidden fees.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="px-8 py-3.5 gradient-primary text-white rounded-xl font-semibold hover:opacity-90 shadow-lg shadow-primary/25 flex items-center gap-2">
              Start Free Today <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/pricing" className="px-8 py-3.5 border border-border rounded-xl font-semibold hover:bg-muted transition-colors">
              Compare Plans
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
