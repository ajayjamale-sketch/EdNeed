import Layout from "@/components/layout/Layout";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, Share2, Twitter, Linkedin, BookOpen, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const posts: Record<string, {
  title: string; category: string; readTime: string; date: string;
  author: { name: string; initials: string; role: string; bio: string };
  content: { type: string; text?: string; heading?: string; items?: string[] }[];
}> = {
  "how-to-crack-jee-advanced": {
    title: "How to Crack JEE Advanced 2025: A Complete Strategy Guide",
    category: "Exam Prep", readTime: "8 min", date: "May 28, 2025",
    author: { name: "Dr. Ramesh Gupta", initials: "RG", role: "JEE Expert & IIT Professor", bio: "Dr. Ramesh Gupta is an IIT Delhi alumnus with 20 years of experience coaching JEE aspirants. Over 2,000 of his students have secured top 1000 ranks." },
    content: [
      { type: "para", text: "Cracking JEE Advanced requires more than hard work — it demands smart work, strategic preparation, and the right mindset. This guide distills proven strategies from India's top JEE rankers." },
      { type: "heading", heading: "Understand the Exam Pattern First" },
      { type: "para", text: "JEE Advanced tests conceptual understanding, not rote memorization. The exam is designed to distinguish students who truly understand physics, chemistry, and mathematics from those who've only memorized formulas. Start by thoroughly analyzing the past 10 years of papers." },
      { type: "heading", heading: "Build Your Subject Priority List" },
      { type: "list", items: ["Mathematics: Calculus, Coordinate Geometry, Algebra (highest weightage)", "Physics: Mechanics, Electromagnetism, Modern Physics (conceptual depth required)", "Chemistry: Organic Chemistry reactions, Coordination Compounds, Physical Chemistry"] },
      { type: "heading", heading: "The 3-Phase Study Strategy" },
      { type: "para", text: "Phase 1 (Foundation, 6 months): Build strong conceptual clarity in all three subjects. Don't rush through topics. Phase 2 (Practice, 3 months): Solve 50+ JEE-level problems per day. Identify and eliminate weak areas. Phase 3 (Revision, 2 months): Full syllabus revision + intensive mock test series." },
      { type: "heading", heading: "Using EdNeed for JEE Preparation" },
      { type: "para", text: "EdNeed's adaptive mock test system identifies your weak topics automatically and adjusts the question difficulty accordingly. The AI Study Assistant can explain complex concepts like Lagrangian mechanics or organic reaction mechanisms in simple, step-by-step explanations." },
      { type: "list", items: ["Take at least 2 full-length mocks per week in the final 3 months", "Review every wrong answer — understand the concept, don't just memorize the solution", "Use the performance analytics to track subject-wise trends", "Join EdNeed's JEE study groups for peer learning and motivation"] },
      { type: "heading", heading: "Mental Health & Consistency" },
      { type: "para", text: "JEE preparation is a marathon, not a sprint. Maintain 7-8 hours of sleep, take one day off per week for recreation, and practice mindfulness. Many top rankers credit their consistency — not their intelligence — as the key differentiator." },
    ]
  },
  "neet-2025-biology-tips": {
    title: "NEET 2025: High‑Yield Biology Topics You Must Master",
    category: "NEET Prep", readTime: "7 min", date: "May 25, 2025",
    author: { name: "Dr. Sunita Reddy", initials: "SR", role: "NEET Faculty & Biologist", bio: "Dr. Sunita Reddy has guided over 10,000 NEET aspirants. Her students regularly feature in the top 500 all‑India ranks." },
    content: [
      { type: "para", text: "NEET Biology carries 50% of the total marks – mastering it can make or break your rank. This guide focuses on the most repeated, high‑yield topics." },
      { type: "heading", heading: "Zoology Focus Areas" },
      { type: "list", items: ["Human Physiology: Digestive, Respiratory, Circulatory systems", "Genetics & Evolution: Mendel’s laws, DNA replication, Hardy‑Weinberg", "Reproduction: Gametogenesis, menstrual cycle, reproductive health"] },
      { type: "heading", heading: "Botany Focus Areas" },
      { type: "list", items: ["Plant Physiology: Photosynthesis, transpiration, plant hormones", "Ecology: Ecosystem, biodiversity, environmental issues", "Cell Biology: Cell division, cell cycle, biomolecules"] },
      { type: "heading", heading: "Proven Study Technique" },
      { type: "para", text: "Use the Feynman technique – teach each concept aloud as if explaining to a beginner. This exposes gaps in understanding. Pair this with EdNeed's topic‑wise quizzes that adapt to your weak areas." },
    ]
  },
  "upsc-2026-strategy": {
    title: "UPSC CSE 2026: A 12‑Month Roadmap for Beginners",
    category: "UPSC", readTime: "10 min", date: "May 20, 2025",
    author: { name: "Vikram Singh", initials: "VS", role: "IAS (Retd.) & Mentor", bio: "Vikram Singh served as an IAS officer for 25 years. He now mentors UPSC aspirants through EdNeed." },
    content: [
      { type: "para", text: "Cracking UPSC Civil Services Exam requires a structured, long‑term approach. This roadmap divides your preparation into three clear phases." },
      { type: "heading", heading: "Phase 1: Foundation (Months 1‑4)" },
      { type: "list", items: ["NCERTs: Read all Class 6‑12 NCERTs (History, Geography, Polity, Economy, Science)", "Build a daily newspaper habit (The Hindu or Indian Express)", "Start making short notes – revise them weekly"] },
      { type: "heading", heading: "Phase 2: Advanced & Answer Writing (Months 5‑9)" },
      { type: "para", text: "Switch to standard reference books (Laxmikanth, Spectrum, GC Leong). Join a test series – write at least 2 answers daily. EdNeed's AI feedback helps you improve structure, keywords, and presentation." },
      { type: "heading", heading: "Phase 3: Revision & Mocks (Months 10‑12)" },
      { type: "list", items: ["Revise your notes three times", "Take full‑length Prelims and Mains mocks under timed conditions", "Analyze every mistake and revisit the concept"] },
    ]
  },
  "cat-2025-quant-guide": {
    title: "CAT 2025: How to Score 99+ Percentile in Quantitative Aptitude",
    category: "MBA Prep", readTime: "6 min", date: "May 18, 2025",
    author: { name: "Arjun Mehta", initials: "AM", role: "IIM Bangalore Alumnus & CAT Trainer", bio: "Arjun scored 99.8 percentile in CAT 2020. He has taught quant to 5,000+ students." },
    content: [
      { type: "para", text: "Quantitative Aptitude is often the make‑or‑break section for CAT. Here's a focused strategy to master it." },
      { type: "heading", heading: "Topic Prioritisation" },
      { type: "list", items: ["Arithmetic: Percentages, Profit/Loss, Time & Work, Ratios (highest weightage)", "Algebra: Quadratic equations, functions, logarithms", "Geometry: Triangles, circles, coordinate geometry", "Number System: Remainders, factors, divisibility"] },
      { type: "heading", heading: "Practice Framework" },
      { type: "para", text: "Solve 30‑40 quality questions per day. Use EdNeed's adaptive quizzes that learn your weak topics and serve similar questions until you master them. Review all mistakes – maintain an error log." },
    ]
  },
  "ai-study-assistant-guide": {
    title: "Getting the Most Out of EdNeed's AI Study Assistant",
    category: "Platform Guide", readTime: "5 min", date: "May 22, 2025",
    author: { name: "Priya Nair", initials: "PN", role: "CTO, EdNeed", bio: "Priya Nair leads all technology at EdNeed, having previously built AI systems at Google. She is passionate about using AI to democratize education." },
    content: [
      { type: "para", text: "EdNeed's AI Study Assistant is your 24/7 academic companion. Here's how to unlock its full potential for better learning outcomes." },
      { type: "heading", heading: "What Can the AI Study Assistant Do?" },
      { type: "list", items: ["Solve complex academic problems step-by-step", "Explain concepts with multiple analogies and real-world examples", "Create personalized study plans based on your exam date", "Analyze your past performance and suggest focus areas", "Generate practice questions on specific topics"] },
      { type: "heading", heading: "Pro Tips for Better AI Responses" },
      { type: "para", text: "The more context you provide, the better the response. Instead of asking 'Explain integration', ask 'Explain definite integration in calculus for a Class 12 student preparing for JEE, with 2 solved examples and common mistakes to avoid.'" },
      { type: "heading", heading: "Building a Study Plan with AI" },
      { type: "para", text: "Tell the AI your exam date, current level, and available study hours. It will generate a day-by-day plan that adapts as you progress. Update it weekly with your progress for best results." },
    ]
  }
};

const relatedPosts = [
  { slug: "how-to-crack-jee-advanced", title: "How to Crack JEE Advanced 2025: A Complete Strategy Guide", category: "Exam Prep", readTime: "8 min" },
  { slug: "neet-2025-biology-tips", title: "NEET 2025: High‑Yield Biology Topics You Must Master", category: "NEET Prep", readTime: "7 min" },
  { slug: "upsc-2026-strategy", title: "UPSC CSE 2026: A 12‑Month Roadmap for Beginners", category: "UPSC", readTime: "10 min" },
  { slug: "cat-2025-quant-guide", title: "CAT 2025: How to Score 99+ Percentile in Quantitative Aptitude", category: "MBA Prep", readTime: "6 min" },
  { slug: "ai-study-assistant-guide", title: "Getting the Most Out of EdNeed's AI Study Assistant", category: "Platform Guide", readTime: "5 min" },
];

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? posts[slug] : null;

  if (!post) {
    return (
      <Layout>
        <div className="container-custom py-32 text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">This article doesn't exist or has been moved.</p>
          <Link to="/blog" className="px-5 py-2.5 gradient-primary text-white rounded-xl font-semibold hover:opacity-90">
            Back to Blog
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="pt-16">
        {/* Header */}
        <div className="bg-gradient-to-b from-blue-50/60 to-background dark:from-slate-950 pb-12">
          <div className="container-custom max-w-3xl pt-10">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
            <span className="badge-blue mb-4 inline-block">{post.category}</span>
            <h1 className="text-3xl md:text-5xl font-bold mb-5 leading-tight text-balance">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold">{post.author.initials}</div>
                <span className="font-medium text-foreground">{post.author.name}</span>
                <span>·</span>
                <span>{post.author.role}</span>
              </div>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime} read</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container-custom max-w-3xl py-12">
          <div className="grid lg:grid-cols-4 gap-10">
            <div className="lg:col-span-3 prose prose-base max-w-none dark:prose-invert">
              {post.content.map((block, i) => {
                if (block.type === "para") return <p key={i} className="text-muted-foreground leading-relaxed mb-5 text-base">{block.text}</p>;
                if (block.type === "heading") return <h2 key={i} className="text-xl font-bold mt-8 mb-3">{block.heading}</h2>;
                if (block.type === "list") return (
                  <ul key={i} className="space-y-2 mb-5">
                    {block.items?.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-muted-foreground text-sm">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                );
                return null;
              })}

              {/* Author bio */}
              <div className="mt-12 pt-8 border-t border-border">
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-muted/30">
                  <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center text-white text-xl font-bold flex-shrink-0">{post.author.initials}</div>
                  <div>
                    <div className="font-bold">{post.author.name}</div>
                    <div className="text-sm text-primary mb-2">{post.author.role}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{post.author.bio}</p>
                  </div>
                </div>
              </div>

              {/* Share */}
              <div className="mt-8 flex items-center gap-3">
                <span className="text-sm font-medium">Share:</span>
                {[{ icon: Twitter, label: "Twitter" }, { icon: Linkedin, label: "LinkedIn" }].map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    onClick={() => toast.success(`Shared on ${label}!`)}
                    className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm hover:bg-muted transition-colors"
                  >
                    <Icon className="w-4 h-4" />{label}
                  </button>
                ))}
                <button onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success("Link copied!"); }} className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm hover:bg-muted transition-colors">
                  <Share2 className="w-4 h-4" />Copy Link
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-5">
              <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-5 text-white sticky top-20">
                <BookOpen className="w-6 h-6 mb-2" />
                <h3 className="font-semibold mb-1 text-sm">Start Learning Today</h3>
                <p className="text-white/70 text-xs mb-4">Get full access to AI-powered courses and study tools.</p>
                <Link to="/register" className="block w-full py-2 bg-white text-primary rounded-xl text-xs font-semibold text-center hover:bg-white/90 transition-colors">
                  Join Free
                </Link>
              </div>
            </div>
          </div>

          {/* Related posts */}
          <div className="mt-14 pt-10 border-t border-border">
            <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
            <div className="grid sm:grid-cols-3 gap-5">
              {relatedPosts.filter((r) => r.slug !== slug).slice(0, 3).map((r) => (
                <Link key={r.slug} to={`/blog/${r.slug}`} className="group p-5 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all card-hover">
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">{r.category}</span>
                  <h4 className="font-semibold text-sm mt-3 mb-2 leading-snug group-hover:text-primary transition-colors line-clamp-2">{r.title}</h4>
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{r.readTime} read</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
}