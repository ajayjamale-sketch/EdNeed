import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import {
  Compass, Brain, Map, GraduationCap, Briefcase, Globe, ChevronRight,
  ArrowRight, CheckCircle, Star, Users, BookOpen, Target, TrendingUp, Zap, MessageCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import { Heart, Cpu, Landmark,  Palette, Microscope } from "lucide-react";

const careerPaths = [
  { icon: Heart, title: "Medicine & Healthcare", paths: ["MBBS", "BDS", "Nursing", "Pharmacy", "Ayurveda"], color: "green", exams: ["NEET UG", "AIIMS", "JIPMER"] },
  { icon: Cpu, title: "Engineering & Technology", paths: ["Computer Science", "Electronics", "Mechanical", "Civil", "AI/ML"], color: "blue", exams: ["JEE Main", "JEE Advanced", "BITSAT"] },
  { icon: Landmark, title: "Civil Services & Law", paths: ["IAS/IPS", "State PSC", "Judiciary", "Corporate Law", "LLB"], color: "purple", exams: ["UPSC CSE", "CLAT", "AILET"] },
  { icon: Briefcase, title: "Commerce & Finance", paths: ["CA", "MBA", "Banking", "Investment", "Insurance"], color: "orange", exams: ["CAT", "CLAT", "CA Foundation"] },
  { icon: Palette, title: "Design & Creative Arts", paths: ["Architecture", "Fashion Design", "UX/UI", "Animation", "Fine Arts"], color: "pink", exams: ["NATA", "NID", "NIFT"] },
  { icon: Microscope, title: "Research & Science", paths: ["Physics", "Chemistry", "Biology", "Data Science", "Astronomy"], color: "teal", exams: ["KVPY", "JEST", "IISc"] },
];

const counselors = [
  { name: "Dr. Meera Kapoor", specialization: "Engineering & Technology", experience: "15 years", students: 2400, rating: 4.9, initials: "MK" },
  { name: "Mr. Rohan Verma", specialization: "Medical Careers", experience: "12 years", students: 1800, rating: 4.8, initials: "RV" },
  { name: "Ms. Shruti Patel", specialization: "Business & MBA", experience: "10 years", students: 1200, rating: 4.7, initials: "SP" },
  { name: "Dr. Ajay Singh", specialization: "Civil Services", experience: "18 years", students: 3100, rating: 4.9, initials: "AS" },
];

const colorMap: Record<string, string> = {
  green: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
  blue: "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
  purple: "bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400",
  orange: "bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400",
  pink: "bg-pink-100 text-pink-600 dark:bg-pink-950 dark:text-pink-400",
  teal: "bg-teal-100 text-teal-600 dark:bg-teal-950 dark:text-teal-400",
};

const assessmentQuestions = [
  { q: "What are your strongest subjects?", options: ["Science & Maths", "Commerce & Economics", "Humanities & Arts", "Technology & Computers"] },
  { q: "What type of work environment do you prefer?", options: ["Fieldwork & Travel", "Office & Research", "Creative Studios", "Social & Community"] },
  { q: "Which value is most important in your career?", options: ["Financial Security", "Social Impact", "Creative Freedom", "Intellectual Challenge"] },
  { q: "What is your ideal work style?", options: ["Independent Work", "Team Collaboration", "Leadership Roles", "Mentoring Others"] },
];

export default function Career() {
  const [showAssessment, setShowAssessment] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (option: string) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);
    if (currentQ < assessmentQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      // Simple result logic
      setResult("Engineering & Technology");
      toast.success("Career assessment complete! View your personalized roadmap.");
    }
  };

  const resetAssessment = () => {
    setShowAssessment(false);
    setCurrentQ(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-accent/5 via-primary/5 to-background pt-28 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(160_84%_39%/0.08),_transparent_60%)]" />
        <div className="container-custom relative">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-6">
              <Compass className="w-4 h-4" /> AI-Powered Career Guidance
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold font-heading mb-5 leading-tight">
              Discover Your <span className="gradient-text">Perfect Career Path</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Take our AI-powered career assessment, explore career roadmaps, get personalized college guidance, and connect with expert counselors to shape your future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setShowAssessment(true)} className="px-8 py-4 gradient-primary text-white rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center gap-2">
                <Brain className="w-5 h-5" /> Take Career Assessment
              </button>
              <Link to="/dashboard/career" className="px-8 py-4 border border-border rounded-xl font-bold hover:bg-muted transition-colors flex items-center gap-2">
                Explore Career Roadmaps <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Target, label: "Career Paths Mapped", val: "500+" },
              { icon: Users, label: "Students Guided", val: "1.2M+" },
              { icon: GraduationCap, label: "College Partnerships", val: "2,000+" },
              { icon: Globe, label: "Study Abroad Guides", val: "50+ Countries" },
            ].map((s, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-5 text-center">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-xl font-bold">{s.val}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Paths */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading mb-3">Explore <span className="gradient-text">Career Streams</span></h2>
            <p className="text-muted-foreground">Discover detailed roadmaps, exam requirements, and salary insights for every major career stream</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {careerPaths.map((career, i) => (
              <div
                key={i}
                onClick={() => toast.success(`Opening ${career.title} career path...`)}
                className="glass-card-premium p-8 rounded-3xl hover:border-primary/40 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
              >
                <div className="text-3xl mb-3"><career.icon /></div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{career.title}</h3>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {career.paths.map((p) => (
                    <span key={p} className={cn("text-xs px-2 py-0.5 rounded-full", colorMap[career.color])}>{p}</span>
                  ))}
                </div>
                <div className="border-t border-border pt-3">
                  <p className="text-xs text-muted-foreground mb-1 font-medium">Key Exams:</p>
                  <div className="flex flex-wrap gap-1">
                    {career.exams.map((e) => (
                      <span key={e} className="text-xs bg-muted px-2 py-0.5 rounded-full font-medium">{e}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-3 text-xs text-primary font-semibold">
                  View Roadmap <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading mb-3">Your <span className="gradient-text">Career Guidance Journey</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", icon: Brain, title: "Career Assessment", desc: "Complete our AI-powered aptitude and personality assessment to understand your strengths" },
              { step: "02", icon: Map, title: "Explore Roadmaps", desc: "Browse personalized career roadmaps with clear milestones, exams, and timelines" },
              { step: "03", icon: BookOpen, title: "College Guidance", desc: "Get expert guidance on college selection, entrance exams, and application processes" },
              { step: "04", icon: Briefcase, title: "Connect & Succeed", desc: "Connect with industry mentors, apply for internships, and launch your career" },
            ].map((step, i) => (
              <div key={i} className="glass-card-premium rounded-3xl p-8 relative hover:-translate-y-1 transition-transform duration-300">
                <div className="absolute -top-3 left-6 text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">{step.step}</div>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <step.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Counselors */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold font-heading mb-2">Expert <span className="gradient-text">Career Counselors</span></h2>
              <p className="text-muted-foreground">Get 1-on-1 guidance from certified career counselors</p>
            </div>
            <Link to="/tutors" className="flex items-center gap-1 text-sm text-primary font-semibold hover:underline">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {counselors.map((c, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-5 text-center hover:border-primary/30 hover:shadow-md transition-all">
                <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center text-white text-xl font-bold mx-auto mb-3">{c.initials}</div>
                <h3 className="font-bold text-sm mb-0.5">{c.name}</h3>
                <p className="text-xs text-primary font-medium mb-1">{c.specialization}</p>
                <p className="text-xs text-muted-foreground mb-3">{c.experience} experience</p>
                <div className="flex items-center justify-center gap-1 mb-1 text-xs">
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold">{c.rating}</span>
                  <span className="text-muted-foreground">· {c.students.toLocaleString()} guided</span>
                </div>
                <button onClick={() => toast.success(`Booking session with ${c.name}`)} className="w-full mt-3 py-2 gradient-primary text-white rounded-xl text-xs font-semibold hover:opacity-90">
                  Book Session
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Study Abroad */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-6">
                <Globe className="w-4 h-4" /> Study Abroad Support
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold font-heading mb-5">
                Pursue Education <span className="gradient-text">Globally</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Get end-to-end guidance for studying abroad — from university shortlisting and SOP writing to visa assistance and scholarship applications.
              </p>
              <div className="space-y-3 mb-8">
                {["University shortlisting based on profile", "SOP & LOR writing assistance", "Scholarship discovery and applications", "Visa guidance and documentation", "Pre-departure orientation programs"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <button onClick={() => toast.success("Opening Study Abroad portal...")} className="px-8 py-4 gradient-primary text-white rounded-xl font-bold hover:opacity-90 transition-opacity">
                Explore Study Abroad
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { country: "🇺🇸", name: "United States", unis: "4,000+ Universities" },
                { country: "🇬🇧", name: "United Kingdom", unis: "160+ Universities" },
                { country: "🇨🇦", name: "Canada", unis: "200+ Universities" },
                { country: "🇦🇺", name: "Australia", unis: "43 Universities" },
                { country: "🇩🇪", name: "Germany", unis: "400+ Universities" },
                { country: "🇸🇬", name: "Singapore", unis: "Top 3 Global" },
              ].map((country, i) => (
                <div key={i} onClick={() => toast.info(`Exploring ${country.name} study options`)} className="bg-card border border-border rounded-xl p-4 flex items-center gap-3 hover:border-primary/30 transition-colors cursor-pointer">
                  <span className="text-2xl">{country.country}</span>
                  <div>
                    <div className="text-sm font-semibold">{country.name}</div>
                    <div className="text-xs text-muted-foreground">{country.unis}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Assessment Modal */}
      {showAssessment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-lg">
            {result ? (
              <div className="text-center py-4">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-2">Your Career Match: {result}</h3>
                <p className="text-sm text-muted-foreground mb-6">Based on your responses, you're best suited for careers in Engineering & Technology, particularly Computer Science and AI/ML.</p>
                <div className="flex gap-2">
                  <Link to="/dashboard/career" onClick={resetAssessment} className="flex-1 py-3 gradient-primary text-white rounded-xl text-sm font-bold text-center">
                    View Full Roadmap
                  </Link>
                  <button onClick={resetAssessment} className="flex-1 py-3 border border-border rounded-xl text-sm font-semibold hover:bg-muted">
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="font-bold text-lg">Career Assessment</h3>
                    <p className="text-xs text-muted-foreground">Question {currentQ + 1} of {assessmentQuestions.length}</p>
                  </div>
                  <button onClick={resetAssessment} className="text-muted-foreground hover:text-foreground text-xs">Cancel</button>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full mb-5">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${((currentQ) / assessmentQuestions.length) * 100}%` }} />
                </div>
                <h4 className="font-semibold mb-4">{assessmentQuestions[currentQ].q}</h4>
                <div className="space-y-2">
                  {assessmentQuestions[currentQ].options.map((opt) => (
                    <button key={opt} onClick={() => handleAnswer(opt)} className="w-full text-left px-4 py-3 border border-border rounded-xl text-sm hover:border-primary hover:bg-primary/5 transition-all">
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}
