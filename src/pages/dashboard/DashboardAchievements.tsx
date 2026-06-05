import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Trophy, Star, Flame, Zap, Award, Target, Lock, CheckCircle, TrendingUp, Gift } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const achievements = [
  { id: 1, icon: "🔥", title: "7-Day Streak", desc: "Study 7 days in a row", earned: true, date: "Jun 1, 2025", category: "Consistency", points: 50, rarity: "Common" },
  { id: 2, icon: "⚡", title: "Fast Learner", desc: "Complete 5 lessons in a single day", earned: true, date: "May 28, 2025", category: "Learning", points: 75, rarity: "Uncommon" },
  { id: 3, icon: "🎯", title: "Perfect Score", desc: "Score 100% on any test", earned: true, date: "May 22, 2025", category: "Performance", points: 150, rarity: "Rare" },
  { id: 4, icon: "🏆", title: "Top 10%", desc: "Rank in top 10% of JEE aspirants", earned: true, date: "May 15, 2025", category: "Ranking", points: 200, rarity: "Epic" },
  { id: 5, icon: "📚", title: "Course Finisher", desc: "Complete your first full course", earned: true, date: "Apr 30, 2025", category: "Learning", points: 100, rarity: "Common" },
  { id: 6, icon: "💬", title: "Community Star", desc: "Help 10 students in forums", earned: true, date: "Apr 20, 2025", category: "Community", points: 80, rarity: "Uncommon" },
  { id: 7, icon: "🌟", title: "30-Day Streak", desc: "Study 30 consecutive days", earned: false, progress: 14, total: 30, category: "Consistency", points: 300, rarity: "Legendary" },
  { id: 8, icon: "🧠", title: "AI Master", desc: "Ask 100 questions to AI Assistant", earned: false, progress: 67, total: 100, category: "AI Tools", points: 120, rarity: "Rare" },
  { id: 9, icon: "🎓", title: "Course Collector", desc: "Enroll in 10 different courses", earned: false, progress: 8, total: 10, category: "Learning", points: 200, rarity: "Epic" },
  { id: 10, icon: "📊", title: "Test Warrior", desc: "Complete 50 mock tests", earned: false, progress: 34, total: 50, category: "Assessment", points: 250, rarity: "Epic" },
  { id: 11, icon: "🌍", title: "Community Leader", desc: "Start 5 study groups", earned: false, progress: 2, total: 5, category: "Community", points: 400, rarity: "Legendary" },
  { id: 12, icon: "💯", title: "Perfectionist", desc: "Score 95%+ on 5 tests in a row", earned: false, progress: 2, total: 5, category: "Performance", points: 500, rarity: "Legendary" },
];

const rarityConfig: Record<string, { color: string; className: string }> = {
  Common: { color: "#9CA3AF", className: "text-slate-500 bg-slate-100 dark:bg-slate-800" },
  Uncommon: { color: "#22C55E", className: "text-green-600 bg-green-100 dark:bg-green-950 dark:text-green-400" },
  Rare: { color: "#3B82F6", className: "text-blue-600 bg-blue-100 dark:bg-blue-950 dark:text-blue-400" },
  Epic: { color: "#7C3AED", className: "text-purple-600 bg-purple-100 dark:bg-purple-950 dark:text-purple-400" },
  Legendary: { color: "#F59E0B", className: "text-yellow-600 bg-yellow-100 dark:bg-yellow-950 dark:text-yellow-400" },
};

const leaderboard = [
  { rank: 1, name: "Rahul Sharma", score: 2840, initials: "RS", color: "bg-yellow-400" },
  { rank: 2, name: "Priya Mehta", score: 2750, initials: "PM", color: "bg-slate-400" },
  { rank: 3, name: "Arjun Singh", score: 2620, initials: "AS", color: "bg-orange-400" },
  { rank: 4, name: "You", score: 1875, initials: "ME", color: "bg-primary", isYou: true },
  { rank: 5, name: "Sneha Roy", score: 1840, initials: "SR", color: "bg-pink-400" },
];

export default function DashboardAchievements() {
  const [filter, setFilter] = useState<"all" | "earned" | "locked">("all");
  const [category, setCategory] = useState("All");

  const categories = ["All", "Learning", "Performance", "Consistency", "Community", "AI Tools", "Assessment", "Ranking"];

  const filtered = achievements.filter((a) => {
    const matchFilter = filter === "all" || (filter === "earned" && a.earned) || (filter === "locked" && !a.earned);
    const matchCat = category === "All" || a.category === category;
    return matchFilter && matchCat;
  });

  const totalPoints = achievements.filter((a) => a.earned).reduce((acc, a) => acc + a.points, 0);
  const earnedCount = achievements.filter((a) => a.earned).length;

  return (
    <DashboardLayout title="Achievements" subtitle="Your earned badges, streaks, and leaderboard ranking">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-card border border-border rounded-2xl p-4">
          <Trophy className="w-5 h-5 text-yellow-500 mb-2" />
          <div className="text-2xl font-bold">{earnedCount}/{achievements.length}</div>
          <div className="text-xs text-muted-foreground">Badges Earned</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-4">
          <Star className="w-5 h-5 text-primary mb-2" />
          <div className="text-2xl font-bold">{totalPoints.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">Total Points</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-4">
          <Flame className="w-5 h-5 text-orange-500 mb-2" />
          <div className="text-2xl font-bold">14</div>
          <div className="text-xs text-muted-foreground">Day Streak</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-4">
          <TrendingUp className="w-5 h-5 text-accent mb-2" />
          <div className="text-2xl font-bold">#4</div>
          <div className="text-xs text-muted-foreground">Leaderboard Rank</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            {(["all", "earned", "locked"] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={cn("px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all border", filter === f ? "gradient-primary text-white border-transparent" : "bg-muted border-transparent text-muted-foreground hover:text-foreground")}>
                {f}
              </button>
            ))}
            <div className="w-px bg-border mx-1" />
            {categories.map((cat) => (
              <button key={cat} onClick={() => setCategory(cat)} className={cn("px-3 py-1.5 rounded-xl text-xs font-medium transition-all border", category === cat ? "border-primary text-primary bg-primary/5" : "bg-muted border-transparent text-muted-foreground hover:text-foreground")}>
                {cat}
              </button>
            ))}
          </div>

          {/* Achievement Grid */}
          <div className="grid sm:grid-cols-2 gap-3">
            {filtered.map((a) => (
              <div
                key={a.id}
                className={cn("p-4 rounded-2xl border transition-all cursor-pointer hover:border-primary/30", a.earned ? "bg-card border-border" : "bg-muted/30 border-border opacity-75")}
                onClick={() => a.earned && toast.success(`${a.title} earned on ${a.date}!`)}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className={cn("text-3xl relative", !a.earned && "grayscale")}>{a.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-semibold text-sm">{a.title}</span>
                      {!a.earned && <Lock className="w-3 h-3 text-muted-foreground" />}
                    </div>
                    <p className="text-xs text-muted-foreground">{a.desc}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full", rarityConfig[a.rarity].className)}>
                      {a.rarity}
                    </span>
                    <span className="text-xs font-bold text-primary">+{a.points} pts</span>
                  </div>
                </div>
                {a.earned ? (
                  <div className="flex items-center gap-1.5 text-xs text-accent">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Earned on {a.date}
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{(a as any).progress}/{(a as any).total}</span>
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${((a as any).progress / (a as any).total) * 100}%` }} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <h3 className="font-semibold">Weekly Leaderboard</h3>
            </div>
            <div className="space-y-3">
              {leaderboard.map((player) => (
                <div key={player.rank} className={cn("flex items-center gap-3 p-3 rounded-xl transition-colors", (player as any).isYou ? "bg-primary/10 border border-primary/20" : "bg-muted/30")}>
                  <div className={cn("w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0", player.rank <= 3 ? ["bg-yellow-400", "bg-slate-400", "bg-orange-400"][player.rank - 1] : "bg-muted text-muted-foreground")}>
                    {player.rank}
                  </div>
                  <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0", player.color)}>
                    {player.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={cn("text-sm font-semibold truncate", (player as any).isYou && "text-primary")}>{player.name}</div>
                    <div className="text-xs text-muted-foreground">{player.score.toLocaleString()} pts</div>
                  </div>
                  {player.rank <= 3 && <Trophy className={cn("w-4 h-4 flex-shrink-0", player.rank === 1 ? "text-yellow-500" : player.rank === 2 ? "text-slate-400" : "text-orange-400")} />}
                </div>
              ))}
            </div>
          </div>

          {/* Daily Challenge */}
          <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-5 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-semibold">Daily Challenge</span>
            </div>
            <p className="text-white/80 text-xs mb-3">Complete 3 practice problems in Physics to earn 50 bonus points today!</p>
            <div className="flex items-center gap-2 mb-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className={cn("flex-1 h-1.5 rounded-full", i <= 1 ? "bg-white" : "bg-white/30")} />
              ))}
            </div>
            <button
              onClick={() => toast.success("Daily challenge started! Go to Assessments.")}
              className="w-full py-2 bg-white text-primary rounded-lg text-xs font-bold hover:bg-white/90 transition-colors"
            >
              Start Challenge
            </button>
          </div>

          {/* Claim Reward */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Gift className="w-4 h-4 text-primary" />
              <h3 className="font-semibold text-sm">Reward Store</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-3">Use your points to unlock premium features!</p>
            {[
              { title: "7-Day AI Premium", cost: 500 },
              { title: "1 Free Tutor Session", cost: 1000 },
              { title: "Exclusive Course Unlock", cost: 2000 },
            ].map((r) => (
              <div key={r.title} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-xs font-medium">{r.title}</span>
                <button
                  onClick={() => totalPoints >= r.cost ? toast.success(`Unlocked: ${r.title}!`) : toast.error("Not enough points")}
                  className={cn("text-xs px-2.5 py-1 rounded-full font-semibold transition-colors", totalPoints >= r.cost ? "bg-primary text-white hover:opacity-90" : "bg-muted text-muted-foreground")}
                >
                  {r.cost} pts
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
