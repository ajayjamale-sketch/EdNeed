import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Briefcase, Target, Map, GraduationCap, Globe, Users, Star, CheckCircle, ArrowRight, BookOpen, Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const careerPaths = [
  { id: "engineering", icon: "⚙️", title: "Engineering", desc: "IIT/NIT via JEE — core and software branches", scope: "Very High", salary: "₹6-40 LPA", exams: ["JEE Main", "JEE Advanced", "BITSAT"], skills: ["Mathematics", "Physics", "Problem Solving"], color: "blue" },
  { id: "medicine", icon: "🏥", title: "Medicine & Healthcare", desc: "MBBS, BDS, BAMS via NEET", scope: "Very High", salary: "₹5-50 LPA", exams: ["NEET UG", "AIIMS", "JIPMER"], skills: ["Biology", "Chemistry", "Empathy"], color: "green" },
  { id: "law", icon: "⚖️", title: "Law & Legal", desc: "LLB, CLAT for NLU admissions", scope: "High", salary: "₹4-30 LPA", exams: ["CLAT", "AILET", "LSAT"], skills: ["English", "Reasoning", "Communication"], color: "purple" },
  { id: "management", icon: "📊", title: "Management & MBA", desc: "IIM/Top B-School via CAT", scope: "Very High", salary: "₹8-60 LPA", exams: ["CAT", "XAT", "MAT"], skills: ["Quantitative Aptitude", "Data Analysis", "Leadership"], color: "orange" },
  { id: "civil", icon: "🏛️", title: "Civil Services (IAS)", desc: "UPSC CSE for government positions", scope: "High", salary: "₹7-20 LPA + benefits", exams: ["UPSC CSE", "State PSC"], skills: ["General Studies", "Essay Writing", "Current Affairs"], color: "blue" },
  { id: "design", icon: "🎨", title: "Design & Architecture", desc: "NID, NIFT, B.Arch via entrance exams", scope: "Growing", salary: "₹4-25 LPA", exams: ["NATA", "NID DAT", "NIFT"], skills: ["Creativity", "Drawing", "Design Thinking"], color: "purple" },
];

const assessmentQuestions = [
  { q: "What subjects excite you the most?", options: ["Mathematics & Science", "Biology & Chemistry", "Social Studies & History", "Arts & Creative subjects"] },
  { q: "What kind of work environment do you prefer?", options: ["Lab/Research environment", "Outdoor/Field work", "Office & Corporate", "Creative Studio"] },
  { q: "Which activity do you enjoy most?", options: ["Solving complex problems", "Helping & caring for people", "Creating & designing things", "Analyzing data & planning"] },
  { q: "What's your long-term goal?", options: ["Make a scientific discovery", "Serve the nation/society", "Build a successful business", "Create art/impact culture"] },
];

const counselors = [
  { name: "Dr. Meera Iyer", specialization: "Engineering & Technology", experience: "15 years", students: 2400, rating: 4.9, initials: "MI", color: "bg-blue-500" },
  { name: "Mr. Suresh Nair", specialization: "Medical & Healthcare", experience: "12 years", students: 1800, rating: 4.8, initials: "SN", color: "bg-green-500" },
  { name: "Ms. Kavitha Pillai", specialization: "Management & MBA", experience: "10 years", students: 1500, rating: 4.7, initials: "KP", color: "bg-purple-500" },
  { name: "Dr. Arjun Bose", specialization: "Civil Services & Law", experience: "18 years", students: 3200, rating: 4.9, initials: "AB", color: "bg-orange-500" },
];

const colorMap: Record<string, string> = {
  blue: "bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-900",
  purple: "bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-900",
  green: "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-900",
  orange: "bg-orange-50 dark:bg-orange-950/50 border-orange-200 dark:border-orange-900",
};

export default function DashboardCareer() {
  const [activeTab, setActiveTab] = useState<"explore" | "assessment" | "counselors">("explore");
  const [assessmentStep, setAssessmentStep] = useState(0);
  const [assessmentAnswers, setAssessmentAnswers] = useState<number[]>([]);
  const [assessmentDone, setAssessmentDone] = useState(false);

  const handleAnswer = (idx: number) => {
    const newAnswers = [...assessmentAnswers, idx];
    setAssessmentAnswers(newAnswers);
    if (newAnswers.length === assessmentQuestions.length) {
      setAssessmentDone(true);
    } else {
      setAssessmentStep(assessmentStep + 1);
    }
  };

  const resetAssessment = () => {
    setAssessmentStep(0);
    setAssessmentAnswers([]);
    setAssessmentDone(false);
  };

  return (
    <DashboardLayout title="Career Guidance" subtitle="Discover your ideal career path with AI-powered assessment">
      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { id: "explore" as const, label: "Explore Careers", icon: Map },
          { id: "assessment" as const, label: "Career Assessment", icon: Brain },
          { id: "counselors" as const, label: "Career Counselors", icon: Users },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn("flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border", activeTab === tab.id ? "gradient-primary text-white border-transparent shadow-sm" : "bg-muted border-transparent text-muted-foreground hover:text-foreground")}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "explore" && (
        <div>
          <p className="text-sm text-muted-foreground mb-5">Explore career paths, required exams, and salary expectations</p>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {careerPaths.map((path) => (
              <div key={path.id} className={cn("p-5 rounded-2xl border transition-all hover:border-primary/40 card-hover cursor-pointer", colorMap[path.color])} onClick={() => toast.success(`Exploring ${path.title} career path...`)}>
                <div className="text-3xl mb-3">{path.icon}</div>
                <h3 className="font-bold text-base mb-1">{path.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{path.desc}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Job Scope</span>
                    <span className="font-semibold text-accent">{path.scope}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Salary Range</span>
                    <span className="font-semibold">{path.salary}</span>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="text-xs text-muted-foreground mb-1.5">Entrance Exams:</div>
                  <div className="flex flex-wrap gap-1">
                    {path.exams.map((exam) => (
                      <span key={exam} className="text-xs bg-card border border-border px-2 py-0.5 rounded-full">{exam}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1.5">Key Skills:</div>
                  <div className="flex flex-wrap gap-1">
                    {path.skills.map((skill) => (
                      <span key={skill} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "assessment" && (
        <div className="max-w-2xl">
          {!assessmentDone ? (
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">Career Aptitude Assessment</h3>
                  <span className="text-sm text-muted-foreground">{assessmentStep + 1} / {assessmentQuestions.length}</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${((assessmentStep + 1) / assessmentQuestions.length) * 100}%` }} />
                </div>
              </div>

              <h2 className="text-lg font-bold mb-5">{assessmentQuestions[assessmentStep].q}</h2>
              <div className="space-y-3">
                {assessmentQuestions[assessmentStep].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    className="w-full p-4 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 text-left text-sm font-medium transition-all"
                  >
                    <span className="w-6 h-6 rounded-full border-2 border-primary text-primary text-xs font-bold inline-flex items-center justify-center mr-3">
                      {["A", "B", "C", "D"][i]}
                    </span>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-2xl p-6 text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h2 className="text-2xl font-bold mb-2">Assessment Complete!</h2>
              <p className="text-muted-foreground mb-6">Based on your answers, here are your top career matches:</p>
              <div className="space-y-3 mb-6 text-left">
                {[
                  { career: "Engineering (IIT/NIT)", match: 92, icon: "⚙️" },
                  { career: "Data Science & AI", match: 88, icon: "🤖" },
                  { career: "Research & Academia", match: 75, icon: "🔬" },
                ].map((r) => (
                  <div key={r.career} className="flex items-center gap-3 p-3 rounded-xl bg-muted/40">
                    <span className="text-2xl">{r.icon}</span>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="font-semibold text-sm">{r.career}</span>
                        <span className="text-sm font-bold text-primary">{r.match}% match</span>
                      </div>
                      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${r.match}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setActiveTab("counselors")} className="flex-1 py-3 gradient-primary text-white rounded-xl font-semibold text-sm hover:opacity-90 flex items-center justify-center gap-2">
                  <Users className="w-4 h-4" /> Book Counseling
                </button>
                <button onClick={resetAssessment} className="flex-1 py-3 border border-border rounded-xl font-semibold text-sm hover:bg-muted transition-colors">
                  Retake Test
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "counselors" && (
        <div>
          <p className="text-sm text-muted-foreground mb-5">Book a 1-on-1 session with expert career counselors</p>
          <div className="grid sm:grid-cols-2 gap-5">
            {counselors.map((c) => (
              <div key={c.name} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/30 transition-all card-hover">
                <div className="flex items-start gap-4 mb-4">
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white text-lg font-bold flex-shrink-0", c.color)}>
                    {c.initials}
                  </div>
                  <div>
                    <h3 className="font-semibold">{c.name}</h3>
                    <p className="text-sm text-primary font-medium">{c.specialization}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span>{c.experience}</span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" />{c.students.toLocaleString()} students</span>
                      <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />{c.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => toast.success(`Booking session with ${c.name}...`)} className="flex-1 py-2.5 gradient-primary text-white rounded-xl text-xs font-semibold hover:opacity-90">
                    Book Session
                  </button>
                  <button onClick={() => toast.success(`Message sent to ${c.name}!`)} className="flex-1 py-2.5 border border-border rounded-xl text-xs font-semibold hover:bg-muted transition-colors">
                    Message
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
