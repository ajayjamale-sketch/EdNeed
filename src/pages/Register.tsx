import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, Eye, EyeOff, ArrowRight, Check } from "lucide-react";
import { useTheme } from "@/components/features/ThemeProvider";
import { Sun, Moon } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const roles = [
  { id: "student", label: "Student", emoji: "🧑‍🎓", desc: "Learn & achieve goals" },
  { id: "teacher", label: "Teacher", emoji: "👩‍🏫", desc: "Teach & earn revenue" },
  { id: "parent", label: "Parent", emoji: "👨‍👩‍👧", desc: "Monitor your child" },
  { id: "institution", label: "Institution", emoji: "🏫", desc: "Manage your school" },
];

export default function Register() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("student");
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();
  const { resolvedTheme, setTheme } = useTheme();

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 8) e.password = "At least 8 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) { toast.error("Please agree to the Terms & Privacy Policy"); return; }
    setLoading(true);
    setTimeout(() => {
      const user = { name: form.name, email: form.email, role: role.charAt(0).toUpperCase() + role.slice(1), id: Date.now().toString() };
      localStorage.setItem("edneed-user", JSON.stringify(user));
      toast.success("Account created! Welcome to EdNeed 🎉");
      setTimeout(() => navigate("/dashboard"), 1000);
    }, 1800);
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-5/12 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(145deg, hsl(262 83% 57%), hsl(221 83% 53%))" }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(255,255,255,0.08),_transparent_60%)]" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">EdNeed</span>
          </Link>

          <div>
            <h2 className="text-4xl font-bold mb-4 leading-tight">
              Start Your Path to<br />Academic Excellence
            </h2>
            <p className="text-white/70 mb-8">Join 500,000+ students, teachers, and institutions who are transforming education with EdNeed.</p>

            <div className="space-y-3">
              {["Free to start, no credit card", "AI-powered personalized learning", "CBSE, ICSE & 50+ exam support", "Verified tutors & live classes"].map((f, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                  <span className="text-white/80 text-sm">{f}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-white/40 text-xs">© {new Date().getFullYear()} EdNeed. All rights reserved.</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between p-4 lg:p-6">
          <Link to="/" className="flex items-center gap-2 lg:hidden">
            <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold"><span className="gradient-text">Ed</span>Need</span>
          </Link>
          <div className="ml-auto flex items-center gap-3">
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground"
            >
              {resolvedTheme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <span className="text-sm text-muted-foreground">
              Have an account?{" "}
              <Link to="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
            </span>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-lg">
            {/* Progress */}
            <div className="flex items-center gap-3 mb-8">
              {[1, 2].map((s) => (
                <div key={s} className="flex items-center gap-2 flex-1">
                  <div className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                    step >= s ? "gradient-primary text-white" : "bg-muted text-muted-foreground"
                  )}>
                    {step > s ? <Check className="w-3.5 h-3.5" /> : s}
                  </div>
                  <span className={cn("text-xs font-medium", step >= s ? "text-foreground" : "text-muted-foreground")}>
                    {s === 1 ? "Your Details" : "Choose Role"}
                  </span>
                  {s < 2 && <div className={cn("flex-1 h-0.5 rounded-full", step > s ? "gradient-primary" : "bg-border")} />}
                </div>
              ))}
            </div>

            {step === 1 ? (
              <>
                <div className="mb-8">
                  <h1 className="text-3xl font-bold mb-2">Create your account</h1>
                  <p className="text-muted-foreground">Start your free EdNeed journey today</p>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Full Name</label>
                    <input
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Your full name"
                      className={`w-full px-4 py-3 border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${errors.name ? "border-destructive" : "border-border focus:border-primary"}`}
                    />
                    {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="you@example.com"
                      className={`w-full px-4 py-3 border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${errors.email ? "border-destructive" : "border-border focus:border-primary"}`}
                    />
                    {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Password</label>
                    <div className="relative">
                      <input
                        type={showPass ? "text" : "password"}
                        value={form.password}
                        onChange={(e) => update("password", e.target.value)}
                        placeholder="Min. 8 characters"
                        className={`w-full px-4 py-3 pr-11 border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${errors.password ? "border-destructive" : "border-border focus:border-primary"}`}
                      />
                      <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                        {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password}</p>}
                    {form.password && (
                      <div className="flex gap-1.5 mt-2">
                        {[form.password.length >= 8, /[A-Z]/.test(form.password), /[0-9]/.test(form.password)].map((ok, i) => (
                          <div key={i} className={cn("flex-1 h-1 rounded-full transition-colors", ok ? "bg-accent" : "bg-muted")} />
                        ))}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleNext}
                    className="w-full py-3.5 gradient-primary text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-8">
                  <h1 className="text-3xl font-bold mb-2">What best describes you?</h1>
                  <p className="text-muted-foreground">We'll personalize your experience based on your role</p>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  {roles.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRole(r.id)}
                      className={cn(
                        "p-4 rounded-xl border-2 text-left transition-all",
                        role === r.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/40 hover:bg-muted/50"
                      )}
                    >
                      <div className="text-2xl mb-2">{r.emoji}</div>
                      <div className="font-semibold text-sm">{r.label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{r.desc}</div>
                    </button>
                  ))}
                </div>

                <div className="mb-6">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <div
                      onClick={() => setAgreed(!agreed)}
                      className={cn(
                        "w-5 h-5 mt-0.5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer",
                        agreed ? "bg-primary border-primary" : "border-border"
                      )}
                    >
                      {agreed && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-sm text-muted-foreground leading-relaxed">
                      I agree to EdNeed's{" "}
                      <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and{" "}
                      <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                    </span>
                  </label>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-3.5 border border-border rounded-xl text-sm font-semibold hover:bg-muted transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3.5 gradient-primary text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Create Account <ArrowRight className="w-4 h-4" /></>}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
