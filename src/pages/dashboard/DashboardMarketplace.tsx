import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { BookOpen, Star, Clock, Users, Filter, Search, Heart, ShoppingCart, CheckCircle, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const categories = ["All", "JEE Prep", "NEET Prep", "UPSC", "CAT Prep", "Class 10", "Class 12", "Skill Dev", "Language", "Coding"];

const marketplace = [
  { id: 1, title: "Complete JEE Physics - Mechanics to Modern Physics", instructor: "Dr. Vivek Agarwal", rating: 4.9, reviews: 3420, students: 18500, duration: "52h", price: 2999, originalPrice: 5999, category: "JEE Prep", tag: "Bestseller", color: "blue", lessons: 140 },
  { id: 2, title: "NEET Biology Mastery - Botany & Zoology Complete", instructor: "Dr. Priya Reddy", rating: 4.8, reviews: 2890, students: 22000, duration: "45h", price: 2499, originalPrice: 4999, category: "NEET Prep", tag: "New", color: "green", lessons: 125 },
  { id: 3, title: "CAT Quantitative Aptitude - Shortcuts & Tricks", instructor: "Mr. Rajesh Sharma", rating: 4.7, reviews: 1560, students: 9800, duration: "38h", price: 1999, originalPrice: 3999, category: "CAT Prep", tag: "Hot", color: "orange", lessons: 98 },
  { id: 4, title: "UPSC Polity & Governance - Laxmikanth Complete", instructor: "Ms. Ananya Singh", rating: 4.9, reviews: 4200, students: 31000, duration: "60h", price: 3499, originalPrice: 6999, category: "UPSC", tag: "Bestseller", color: "purple", lessons: 160 },
  { id: 5, title: "Class 12 Mathematics - CBSE Complete Revision", instructor: "Prof. Sunit Kumar", rating: 4.6, reviews: 890, students: 7600, duration: "28h", price: 999, originalPrice: 1999, category: "Class 12", tag: "", color: "blue", lessons: 80 },
  { id: 6, title: "Python Full Stack Development - Beginner to Pro", instructor: "Mr. Kiran Tech", rating: 4.8, reviews: 2100, students: 15000, duration: "65h", price: 3999, originalPrice: 7999, category: "Coding", tag: "Popular", color: "green", lessons: 180 },
  { id: 7, title: "Spoken English & Communication Skills", instructor: "Ms. Kavitha Nair", rating: 4.7, reviews: 3500, students: 28000, duration: "20h", price: 799, originalPrice: 1599, category: "Language", tag: "Popular", color: "orange", lessons: 60 },
  { id: 8, title: "JEE Chemistry - Physical, Organic & Inorganic", instructor: "Dr. Sanjay Mehta", rating: 4.9, reviews: 5100, students: 40000, duration: "58h", price: 3299, originalPrice: 5999, category: "JEE Prep", tag: "Bestseller", color: "purple", lessons: 155 },
];

const tagColor: Record<string, string> = {
  Bestseller: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
  New: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  Hot: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  Popular: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
};

const colorMap: Record<string, string> = {
  blue: "bg-blue-50 dark:bg-blue-950/50",
  purple: "bg-purple-50 dark:bg-purple-950/50",
  green: "bg-emerald-50 dark:bg-emerald-950/50",
  orange: "bg-orange-50 dark:bg-orange-950/50",
};

export default function DashboardMarketplace() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<number[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("popular");

  const filtered = marketplace.filter((c) => {
    const matchCat = activeCategory === "All" || c.category === activeCategory;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.instructor.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  }).sort((a, b) => {
    if (sortBy === "price_low") return a.price - b.price;
    if (sortBy === "price_high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return b.students - a.students;
  });

  const toggleCart = (id: number, title: string) => {
    if (cart.includes(id)) {
      setCart(cart.filter((c) => c !== id));
      toast.info("Removed from cart");
    } else {
      setCart([...cart, id]);
      toast.success(`Added "${title}" to cart!`);
    }
  };

  const toggleWishlist = (id: number) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((w) => w !== id));
    } else {
      setWishlist([...wishlist, id]);
      toast.success("Added to wishlist!");
    }
  };

  const enroll = (title: string) => {
    toast.success(`Enrolled in "${title}"! Check My Courses.`);
  };

  return (
    <DashboardLayout title="Course Marketplace" subtitle="Discover 15,000+ courses from expert educators">
      {/* Search + Sort */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses, instructors..."
            className="w-full pl-9 pr-4 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 w-full sm:w-auto"
        >
          <option value="popular">Most Popular</option>
          <option value="rating">Highest Rated</option>
          <option value="price_low">Price: Low to High</option>
          <option value="price_high">Price: High to Low</option>
        </select>
        {cart.length > 0 && (
          <button
            onClick={() => toast.success(`Proceeding to checkout with ${cart.length} courses!`)}
            className="flex items-center gap-2 px-4 py-2.5 gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 whitespace-nowrap"
          >
            <ShoppingCart className="w-4 h-4" /> Cart ({cart.length})
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap border flex-shrink-0",
              activeCategory === cat ? "gradient-primary text-white border-transparent" : "bg-muted border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground mb-4">{filtered.length} courses found</p>

      {/* Course Grid */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {filtered.map((course) => (
          <div key={course.id} className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all card-hover group">
            <div className={cn("h-28 flex items-center justify-center relative", colorMap[course.color])}>
              <BookOpen className="w-12 h-12 text-muted-foreground/40" />
              {course.tag && (
                <span className={cn("absolute top-3 left-3 text-xs font-bold px-2 py-0.5 rounded-full", tagColor[course.tag] || "bg-muted text-muted-foreground")}>
                  {course.tag}
                </span>
              )}
              <button
                onClick={() => toggleWishlist(course.id)}
                className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/80 dark:bg-black/40 flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Heart className={cn("w-3.5 h-3.5", wishlist.includes(course.id) ? "fill-red-500 text-red-500" : "text-muted-foreground")} />
              </button>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-sm leading-snug mb-1.5 line-clamp-2 group-hover:text-primary transition-colors">{course.title}</h3>
              <p className="text-xs text-muted-foreground mb-2">{course.instructor}</p>

              <div className="flex items-center gap-1 mb-2">
                <span className="text-xs font-bold text-yellow-600">{course.rating}</span>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={cn("w-3 h-3", i < Math.floor(course.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground")} />
                ))}
                <span className="text-xs text-muted-foreground">({course.reviews.toLocaleString()})</span>
              </div>

              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
                <span className="flex items-center gap-1"><Users className="w-3 h-3" />{(course.students / 1000).toFixed(0)}K</span>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="font-bold text-base">₹{course.price.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground line-through ml-2">₹{course.originalPrice.toLocaleString()}</span>
                </div>
                <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                  {Math.round((1 - course.price / course.originalPrice) * 100)}% off
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => enroll(course.title)}
                  className="flex-1 py-2 gradient-primary text-white rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity"
                >
                  Enroll Now
                </button>
                <button
                  onClick={() => toggleCart(course.id, course.title)}
                  className={cn(
                    "w-8 h-8 rounded-lg border flex items-center justify-center transition-colors flex-shrink-0",
                    cart.includes(course.id) ? "bg-primary text-white border-primary" : "border-border hover:bg-muted"
                  )}
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <h3 className="font-semibold mb-1">No courses found</h3>
          <p className="text-sm text-muted-foreground">Try different search terms or category</p>
        </div>
      )}
    </DashboardLayout>
  );
}
