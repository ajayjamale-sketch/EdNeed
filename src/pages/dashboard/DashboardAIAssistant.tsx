import { useState, useRef, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Brain, Send, Sparkles, BookOpen, Target, Clock, RotateCcw, ThumbsUp, ThumbsDown, Copy, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const suggestions = [
  "Explain Newton's Laws of Motion with examples",
  "Help me create a study plan for JEE 2025",
  "What are the most important topics for NEET Biology?",
  "Solve: If f(x) = 3x² + 2x - 1, find f'(x)",
  "Explain the difference between Mitosis and Meiosis",
  "Give me tips for time management during exams",
];

const aiResponses: Record<string, string> = {
  default: "I'm EdNeed's AI Study Assistant! I can help you with doubt solving, concept explanations, study planning, exam preparation, and personalized learning tips. What would you like to learn today?",
  "newton": `**Newton's Three Laws of Motion** 🔬

**1st Law (Law of Inertia):**
An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction unless acted upon by an unbalanced force.
*Example:* A ball rolling on a frictionless surface would continue forever.

**2nd Law (F = ma):**
The force acting on an object equals its mass times acceleration.
*Example:* Pushing a car requires more force than pushing a bicycle (more mass = more force needed).

**3rd Law (Action-Reaction):**
For every action, there is an equal and opposite reaction.
*Example:* When you jump off a boat, the boat moves backward while you move forward.

💡 **JEE/NEET Tip:** Questions on Newton's Laws are common. Focus on free body diagrams!`,

  "study plan": `**Personalized JEE 2025 Study Plan** 📚

**Phase 1: Foundation (Now - 4 months)**
- 6-7 hours daily study
- Focus: NCERT mastery for all three subjects
- Complete 30 problems per subject daily

**Phase 2: Intensive Preparation (4-8 months)**
- 8-9 hours daily
- Topic-wise practice from HC Verma, RD Sharma
- Weekly full syllabus mock tests

**Phase 3: Revision + Mocks (Last 2 months)**
- 10+ hours daily
- Full mock tests every alternate day
- Focus on weak areas only

**Subject Allocation:**
- Mathematics: 2.5 hours
- Physics: 2 hours
- Chemistry: 2 hours
- Revision: 1.5 hours

Would you like a day-by-day breakdown?`,

  "f'(x)": `**Solving: f(x) = 3x² + 2x - 1, find f'(x)** ✏️

**Using the Power Rule:** d/dx(xⁿ) = nxⁿ⁻¹

**Step-by-step solution:**

f(x) = 3x² + 2x - 1

Differentiating term by term:
- d/dx(3x²) = 3 × 2x² ⁻ ¹ = **6x**
- d/dx(2x) = 2 × 1x¹ ⁻ ¹ = **2**
- d/dx(-1) = **0** (constant)

**∴ f'(x) = 6x + 2**

**Verification:** At x = 1, f'(1) = 6(1) + 2 = **8**
This means the slope of f(x) at x=1 is 8.

💡 This is a fundamental calculus concept — master the power rule, chain rule, and product rule for JEE!`,
};

function getAIResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("newton") || lower.includes("law of motion")) return aiResponses["newton"];
  if (lower.includes("study plan") || lower.includes("jee 2025") || lower.includes("schedule")) return aiResponses["study plan"];
  if (lower.includes("f'(x)") || lower.includes("f'") || lower.includes("derivative") || lower.includes("differentiat")) return aiResponses["f'(x)"];
  if (lower.includes("mitosis") || lower.includes("meiosis")) return `**Mitosis vs Meiosis** 🧬\n\n**Mitosis:**\n- Purpose: Growth, repair, asexual reproduction\n- Result: 2 identical daughter cells (diploid)\n- Phases: Prophase → Metaphase → Anaphase → Telophase\n- Occurs in: Somatic (body) cells\n\n**Meiosis:**\n- Purpose: Sexual reproduction\n- Result: 4 genetically diverse cells (haploid)\n- Involves 2 divisions (Meiosis I & II)\n- Occurs in: Reproductive cells (gonads)\n\n💡 Key difference: Meiosis has crossing over — creates genetic variation!`;
  if (lower.includes("neet") && lower.includes("biology")) return `**High-Yield NEET Biology Topics** 🌿\n\n**Botany (must-cover):**\n- Cell Structure & Cell Division\n- Plant Kingdom Classification\n- Morphology & Anatomy\n- Reproduction in Plants\n- Genetics & Evolution\n\n**Zoology (must-cover):**\n- Animal Kingdom\n- Human Physiology (all systems)\n- Genetics & Biotechnology\n- Ecology & Environment\n- Human Health & Disease\n\n📊 **Weightage:** Genetics = 18-20%, Physiology = 25%, Ecology = 12%\n\nFocus on NCERT diagrams — direct questions come from them!`;
  if (lower.includes("time management") || lower.includes("exam tip")) return `**Exam Time Management Tips** ⏰\n\n**Before the exam:**\n- Revise the night before (don't study new topics)\n- Get 7-8 hours of sleep\n- Keep all documents ready\n\n**During the exam:**\n- Read all questions first (5 minutes)\n- Attempt easy questions first\n- Allocate time per section\n- Don't spend more than 3 min on any single question\n- Reserve 10 minutes for review\n\n**JEE-specific:**\n- +4/-1 marking — avoid guessing weak topics\n- Integer questions carry no negative marks\n- Aim for 65+ correct in 3 hours\n\n💪 Practice under timed conditions with mock tests!`;
  
  return `I understand you're asking about: **"${message}"**\n\nThis is a great question! Here's what I can tell you:\n\n${message.includes("?") ? "Based on your question, " : ""}This topic is important for your studies. Let me break it down:\n\n1. **Key Concept:** Understanding the fundamentals is essential\n2. **Application:** Practice with real examples\n3. **Exam Relevance:** This appears frequently in competitive exams\n\n💡 For a detailed explanation with solved examples, try asking more specific questions like:\n- "Explain [concept] with examples"\n- "Solve this problem: [your problem]"\n- "What are the key formulas for [topic]?"\n\nI'm here 24/7 to help you learn! 🎓`;
}

export default function DashboardAIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: aiResponses["default"],
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: getAIResponse(messageText),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setLoading(false);
    }, 1200 + Math.random() * 600);
  };

  const clearChat = () => {
    setMessages([{ id: 1, role: "assistant", content: aiResponses["default"], timestamp: new Date() }]);
    toast.success("Chat cleared!");
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard!");
  };

  return (
    <DashboardLayout title="AI Study Assistant" subtitle="Your 24/7 intelligent academic companion">
      <div className="flex flex-col lg:flex-row gap-5 h-[calc(100vh-180px)]">
        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0 space-y-4">
          {/* Quick Suggestions */}
          <div className="bg-card border border-border rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-yellow-500" />
              <h3 className="font-semibold text-sm">Quick Questions</h3>
            </div>
            <div className="space-y-2">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(s)}
                  className="w-full text-left text-xs p-2.5 rounded-lg bg-muted hover:bg-muted/80 hover:text-primary transition-colors leading-snug"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* AI Capabilities */}
          <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-4 text-white">
            <Brain className="w-5 h-5 mb-2" />
            <h3 className="font-semibold text-sm mb-2">AI Capabilities</h3>
            <div className="space-y-1.5">
              {["Doubt Solving", "Concept Explanation", "Study Planning", "Exam Prep", "Problem Solving", "Homework Help"].map((cap) => (
                <div key={cap} className="flex items-center gap-2 text-xs text-white/80">
                  <Sparkles className="w-3 h-3 text-yellow-300" />
                  {cap}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={clearChat}
            className="w-full flex items-center justify-center gap-2 py-2.5 border border-border rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> New Chat
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-card border border-border rounded-2xl overflow-hidden min-h-0">
          {/* Chat Header */}
          <div className="p-4 border-b border-border flex items-center gap-3">
            <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">EdNeed AI</h3>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                <span className="text-xs text-accent font-medium">Online · Ready to help</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={cn("flex gap-3", msg.role === "user" && "flex-row-reverse")}>
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold",
                  msg.role === "assistant" ? "gradient-primary text-white" : "bg-muted text-foreground"
                )}>
                  {msg.role === "assistant" ? <Brain className="w-4 h-4" /> : "U"}
                </div>
                <div className={cn("max-w-[80%] group", msg.role === "user" && "items-end flex flex-col")}>
                  <div className={cn(
                    "px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap",
                    msg.role === "assistant"
                      ? "bg-muted text-foreground rounded-tl-sm"
                      : "gradient-primary text-white rounded-tr-sm"
                  )}>
                    {msg.content}
                  </div>
                  <div className="flex items-center gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs text-muted-foreground">
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                    {msg.role === "assistant" && (
                      <>
                        <button onClick={() => copyMessage(msg.content)} className="p-1 hover:text-primary transition-colors">
                          <Copy className="w-3 h-3 text-muted-foreground hover:text-foreground" />
                        </button>
                        <button onClick={() => toast.success("Marked as helpful!")} className="p-1 hover:text-accent transition-colors">
                          <ThumbsUp className="w-3 h-3 text-muted-foreground hover:text-accent" />
                        </button>
                        <button onClick={() => toast.info("Feedback noted. We'll improve!")} className="p-1">
                          <ThumbsDown className="w-3 h-3 text-muted-foreground hover:text-destructive" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-muted rounded-tl-sm">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                placeholder="Ask anything — concepts, problems, study plans..."
                className="flex-1 px-4 py-3 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className="w-11 h-11 gradient-primary text-white rounded-xl flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-40 flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              EdNeed AI can make mistakes. Verify important information.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
