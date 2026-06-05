import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Search, Clock, Tag, ArrowRight, BookOpen, TrendingUp, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const posts = [
  { slug: "how-to-crack-jee-advanced", title: "How to Crack JEE Advanced 2025: A Complete Strategy Guide", excerpt: "Learn the proven strategies, study schedules, and resources that top JEE rankers use to secure their dream IIT seat.", category: "Exam Prep", readTime: "8 min", date: "May 28, 2025", author: { name: "Dr. Ramesh Gupta", initials: "RG", role: "JEE Expert" }, featured: true, tag: "trending" },
  { slug: "ai-study-assistant-guide", title: "Getting the Most Out of EdNeed's AI Study Assistant", excerpt: "Discover how to leverage AI-powered doubt solving, personalized study planning, and adaptive learning to boost your scores.", category: "Platform Guide", readTime: "5 min", date: "May 22, 2025", author: { name: "Priya Nair", initials: "PN", role: "EdNeed CTO" }, featured: false, tag: "popular" },
  { slug: "neet-biology-tips", title: "NEET Biology: High-Yield Topics You Must Master", excerpt: "A data-driven analysis of the most frequently tested NEET biology chapters from the last 5 years, with study tips.", category: "NEET Prep", readTime: "6 min", date: "May 18, 2025", author: { name: "Dr. Ananya Singh", initials: "AS", role: "Biology Expert" }, featured: false, tag: "new" },
  { slug: "career-counseling-importance", title: "Why Career Counseling in Class 9 Changes Everything", excerpt: "Starting career planning early gives students a massive advantage. Here's why — and how EdNeed's counseling tools help.", category: "Career Guidance", readTime: "4 min", date: "May 12, 2025", author: { name: "Arun Menon", initials: "AM", role: "Career Counselor" }, featured: false, tag: "" },
  { slug: "teacher-income-guide", title: "How Teachers Earn ₹1 Lakh+/Month on EdNeed", excerpt: "A complete guide to setting up your teaching profile, creating high-demand courses, and scaling your income on EdNeed.", category: "For Teachers", readTime: "7 min", date: "May 5, 2025", author: { name: "Kavitha Nair", initials: "KN", role: "Top Educator" }, featured: false, tag: "popular" },
  { slug: "scholarship-hunt-guide", title: "10 Scholarships Every Indian Student Should Apply for in 2025", excerpt: "From government grants to private fellowships — a curated list of scholarships with high success rates and how to apply.", category: "Scholarships", readTime: "9 min", date: "April 28, 2025", author: { name: "Sneha Kapoor", initials: "SK", role: "EdNeed Team" }, featured: false, tag: "new" },
];

const categories = ["All", "Exam Prep", "Platform Guide", "NEET Prep", "Career Guidance", "For Teachers", "Scholarships"];

const tagColor: Record<string, string> = {
  trending: "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400",
  popular: "bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400",
  new: "bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400",
};

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = posts.filter((p) =>
    (activeCategory === "All" || p.category === activeCategory) &&
    (search === "" || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase()))
  );

  const featured = posts.find((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-background dark:from-slate-950" />
        <div className="container-custom relative z-10">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <span className="badge-blue mb-5 inline-block">EdNeed Blog</span>
            <h1 className="text-5xl font-bold mb-5">
              Insights for <span className="gradient-text">Every Learner</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Study tips, exam strategies, career guidance, platform updates, and education insights — all in one place.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles, topics, tips..."
              className="w-full pl-12 pr-5 py-3.5 border border-border rounded-2xl text-sm bg-background/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all shadow-sm"
            />
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-custom">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-semibold transition-all border",
                  activeCategory === cat ? "gradient-primary text-white border-transparent shadow-md" : "bg-muted border-transparent hover:border-border text-muted-foreground hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Post */}
          {featured && activeCategory === "All" && !search && (
            <Link
              to={`/blog/${featured.slug}`}
              className="block bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 md:p-10 text-white mb-8 hover:opacity-95 transition-opacity relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.08),_transparent)]" />
              <div className="relative z-10 grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-semibold">{featured.category}</span>
                    <span className="flex items-center gap-1 text-white/60 text-xs"><TrendingUp className="w-3 h-3" /> Trending</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">{featured.title}</h2>
                  <p className="text-white/75 text-sm leading-relaxed mb-4">{featured.excerpt}</p>
                  <div className="flex items-center gap-4 text-white/60 text-xs">
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{featured.readTime} read</span>
                    <span>{featured.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold flex-shrink-0">
                    {featured.author.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{featured.author.name}</div>
                    <div className="text-white/60 text-xs">{featured.author.role}</div>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Posts Grid */}
          {rest.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group glass-card-premium rounded-3xl overflow-hidden hover:border-primary/40 hover:-translate-y-2 transition-all duration-300"
                >
                  {/* Color header */}
                  <div className="h-36 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-primary/30" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">{post.category}</span>
                      {post.tag && (
                        <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full capitalize", tagColor[post.tag])}>{post.tag}</span>
                      )}
                    </div>
                    <h3 className="font-bold text-base mb-2 leading-snug group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold">{post.author.initials}</div>
                        <span className="text-xs text-muted-foreground">{post.author.name}</span>
                      </div>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground text-sm">Try a different search term or category.</p>
            </div>
          )}

          {/* Newsletter CTA */}
          <div className="mt-16 glass-card-premium rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <Star className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm">Get weekly articles on study tips, exam strategies, and educational insights directly to your inbox.</p>
            <div className="flex gap-2 max-w-sm mx-auto">
              <input type="email" placeholder="your@email.com" className="flex-1 px-4 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <button className="px-5 py-2.5 gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90">Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
