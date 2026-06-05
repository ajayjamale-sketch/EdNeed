import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Target, Clock, Trophy, CheckCircle, AlertCircle, Play, BookOpen, BarChart3, ArrowRight, Timer } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const mockTests = [
  { id: 1, title: "JEE Main - Full Mock Test #12", subject: "PCM", duration: 180, questions: 90, marks: 360, difficulty: "Hard", attempts: 3, bestScore: 248, status: "attempted", category: "JEE" },
  { id: 2, title: "Physics - Electromagnetism Test", subject: "Physics", duration: 60, questions: 30, marks: 120, difficulty: "Medium", attempts: 2, bestScore: 98, status: "attempted", category: "Chapter Test" },
  { id: 3, title: "NEET Biology - Unit Test 5", subject: "Biology", duration: 90, questions: 45, marks: 180, difficulty: "Medium", attempts: 0, bestScore: 0, status: "new", category: "NEET" },
  { id: 4, title: "Mathematics - Calculus Deep Dive", subject: "Mathematics", duration: 60, questions: 25, marks: 100, difficulty: "Hard", attempts: 1, bestScore: 72, status: "attempted", category: "Chapter Test" },
  { id: 5, title: "Chemistry - Organic Reactions Quiz", subject: "Chemistry", duration: 45, questions: 20, marks: 80, difficulty: "Easy", attempts: 0, bestScore: 0, status: "new", category: "Quiz" },
  { id: 6, title: "UPSC Prelims Mock Test #4", subject: "GS Paper 1", duration: 120, questions: 100, marks: 200, difficulty: "Hard", attempts: 0, bestScore: 0, status: "new", category: "UPSC" },
];

interface TestQuestion {
  id: number;
  text: string;
  options: string[];
  correct: number;
  explanation: string;
}

const sampleQuestions: TestQuestion[] = [
  { id: 1, text: "A particle moves in a straight line with constant acceleration. If its velocity at t=0 is 5 m/s and at t=4s is 13 m/s, what is the acceleration?", options: ["1 m/s²", "2 m/s²", "3 m/s²", "4 m/s²"], correct: 1, explanation: "Using v = u + at: 13 = 5 + a(4), so a = 8/4 = 2 m/s²" },
  { id: 2, text: "The derivative of sin(2x) with respect to x is:", options: ["cos(2x)", "2cos(2x)", "-2cos(2x)", "sin(2x)"], correct: 1, explanation: "Using chain rule: d/dx[sin(2x)] = cos(2x) · 2 = 2cos(2x)" },
  { id: 3, text: "Which of the following is the strongest acid?", options: ["CH₃COOH", "CCl₃COOH", "CHCl₂COOH", "CH₂ClCOOH"], correct: 1, explanation: "CCl₃COOH (trichloroacetic acid) is strongest due to maximum inductive effect of 3 Cl atoms." },
  { id: 4, text: "DNA replication in prokaryotes begins at:", options: ["Multiple origins", "Single origin (oriC)", "Centromere", "Telomere"], correct: 1, explanation: "Prokaryotes have a single circular chromosome with one origin of replication called oriC." },
  { id: 5, text: "If the sum of first n terms of an AP is 3n² + 5n, find the nth term:", options: ["6n + 2", "6n - 1", "6n + 1", "3n + 2"], correct: 0, explanation: "Sₙ = 3n² + 5n. Tₙ = Sₙ - Sₙ₋₁ = 3n² + 5n - 3(n-1)² - 5(n-1) = 6n + 2" },
];

const difficultyColor: Record<string, string> = {
  Easy: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  Medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
  Hard: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
};

export default function DashboardAssessments() {
  const [activeTest, setActiveTest] = useState<typeof mockTests[0] | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [bookmarked, setBookmarked] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);

  const startTest = (test: typeof mockTests[0]) => {
    setActiveTest(test);
    setCurrentQ(0);
    setAnswers({});
    setBookmarked([]);
    setSubmitted(false);
    setTimeLeft(300);
  };

  const selectAnswer = (qIdx: number, optIdx: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const submitTest = () => {
    const correct = sampleQuestions.filter((q, i) => answers[i] === q.correct).length;
    setSubmitted(true);
    toast.success(`Test submitted! You scored ${correct}/${sampleQuestions.length}`);
  };

  if (activeTest && !submitted) {
    const q = sampleQuestions[currentQ];
    return (
      <DashboardLayout title={activeTest.title} subtitle={`${activeTest.subject} · ${activeTest.questions} Questions`}>
        <div className="max-w-4xl">
          {/* Test Header */}
          <div className="bg-card border border-border rounded-2xl p-4 mb-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Timer className="w-4 h-4 text-primary" />
                <span className="font-mono font-bold text-primary">{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}</span>
              </div>
              <span className="text-sm text-muted-foreground">{Object.keys(answers).length}/{sampleQuestions.length} answered</span>
            </div>
            <button onClick={submitTest} className="px-4 py-2 gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90">
              Submit Test
            </button>
          </div>

          <div className="grid lg:grid-cols-4 gap-5">
            {/* Question Panel */}
            <div className="lg:col-span-3">
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-sm font-semibold text-primary">Question {currentQ + 1} of {sampleQuestions.length}</span>
                  <span className={cn("text-xs px-2 py-0.5 rounded-full", difficultyColor[activeTest.difficulty])}>{activeTest.difficulty}</span>
                </div>
                <p className="text-base font-medium mb-5 leading-relaxed">{q.text}</p>
                <div className="space-y-3 mb-6">
                  {q.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => selectAnswer(currentQ, i)}
                      className={cn(
                        "w-full p-4 rounded-xl border-2 text-left text-sm font-medium transition-all",
                        answers[currentQ] === i
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/30 hover:bg-muted"
                      )}
                    >
                      <span className="font-bold mr-3">{["A", "B", "C", "D"][i]}.</span> {opt}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between">
                  <button onClick={() => setCurrentQ(Math.max(0, currentQ - 1))} disabled={currentQ === 0} className="px-4 py-2 border border-border rounded-xl text-sm font-medium disabled:opacity-40 hover:bg-muted transition-colors">
                    ← Previous
                  </button>
                  <button onClick={() => setCurrentQ(Math.min(sampleQuestions.length - 1, currentQ + 1))} disabled={currentQ === sampleQuestions.length - 1} className="px-4 py-2 gradient-primary text-white rounded-xl text-sm font-semibold disabled:opacity-40 hover:opacity-90 transition-opacity">
                    Next →
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation Panel */}
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-2xl p-4">
                <h3 className="font-semibold text-sm mb-3">Question Navigator</h3>
                <div className="grid grid-cols-5 gap-1.5">
                  {sampleQuestions.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentQ(i)}
                      className={cn(
                        "w-full aspect-square rounded-lg text-xs font-bold transition-all",
                        i === currentQ ? "gradient-primary text-white" :
                        answers[i] !== undefined ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300" :
                        bookmarked.includes(i) ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300" :
                        "bg-muted text-muted-foreground hover:bg-muted/80"
                      )}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <div className="mt-3 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="w-3 h-3 rounded-sm bg-green-100 dark:bg-green-950" /> Answered ({Object.keys(answers).length})
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="w-3 h-3 rounded-sm bg-muted" /> Not Answered ({sampleQuestions.length - Object.keys(answers).length})
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (submitted && activeTest) {
    const correct = sampleQuestions.filter((q, i) => answers[i] === q.correct).length;
    const score = Math.round((correct / sampleQuestions.length) * activeTest.marks);
    return (
      <DashboardLayout title="Test Results" subtitle="Here's how you performed">
        <div className="max-w-3xl">
          <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 text-white mb-5 text-center">
            <Trophy className="w-12 h-12 mx-auto mb-3 opacity-80" />
            <div className="text-5xl font-bold mb-1">{score}/{activeTest.marks}</div>
            <div className="text-white/80 mb-3">{correct}/{sampleQuestions.length} questions correct</div>
            <div className="text-2xl font-bold">{Math.round((correct / sampleQuestions.length) * 100)}%</div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 mb-5">
            <h3 className="font-semibold mb-4">Question Review</h3>
            <div className="space-y-4">
              {sampleQuestions.map((q, i) => (
                <div key={i} className={cn("p-4 rounded-xl border", answers[i] === q.correct ? "border-green-200 bg-green-50/50 dark:border-green-900 dark:bg-green-950/30" : "border-red-200 bg-red-50/50 dark:border-red-900 dark:bg-red-950/30")}>
                  <div className="flex items-start gap-2 mb-2">
                    {answers[i] === q.correct ? <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" /> : <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />}
                    <span className="text-sm font-medium">{q.text}</span>
                  </div>
                  <div className="text-xs text-muted-foreground ml-6">
                    <span className="text-green-600 font-medium">Correct: {q.options[q.correct]}</span>
                    {answers[i] !== q.correct && answers[i] !== undefined && <span className="text-red-600 font-medium ml-3">Your answer: {q.options[answers[i]]}</span>}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5 ml-6 italic">{q.explanation}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={() => startTest(activeTest)} className="flex-1 py-3 gradient-primary text-white rounded-xl font-semibold text-sm hover:opacity-90">
              Retry Test
            </button>
            <button onClick={() => setActiveTest(null)} className="flex-1 py-3 border border-border rounded-xl font-semibold text-sm hover:bg-muted transition-colors">
              Back to Tests
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Assessments" subtitle="Practice with mock tests, quizzes, and adaptive assessments">
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {mockTests.map((test) => (
          <div key={test.id} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/30 transition-all card-hover">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold bg-primary/10 text-primary px-2.5 py-0.5 rounded-full">{test.category}</span>
                <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", difficultyColor[test.difficulty])}>{test.difficulty}</span>
              </div>
              {test.status === "new" && <span className="text-xs font-bold bg-accent/10 text-accent px-2 py-0.5 rounded-full">New</span>}
            </div>
            <h3 className="font-semibold text-sm mb-1 leading-snug">{test.title}</h3>
            <p className="text-xs text-muted-foreground mb-4">{test.subject}</p>

            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="text-center p-2 rounded-lg bg-muted/40">
                <div className="text-sm font-bold">{test.questions}</div>
                <div className="text-[10px] text-muted-foreground">Questions</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-muted/40">
                <div className="text-sm font-bold">{test.duration}m</div>
                <div className="text-[10px] text-muted-foreground">Duration</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-muted/40">
                <div className="text-sm font-bold">{test.marks}</div>
                <div className="text-[10px] text-muted-foreground">Marks</div>
              </div>
            </div>

            {test.attempts > 0 && (
              <div className="flex items-center justify-between text-xs mb-4">
                <span className="text-muted-foreground">{test.attempts} attempts</span>
                <span className="font-semibold text-primary">Best: {test.bestScore}/{test.marks}</span>
              </div>
            )}

            <button
              onClick={() => startTest(test)}
              className="w-full py-2.5 gradient-primary text-white rounded-xl text-xs font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <Play className="w-3.5 h-3.5" /> {test.attempts > 0 ? "Retake Test" : "Start Test"}
            </button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
