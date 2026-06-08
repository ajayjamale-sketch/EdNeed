import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { GraduationCap, Target, Heart, Globe, Users, Award, ArrowRight, CheckCircle, Zap } from "lucide-react";

const team = [
  { name: "Arjun Sharma", role: "CEO & Co-Founder", bg: "bg-blue-500", initials: "AS", bio: "Former IIT Delhi, EdTech veteran with 12+ years in education technology." },
  { name: "Priya Nair", role: "CTO & Co-Founder", bg: "bg-purple-500", initials: "PN", bio: "Ex-Google engineer, AI/ML specialist with deep expertise in personalized learning." },
  { name: "Dr. Rohan Mehta", role: "Chief Academic Officer", bg: "bg-emerald-500", initials: "RM", bio: "IIM Bangalore, 20+ years of curriculum design and academic strategy." },
  { name: "Sneha Kapoor", role: "Head of Product", bg: "bg-orange-500", initials: "SK", bio: "Product leader with experience building ed-tech platforms at Unacademy." },
  { name: "Vikram Singh", role: "VP of Engineering", bg: "bg-red-500", initials: "VS", bio: "Full-stack architect, previously built enterprise SaaS at scale for 10M+ users." },
  { name: "Dr. Ananya Roy", role: "Head of AI Research", bg: "bg-pink-500", initials: "AR", bio: "PhD in AI from IISc, specializing in adaptive learning algorithms." },
];

const milestones = [
  { year: "2020", title: "EdNeed Founded", desc: "Started with a vision to democratize quality education across India." },
  { year: "2021", title: "First 10,000 Students", desc: "Reached our first major milestone with students from 18 states." },
  { year: "2022", title: "AI Integration", desc: "Launched India's first AI study assistant for K-12 and competitive exams." },
  { year: "2023", title: "Institution Platform", desc: "Released school & institute management suite, onboarding 500+ schools." },
  { year: "2024", title: "500K Students", desc: "Crossed half a million active learners with 98% satisfaction rate." },
  { year: "2025", title: "Series B Funding", desc: "Raised $25M to expand globally and deepen AI capabilities." },
];

const values = [
  { icon: Target, title: "Student-First", desc: "Every feature we build is designed to maximize student outcomes and learning experiences." },
  { icon: Zap, title: "AI-Powered", desc: "We harness artificial intelligence to make personalized, effective education accessible to all." },
  { icon: Heart, title: "Inclusive Education", desc: "Quality education is a right, not a privilege. We serve students from all backgrounds." },
  { icon: Globe, title: "India & Beyond", desc: "Built for India, designed for the world — supporting regional languages and global standards." },
  { icon: Users, title: "Whole Ecosystem", desc: "We unite students, parents, teachers, and institutions into a single connected platform." },
  { icon: Award, title: "Outcome Focused", desc: "We measure our success by the results our students achieve — scores, admissions, careers." },
];

const stats = [
  { val: "500K+", label: "Active Students" },
  { val: "15K+", label: "Courses Published" },
  { val: "8K+", label: "Verified Tutors" },
  { val: "500+", label: "Partner Schools" },
  { val: "50+", label: "Exam Types Covered" },
  { val: "98%", label: "Student Satisfaction" },
];

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-20 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50/30 to-background dark:from-slate-950 dark:via-blue-950/10" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-purple-400/10 rounded-full blur-[120px]" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="badge-blue mb-5 inline-block">About EdNeed</span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Reimagining Education for <span className="gradient-text">Every Indian Learner</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              EdNeed is on a mission to democratize quality education by connecting students, teachers, parents, and institutions through the power of AI and technology.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register" className="px-7 py-3.5 gradient-primary text-white rounded-xl font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/25 flex items-center gap-2">
                Join EdNeed <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/contact" className="px-7 py-3.5 border border-border rounded-xl font-semibold hover:bg-muted transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 border-y border-border bg-muted/20">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {stats.map((s, i) => (
              <div key={i}>
                <div className="text-3xl font-bold gradient-text mb-1">{s.val}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="badge-blue mb-4 inline-block">Our Mission</span>
              <h2 className="text-4xl font-bold mb-5">Making Quality Education <span className="gradient-text">Accessible to All</span></h2>
              <p className="text-muted-foreground leading-relaxed mb-5 text-lg">
                In a country of 1.4 billion people, where millions of students lack access to quality educators and personalized guidance, EdNeed bridges the gap through technology and AI.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We believe every student deserves a personalized learning experience, every teacher deserves tools to reach their full potential, and every institution deserves efficient management systems — regardless of geography or economic background.
              </p>
              {["No student left without guidance", "AI levels the playing field", "Technology enables scale"].map((p, i) => (
                <div key={i} className="flex items-center gap-2.5 mb-3">
                  <CheckCircle className="w-4.5 h-4.5 text-accent flex-shrink-0" />
                  <span className="text-sm font-medium">{p}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {values.map((v, i) => (
                <div key={i} className="p-5 rounded-2xl glass-card-premium hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <v.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1.5">{v.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="section-padding bg-muted/20 border-y border-border">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="badge-blue mb-4 inline-block">Our Journey</span>
            <h2 className="text-4xl font-bold mb-4">From Idea to <span className="gradient-text">Impact</span></h2>
            <p className="text-muted-foreground">Five years of building, learning, and growing alongside India's students.</p>
          </div>
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute left-1/2 -translate-x-0.5 top-0 bottom-0 w-px bg-border hidden md:block" />
            <div className="space-y-6">
              {milestones.map((m, i) => (
                <div key={i} className={`flex flex-col md:flex-row items-start gap-4 ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}>
                  <div className={`flex-1 ${i % 2 !== 0 ? "md:text-right" : ""}`}>
                    <div className="inline-block bg-card border border-border rounded-xl p-4 shadow-sm max-w-xs">
                      <div className="text-xs font-bold text-primary mb-1">{m.year}</div>
                      <h3 className="font-semibold text-sm mb-1">{m.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex w-8 h-8 rounded-full gradient-primary items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-md shadow-primary/25 z-10 mt-3">
                    {i + 1}
                  </div>
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-950 dark:to-blue-950/10 border-t border-border">
        <div className="container-custom text-center">
          <GraduationCap className="w-12 h-12 text-primary mx-auto mb-5" />
          <h2 className="text-4xl font-bold mb-4">Be Part of the <span className="gradient-text">EdNeed Story</span></h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            Whether you're a student, teacher, or institution — join 500,000+ learners transforming their educational journey with EdNeed.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="px-8 py-3.5 gradient-primary text-white rounded-xl font-semibold hover:opacity-90 shadow-lg shadow-primary/25 flex items-center gap-2">
              Get Started Free <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/contact" className="px-8 py-3.5 border border-border rounded-xl font-semibold hover:bg-muted transition-colors">
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
