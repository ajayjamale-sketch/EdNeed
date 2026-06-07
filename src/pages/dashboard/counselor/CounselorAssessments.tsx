import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Target, BarChart2, Brain, Globe, CheckCircle, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
  
  const [viewOpp, setViewOpp] = useState<any>(null);
  const [recommendOpp, setRecommendOpp] = useState<any>(null);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

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
                  <button onClick={() => setRecommendOpp(o)} className="flex-1 py-2 gradient-primary text-white rounded-lg text-xs font-semibold hover:opacity-90">Recommend to Students</button>
                  <button onClick={() => setViewOpp(o)} className="flex-1 py-2 border border-border rounded-lg text-xs font-semibold hover:bg-muted transition-colors">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- View Opportunity Modal --- */}
      <Dialog open={!!viewOpp} onOpenChange={(open) => !open && setViewOpp(null)}>
        <DialogContent className="sm:max-w-[500px] bg-background">
          <DialogHeader>
            <DialogTitle>Opportunity Details</DialogTitle>
          </DialogHeader>
          {viewOpp && (
            <div className="py-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white flex-shrink-0">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{viewOpp.title}</h3>
                  <p className="text-sm text-muted-foreground">{viewOpp.org}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-card border border-border rounded-xl p-3">
                  <div className="text-xs text-muted-foreground mb-1">Type</div>
                  <div className="font-semibold text-sm">{viewOpp.type}</div>
                </div>
                <div className="bg-card border border-border rounded-xl p-3">
                  <div className="text-xs text-muted-foreground mb-1">Category</div>
                  <div className="font-semibold text-sm">{viewOpp.category}</div>
                </div>
                <div className="bg-card border border-border rounded-xl p-3">
                  <div className="text-xs text-muted-foreground mb-1">Match Score</div>
                  <div className="font-semibold text-sm text-primary">{viewOpp.match}% Match</div>
                </div>
                <div className="bg-card border border-border rounded-xl p-3">
                  <div className="text-xs text-muted-foreground mb-1">Deadline</div>
                  <div className="font-semibold text-sm">{viewOpp.deadline}</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                This {viewOpp.type.toLowerCase()} is highly recommended for students focusing on {viewOpp.category}. It provides excellent exposure and aligns perfectly with aptitude scores &gt; 80%.
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewOpp(null)}>Close</Button>
            {viewOpp && (
              <Button onClick={() => { setRecommendOpp(viewOpp); setViewOpp(null); }}>Recommend Opportunity</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- Recommend Opportunity Modal --- */}
      <Dialog open={!!recommendOpp} onOpenChange={(open) => !open && setRecommendOpp(null)}>
        <DialogContent className="sm:max-w-[400px] bg-background">
          <DialogHeader>
            <DialogTitle>Recommend Opportunity</DialogTitle>
          </DialogHeader>
          {recommendOpp && (
            <div className="py-2 space-y-4">
              <p className="text-sm text-muted-foreground">Select students to recommend <strong className="text-foreground">"{recommendOpp.title}"</strong> to:</p>
              <div className="space-y-2 border border-border rounded-xl p-3 max-h-[200px] overflow-y-auto">
                {["Rahul Mehta", "Ananya Reddy", "Siddharth Rao", "Kavya Nair", "Arjun Iyer"].map(student => (
                  <label key={student} className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg cursor-pointer transition-colors">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary/30"
                      checked={selectedStudents.includes(student)}
                      onChange={(e) => {
                        if (e.target.checked) setSelectedStudents([...selectedStudents, student]);
                        else setSelectedStudents(selectedStudents.filter(s => s !== student));
                      }}
                    />
                    <span className="text-sm font-medium">{student}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setRecommendOpp(null)}>Cancel</Button>
            <Button onClick={() => { 
              if (selectedStudents.length === 0) {
                toast.error("Please select at least one student");
                return;
              }
              toast.success(`Sent recommendation to ${selectedStudents.length} students!`); 
              setRecommendOpp(null);
              setSelectedStudents([]);
            }} className="gap-2">
              <Send className="w-4 h-4" /> Send Recommendation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
