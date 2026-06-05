import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import {
  BookOpen, DollarSign, Users, BarChart3, Video, Star,
  CheckCircle, ArrowRight, Play, Award, Calendar, TrendingUp,
  Zap, MessageSquare, Globe, Shield
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const features = [
  { icon: Video, title: "Course Builder", desc: "Create and publish professional video courses with our intuitive course builder. Add lessons, quizzes, assignments, and live sessions all in one place.", color: "blue" },
  { icon: Users, title: "Student Management", desc: "Manage all your enrolled students from a unified dashboard. Track progress, send messages, grade assignments, and monitor engagement.", color: "purple" },
  { icon: DollarSign, title: "Revenue & Earnings", desc: "Earn 80% revenue share on every course sale. Get daily payouts, track earnings in real time, and scale your income with group and live sessions.", color: "green" },
  { icon: BarChart3, title: "Performance Analytics", desc: "Get deep insights into how students are engaging with your content. Identify drop-off points, top-performing lessons, and improvement opportunities.", color: "orange" },
  { icon: Calendar, title: "Live Class Scheduling", desc: "Schedule and conduct live classes directly on the platform. Send reminders, record sessions, and share recordings with enrolled students.", color: "teal" },
  { icon: Award, title: "Certification Tool", desc: "Issue branded completion certificates to students automatically. Boost course value and help students showcase their achievements.", color: "pink" },
];

const colorMap: Record<string, string> = {
  blue: "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
  purple: "bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
  green: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
  orange: "bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400",
  teal: "bg-teal-100 text-teal-600 dark:bg-teal-950 dark:text-teal-400",
  pink: "bg-pink-100 text-pink-600 dark:bg-pink-950 dark:text-pink-400",
};

const steps = [
  { step: "01", title: "Create Your Profile", desc: "Sign up as a teacher or tutor, upload your credentials, and set your subject expertise and teaching style." },
  { step: "02", title: "Build Your Course", desc: "Record video lessons, create quizzes, upload study material, and structure your course curriculum." },
  { step: "03", title: "Publish & Promote", desc: "Set your pricing, write a compelling description, and publish to reach millions of students on EdNeed." },
  { step: "04", title: "Teach & Earn", desc: "Conduct live sessions, grade assignments, answer doubts, and earn consistent monthly income." },
];

const earnings = [
  { type: "Course Sales", rate: "80% Revenue Share", desc: "Earn 80% of every course purchase. No caps, no limits." },
  { type: "Live Sessions", rate: "85% Revenue Share", desc: "Higher share for personalized live teaching sessions." },
  { type: "Group Classes", rate: "80% Revenue Share", desc: "Batch teaching with multiple students simultaneously." },
  { type: "1-on-1 Tutoring", rate: "90% Revenue Share", desc: "Maximum earnings for exclusive personal tutoring." },
];

export default function ForTeachers() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary/5 via-primary/5 to-background pt-28 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_hsl(262_83%_57%/0.1),_transparent_60%)]" />
        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-6">
                <BookOpen className="w-4 h-4" /> For Teachers & Tutors
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold font-heading mb-6 leading-tight">
                Share Your Knowledge, <span className="gradient-text">Build Your Income</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Join 2,500+ educators on EdNeed. Create courses, conduct live sessions, teach millions of students across India, and build a sustainable income from your expertise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link to="/register" className="px-8 py-4 gradient-primary text-white rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center gap-2 justify-center">
                  Start Teaching Free <ArrowRight className="w-4 h-4" />
                </Link>
                <button onClick={() => toast.success("Opening demo walkthrough...")} className="px-8 py-4 border border-border rounded-xl font-bold hover:bg-muted transition-colors flex items-center gap-2 justify-center">
                  <Play className="w-4 h-4 text-primary" /> View Demo
                </button>
              </div>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                {["Free to Join", "80%+ Revenue Share", "5M+ Student Reach"].map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {[
                { label: "Avg. Monthly Earnings", val: "₹45,000", icon: DollarSign, sub: "Top teachers earn ₹3L+/mo", color: "green" },
                { label: "Active Students on Platform", val: "5 Million+", icon: Users, sub: "Your potential audience", color: "blue" },
                { label: "Revenue Share", val: "Up to 90%", icon: TrendingUp, sub: "Best in the industry", color: "purple" },
                { label: "Verified Teacher Profile", val: "Trusted Badge", icon: Shield, sub: "Instant credibility boost", color: "orange" },
              ].map((s, i) => (
                <div key={i} className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4">
                  <div className={cn("w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0", colorMap[s.color])}>
                    <s.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                    <div className="text-xl font-bold">{s.val}</div>
                    <div className="text-xs text-muted-foreground">{s.sub}</div>
                  </div>
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
            <h2 className="text-3xl lg:text-4xl font-bold font-heading mb-4">Everything You Need to <span className="gradient-text">Teach Effectively</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">A complete teaching platform with tools for content creation, student management, live classes, and earnings tracking.</p>
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

      {/* How to start */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading mb-3">Start Teaching in <span className="gradient-text">4 Simple Steps</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((step, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 relative">
                <div className="absolute -top-3 left-6 text-xs font-bold text-white gradient-primary px-2 py-1 rounded-full">{step.step}</div>
                <h3 className="font-bold mb-2 mt-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Earnings */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading mb-3">Transparent <span className="gradient-text">Revenue Sharing</span></h2>
            <p className="text-muted-foreground">Earn more with EdNeed's industry-leading revenue share model</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {earnings.map((e, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/30 transition-colors">
                <div className="text-3xl font-bold gradient-text mb-2">{e.rate}</div>
                <h3 className="font-bold mb-1">{e.type}</h3>
                <p className="text-xs text-muted-foreground">{e.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">Payments processed monthly directly to your bank account. No minimum payout threshold.</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading mb-3">What Our <span className="gradient-text">Educators Say</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Dr. Ravi Tiwari", subject: "JEE Mathematics", earnings: "₹3.2L/month", text: "EdNeed's platform made it effortless to create and sell my JEE courses. I now teach 18,000+ students and earn more than I did at my coaching institute.", initials: "RT" },
              { name: "Ms. Kavitha Nair", subject: "English & Communication", earnings: "₹85K/month", text: "The course builder and live class tools are excellent. I started part-time and now teach full-time on EdNeed. The student base is huge and engagement is great.", initials: "KN" },
              { name: "Mr. Arjun Nair", subject: "Computer Science & DSA", earnings: "₹1.8L/month", text: "Teaching coding on EdNeed has been incredibly rewarding. The platform handles payments, student management, and analytics — I just focus on teaching.", initials: "AN" },
            ].map((t, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-1 mb-3">{[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}</div>
                <p className="text-sm text-muted-foreground mb-4">"{t.text}"</p>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold">{t.initials}</div>
                    <div>
                      <div className="text-sm font-bold">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.subject}</div>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-accent">{t.earnings}</div>
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
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(255,255,255,0.12),_transparent_60%)]" />
            <div className="relative">
              <Globe className="w-12 h-12 mx-auto mb-4 text-white/80" />
              <h2 className="text-3xl font-bold mb-4">Reach Millions. Earn More. Teach Better.</h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">Join 2,500+ educators who are building successful teaching careers on EdNeed.</p>
              <Link to="/register" className="inline-block px-8 py-4 bg-white text-primary rounded-xl font-bold hover:bg-white/90 transition-colors">
                Become an Educator
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
