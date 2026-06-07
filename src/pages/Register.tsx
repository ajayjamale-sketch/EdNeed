import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GraduationCap, Eye, EyeOff, ArrowRight, Check, BookOpen, Users, School } from "lucide-react";
import { useTheme } from "@/components/features/ThemeProvider";
import { Sun, Moon } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const roles = [
  { id: "student", label: "Student", icon: GraduationCap, desc: "Learn & achieve goals" },
  { id: "teacher", label: "Teacher", icon: BookOpen, desc: "Teach & earn revenue" },
  { id: "parent", label: "Parent", icon: Users, desc: "Monitor your child" },
  { id: "institution", label: "Institution", icon: School, desc: "Manage your school" },
];

export default function Register() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("student");
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
  const [showPass, setShowPass] = useState(false);
  const [registerMethod, setRegisterMethod] = useState<"email" | "mobile">("email");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();
  const { resolvedTheme, setTheme } = useTheme();

  const location = useLocation();

  useEffect(() => {
    try {
      // Don't auto-redirect if there's a specific redirect parameter
      const params = new URLSearchParams(location.search);
      if (params.get("redirect")) return;
      const stored = localStorage.getItem("edneed-user");
      if (stored) {
        const user = JSON.parse(stored);
        if (user && user.role) {
          const roleLower = user.role.toLowerCase();
          const paths: Record<string, string> = {
            student: "/dashboard",
            parent: "/dashboard/parent",
            teacher: "/dashboard/teacher",
            institution: "/dashboard/institution",
            counselor: "/dashboard/counselor",
            recruiter: "/dashboard/recruiter",
            admin: "/dashboard/admin",
          };
          navigate(paths[roleLower] || "/dashboard");
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [navigate, location.search]);

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (registerMethod === "email") {
      if (!form.email) e.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
      if (!form.password) e.password = "Password is required";
      else if (form.password.length < 8) e.password = "At least 8 characters";
    } else {
      if (!mobile || mobile.length < 10) e.phone = "Valid mobile number is required";
      if (otpSent && (!otp || otp.length < 4)) e.otp = "Valid OTP is required";
    }
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
      const user = { name: form.name, email: form.email, role: role.toLowerCase(), id: Date.now().toString() };
      localStorage.setItem("edneed-user", JSON.stringify(user));
      
      const params = new URLSearchParams(location.search);
      const redirect = params.get("redirect");
      const selectedPlan = params.get("selectedPlan");
      
      if (redirect) {
        toast.success("Account created! Continuing to your selection...");
        setTimeout(() => navigate(`${redirect}${selectedPlan ? `?selectedPlan=${selectedPlan}` : ''}`), 1000);
      } else {
        toast.success("Account created! Welcome to EdNeed");
        const paths: Record<string, string> = {
          student: "/dashboard",
          parent: "/dashboard/parent",
          teacher: "/dashboard/teacher",
          institution: "/dashboard/institution",
          counselor: "/dashboard/counselor",
          recruiter: "/dashboard/recruiter",
          admin: "/dashboard/admin",
        };
        setTimeout(() => navigate(paths[role.toLowerCase()] || "/dashboard"), 1000);
      }
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

                {/* Social Login Buttons */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button className="flex items-center justify-center gap-2 py-2.5 border border-border rounded-xl hover:bg-muted transition-colors font-medium text-sm">
                    <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                    Google
                  </button>
                  <button className="flex items-center justify-center gap-2 py-2.5 border border-border rounded-xl hover:bg-muted transition-colors font-medium text-sm">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.75-1.46.05-1.97-.83-3.65-.83-1.677 0-2.23.82-3.62.85-1.43.03-2.533-1.47-3.48-2.84-1.953-2.81-3.413-7.94-1.405-11.46 1.003-1.74 2.766-2.83 4.676-2.87 1.393-.03 2.68.91 3.55.91.868 0 2.45-1.15 4.14-1.02 1.76.14 3.32 1.05 4.24 2.63-3.68 2.1-3.03 7.15.5 8.76z"/></svg>
                    Apple
                  </button>
                </div>

                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-background px-4 text-xs text-muted-foreground">or register with</span>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex p-1 bg-muted rounded-xl mb-6">
                  <button 
                    onClick={() => setRegisterMethod("email")}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${registerMethod === "email" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    Email
                  </button>
                  <button 
                    onClick={() => setRegisterMethod("mobile")}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${registerMethod === "mobile" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    Mobile OTP
                  </button>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Full Name</label>
                    <input
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Your full name"
                      className={`w-full px-4 py-3 border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${errors.name ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"}`}
                    />
                    {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                  </div>

                  {registerMethod === "email" ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Email Address</label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          placeholder="you@example.com"
                          className={`w-full px-4 py-3 border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${errors.email ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"}`}
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
                            className={`w-full px-4 py-3 pr-11 border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${errors.password ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"}`}
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
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Mobile Number</label>
                        <div className="flex gap-2">
                          <select className="px-3 py-3 border border-border rounded-xl text-sm bg-muted text-muted-foreground focus:outline-none">
                            <option>+91</option>
                            <option>+1</option>
                            <option>+44</option>
                          </select>
                          <input
                            type="tel"
                            value={mobile}
                            onChange={(e) => { setMobile(e.target.value); setErrors((prev) => ({ ...prev, phone: "" })); }}
                            placeholder="Enter 10-digit number"
                            className={`flex-1 px-4 py-3 border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${errors.phone ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"}`}
                          />
                        </div>
                        {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
                      </div>

                      {otpSent && (
                        <div>
                          <label className="block text-sm font-medium mb-1.5">Enter OTP</label>
                          <input
                            type="text"
                            value={otp}
                            onChange={(e) => { setOtp(e.target.value); setErrors((prev) => ({ ...prev, otp: "" })); }}
                            placeholder="Enter 6-digit OTP"
                            className={`w-full px-4 py-3 border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all tracking-[0.5em] font-mono text-center ${errors.otp ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"}`}
                            maxLength={6}
                          />
                          {errors.otp && <p className="mt-1 text-xs text-destructive text-center">{errors.otp}</p>}
                          <div className="flex justify-end mt-2">
                            <button type="button" className="text-xs text-primary hover:underline font-medium">Resend OTP</button>
                          </div>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={(e) => {
                          if (!otpSent) {
                            e.preventDefault();
                            if (!mobile || mobile.length < 10) {
                              setErrors((prev) => ({ ...prev, phone: "Valid mobile number is required" }));
                              return;
                            }
                            setLoading(true);
                            setTimeout(() => {
                              setLoading(false);
                              setOtpSent(true);
                              toast.success("OTP sent to your mobile number");
                            }, 1000);
                          } else {
                            handleNext();
                          }
                        }}
                        disabled={loading || (otpSent && otp.length < 4)}
                        className="w-full py-3.5 gradient-primary text-white rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2 mt-4"
                      >
                        {loading ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>{otpSent ? "Verify & Continue" : "Send OTP"} <ArrowRight className="w-4 h-4" /></>
                        )}
                      </button>
                    </>
                  )}
                </div>
              </>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-8">
                  <h1 className="text-3xl font-bold mb-2">What best describes you?</h1>
                  <p className="text-muted-foreground">We'll personalize your experience based on your role</p>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  {roles.map((r) => {
                    const Icon = r.icon;
                    return (
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
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <div className="font-semibold text-sm">{r.label}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{r.desc}</div>
                      </button>
                    );
                  })}
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
