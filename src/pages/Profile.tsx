import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Camera, CheckCircle, Edit2, Save, X, Flame, Zap, Target, Trophy, BookOpen, Lightbulb } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

function getMockUser() {
  try {
    const s = localStorage.getItem("edneed-user");
    return s ? JSON.parse(s) : { name: "Alex Johnson", email: "alex@edneed.com", role: "Student" };
  } catch { return { name: "Alex Johnson", email: "alex@edneed.com", role: "Student" }; }
}

export default function Profile() {
  const storedUser = getMockUser();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: storedUser.name || "Alex Johnson",
    email: storedUser.email || "alex@edneed.com",
    phone: "+91 9876543210",
    role: storedUser.role || "Student",
    school: "Delhi Public School, New Delhi",
    class: "Class 12 (Science Stream)",
    targetExam: "JEE Advanced 2025",
    bio: "Passionate learner aiming for IIT. Love mathematics and physics. Currently preparing for JEE Advanced with EdNeed's AI assistance.",
    city: "New Delhi",
    state: "Delhi",
  });

  const update = (field: string, val: string) => setForm((p) => ({ ...p, [field]: val }));

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      const user = { ...storedUser, name: form.name, email: form.email, role: form.role };
      localStorage.setItem("edneed-user", JSON.stringify(user));
      setSaving(false);
      setEditing(false);
      toast.success("Profile updated successfully!");
    }, 1000);
  };

  const achievements = [
    { icon: Flame, title: "7-Day Streak", date: "June 2025", color: "text-orange-500 bg-orange-50 dark:bg-orange-950/30" },
    { icon: Zap, title: "Fast Learner", date: "May 2025", color: "text-yellow-500 bg-yellow-50 dark:bg-yellow-950/30" },
    { icon: Target, title: "Perfect Score", date: "April 2025", color: "text-blue-500 bg-blue-50 dark:bg-blue-950/30" },
    { icon: Trophy, title: "Top 10%", date: "March 2025", color: "text-yellow-600 bg-yellow-50 dark:bg-yellow-950/30" },
    { icon: BookOpen, title: "Course Completed", date: "Feb 2025", color: "text-green-500 bg-green-50 dark:bg-green-950/30" },
    { icon: Lightbulb, title: "Problem Solver", date: "Jan 2025", color: "text-purple-500 bg-purple-50 dark:bg-purple-950/30" },
  ];

  const stats = [
    { label: "Courses", val: "12" },
    { label: "Hours", val: "247" },
    { label: "Tests", val: "34" },
    { label: "Avg Score", val: "82%" },
  ];

  const InputField = ({ label, field, type = "text", disabled = false }: { label: string; field: string; type?: string; disabled?: boolean }) => (
    <div>
      <label className="block text-sm font-medium mb-1.5">{label}</label>
      {editing && !disabled ? (
        <input
          type={type}
          value={(form as any)[field]}
          onChange={(e) => update(field, e.target.value)}
          className="w-full px-4 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
        />
      ) : (
        <div className="px-4 py-2.5 rounded-xl text-sm bg-muted/40 border border-border text-foreground">
          {(form as any)[field] || <span className="text-muted-foreground">Not specified</span>}
        </div>
      )}
    </div>
  );

  return (
    <DashboardLayout title="My Profile" subtitle="Manage your personal and academic information">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left - Avatar & Stats */}
        <div className="space-y-5">
          <div className="bg-card border border-border rounded-2xl p-6 text-center">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 rounded-2xl gradient-primary flex items-center justify-center text-white text-3xl font-bold mx-auto">
                {form.name.charAt(0)}
              </div>
              {editing && (
                <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-md hover:opacity-90">
                  <Camera className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <h2 className="text-xl font-bold mb-0.5">{form.name}</h2>
            <p className="text-sm text-primary font-medium">{form.role}</p>
            <p className="text-xs text-muted-foreground mt-1">{form.class}</p>
            <div className="grid grid-cols-2 gap-3 mt-5">
              {stats.map((s, i) => (
                <div key={i} className="bg-muted/40 rounded-xl py-3">
                  <div className="text-xl font-bold gradient-text">{s.val}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="font-semibold mb-4">Achievements</h3>
            <div className="space-y-3">
              {achievements.map((a, i) => {
                const Icon = a.icon;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", a.color)}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{a.title}</div>
                      <div className="text-xs text-muted-foreground">{a.date}</div>
                    </div>
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right - Form */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-lg">Profile Information</h3>
            {editing ? (
              <div className="flex gap-2">
                <button
                  onClick={() => setEditing(false)}
                  className="flex items-center gap-1.5 px-4 py-2 border border-border rounded-xl text-sm hover:bg-muted transition-colors"
                >
                  <X className="w-3.5 h-3.5" /> Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-1.5 px-4 py-2 gradient-primary text-white rounded-xl text-sm hover:opacity-90 transition-opacity disabled:opacity-70"
                >
                  {saving ? <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  Save Changes
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-1.5 px-4 py-2 border border-border rounded-xl text-sm hover:bg-muted transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" /> Edit Profile
              </button>
            )}
          </div>

          <div className="space-y-5">
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Personal Details</h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <InputField label="Full Name" field="name" />
                <InputField label="Email Address" field="email" type="email" />
                <InputField label="Phone Number" field="phone" type="tel" />
                <InputField label="Role" field="role" disabled />
              </div>
            </div>

            <div className="border-t border-border pt-5">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Academic Details</h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <InputField label="School/Institution" field="school" />
                <InputField label="Current Class/Level" field="class" />
                <InputField label="Target Exam" field="targetExam" />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1.5">Bio</label>
                {editing ? (
                  <textarea
                    value={form.bio}
                    onChange={(e) => update("bio", e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                  />
                ) : (
                  <div className="px-4 py-2.5 rounded-xl text-sm bg-muted/40 border border-border leading-relaxed">{form.bio}</div>
                )}
              </div>
            </div>

            <div className="border-t border-border pt-5">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Location</h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <InputField label="City" field="city" />
                <InputField label="State" field="state" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
