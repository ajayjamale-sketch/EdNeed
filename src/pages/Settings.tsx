import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useTheme } from "@/components/features/ThemeProvider";
import { Sun, Moon, Monitor, Bell, Shield, User, Globe, Eye, EyeOff, Save, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "account", label: "Account", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "privacy", label: "Privacy & Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Globe },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account");
  const [saving, setSaving] = useState(false);
  const { theme, setTheme } = useTheme();

  const [notifs, setNotifs] = useState({
    emailCourse: true, emailTest: true, emailCareer: false,
    pushClass: true, pushTest: true, pushAchievement: true, pushCommunity: false,
    weeklyReport: true, monthlyReport: false,
  });

  const [privacy, setPrivacy] = useState({
    showProfile: true, showProgress: false, showActivity: true, twoFactor: false,
  });

  const [showPass, setShowPass] = useState(false);
  const [lang, setLang] = useState("English");

  const save = (label: string) => {
    setSaving(true);
    setTimeout(() => { setSaving(false); toast.success(`${label} saved!`); }, 900);
  };

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className={cn("relative w-11 h-6 rounded-full transition-colors flex-shrink-0", checked ? "bg-primary" : "bg-muted")}
    >
      <span className={cn("absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform", checked && "translate-x-5")} />
    </button>
  );

  return (
    <DashboardLayout title="Settings" subtitle="Manage your account preferences and configurations">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar tabs */}
        <div className="lg:w-52 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                  activeTab === t.id ? "gradient-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <t.icon className="w-4 h-4 flex-shrink-0" />
                {t.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {activeTab === "account" && (
            <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
              <h3 className="font-semibold text-lg">Account Settings</h3>

              <div>
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Change Password</h4>
                <div className="space-y-4 max-w-md">
                  {["Current Password", "New Password", "Confirm New Password"].map((label, i) => (
                    <div key={i}>
                      <label className="block text-sm font-medium mb-1.5">{label}</label>
                      <div className="relative">
                        <input
                          type={showPass ? "text" : "password"}
                          placeholder="••••••••"
                          className="w-full px-4 py-2.5 pr-10 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                        />
                        <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                          {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => save("Password")} className="px-5 py-2.5 gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 flex items-center gap-2">
                    {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
                    Update Password
                  </button>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Danger Zone</h4>
                <div className="p-4 rounded-xl border border-destructive/30 bg-destructive/5">
                  <h5 className="font-medium text-destructive mb-1 text-sm">Delete Account</h5>
                  <p className="text-xs text-muted-foreground mb-3">Permanently delete your EdNeed account and all associated data. This action cannot be undone.</p>
                  <button className="px-4 py-2 border border-destructive text-destructive rounded-lg text-xs font-semibold hover:bg-destructive hover:text-white transition-colors">
                    Delete My Account
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
              <h3 className="font-semibold text-lg">Notification Preferences</h3>

              {[
                {
                  title: "Email Notifications",
                  items: [
                    { key: "emailCourse", label: "Course updates & new content", desc: "New lessons, instructor announcements" },
                    { key: "emailTest", label: "Test reminders & results", desc: "Upcoming tests and score reports" },
                    { key: "emailCareer", label: "Career & scholarship alerts", desc: "New opportunities matching your profile" },
                  ]
                },
                {
                  title: "Push Notifications",
                  items: [
                    { key: "pushClass", label: "Upcoming live classes", desc: "Reminders 15 minutes before class" },
                    { key: "pushTest", label: "Test & assignment deadlines", desc: "Due date reminders" },
                    { key: "pushAchievement", label: "Achievement unlocked", desc: "Badges, streaks and milestones" },
                    { key: "pushCommunity", label: "Community activity", desc: "Replies and mentions in forums" },
                  ]
                },
                {
                  title: "Reports",
                  items: [
                    { key: "weeklyReport", label: "Weekly progress report", desc: "Summary of your weekly learning activity" },
                    { key: "monthlyReport", label: "Monthly analytics digest", desc: "Comprehensive monthly performance review" },
                  ]
                }
              ].map((section) => (
                <div key={section.title}>
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">{section.title}</h4>
                  <div className="space-y-3">
                    {section.items.map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                        <div>
                          <div className="text-sm font-medium">{item.label}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">{item.desc}</div>
                        </div>
                        <Toggle
                          checked={(notifs as any)[item.key]}
                          onChange={() => setNotifs((p) => ({ ...p, [item.key]: !(p as any)[item.key] }))}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <button onClick={() => save("Notification settings")} className="px-5 py-2.5 gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 flex items-center gap-2">
                <Save className="w-4 h-4" /> Save Preferences
              </button>
            </div>
          )}

          {activeTab === "privacy" && (
            <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
              <h3 className="font-semibold text-lg">Privacy & Security</h3>

              <div>
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Profile Visibility</h4>
                <div className="space-y-3">
                  {[
                    { key: "showProfile", label: "Public profile", desc: "Allow others to view your profile and bio" },
                    { key: "showProgress", label: "Show learning progress", desc: "Display your course progress publicly" },
                    { key: "showActivity", label: "Show recent activity", desc: "Show your recent forum posts and community activity" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
                      <div>
                        <div className="text-sm font-medium">{item.label}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{item.desc}</div>
                      </div>
                      <Toggle
                        checked={(privacy as any)[item.key]}
                        onChange={() => setPrivacy((p) => ({ ...p, [item.key]: !(p as any)[item.key] }))}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-5">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Security</h4>
                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 mb-3">
                  <div>
                    <div className="text-sm font-medium">Two-Factor Authentication</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Add an extra layer of security to your account</div>
                  </div>
                  <Toggle checked={privacy.twoFactor} onChange={() => setPrivacy((p) => ({ ...p, twoFactor: !p.twoFactor }))} />
                </div>
                {privacy.twoFactor && (
                  <div className="p-4 rounded-xl bg-accent/10 border border-accent/20 flex items-start gap-3">
                    <CheckCircle className="w-4.5 h-4.5 text-accent mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-accent font-medium">2FA is enabled. Your account is more secure.</p>
                  </div>
                )}
              </div>

              <button onClick={() => save("Privacy settings")} className="px-5 py-2.5 gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 flex items-center gap-2">
                <Save className="w-4 h-4" /> Save Settings
              </button>
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
              <h3 className="font-semibold text-lg">Appearance & Language</h3>

              <div>
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Theme</h4>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { val: "light", label: "Light", icon: Sun },
                    { val: "dark", label: "Dark", icon: Moon },
                    { val: "system", label: "System", icon: Monitor },
                  ].map(({ val, label, icon: Icon }) => (
                    <button
                      key={val}
                      onClick={() => setTheme(val as any)}
                      className={cn(
                        "p-4 rounded-xl border-2 text-center transition-all",
                        theme === val ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                      )}
                    >
                      <Icon className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                      <span className="text-sm font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-5">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Language</h4>
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  className="w-full max-w-xs px-4 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  {["English", "Hindi", "Tamil", "Telugu", "Kannada", "Marathi", "Bengali", "Gujarati"].map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
              </div>

              <button onClick={() => save("Appearance settings")} className="px-5 py-2.5 gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 flex items-center gap-2">
                <Save className="w-4 h-4" /> Save Preferences
              </button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
