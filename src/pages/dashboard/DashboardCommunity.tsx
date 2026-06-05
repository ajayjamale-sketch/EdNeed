import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { MessageSquare, Users, Heart, Share2, Plus, Search, ThumbsUp, Send, BookOpen, Flame, Pin, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const studyGroups = [
  { id: 1, name: "JEE 2025 Achievers", members: 2840, subject: "PCM", description: "Serious JEE aspirants helping each other crack the exam", joined: true, activity: "Very Active", posts: 124 },
  { id: 2, name: "NEET Biology Masters", members: 1920, subject: "Biology", description: "Deep dive into NEET Biology — NCERTs, diagrams, MCQs", joined: true, activity: "Active", posts: 88 },
  { id: 3, name: "Calculus Warriors", members: 760, subject: "Mathematics", description: "From limits to differential equations — conquer calculus", joined: false, activity: "Active", posts: 45 },
  { id: 4, name: "Organic Chemistry Club", members: 1100, subject: "Chemistry", description: "Reaction mechanisms, IUPAC naming, and named reactions", joined: false, activity: "Moderate", posts: 62 },
  { id: 5, name: "UPSC GS Discussions", members: 3400, subject: "GS & CA", description: "Daily current affairs, mock answers, and strategy", joined: false, activity: "Very Active", posts: 200 },
  { id: 6, name: "Python & Coding Crew", members: 890, subject: "Computer Science", description: "Learn Python, DSA, and web development together", joined: false, activity: "Active", posts: 55 },
];

const initialPosts = [
  { id: 1, author: "Rohit S.", initials: "RS", color: "bg-blue-500", group: "JEE 2025 Achievers", content: "Can someone explain the derivation for moment of inertia of a solid sphere? I keep getting confused between the axis cases.", likes: 14, replies: 7, time: "2 hours ago", liked: false, pinned: true },
  { id: 2, author: "Priya M.", initials: "PM", color: "bg-purple-500", group: "NEET Biology Masters", content: "Quick tip: For remembering the difference between mitosis and meiosis, think M = MITOSIS = MAKE MORE (same cells), ME = MEIOSIS = MAKING EGGS/SPERM. Works every time! 🧬", likes: 48, replies: 12, time: "4 hours ago", liked: true, pinned: false },
  { id: 3, author: "Arjun K.", initials: "AK", color: "bg-green-500", group: "JEE 2025 Achievers", content: "Just scored 267/300 in the latest EdNeed mock test! The key was practicing integration by parts daily for 3 weeks. Don't skip practice!", likes: 89, replies: 24, time: "6 hours ago", liked: false, pinned: false },
  { id: 4, author: "Sneha R.", initials: "SR", color: "bg-orange-500", group: "Organic Chemistry Club", content: "Remember: Markovnikov's rule — 'the rich get richer'. The carbon with MORE hydrogens gets the H from HX addition. Perfect exam tip!", likes: 33, replies: 9, time: "1 day ago", liked: false, pinned: false },
  { id: 5, author: "Vikram T.", initials: "VT", color: "bg-red-500", group: "UPSC GS Discussions", content: "Today's most important current affairs: New education policy updates, space mission launch, and economic survey highlights. All potential UPSC questions!", likes: 55, replies: 18, time: "1 day ago", liked: false, pinned: false },
];

const activityColor: Record<string, string> = {
  "Very Active": "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
  "Active": "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
  "Moderate": "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400",
};

export default function DashboardCommunity() {
  const [activeTab, setActiveTab] = useState<"feed" | "groups">("feed");
  const [posts, setPosts] = useState(initialPosts);
  const [groups, setGroups] = useState(studyGroups);
  const [search, setSearch] = useState("");
  const [newPost, setNewPost] = useState("");
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostGroup, setNewPostGroup] = useState("JEE 2025 Achievers");
  const [replyInputs, setReplyInputs] = useState<Record<number, string>>({});
  const [showReply, setShowReply] = useState<number | null>(null);

  const toggleLike = (id: number) => {
    setPosts((prev) => prev.map((p) => p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p));
  };

  const toggleGroup = (id: number, name: string) => {
    setGroups((prev) => prev.map((g) => {
      if (g.id === id) {
        const joined = !g.joined;
        toast.success(joined ? `Joined ${name}!` : `Left ${name}`);
        return { ...g, joined, members: joined ? g.members + 1 : g.members - 1 };
      }
      return g;
    }));
  };

  const submitPost = () => {
    if (!newPost.trim()) { toast.error("Write something first!"); return; }
    const post = {
      id: Date.now(),
      author: "You",
      initials: "ME",
      color: "bg-primary",
      group: newPostGroup,
      content: newPost,
      likes: 0,
      replies: 0,
      time: "just now",
      liked: false,
      pinned: false,
    };
    setPosts((prev) => [post, ...prev]);
    setNewPost("");
    setShowNewPost(false);
    toast.success("Post shared with your community!");
  };

  const submitReply = (postId: number) => {
    const reply = replyInputs[postId];
    if (!reply?.trim()) return;
    setPosts((prev) => prev.map((p) => p.id === postId ? { ...p, replies: p.replies + 1 } : p));
    setReplyInputs((prev) => ({ ...prev, [postId]: "" }));
    setShowReply(null);
    toast.success("Reply posted!");
  };

  const filteredGroups = groups.filter((g) => g.name.toLowerCase().includes(search.toLowerCase()) || g.subject.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout title="Student Community" subtitle="Connect, learn, and grow with fellow students">
      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        {[
          { id: "feed" as const, label: "Discussion Feed", icon: MessageSquare },
          { id: "groups" as const, label: "Study Groups", icon: Users },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn("flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border", activeTab === tab.id ? "gradient-primary text-white border-transparent" : "bg-muted border-transparent text-muted-foreground hover:text-foreground")}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "feed" && (
        <div className="max-w-2xl">
          {/* New Post */}
          {!showNewPost ? (
            <button
              onClick={() => setShowNewPost(true)}
              className="w-full p-4 rounded-2xl bg-card border border-border hover:border-primary/30 text-left text-sm text-muted-foreground transition-all mb-5 flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold">ME</div>
              <span>Share a tip, ask a doubt, or start a discussion...</span>
              <Plus className="w-4 h-4 ml-auto" />
            </button>
          ) : (
            <div className="bg-card border border-border rounded-2xl p-5 mb-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">New Post</h3>
                <button onClick={() => setShowNewPost(false)}><X className="w-4 h-4 text-muted-foreground hover:text-foreground" /></button>
              </div>
              <div className="mb-3">
                <label className="block text-xs font-medium mb-1.5 text-muted-foreground">Post to group</label>
                <select value={newPostGroup} onChange={(e) => setNewPostGroup(e.target.value)} className="w-full px-3 py-2 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30">
                  {groups.filter((g) => g.joined).map((g) => <option key={g.name}>{g.name}</option>)}
                </select>
              </div>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share your knowledge, ask a question, or post an insight..."
                rows={3}
                className="w-full px-4 py-3 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none mb-3"
              />
              <div className="flex justify-end gap-2">
                <button onClick={() => setShowNewPost(false)} className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors">Cancel</button>
                <button onClick={submitPost} className="px-4 py-2 gradient-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 flex items-center gap-2">
                  <Send className="w-3.5 h-3.5" /> Post
                </button>
              </div>
            </div>
          )}

          {/* Feed */}
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className={cn("bg-card border rounded-2xl p-5 transition-colors", post.pinned ? "border-primary/30 bg-primary/[0.02]" : "border-border")}>
                {post.pinned && (
                  <div className="flex items-center gap-1.5 text-xs text-primary font-semibold mb-3">
                    <Pin className="w-3 h-3" /> Pinned Post
                  </div>
                )}
                <div className="flex items-start gap-3 mb-3">
                  <div className={cn("w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0", post.color)}>
                    {post.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">{post.author}</span>
                      <span className="text-xs text-muted-foreground">in</span>
                      <span className="text-xs font-medium text-primary">{post.group}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{post.time}</span>
                  </div>
                </div>
                <p className="text-sm leading-relaxed mb-4 text-foreground/90">{post.content}</p>
                <div className="flex items-center gap-4">
                  <button onClick={() => toggleLike(post.id)} className={cn("flex items-center gap-1.5 text-xs font-medium transition-colors", post.liked ? "text-primary" : "text-muted-foreground hover:text-primary")}>
                    <ThumbsUp className={cn("w-4 h-4", post.liked && "fill-primary")} /> {post.likes}
                  </button>
                  <button onClick={() => setShowReply(showReply === post.id ? null : post.id)} className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                    <MessageSquare className="w-4 h-4" /> {post.replies} Replies
                  </button>
                  <button onClick={() => { navigator.clipboard.writeText(post.content); toast.success("Copied!"); }} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors ml-auto">
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                {showReply === post.id && (
                  <div className="mt-3 pt-3 border-t border-border flex gap-2">
                    <input
                      value={replyInputs[post.id] || ""}
                      onChange={(e) => setReplyInputs((prev) => ({ ...prev, [post.id]: e.target.value }))}
                      placeholder="Write a reply..."
                      className="flex-1 px-3 py-2 border border-border rounded-xl text-xs bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                      onKeyDown={(e) => e.key === "Enter" && submitReply(post.id)}
                    />
                    <button onClick={() => submitReply(post.id)} className="px-3 py-2 gradient-primary text-white rounded-xl text-xs font-semibold hover:opacity-90">
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "groups" && (
        <div>
          <div className="relative max-w-sm mb-5">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search study groups..." className="w-full pl-9 pr-4 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredGroups.map((group) => (
              <div key={group.id} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/30 transition-all card-hover">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-white">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span className={cn("text-xs font-semibold px-2.5 py-0.5 rounded-full", activityColor[group.activity])}>{group.activity}</span>
                </div>
                <h3 className="font-semibold mb-1">{group.name}</h3>
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{group.description}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" />{group.members.toLocaleString()} members</span>
                  <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{group.posts} posts</span>
                </div>
                <button
                  onClick={() => toggleGroup(group.id, group.name)}
                  className={cn("w-full py-2.5 rounded-xl text-xs font-semibold transition-all", group.joined ? "bg-muted text-muted-foreground hover:bg-destructive/10 hover:text-destructive border border-border" : "gradient-primary text-white hover:opacity-90")}
                >
                  {group.joined ? "Leave Group" : "Join Group"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
