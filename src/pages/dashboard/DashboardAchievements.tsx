import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  Trophy, Star, Flame, Zap, Award, Target, Lock, CheckCircle, TrendingUp, Gift,
  BookOpen, MessagesSquare, Sparkles, Brain, GraduationCap, BarChart3, Globe, X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// ... (achievements array, rarityConfig, leaderboard remain unchanged) ...

export default function DashboardAchievements() {
  const [filter, setFilter] = useState<"all" | "earned" | "locked">("all");
  const [category, setCategory] = useState("All");

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
    // Only allow completing problems in order? For simplicity, any order.
    // But ensure we don't double-count.
    if (challengeProgress > index && challengeProgress !== index + 1) {
      // Already completed that problem? We'll just allow any order but track unique completions.
      // Better: track which problems are done.
      return;
    }
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
      toast.success("+50 points added to your account!");
      // In a real app, you'd update user points via API.
    }
  };

  // ... rest of the component (stats, filters, achievements grid) same as before ...

  // Inside the return, replace the Daily Challenge card with this:

  return (
    <DashboardLayout title="Achievements" subtitle="Your earned badges, streaks, and leaderboard ranking">
      {/* ... stats grid ... */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* ... filters and achievement grid ... */}
        </div>

        <div className="space-y-4">
          {/* ... leaderboard ... */}

          {/* Daily Challenge - Fully Interactive */}
          <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-5 text-white">
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
                    const isCompleted = idx < challengeProgress; // assume sequential for simplicity
                    return (
                      <div
                        key={idx}
                        onClick={() => !isCompleted && !challengeCompleted && handleCompleteProblem(idx)}
                        className={cn(
                          "flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors",
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
                    className="w-full py-2 bg-yellow-400 text-primary rounded-lg text-xs font-bold hover:bg-yellow-300 transition-colors"
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

          {/* Reward Store - unchanged */}
          <div className="bg-card border border-border rounded-2xl p-5">
            {/* ... */}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}