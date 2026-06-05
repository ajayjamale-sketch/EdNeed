import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Target, BarChart2, Brain, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const questions = [
  { q: "What subjects excite this student?", options: ["Mathematics & Science", "Biology & Chemistry", "Social Studies & History", "Arts & Creative subjects"] },
  { q: "What work style does the student prefer?", options: ["Research/Analysis", "Helping People", "Creating/Building", "Managing/Leading"] },
  { q: "What are their academic strengths?", options: ["Strong in Maths/Logic", "Strong in Biology/Science", "Strong in Languages/Humanities", "Strong in Commerce/Business"] },
  { q: "What's their family/financial background?", options: ["Strong financial support", "Need scholarship options", "Prefer government exams", "Open to all options"] },
  { q: "What long-term goal do they mention?", options: ["Become an engineer/scientist", "Become a doctor/healthcare", "Join civil services/law", "Start a business/MBA"] },
];

const opportunitiesData = [
  { title: "IIT Mentorship Program", type: "Program", org: "IIT Delhi", deadline: "Jun 30", match: 95, category: "Engineering" },
  { title: "NEET Scholarship — Top 100", type: "Scholarship", org: "Ministry of Health", deadline: "Jul 15", match: 88, category: "Medicine" },
  { title: "UPSC Foundation Course", type: "Course", org: "EdNeed Academy", deadline: "Open", match: 82, category: "Civil Services" },
  { title: "IIM Summer Internship", type: "Internship", org: "IIM Ahmedabad", deadline: "Aug 1", match: 78, category: "Management" },
];

export default function CounselorAssessments() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [done, setDone] = useState(false);
  const [tab, setTab] = useState<"assessment" | "opportunities">("assessment");

  const handleAnswer = (idx: number) => {
    const newAnswers = [...answers, idx];
    setAnswers(newAnswers);
    if (newAnswers.length === questions.length) {
      setDone(true);
    } else {
      setStep(step + 1);
    }
  };

  const reset = () => { setStep(0); setAnswers([]); setDone(false); };

  return (
    <DashboardLayout title="Career Assessments & Opportunities" subtitle="Conduct aptitude assessments and match students with opportunities">
      <div className="flex gap-2 mb-5">
        {(["assessment", "opportunities"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={cn("px-4 py-2.5 rounded-xl text-sm font-semibold border capitalize transition-all", tab === t ? "gradient-primary text-white border-transparent" : "bg-muted border-transparent text-muted-foreground hover:text-foreground")}>
            {t === "assessment" ? "Career Aptitude Test" : "Opportunity Matching"}
          </button>
        ))}
      </div>

      {tab === "assessment" && (
        <div className="max-w-2xl">
          {!done ? (
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Student Career Assessment</h3>
                <span className="text-sm text-muted-foreground">{step + 1}/{questions.length}</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-6">
                <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${((step + 1) / questions.length) * 100}%` }} />
              </div>
              <div className="mb-3 text-xs text-muted-foreground">Conducting assessment for: <strong className="text-foreground">Rahul Mehta</strong></div>
              <h2 className="text-lg font-bold mb-5">{questions[step].q}</h2>
              <div className="space-y-3">
                {questions[step].options.map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(i)} className="w-full p-4 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 text-left text-sm font-medium transition-all">
                    <span className="w-6 h-6 rounded-full border-2 border-primary text-primary text-xs font-bold inline-flex items-center justify-center mr-3">{["A","B","C","D"][i]}</span>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="text-center mb-6">
                <div className="text-5xl mb-3">🎯</div>
                <h2 className="text-2xl font-bold mb-2">Assessment Complete — Rahul Mehta</h2>
                <p className="text-muted-foreground text-sm">Career recommendations based on responses:</p>
              </div>
              <div className="space-y-3 mb-6">
                {[
                  { career: "IIT/NIT Engineering", match: 95, desc: "Strong match — excellent problem-solving aptitude" },
                  { career: "Data Science & AI", match: 88, desc: "High compatibility with analytical mindset" },
                  { career: "Research & Academia", match: 72, desc: "Good fit for research-oriented roles" },
                ].map((r, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-muted/40">
                    <div className="w-24 text-sm font-bold text-right">{r.match}%</div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm mb-1">{r.career}</div>
                      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${r.match}%` }} />
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">{r.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={() => toast.success("Assessment report saved to Rahul's profile!")} className="flex-1 py-2.5 gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90">Save to Profile</button>
                <button onClick={reset} className="flex-1 py-2.5 border border-border rounded-xl text-sm font-semibold hover:bg-muted transition-colors">New Assessment</button>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === "opportunities" && (
        <div>
          <p className="text-sm text-muted-foreground mb-5">AI-matched opportunities for your students based on their career profiles</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {opportunitiesData.map((o, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/30 transition-all card-hover">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-sm">{o.title}</h3>
                    <p className="text-xs text-muted-foreground">{o.org}</p>
                  </div>
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">{o.match}% match</span>
                </div>
                <div className="flex items-center gap-3 text-xs mb-4">
                  <span className="bg-muted px-2 py-0.5 rounded-full">{o.type}</span>
                  <span className="bg-muted px-2 py-0.5 rounded-full">{o.category}</span>
                  <span className="text-muted-foreground">Deadline: {o.deadline}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => toast.success(`Recommending "${o.title}" to matched students...`)} className="flex-1 py-2 gradient-primary text-white rounded-lg text-xs font-semibold hover:opacity-90">Recommend to Students</button>
                  <button onClick={() => toast.success("Opening opportunity details...")} className="flex-1 py-2 border border-border rounded-lg text-xs font-semibold hover:bg-muted transition-colors">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
