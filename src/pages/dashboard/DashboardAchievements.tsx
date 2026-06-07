import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Trophy, Star, Flame, Zap, Award, Target, Lock, CheckCircle, TrendingUp, Gift,
  BookOpen, MessageSquare, Sparkles, Brain, GraduationCap, BarChart3, Globe, X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const rarityConfig = {
  common: { border: "border-blue-200 dark:border-blue-900/50", bg: "bg-blue-50/50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400", badge: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300" },
  rare: { border: "border-purple-200 dark:border-purple-900/50", bg: "bg-purple-50/50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400", badge: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300" },
  epic: { border: "border-orange-200 dark:border-orange-900/50", bg: "bg-orange-50/50 dark:bg-orange-950/20 text-orange-600 dark:text-orange-400", badge: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300" },
  legendary: { border: "border-yellow-200 dark:border-yellow-900/50", bg: "bg-yellow-50/50 dark:bg-yellow-950/20 text-yellow-600 dark:text-yellow-400", badge: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300" }
};

const initialAchievements = [
  { id: 1, title: "First Steps", desc: "Complete your first lesson", points: 50, category: "Academic", rarity: "common", progress: 1, maxProgress: 1, unlocked: true, icon: GraduationCap },
  { id: 2, title: "Daily Devotee", desc: "Maintain a 7-day study streak", points: 150, category: "Streaks", rarity: "rare", progress: 7, maxProgress: 7, unlocked: true, icon: Flame },
  { id: 3, title: "Inquisitive Mind", desc: "Ask 5 doubts in the community", points: 100, category: "Community", rarity: "common", progress: 5, maxProgress: 5, unlocked: true, icon: MessageSquare },
  { id: 4, title: "Quiz Master", desc: "Get a perfect score in 3 mock tests", points: 200, category: "Academic", rarity: "epic", progress: 2, maxProgress: 3, unlocked: false, icon: Award },
  { id: 5, title: "Global Scholar", desc: "Connect with students from 3 countries", points: 250, category: "Community", rarity: "epic", progress: 1, maxProgress: 3, unlocked: false, icon: Globe },
  { id: 6, title: "AI Enthusiast", desc: "Query the AI Study Assistant 50 times", points: 300, category: "Special", rarity: "legendary", progress: 50, maxProgress: 50, unlocked: true, icon: Brain },
  { id: 7, title: "Top Contributor", desc: "Receive 50 likes on your forum posts", points: 400, category: "Community", rarity: "legendary", progress: 12, maxProgress: 50, unlocked: false, icon: Sparkles },
  { id: 8, title: "Consistency King", desc: "Study for 30 consecutive days", points: 500, category: "Streaks", rarity: "legendary", progress: 14, maxProgress: 30, unlocked: false, icon: Trophy },
];

const initialLeaderboard = [
  { rank: 1, name: "Arjun Sharma", points: 12840, avatar: "AS", badge: "Champion", active: true },
  { rank: 2, name: "Priya Mehta", points: 11210, avatar: "PM", badge: "Expert", active: false },
  { rank: 3, name: "Rahul Nair", points: 10580, avatar: "RN", badge: "Leader", active: true },
  { rank: 4, name: "Sneha Roy", points: 9940, avatar: "SR", badge: "Pro", active: true },
  { rank: 5, name: "Alex (You)", points: 2450, avatar: "U", badge: "Rising Star", active: true, isCurrentUser: true }
];

const initialRewards = [
  { id: 1, title: "EdNeed Pro (1 Month)", desc: "Unlock premium courses & unlimited AI helper queries", cost: 1000, icon: Sparkles },
  { id: 2, title: "Custom Profile Badge", desc: "Show off a unique status badge on your profile", cost: 300, icon: Award },
  { id: 3, title: "Free 1-on-1 Tutor Session", desc: "Redeem for 45 minutes of private expert guidance", cost: 2500, icon: GraduationCap }
];

export default function DashboardAchievements() {
  const [filter, setFilter] = useState<"all" | "earned" | "locked">("all");
  const [activeCategory, setActiveCategory] = useState("All");
  const [userPoints, setUserPoints] = useState(2450);

  // Daily challenge state
  const [challengeStarted, setChallengeStarted] = useState(false);
  const [challengeProgress, setChallengeProgress] = useState(0); // 0/3 completed
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const [rewardClaimed, setRewardClaimed] = useState(false);

  // Simulate daily challenge: 3 physics problems
  const problems = [
    "Newton's Laws of Motion",
    "Work-Energy Theorem",
    "Rotational Dynamics"
  ];

  const handleStartChallenge = () => {
    setChallengeStarted(true);
    setChallengeProgress(0);
    setChallengeCompleted(false);
    setRewardClaimed(false);
    toast.success("Challenge started! Solve the 3 problems to earn 50 points.");
  };

  const handleCompleteProblem = (index: number) => {
    if (challengeCompleted || rewardClaimed) return;
    const newProgress = challengeProgress + 1;
    setChallengeProgress(newProgress);
    if (newProgress === 3) {
      setChallengeCompleted(true);
      toast.success("🎉 Challenge completed! Claim your 50 points!");
    } else {
      toast.success(`Problem solved! ${newProgress}/3 completed.`);
    }
  };

  const handleClaimReward = () => {
    if (challengeCompleted && !rewardClaimed) {
      setRewardClaimed(true);
      setUserPoints(prev => prev + 50);
      toast.success("+50 points added to your account!");
    }
  };

  const handleRedeemReward = (reward: typeof initialRewards[0]) => {
    if (userPoints < reward.cost) {
      toast.error("Not enough points to redeem this reward.");
      return;
    }
    setUserPoints(prev => prev - reward.cost);
    toast.success(`Successfully redeemed "${reward.title}"!`);
  };

  const unlockedCount = initialAchievements.filter(a => a.unlocked).length;

  const filteredAchievements = initialAchievements.filter((a) => {
    const matchCategory = activeCategory === "All" || a.category === activeCategory;
    const matchState = filter === "all" || (filter === "earned" && a.unlocked) || (filter === "locked" && !a.unlocked);
    return matchCategory && matchState;
  });

  return (
    <DashboardLayout title="Achievements" subtitle="Your earned badges, streaks, and leaderboard ranking">
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: Trophy, label: "Total Points", val: `${userPoints} pts`, color: "text-yellow-500 bg-yellow-50 dark:bg-yellow-950/30" },
          { icon: Flame, label: "Current Streak", val: "7 Days", color: "text-orange-500 bg-orange-50 dark:bg-orange-950/30" },
          { icon: Award, label: "Badges Unlocked", val: `${unlockedCount}/${initialAchievements.length}`, color: "text-purple-500 bg-purple-50 dark:bg-purple-950/30" },
          { icon: Target, label: "Global Rank", val: "#5", color: "text-blue-500 bg-blue-50 dark:bg-blue-950/30" },
        ].map((stat, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4">
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0", stat.color)}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-0.5">{stat.label}</div>
              <div className="text-2xl font-bold">{stat.val}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left column: Achievements filters and Grid */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-lg font-bold">Badges & Accomplishments</h2>
              <div className="flex bg-muted rounded-xl p-1 text-xs">
                {["all", "earned", "locked"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setFilter(opt as any)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg capitalize font-medium transition-colors",
                      filter === opt ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Selectors */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
              {["All", "Academic", "Community", "Streaks", "Special"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border flex-shrink-0",
                    activeCategory === cat ? "gradient-primary text-white border-transparent" : "bg-muted hover:border-border text-muted-foreground hover:text-foreground border-transparent"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Achievements Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {filteredAchievements.map((ach) => {
                const config = rarityConfig[ach.rarity as keyof typeof rarityConfig];
                const Icon = ach.icon;
                return (
                  <div
                    key={ach.id}
                    className={cn(
                      "p-5 border rounded-2xl flex flex-col relative transition-all duration-300",
                      ach.unlocked ? "bg-card border-border" : "bg-card/40 border-border/60 opacity-75"
                    )}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", config.bg)}>
                        {ach.unlocked ? <Icon className="w-5 h-5" /> : <Lock className="w-5 h-5 text-muted-foreground" />}
                      </div>
                      <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full capitalize", config.badge)}>
                        {ach.rarity}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm leading-snug mb-1">{ach.title}</h3>
                    <p className="text-xs text-muted-foreground mb-4 flex-1">{ach.desc}</p>

                    {/* Progress */}
                    <div className="space-y-1.5 mt-auto">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-semibold">{ach.progress}/{ach.maxProgress}</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${(ach.progress / ach.maxProgress) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Reward tag */}
                    <div className="mt-3 pt-3 border-t border-border flex justify-between items-center text-xs">
                      <span className="text-muted-foreground">Reward</span>
                      <span className="font-bold text-accent">+{ach.points} pts</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right column: Leaderboard & Daily Challenge */}
        <div className="space-y-6">
          
          {/* Daily Challenge - Fully Interactive */}
          <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-5 text-white shadow-xl shadow-primary/20">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-semibold">Daily Challenge</span>
              </div>
              {challengeCompleted && !rewardClaimed && (
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Ready to claim</span>
              )}
              {rewardClaimed && (
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Completed ✓</span>
              )}
            </div>

            {!challengeStarted ? (
              <>
                <p className="text-white/80 text-xs mb-3">
                  Complete 3 practice problems in Physics to earn 50 bonus points today!
                </p>
                <button
                  onClick={handleStartChallenge}
                  className="w-full py-2 bg-white text-primary rounded-lg text-xs font-bold hover:bg-white/90 transition-colors"
                >
                  Start Challenge
                </button>
              </>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium">Progress: {challengeProgress}/3</span>
                  <div className="flex-1 h-1.5 bg-white/30 rounded-full">
                    <div
                      className="h-full bg-white rounded-full transition-all"
                      style={{ width: `${(challengeProgress / 3) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  {problems.map((problem, idx) => {
                    const isCompleted = idx < challengeProgress; 
                    return (
                      <div
                        key={idx}
                        onClick={() => !isCompleted && !challengeCompleted && handleCompleteProblem(idx)}
                        className={cn(
                          "flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-colors",
                          isCompleted
                            ? "bg-white/20 line-through opacity-70"
                            : "bg-white/10 hover:bg-white/20"
                        )}
                      >
                        <span className="text-xs">{problem}</span>
                        {isCompleted ? (
                          <CheckCircle className="w-4 h-4 text-white" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-white/50" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {challengeCompleted && !rewardClaimed && (
                  <button
                    onClick={handleClaimReward}
                    className="w-full py-2.5 bg-yellow-400 text-slate-900 rounded-lg text-xs font-bold hover:bg-yellow-300 transition-colors"
                  >
                    Claim Reward (+50 pts)
                  </button>
                )}

                {rewardClaimed && (
                  <p className="text-center text-xs text-white/80">Reward claimed! Come back tomorrow for a new challenge.</p>
                )}

                {!challengeCompleted && challengeStarted && (
                  <button
                    onClick={() => {
                      setChallengeStarted(false);
                      setChallengeProgress(0);
                      toast.info("Challenge reset. You can start again.");
                    }}
                    className="w-full py-1.5 text-xs text-white/70 hover:text-white transition-colors"
                  >
                    Reset Challenge
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Leaderboard */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-primary" /> Global Leaderboard
            </h3>
            <div className="space-y-3">
              {initialLeaderboard.map((user) => (
                <div
                  key={user.rank}
                  className={cn(
                    "flex items-center gap-3 p-2.5 rounded-xl border border-transparent",
                    user.isCurrentUser ? "bg-primary/10 border-primary/20" : ""
                  )}
                >
                  <div className="w-6 text-center font-bold text-xs text-muted-foreground">
                    {user.rank === 1 && "🥇"}
                    {user.rank === 2 && "🥈"}
                    {user.rank === 3 && "🥉"}
                    {user.rank > 3 && `#${user.rank}`}
                  </div>
                  <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold">
                    {user.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold truncate flex items-center gap-1.5">
                      {user.name}
                      {user.active && <span className="w-1.5 h-1.5 rounded-full bg-green-500" />}
                    </div>
                    <div className="text-[10px] text-muted-foreground">{user.badge}</div>
                  </div>
                  <div className="text-xs font-bold text-primary">{user.points.toLocaleString()} pts</div>
                </div>
              ))}
            </div>
          </div>

          {/* Reward Store */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
              <Gift className="w-4 h-4 text-primary" /> Reward Store
            </h3>
            <p className="text-xs text-muted-foreground mb-4">Spend your hard-earned points on premium benefits</p>
            <div className="space-y-4">
              {initialRewards.map((reward) => {
                const Icon = reward.icon;
                return (
                  <div key={reward.id} className="p-3 border border-border rounded-xl space-y-3 bg-muted/20">
                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold">{reward.title}</h4>
                        <p className="text-[10px] text-muted-foreground leading-normal mt-0.5">{reward.desc}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-border/50">
                      <span className="text-[10px] font-bold text-accent">{reward.cost} pts</span>
                      <button
                        type="button"
                        onClick={() => handleRedeemReward(reward)}
                        disabled={userPoints < reward.cost}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all",
                          userPoints >= reward.cost
                            ? "bg-primary text-white hover:bg-primary/90"
                            : "bg-muted text-muted-foreground opacity-60 cursor-not-allowed"
                        )}
                      >
                        {userPoints >= reward.cost ? "Redeem" : "Locked"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}