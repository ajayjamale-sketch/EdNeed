import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import {
  Users, MessageSquare, BookOpen, Trophy, Heart, Search,
  Plus, ThumbsUp, Share2, ChevronRight, ArrowRight, Zap,
  Globe, Star, Hash, Bell, TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const studyGroups = [
  { id: 1, name: "JEE 2026 Warriors", subject: "JEE Prep", members: 4820, posts: 1230, active: true, tag: "Competitive Exams", description: "Daily problem-solving sessions for JEE Main and Advanced aspirants.", emoji: "⚡" },
  { id: 2, name: "NEET Biology Masters", subject: "Biology / NEET", members: 3650, posts: 890, active: true, tag: "Medical", description: "Detailed discussions on botany, zoology, and human physiology for NEET prep.", emoji: "🔬" },
  { id: 3, name: "CBSE Class 12 Study Circle", subject: "CBSE", members: 8920, posts: 3200, active: false, tag: "School", description: "Board exam preparation, important questions, and revision notes for Class 12.", emoji: "📚" },
  { id: 4, name: "Python & DSA Learners", subject: "Computer Science", members: 6100, posts: 2100, active: true, tag: "Technology", description: "Practice data structures, algorithms, and competitive programming together.", emoji: "💻" },
  { id: 5, name: "UPSC Discussion Forum", subject: "Civil Services", members: 5200, posts: 1800, active: false, tag: "UPSC", description: "Daily current affairs, GS discussions, and essay writing practice.", emoji: "🏛️" },
  { id: 6, name: "Creative Writing Workshop", subject: "English", members: 1840, posts: 540, active: true, tag: "Languages", description: "Improve writing skills with weekly prompts, feedback sessions, and grammar tips.", emoji: "✍️" },
];

const discussions = [
  { id: 1, title: "Best strategy for JEE Advanced 2026 — share your study plan!", author: "Rahul S.", time: "2h ago", replies: 87, likes: 234, tag: "JEE", initials: "RS" },
  { id: 2, title: "Struggling with Organic Chemistry mechanisms — any tips?", author: "Priya M.", time: "4h ago", replies: 62, likes: 189, tag: "Chemistry", initials: "PM" },
  { id: 3, title: "Resources for NEET Biology — Genetics and Evolution", author: "Arjun N.", time: "1d ago", replies: 45, likes: 156, tag: "NEET", initials: "AN" },
  { id: 4, title: "How to maintain consistency during board exam preparation?", author: "Sneha R.", time: "2d ago", replies: 103, likes: 402, tag: "Study Tips", initials: "SR" },
  { id: 5, title: "Best YouTube channels for IIT-JEE Physics — my top 5 list", author: "Vikram K.", time: "3d ago", replies: 78, likes: 310, tag: "Resources", initials: "VK" },
];

const challenges = [
  { title: "100 Days of Problem Solving", participants: 8420, icon: "🏆", deadline: "Jun 30, 2025", prize: "Certificate + EdNeed Pro" },
  { title: "Weekly Chemistry Quiz", participants: 3200, icon: "🧪", deadline: "Every Sunday", prize: "Top scorer badge" },
  { title: "Essay Writing Competition", participants: 1840, icon: "✍️", deadline: "Jul 15, 2025", prize: "₹10,000 prize money" },
  { title: "Math Olympiad Practice Series", participants: 5600, icon: "📐", deadline: "Ongoing", prize: "Leaderboard ranking" },
];

const tags = ["All Topics", "JEE", "NEET", "CBSE", "UPSC", "Coding", "Study Tips", "Resources", "Motivation"];

export default function Community() {
  const [activeTag, setActiveTag] = useState("All Topics");
  const [search, setSearch] = useState("");
  const [liked, setLiked] = useState<Set<number>>(new Set());

  const toggleLike = (id: number) => {
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
    toast.success(liked.has(id) ? "Like removed" : "Post liked!");
  };

  const filteredDiscussions = discussions.filter((d) => {
    const matchTag = activeTag === "All Topics" || d.tag === activeTag;
    const matchSearch = d.title.toLowerCase().includes(search.toLowerCase());
    return matchTag && matchSearch;
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary/5 via-accent/5 to-background pt-28 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(262_83%_57%/0.08),_transparent_60%)]" />
        <div className="container-custom relative">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-6">
              <Users className="w-4 h-4" /> 500,000+ Active Learners
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold font-heading mb-5">
              Learn Together, <span className="gradient-text">Grow Together</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Join India's largest student learning community. Participate in study groups, discussions, competitions, and peer learning sessions with thousands of motivated students.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="px-8 py-4 gradient-primary text-white rounded-xl font-bold hover:opacity-90 transition-opacity">
                Join Community Free
              </Link>
              <button onClick={() => toast.success("Exploring study groups...")} className="px-8 py-4 border border-border rounded-xl font-bold hover:bg-muted transition-colors flex items-center gap-2">
                Browse Study Groups <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Users, label: "Active Members", val: "500K+" },
              { icon: MessageSquare, label: "Daily Discussions", val: "12,000+" },
              { icon: BookOpen, label: "Study Groups", val: "8,500+" },
              { icon: Trophy, label: "Active Challenges", val: "240+" },
            ].map((s, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-5 text-center">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center mx-auto mb-3">
                  <s.icon className="w-5 h-5 text-secondary" />
                </div>
                <div className="text-xl font-bold">{s.val}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Study Groups */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold font-heading mb-2">Popular <span className="gradient-text">Study Groups</span></h2>
              <p className="text-muted-foreground">Join groups and learn collaboratively with peers</p>
            </div>
            <Link to="/dashboard/community" className="flex items-center gap-1 text-sm text-primary font-semibold hover:underline">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {studyGroups.map((group) => (
              <div key={group.id} className="glass-card-premium rounded-3xl p-8 hover:border-primary/40 hover:-translate-y-2 transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-2xl">{group.emoji}</div>
                    <div>
                      <h3 className="font-bold text-sm">{group.name}</h3>
                      <span className="text-xs text-primary font-medium">{group.subject}</span>
                    </div>
                  </div>
                  {group.active && <span className="flex items-center gap-1 text-[10px] text-green-600 font-bold bg-green-50 dark:bg-green-950 px-2 py-0.5 rounded-full"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />LIVE</span>}
                </div>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">{group.description}</p>
                <div className="flex items-center gap-3 mb-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" />{group.members.toLocaleString()} members</span>
                  <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{group.posts.toLocaleString()} posts</span>
                </div>
                <button onClick={() => toast.success(`Joined ${group.name}!`)} className="w-full py-2.5 gradient-primary text-white rounded-xl text-xs font-semibold hover:opacity-90">
                  Join Group
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discussions */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold font-heading">Trending <span className="gradient-text">Discussions</span></h2>
            <button onClick={() => toast.success("Open new discussion form...")} className="flex items-center gap-2 px-4 py-2.5 gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90">
              <Plus className="w-4 h-4" /> New Post
            </button>
          </div>
          <div className="flex gap-3 mb-6 overflow-x-auto scrollbar-hide">
            {tags.map((tag) => (
              <button key={tag} onClick={() => setActiveTag(tag)} className={cn("px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex-shrink-0", activeTag === tag ? "gradient-primary text-white" : "bg-muted text-muted-foreground hover:text-foreground")}>
                {tag}
              </button>
            ))}
          </div>
          <div className="space-y-4">
            {filteredDiscussions.map((d) => (
              <div key={d.id} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/20 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{d.initials}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-semibold text-muted-foreground">{d.author}</span>
                      <span className="text-muted-foreground">·</span>
                      <span className="text-xs text-muted-foreground">{d.time}</span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">#{d.tag}</span>
                    </div>
                    <h3 className="font-semibold text-sm leading-snug mb-3 hover:text-primary cursor-pointer transition-colors" onClick={() => toast.info("Opening discussion thread...")}>{d.title}</h3>
                    <div className="flex items-center gap-4">
                      <button onClick={() => toggleLike(d.id)} className={cn("flex items-center gap-1.5 text-xs transition-colors", liked.has(d.id) ? "text-primary" : "text-muted-foreground hover:text-primary")}>
                        <ThumbsUp className="w-3.5 h-3.5" />{d.likes + (liked.has(d.id) ? 1 : 0)}
                      </button>
                      <button onClick={() => toast.info("Opening replies...")} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                        <MessageSquare className="w-3.5 h-3.5" />{d.replies} replies
                      </button>
                      <button onClick={() => toast.success("Link copied!")} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                        <Share2 className="w-3.5 h-3.5" />Share
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading mb-3">Learning <span className="gradient-text">Challenges</span></h2>
            <p className="text-muted-foreground">Compete with peers and win exciting rewards while mastering your subjects</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {challenges.map((c, i) => (
              <div key={i} className="glass-card-premium rounded-3xl p-6 hover:border-primary/40 hover:-translate-y-2 transition-all duration-300 text-center flex flex-col h-full">
                <div className="text-3xl mb-3">{c.icon}</div>
                <h3 className="font-bold text-sm mb-2">{c.title}</h3>
                <div className="text-xs text-muted-foreground mb-1"><Users className="w-3 h-3 inline mr-1" />{c.participants.toLocaleString()} participants</div>
                <div className="text-xs text-muted-foreground mb-1"><Bell className="w-3 h-3 inline mr-1" />Ends: {c.deadline}</div>
                <div className="text-xs font-semibold text-accent mb-4"><Trophy className="w-3 h-3 inline mr-1" />{c.prize}</div>
                <button onClick={() => toast.success(`Joined: ${c.title}!`)} className="w-full py-2 gradient-primary text-white rounded-xl text-xs font-semibold hover:opacity-90">
                  Join Challenge
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 text-yellow-700 dark:text-yellow-300 text-sm font-semibold mb-6">
                <Trophy className="w-4 h-4" /> Community Leaderboard
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold font-heading mb-5">
                Compete and <span className="gradient-text">Rise to the Top</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Earn points by answering questions, participating in challenges, helping peers, and completing courses. Climb the leaderboard and win recognition.
              </p>
              <div className="space-y-3">
                {[
                  { rank: "🥇", name: "Arjun Sharma", points: "12,840", badge: "Champion" },
                  { rank: "🥈", name: "Priya Mehta", points: "11,210", badge: "Expert" },
                  { rank: "🥉", name: "Rahul Nair", points: "10,580", badge: "Leader" },
                  { rank: "4", name: "Sneha Roy", points: "9,940", badge: "Pro" },
                  { rank: "5", name: "Vikram Singh", points: "9,340", badge: "Pro" },
                ].map((user, i) => (
                  <div key={i} className="flex items-center gap-3 bg-card border border-border rounded-xl p-3">
                    <div className="w-8 text-center text-lg">{user.rank}</div>
                    <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold">{user.name.charAt(0)}</div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.badge}</div>
                    </div>
                    <div className="text-sm font-bold text-primary">{user.points} pts</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-2">How to Earn Points</h3>
              <p className="text-sm text-muted-foreground mb-5">Participate actively in the community to climb the leaderboard</p>
              <div className="space-y-4">
                {[
                  { action: "Answer a discussion question", pts: "+10 pts", icon: MessageSquare },
                  { action: "Complete a course lesson", pts: "+5 pts", icon: BookOpen },
                  { action: "Win a weekly challenge", pts: "+100 pts", icon: Trophy },
                  { action: "Help a peer solve a doubt", pts: "+15 pts", icon: Heart },
                  { action: "Join and participate in a study group", pts: "+8 pts", icon: Users },
                  { action: "Share a helpful resource", pts: "+12 pts", icon: Share2 },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 text-sm">{item.action}</div>
                    <div className="text-xs font-bold text-accent">{item.pts}</div>
                  </div>
                ))}
              </div>
              <Link to="/register" className="block w-full mt-5 py-3 gradient-primary text-white rounded-xl text-sm font-bold text-center hover:opacity-90">
                Join & Start Earning Points
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="relative overflow-hidden rounded-3xl gradient-primary p-10 text-white text-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(255,255,255,0.12),_transparent_60%)]" />
            <div className="relative">
              <Globe className="w-12 h-12 mx-auto mb-4 text-white/80" />
              <h2 className="text-3xl font-bold mb-4">Be Part of India's Largest Learning Community</h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">500,000+ students are learning together on EdNeed. Join study groups, participate in challenges, and help each other succeed.</p>
              <Link to="/register" className="inline-block px-8 py-4 bg-white text-primary rounded-xl font-bold hover:bg-white/90 transition-colors">
                Join Community Free
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
